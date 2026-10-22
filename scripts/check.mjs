// mods.json の形を確かめる。プルリクエストのたびに自動で動く（.github/workflows/check.yml）。
// 手元で試すとき：node scripts/check.mjs
import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

const ID_RE = /^[a-z0-9][a-z0-9.-]{1,62}[a-z0-9]$/;
const OWNER_RE = /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,38})$/;
const REPO_RE = /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,38})\/[A-Za-z0-9._-]{1,100}$/;
const KEYS = new Set(["id", "name", "description", "author", "repo", "path", "network"]);

const isObj = (v) => typeof v === "object" && v !== null && !Array.isArray(v);
const len = (s) => [...s].length;

/** data（mods.json を読んだもの）の誤りを、日本語の文の並びで返す。空なら正しい */
export function check(data) {
  const errors = [];
  if (!isObj(data)) return ["全体は { ... } の形にしてください"];
  if (data.schema !== 1) errors.push('"schema" は 1 にしてください');
  if (!Array.isArray(data.mods)) return [...errors, '"mods" は [ ... ] の形にしてください'];

  const ids = new Set();
  data.mods.forEach((m, i) => {
    const at = `mods[${i}]`;
    if (!isObj(m)) {
      errors.push(`${at}: { ... } の形にしてください`);
      return;
    }
    for (const k of Object.keys(m)) if (!KEYS.has(k)) errors.push(`${at}: 知らない項目 "${k}" があります（使えるのは ${[...KEYS].join("・")}）`);

    if (typeof m.id !== "string" || !ID_RE.test(m.id)) errors.push(`${at}.id: 半角の英小文字・数字・. - だけで、3〜64文字にしてください（MOD の manifest.json の id と同じもの）`);
    else if (m.id.startsWith("builtin.")) errors.push(`${at}.id: "builtin." で始まる id は本体専用です`);
    else if (ids.has(m.id)) errors.push(`${at}.id: "${m.id}" がもう一度出てきます`);
    else ids.add(m.id);

    if (typeof m.name !== "string" || m.name.trim() === "" || len(m.name) > 40) errors.push(`${at}.name: 1〜40文字にしてください`);
    if (typeof m.description !== "string" || m.description.trim() === "" || len(m.description) > 200) errors.push(`${at}.description: 1〜200文字にしてください`);
    if (typeof m.author !== "string" || !OWNER_RE.test(m.author)) errors.push(`${at}.author: GitHub のユーザー名にしてください`);
    if (typeof m.repo !== "string" || !REPO_RE.test(m.repo)) errors.push(`${at}.repo: "ユーザー名/リポジトリ名" の形にしてください（例：taro/photo-map）`);

    if (m.path !== undefined) {
      const p = m.path;
      const bad = typeof p !== "string" || p === "" || p.startsWith("/") || p.includes("\\") || p.includes(":") || p.split("/").some((s) => s === "" || s === "." || s === "..");
      if (bad) errors.push(`${at}.path: リポジトリの中の MOD のフォルダを、/ 区切りの相対パスで書いてください（例：mods/photo-map）`);
    }
    if (m.network !== undefined && typeof m.network !== "boolean") errors.push(`${at}.network: true か false にしてください`);
  });
  return errors;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const file = process.argv[2] ?? "mods.json";
  let data;
  try {
    data = JSON.parse(readFileSync(file, "utf8"));
  } catch (e) {
    console.error(`${file} を読めませんでした：${e.message}`);
    console.error("よくある原因：最後の項目の後ろの余計なカンマ、全角の引用符（“ ”）、全角のスペース");
    process.exit(1);
  }
  const errors = check(data);
  if (errors.length > 0) {
    console.error(`${file} に直すところがあります：`);
    for (const e of errors) console.error(`- ${e}`);
    process.exit(1);
  }
  console.log(`${file}：問題ありません（${data.mods.length} 件）`);
}

# explorer_plus-mods

[explorer_plus](https://github.com/Neptunity-git/explorer_plus)（Windows 用のファイラー）の **MOD の一覧**です。
みんなが作った MOD（自分で足せる「見せ方」）を、ここで見つけて、ここに載せられます。

> **English summary**: A community list of MODs (user-made views) for explorer_plus. Each MOD lives in its own GitHub repository and is distributed as a zip in that repository's Releases. This repository only holds the list (`mods.json`). To add yours, open a pull request that adds one entry.

## MOD を探して入れる

一覧は [mods.json](mods.json) です（アプリの中から探せる機能は、これから作ります）。

1. [mods.json](mods.json) を開き、気になる MOD の `repo` を見つける（`ユーザー名/リポジトリ名` の形）
2. `https://github.com/ユーザー名/リポジトリ名/releases` を開き、一番新しい版の **zip** をダウンロードする
3. explorer_plus のホームの「MOD」の欄で **「＋ MOD を入れる（zip）」** を押して、zip を選ぶ（zip をホームのタブに落としても入れられます）
4. 確認の画面に **「このビューが使う情報」** が出ます。内容を見て、よければ入れる

**他の人が作ったコードを動かすことになります。** MOD は隔離された箱の中で動き、ファイルを勝手に消したり、勝手に通信したりはできません。それでも、確認の画面は必ず読んでください。使う情報が多すぎるものや、説明と合わないものは入れないでください。

## 自分の MOD を載せる

載せるのに、**git のコマンドも、インストールも要りません**。ブラウザだけでできます。

先に、自分の GitHub のリポジトリで MOD を公開しておきます（zip を Releases に付ける）。その手順は
[作品を公開して共有する](https://github.com/Neptunity-git/explorer_plus/blob/main/work/app/mod-docs/share.md) に、画面の言葉つきで書いてあります。

そのうえで、この一覧に1件足します。

1. このリポジトリの [mods.json](mods.json) を開き、右上の **鉛筆のマーク（Edit this file）** を押す
2. `"mods": [` の下に、次の形で1件足す（すでに載っているものがあれば、その後ろにカンマ `,` をつけて足す）

   ```json
   {
     "id": "taro.photo-map",
     "name": "写真マップ",
     "description": "写真を撮った場所の地図の上に並べて見せる",
     "author": "taro",
     "repo": "taro/photo-map"
   }
   ```

3. 右上の **「Commit changes...」** を押し、**「Propose changes」**（変更を提案する）を押す。あなたのコピー（フォーク）が自動で作られます
4. 次の画面で **「Create pull request」** を2回押す。書く欄が出たら、そのままで構いません（ひな形のチェックを読んで ✓ を付けてください）
5. 自動の確認（✓ か ✗）が出ます。✗ なら、「Details」を開くと直すところが日本語で出ます。同じ画面から直せます。初めての人は、メンテナーが「承認する」まで確認が始まらないことがあります。そのまま待てば大丈夫です
6. 確認ができたら、メンテナーが内容を見て、取り込みます

### 一覧に書く項目

| 項目 | 必須 | 決まり |
|---|---|---|
| `id` | ○ | MOD の `manifest.json` の `id` と同じもの。半角の英小文字・数字・`.`・`-` だけ（3〜64文字）。`builtin.` で始まるものは使えません |
| `name` | ○ | 1〜40文字。MOD の `name` と同じにするのをおすすめします |
| `description` | ○ | 1〜200文字。何をする MOD かを正直に書く |
| `author` | ○ | あなたの GitHub のユーザー名 |
| `repo` | ○ | `ユーザー名/リポジトリ名`。**公開（Public）** で、Releases に zip があるもの |
| `path` | | MOD が、リポジトリの一番上ではなく、フォルダの中にあるときだけ。`/` 区切りの相対パス（例：`mods/photo-map`） |
| `network` | | 通信する MOD なら `true` |

版が上がっても、この一覧の書き直しは **要りません**。一覧には「どこにあるか」だけを書き、中身は `repo` の最新の Release から取るためです。

## 載せる条件

載せるかどうかは、プルリクエストで次のことを見て決めます。厳しい審査ではなく、安心して入れてもらうための確認です。

1. **公開リポジトリで、Releases に zip がある**（非公開だと、他の人が取れません）
2. **コードが読める形である。** 自分で書いた部分は、読める形のままにしてください。ライブラリを1つのファイルにまとめたもの（バンドル）は構いません
3. **`uses` が、説明に合っていて、必要なものだけ**である
4. **通信する MOD は、何のためかが書いてある**（`network` を使うとき）。一覧にも `"network": true` と書く
5. **外から別のコードを読み込まない。**（本体も止めていますが、ここでも見ます）
6. **パスワード・API キー・個人情報・個人の写真が入っていない。** MOD の API キーは、設定の `secret` で預ける決まりです
7. **他の人の作品を、勝手に入れていない。** 使ってよい画像・文章・ライブラリだけを入れてください。ライセンスの扱いは、リポジトリに `LICENSE` を置くのをおすすめします（迷ったら MIT）
8. **法律や、他の人の迷惑になるもの、いやがらせ・だます目的のものではない**

条件を満たさなくなった MOD（危険と分かったとき、リポジトリがなくなったとき）は、一覧から外すことがあります。

## 載せたあとで

- **直したいとき**：自分のリポジトリで新しい版の Release を作るだけです。この一覧は触りません
- **一覧から外したいとき**：`mods.json` から自分の項目を消すプルリクエストを出してください（Release やリポジトリは、そのまま残して構いません）
- **危ない MOD を見つけたとき**：[Issues](../../issues) に知らせてください

## このリポジトリの中身

| 場所 | 中身 |
|---|---|
| [mods.json](mods.json) | MOD の一覧 |
| [scripts/check.mjs](scripts/check.mjs) | `mods.json` の形を確かめるスクリプト（プルリクエストのたびに自動で動きます） |
| [.github/](.github/) | 自動の確認とプルリクエストのひな形 |

手元で確かめたいときは、[Node.js](https://nodejs.org/) を入れて `node scripts/check.mjs` を実行します。

## 関連

- [explorer_plus 本体](https://github.com/Neptunity-git/explorer_plus)
- [MOD 開発ガイド](https://github.com/Neptunity-git/explorer_plus/blob/main/work/app/mod-docs/guide.md)
- [はじめての MOD づくり（初めての人向け）](https://github.com/Neptunity-git/explorer_plus/blob/main/work/app/mod-docs/beginner.md)
- [作品を公開して共有する（GitHub が初めての人向け）](https://github.com/Neptunity-git/explorer_plus/blob/main/work/app/mod-docs/share.md)

ライセンス：[MIT](LICENSE)

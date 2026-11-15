# 引き継ぎ文書：ねこと緑のくらし工房（kurashi.lucke.jp）

新しいチャットでは、この文書を貼り付けて「この続きをお願いします」と伝えてください。

## 概要
- Amazonアソシエイト（トラッキングID: luckeapp-22）の紹介サイト。WordPressは使わず自作の静的サイト。
- ジャンル：猫・地域猫・植物・水槽・DIY・製菓製パン
- 運営者の実体験メモ（紹介文vN.txt）をClaudeが整理・誤字修正して記事化 → 公開。

## 構成
| 項目 | 内容 |
|---|---|
| ソース | GitHub `necomap/kurashi-site`（main）。ClaudeのGitHubアプリで書き込み許可済み |
| 公開 | Cloudflare Pages（従来のPages方式）。build: `npm run build` / output: `dist`。mainへのpushで自動公開 |
| ドメイン | kurashi.lucke.jp（お名前.comのDNSでCNAME `kurashi` → `kurashi-site.pages.dev`） |
| PC保存先 | `C:\Users\emma\Documents\アフィリエイト用\kurashi-site`（GitHubと同内容のコピー） |
| メモ置き場 | `C:\Users\emma\Documents\アフィリエイト用\紹介文vN.txt` |
| 自動化 | Claudeのスケジュールタスク「くらし工房 毎日記事作成」毎日12:48 JST。products.csvの未処理行を1件記事化。未処理がなければ何もしない |

## ファイル
- `data/products.csv` … 商品台帳（status,category,amazon_url,product_name,comment）。記事化済みは `done:記事スラッグ`
- `content/posts/YYYYMMDD-slug.md` … 記事（frontmatter: title/date/category/description）
- 商品カード記法：`[[amazon:ASIN|商品名]]`（tag付きリンク・rel="sponsored"に自動変換）
- `social/` … X投稿文（手動で予約投稿する運用）
- `public/images/記事スラッグ/` … 記事用写真
- `AUTOMATION.md` … 自動記事作成ルール / `scripts/build.mjs` … サイト生成 / `src/style.css` … デザイン

## 運営者の方針・好み
- サイト内・X投稿文とも**絵文字禁止**（安っぽく見えるため）
- 実体験として書くのはメモ内容のみ。架空の口コミ・誇大表現・未確認の仕様や価格は書かない
- 料金などの事実は調べて訂正する（例：日本通信SIMは月290円〜。メモの280円を訂正済み）
- 仕様書・ユーザーマニュアルは不要。引き継ぎ文書のみ
- ユーザーは日本語。UI説明は最新版を確認してから案内する

## 公開済み記事（2026-11-16時点・全7本）
1. 20261114-gl-board800（植物）HaruDesign GL-BOARD800
2. 20261114-aquarack-setup（水槽）GEXアクアラック2段活用
3. 20261114-sotoneko-house-winter（地域猫）ヒートマット・屋外電源対策
4. 20261114-mimamori-camera-sim（地域猫）Wi-Fiなしでカメラ8台・SIM
5. 20261114-hinoki-pellet-litter（猫）ヒノキ木質ペレット
6. 20261114-jokin-kashitsuki-steam（製菓製パン）除菌
7. 20261115-sotoneko-house-diy（地域猫）灯油ボックスで外猫ハウス
   - 工具：CSOOMホールソー145mm（B0BPS5PX8N）、SK11ドリルチャック13mm SDCK-03NA（B003B3HESE）、HiKOKI 10.8V WH12DA(BS)＋力こぶビット（B0G2L3NBJQ）

## 記事作成の流れ（運営者メモから）
1. 運営者が `アフィリエイト用\紹介文vN.txt` に商品URL＋体験メモを書く
2. Claudeがメモを読み、誤字修正・テーマ別に整理して記事化（料金等の事実は検索で確認）
3. products.csv に `done:スラッグ` で登録 → build確認 → push → PCフォルダにもコピー保存
4. URLだけで商品名が分からないものは運営者に確認（Amazonはこちらの環境から開けない）

## 写真掲載の手順（予定）
- 運営者が `アフィリエイト用\画像\記事名\` に写真を保存
- Claudeが撮影日時（EXIF）順に並べ、縮小・**位置情報（GPS）削除**して `public/images/記事スラッグ/` に配置
- 記事内では Markdown画像、または `<div class="gallery"><figure>…</figure></div>`（成長記録用）、説明は `<p class="photo-caption">`。CSSは用意済み

## 未解決・確認待ち
- 外猫ハウス記事のHiKOKI WH12DAのリンク（B0G2L3NBJQ）が正しい商品ページに飛ぶか運営者が確認中（メモ内のURLから推定）
- Amazonアソシエイトへのサイト登録（kurashi.lucke.jp）が済んでいるか未確認
- 写真フォルダはまだ未作成
- products.csv の紹介待ちは0件（スケジュールタスクは待機状態）

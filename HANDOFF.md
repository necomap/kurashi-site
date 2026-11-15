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

## 公開済み記事（2026-11-15時点）
1. 20261114-gl-board800（植物）HaruDesign GL-BOARD800
2. 20261114-aquarack-setup（水槽）GEXアクアラック2段活用
3. 20261114-sotoneko-house-winter（地域猫）ヒートマット・屋外電源対策
4. 20261114-mimamori-camera-sim（地域猫）Wi-Fiなしでカメラ8台・SIM
5. 20261114-hinoki-pellet-litter（猫）ヒノキ木質ペレット
6. 20261114-jokin-kashitsuki-steam（製菓製パン）除菌
7. 20261115-sotoneko-house-diy（地域猫）灯油ボックスで外猫ハウス

## 未解決・確認待ち
- B0G2L3NBJQ（外猫ハウス記事で使った工具）の商品名を運営者に確認中。記事からは一時的に外している（CSVはstatus=hold）。B0BPS5PX8N=CSOOMホールソー145mm、B003B3HESE=SK11ドリルチャック13mmは修正済み
- 写真掲載：画像フォルダを用意してもらい、撮影日時順に並べて記事に追加する予定（位置情報は削除・縮小して掲載）
- Amazonアソシエイトへのサイト登録（kurashi.lucke.jp）が済んでいるか未確認

# 引き継ぎ文書：ねこと緑のくらし工房（kurashi.lucke.jp）

新しいチャットでは、この文書を貼り付けて「この続きをお願いします」と伝えてください。

## 概要
- Amazonアソシエイト（トラッキングID: luckeapp-22）の紹介サイト。WordPressは使わず自作の静的サイト。
- ジャンル：猫・地域猫・植物・水槽・DIY・製菓製パン・くらし（食べもの・旅・日用品。2026-11-16新設、slug: life）
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

## 公開済み記事（2026-11-16時点・全12本）
1. 20261114-gl-board800（植物）HaruDesign GL-BOARD800
2. 20261114-aquarack-setup（水槽）GEXアクアラック2段活用
3. 20261114-sotoneko-house-winter（地域猫）ヒートマット・屋外電源対策
4. 20261114-mimamori-camera-sim（地域猫）Wi-Fiなしでカメラ8台・SIM
5. 20261114-hinoki-pellet-litter（猫）ヒノキ木質ペレット
6. 20261114-jokin-kashitsuki-steam（製菓製パン）除菌
7. 20261115-sotoneko-house-diy（地域猫）灯油ボックスで外猫ハウス
   - 工具：CSOOMホールソー145mm（B0BPS5PX8N）、SK11ドリルチャック13mm SDCK-03NA（B003B3HESE）、HiKOKI 10.8V WH12DA(BS)＋力こぶビット（B0G2L3NBJQ）
8. 20261116-sotoneko-toilet-komenuka（地域猫）カインズ ガーデンタブ＋古い土＋米ぬかの外猫トイレ
9. 20261116-spf-bracket-catwalk（猫）アイワ金属SPFブラケット ショート/ロングでキャットウォーク
10. 20261116-smartplug-light-timer（植物）SwitchBotプラグミニ・Tapo P105で植物ライトをタイマー化
11. 20261116-tofu-gohan-busan-oden（くらし）牡蠣だし醤油の豆腐ごはん・釜山四角おでん
12. 20261116-travel-poly-bag（くらし）ジャパックス45L極厚ポリ袋で布バッグを預ける
- 紹介文v1〜v3 はすべて記事化済み。次は 紹介文v4.txt に書いてもらう
- X投稿文は social/ に各記事2案（11/16分の5記事）
- X予約投稿：`social/X予約投稿_1か月分.html/.txt`（30件、コピーボタン付き）。運営者がブラウザ版Xで予約登録済み
  - 1件目は11/16に即時投稿、2件目以降は11/18〜12/16の毎朝8時台（通勤時間）に予約。無料版で上限表示なし
  - **12/16で予約が切れるので、12月上旬に次の1か月分（12/17〜）を作成する**。新しい記事が増えていればそれも含める

## 運営者の自作アプリの宣伝（2026-11-16追加）
- 一覧：https://toolbox.lucke.jp/apps
- `site.config.json` の `apps` に登録。`cats` に合うカテゴリの記事末尾に「運営者が作ったアプリ」枠を自動表示、`home: true` はトップにも表示。フッターに「運営者のアプリ」リンク、「このサイトについて」にも紹介文
  - NekoMap → 地域猫・猫 / たすけてグリーン → 植物・水槽 / HACCP管理システム・FoodLabel Pro・テイクアウト予約・Lucke Inventory・複式簿記 記録ツール → 製菓製パン（全部お店向け）
  - 個人事業主の道具箱（toolbox.lucke.jp）→ 製菓製パン・くらし、トップにも表示
- 紹介文は一覧ページの説明文のみを根拠にしている（各アプリのページはこの環境から開けず未確認）。料金・機能を追記するなら運営者に確認
- X用の宣伝文：`social/アプリ宣伝.txt`（11案）。1〜9は運営者が予約登録済み（11/16）。10〜11（道具箱）は未予約

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
- ヒガシマル牡蠣だし醤油（B0CQ53P39V）：メモの商品名は400ml×4本だがURLは1.8Lの可能性あり。記事では容量を書かずに掲載。リンク先を運営者に確認してもらう

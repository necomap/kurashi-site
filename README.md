# ねこと緑のくらし工房（kurashi.lucke.jp）

Amazonアソシエイト用の紹介サイト。Claudeのスケジュールタスクが毎日記事を自動作成し、GitHubへpush → Cloudflare Pagesが自動公開する。

## フォルダ構成
- `data/products.csv` … 紹介したい商品リスト（ここに追加していく）
- `content/posts/` … 記事（Markdown、自動作成）
- `social/` … X用投稿文（自動作成）
- `site.config.json` … サイト名・Amazonトラッキングタグ・カテゴリ
- `AUTOMATION.md` … 自動記事作成のルール
- `scripts/build.mjs` / `src/style.css` … サイト生成・デザイン

## 商品の追加方法（products.csv）
`status,category,amazon_url,product_name,comment` の順に1行追加。statusは空欄。
categoryは cat / chiikineko / plants / aquarium / diy / baking。
例: `,cat,https://www.amazon.co.jp/dp/B0XXXXXXXX,○○給水器,うちの猫が一番よく飲むようになった`

## Cloudflare Pages 設定
- Build command: `npm run build`
- Output directory: `dist`
- Custom domain: kurashi.lucke.jp

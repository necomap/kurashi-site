// 静的サイト生成スクリプト: content/posts/*.md → dist/
import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const cfg = JSON.parse(fs.readFileSync(path.join(root, 'site.config.json'), 'utf8'));
const dist = path.join(root, 'dist');
const catMap = Object.fromEntries(cfg.categories.map(c => [c.slug, c]));

const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// ---------- 記事読み込み ----------
function parseFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { meta: {}, body: raw };
  const meta = {};
  for (const line of m[1].split(/\r?\n/)) {
    const i = line.indexOf(':');
    if (i < 0) continue;
    meta[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, '');
  }
  return { meta, body: m[2] };
}

function amazonUrl(asinOrUrl) {
  const asin = (String(asinOrUrl).match(/(?:dp|gp\/product)\/([A-Z0-9]{10})/) || [])[1] || asinOrUrl;
  return `https://www.amazon.co.jp/dp/${encodeURIComponent(asin)}?tag=${encodeURIComponent(cfg.amazonTag)}`;
}

// [[amazon:ASIN|商品名]] → 商品カード
function renderShortcodes(md) {
  return md.replace(/\[\[amazon:([^|\]]+)\|([^\]]+)\]\]/g, (_, asin, name) =>
    `\n<div class="product-card"><div class="pc-name">${esc(name.trim())}</div>` +
    `<a class="pc-btn" href="${esc(amazonUrl(asin.trim()))}" target="_blank" rel="sponsored nofollow noopener">Amazonで見る</a></div>\n`);
}

const posts = fs.existsSync(path.join(root, 'content/posts'))
  ? fs.readdirSync(path.join(root, 'content/posts')).filter(f => f.endsWith('.md')).map(f => {
      const { meta, body } = parseFrontmatter(fs.readFileSync(path.join(root, 'content/posts', f), 'utf8'));
      const slug = f.replace(/\.md$/, '');
      return {
        slug, title: meta.title || slug, date: meta.date || '1970-01-01',
        category: catMap[meta.category] ? meta.category : cfg.categories[0].slug,
        description: meta.description || '', draft: meta.draft === 'true',
        // 日本語の括弧直後でも太字が効くよう、**…** を先に<strong>へ変換
        html: marked.parse(renderShortcodes(body).replace(/\*\*([^*\n]+?)\*\*/g, '<strong>$1</strong>')),
      };
    }).filter(p => !p.draft).sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug))
  : [];

// ---------- レイアウト ----------
function layout({ title, description, body, pathName, type = 'website' }) {
  const fullTitle = title ? `${title}｜${cfg.siteName}` : `${cfg.siteName}｜${cfg.tagline}`;
  const url = cfg.siteUrl + pathName;
  const nav = cfg.categories.map(c => `<a href="/category/${c.slug}/">${esc(c.name)}</a>`).join('');
  return `<!doctype html>
<html lang="ja"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(description || cfg.tagline)}">
<link rel="canonical" href="${esc(url)}">
<meta property="og:title" content="${esc(fullTitle)}"><meta property="og:description" content="${esc(description || cfg.tagline)}">
<meta property="og:type" content="${type}"><meta property="og:url" content="${esc(url)}"><meta property="og:site_name" content="${esc(cfg.siteName)}">
<meta name="twitter:card" content="summary">
<link rel="alternate" type="application/rss+xml" title="${esc(cfg.siteName)}" href="/feed.xml">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@400;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/style.css">
</head><body>
<header class="site-header"><div class="wrap">
<a class="logo" href="/">${esc(cfg.siteName)}</a>
<p class="tagline">${esc(cfg.tagline)}</p>
</div><nav class="cat-nav"><div class="wrap">${nav}</div></nav></header>
<main class="wrap">${body}</main>
<footer class="site-footer"><div class="wrap">
<p><a href="/about/">このサイトについて</a>　<a href="/privacy/">プライバシーポリシー・免責事項</a></p>
<p class="small">Amazonのアソシエイトとして、${esc(cfg.siteName)}は適格販売により収入を得ています。</p>
<p class="small">© ${new Date().getFullYear()} ${esc(cfg.siteName)}</p>
</div></footer>
</body></html>`;
}

const card = p => {
  const c = catMap[p.category];
  return `<a class="post-card" href="/posts/${p.slug}/"><span class="pc-cat">${esc(c.name)}</span>
<h3>${esc(p.title)}</h3><p>${esc(p.description)}</p><time>${esc(p.date)}</time></a>`;
};
const list = arr => arr.length ? `<div class="post-grid">${arr.map(card).join('')}</div>` : `<p class="empty">記事を準備中です。もうしばらくお待ちください。</p>`;

// ---------- 出力 ----------
fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });
const write = (rel, content) => { const f = path.join(dist, rel); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, content); };
if (fs.existsSync(path.join(root, 'public'))) fs.cpSync(path.join(root, 'public'), dist, { recursive: true });
fs.copyFileSync(path.join(root, 'src/style.css'), path.join(dist, 'style.css'));

const pages = [];
// トップ
write('index.html', layout({ pathName: '/', body: `
<section class="hero"><h1>${esc(cfg.siteName)}</h1><p>${esc(cfg.tagline)}</p></section>
<section class="cat-tiles">${cfg.categories.map(c => `<a href="/category/${c.slug}/"><span class="tile-en">${esc(c.en)}</span>${esc(c.name)}</a>`).join('')}</section>
<h2 class="section-title">新着記事</h2>${list(posts.slice(0, 12))}` }));
pages.push('/');

// カテゴリ
for (const c of cfg.categories) {
  const arr = posts.filter(p => p.category === c.slug);
  write(`category/${c.slug}/index.html`, layout({ title: c.name, description: c.desc, pathName: `/category/${c.slug}/`,
    body: `<p class="page-en">${esc(c.en)}</p><h1 class="page-title">${esc(c.name)}</h1><p class="lead">${esc(c.desc)}</p>${list(arr)}` }));
  pages.push(`/category/${c.slug}/`);
}

// 記事
for (const p of posts) {
  const c = catMap[p.category];
  const related = posts.filter(x => x.category === p.category && x.slug !== p.slug).slice(0, 3);
  write(`posts/${p.slug}/index.html`, layout({ title: p.title, description: p.description, pathName: `/posts/${p.slug}/`, type: 'article', body: `
<article class="post">
<p class="breadcrumb"><a href="/">ホーム</a> › <a href="/category/${c.slug}/">${esc(c.name)}</a></p>
<p class="pr-note">※本記事にはプロモーション（Amazonアソシエイトのリンク）が含まれます。</p>
<h1>${esc(p.title)}</h1><time>${esc(p.date)}</time>
<div class="post-body">${p.html}</div>
</article>
${related.length ? `<h2 class="section-title">${esc(c.name)}の関連記事</h2>${list(related)}` : ''}` }));
  pages.push(`/posts/${p.slug}/`);
}

// 固定ページ
write('about/index.html', layout({ title: 'このサイトについて', pathName: '/about/', body: `<article class="post"><h1>このサイトについて</h1><div class="post-body">
<p>「${esc(cfg.siteName)}」は、猫・地域猫・植物・水槽・DIY・製菓製パンなど、暮らしを楽しくする道具を紹介するサイトです。</p>
<p>実際に使っているもの・気になっているものを中心に、選び方のポイントや使い方のコツをまとめています。</p>
<p>記事の作成にはAIによる下書き支援を利用しています。紹介する商品は運営者が選んでいます。</p></div></article>` }));
write('privacy/index.html', layout({ title: 'プライバシーポリシー・免責事項', pathName: '/privacy/', body: `<article class="post"><h1>プライバシーポリシー・免責事項</h1><div class="post-body">
<h2>広告について</h2><p>当サイトは、Amazon.co.jpを宣伝しリンクすることによってサイトが紹介料を獲得できる手段を提供することを目的に設定されたアフィリエイトプログラムである、Amazonアソシエイト・プログラムの参加者です。</p>
<p>Amazonのアソシエイトとして、${esc(cfg.siteName)}は適格販売により収入を得ています。</p>
<h2>アクセス解析について</h2><p>当サイトでは、アクセス状況の把握のためにCloudflare Web Analyticsなどのツールを利用する場合があります。個人を特定する情報は収集しません。</p>
<h2>免責事項</h2><p>掲載内容は執筆時点の情報です。価格・仕様は変更される場合がありますので、購入前に各販売ページでご確認ください。当サイトの情報によって生じた損害について、一切の責任を負いかねます。</p>
<p>ペット・生体に関する内容は一般的な情報です。体調の異変がある場合は獣医師などの専門家にご相談ください。</p></div></article>` }));
write('404.html', layout({ title: 'ページが見つかりません', pathName: '/404', body: `<section class="hero"><h1>ページが見つかりません</h1><p><a href="/">トップへ戻る</a></p></section>` }));
pages.push('/about/', '/privacy/');

// sitemap / feed / robots
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map(p => `<url><loc>${cfg.siteUrl}${p}</loc></url>`).join('\n')}\n</urlset>\n`);
write('feed.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0"><channel><title>${esc(cfg.siteName)}</title><link>${cfg.siteUrl}/</link><description>${esc(cfg.tagline)}</description>\n${posts.slice(0, 20).map(p => `<item><title>${esc(p.title)}</title><link>${cfg.siteUrl}/posts/${p.slug}/</link><guid>${cfg.siteUrl}/posts/${p.slug}/</guid><pubDate>${new Date(p.date + 'T09:00:00+09:00').toUTCString()}</pubDate><description>${esc(p.description)}</description></item>`).join('\n')}\n</channel></rss>\n`);
write('robots.txt', `User-agent: *\nAllow: /\nSitemap: ${cfg.siteUrl}/sitemap.xml\n`);

console.log(`built ${posts.length} posts, ${pages.length} pages → dist/`);

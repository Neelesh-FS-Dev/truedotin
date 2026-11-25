// Writes dist/sitemap.xml only when SITE_URL is set (a confirmed production origin). Otherwise it does nothing,
// so no placeholder domain is ever published. The preview stays out of search via robots.txt and noindex.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const origin = process.env.SITE_URL?.replace(/\/$/, '');
if (!origin) {
  console.log('sitemap: skipped (set SITE_URL to a confirmed origin to generate dist/sitemap.xml)');
  process.exit(0);
}
const campaigns = readFileSync(join(ROOT, 'src/content/campaigns.ts'), 'utf8');
const slugs = [...campaigns.matchAll(/slug: '([a-z0-9-]+)'/g)].map((m) => m[1]);
const paths = ['/', '/work', '/capabilities', '/creators', '/about', '/contact', ...slugs.map((s) => `/work/${s}`)];
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map((p) => `  <url><loc>${origin}${p}</loc></url>`).join('\n')}\n</urlset>\n`;
const out = join(ROOT, 'dist/sitemap.xml');
if (!existsSync(dirname(out))) process.exit(0);
writeFileSync(out, xml);
console.log(`sitemap: wrote ${paths.length} urls`);

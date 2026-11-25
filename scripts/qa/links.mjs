// Link check. Visits every internal link rendered on each route and confirms it does not land on the 404 page.
// External links are requested over HTTP (status must be 2xx or 3xx). Usage: node scripts/qa/links.mjs [baseUrl]
import { chromium } from 'playwright-core';

const BASE = process.argv[2] ?? 'http://localhost:4173';
const ROUTES = ['/', '/work', '/work/moodboard-sessions', '/capabilities', '/creators', '/about', '/contact'];
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await (await browser.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
const internal = new Set();
const external = new Set();
for (const route of ROUTES) {
  await page.goto(BASE + route, { waitUntil: 'load' });
  await page.waitForTimeout(400);
  const hrefs = await page.$$eval('a[href]', (as) => as.map((a) => a.getAttribute('href')));
  for (const h of hrefs) {
    if (!h) continue;
    if (/^https?:/.test(h)) external.add(h);
    else if (h.startsWith('/')) internal.add(h);
  }
}
const failures = [];
for (const href of internal) {
  const path = href.split('#')[0];
  await page.goto(BASE + path, { waitUntil: 'load' });
  await page.waitForTimeout(300);
  const notFound = await page.evaluate(() => document.title.startsWith('Page not found'));
  if (notFound) failures.push(`internal link leads to 404: ${href}`);
}
await browser.close();
for (const url of external) {
  const res = await fetch(url, { redirect: 'follow', headers: { 'user-agent': 'Mozilla/5.0 (link-check)' } }).catch(() => null);
  const ok = res && res.status < 400;
  console.log(`${ok ? 'ok ' : 'BAD'} ${res?.status ?? 'no response'} ${url}`);
  if (!ok) failures.push(`external link failed: ${url}`);
}
console.log(`internal links checked: ${internal.size}`);
if (failures.length) {
  console.log(failures.join('\n'));
  process.exit(1);
}
console.log('links passed');

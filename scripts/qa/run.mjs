// End-to-end QA against a running build (npm run build && npm run preview).
// Usage: QA_ENGINE=chrome|firefox|webkit node scripts/qa/run.mjs [baseUrl]
// chrome uses the installed Google Chrome. firefox and webkit need: npx playwright-core install firefox webkit.
// Output: qa-out/<engine>/ (screenshots and report.json). Exit 1 on any failure.
import { chromium, firefox, webkit } from 'playwright-core';
import { createRequire } from 'node:module';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const BASE = process.argv[2] ?? 'http://localhost:4173';
const ENGINE = process.env.QA_ENGINE ?? 'chrome';
const OUT = join(ROOT, 'qa-out', ENGINE);
mkdirSync(OUT, { recursive: true });
const require = createRequire(import.meta.url);
const axeSource = require('axe-core').source;

const ROUTES = ['/', '/work', '/work/moodboard-sessions', '/work/venue-reels-october', '/capabilities', '/creators', '/about', '/contact', '/nope'];
const WIDTHS = [320, 375, 390, 430, 768, 820, 1024, 1280, 1440, 1920, 2560];
const AXE_WIDTHS = [390, 1440];
const failures = [];
const results = { sweep: [], axe: [], checks: {} };
const fail = (msg) => failures.push(msg);

const browser = ENGINE === 'chrome'
  ? await chromium.launch({ channel: 'chrome', headless: true })
  : await { firefox, webkit }[ENGINE].launch({ headless: true });
console.log(`engine: ${ENGINE}`);
const newPage = async (opts = {}) => {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, ...opts });
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', (m) => (m.type() === 'error' || m.type() === 'warning') && errors.push(m.text().slice(0, 160)));
  page.on('pageerror', (e) => errors.push(`pageerror: ${e.message}`.slice(0, 160)));
  return { ctx, page, errors };
};
// Scrolls the whole page so lazy images and scroll reveals fire before measuring.
const primeScroll = async (page) => {
  const total = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < total; y += 600) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(90);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
};

// 1. Responsive sweep: overflow, overlap with the viewport edge, broken images, console errors.
for (const width of WIDTHS) {
  const { ctx, page, errors } = await newPage({ viewport: { width, height: 900 } });
  for (const route of ROUTES) {
    errors.length = 0;
    await page.goto(BASE + route, { waitUntil: 'load' });
    await page.waitForTimeout(700);
    await primeScroll(page);
    const m = await page.evaluate(() => {
      const docW = document.documentElement.clientWidth;
      const scrollable = (el) => {
        for (let p = el; p && p !== document.body; p = p.parentElement) {
          const o = getComputedStyle(p).overflowX;
          if (o !== 'visible' && o !== 'clip') return true;
        }
        return false;
      };
      const outside = [...document.querySelectorAll('main *')]
        .filter((el) => {
          const r = el.getBoundingClientRect();
          return r.width > 0 && r.right > docW + 1 && !scrollable(el);
        })
        .slice(0, 3)
        .map((el) => el.tagName.toLowerCase() + '.' + String(el.className).split(' ')[0]);
      const broken = [...document.images].filter((i) => i.complete && i.naturalWidth === 0 && i.currentSrc).length;
      return {
        overflowPx: document.documentElement.scrollWidth - docW,
        outside,
        broken,
        h1: document.querySelector('h1')?.textContent?.trim().slice(0, 50) ?? null,
      };
    });
    await page.screenshot({ path: join(OUT, `w${width}${route.replace(/\//g, '_') || '_home'}.png`) });
    const row = { width, route, ...m, consoleIssues: errors.length };
    results.sweep.push(row);
    if (m.overflowPx > 0) fail(`overflow ${m.overflowPx}px at ${width} ${route}`);
    if (m.outside.length) fail(`elements past viewport edge at ${width} ${route}: ${m.outside.join(', ')}`);
    if (m.broken) fail(`${m.broken} broken images at ${width} ${route}`);
    if (errors.length) fail(`console issues at ${width} ${route}: ${errors[0]}`);
    if (!m.h1) fail(`no h1 at ${width} ${route}`);
  }
  await ctx.close();
}
console.log(`sweep: ${results.sweep.length} page loads across ${WIDTHS.length} widths`);

// 2. Accessibility: axe-core (WCAG 2.2 AA tags) at two widths on every route.
for (const width of AXE_WIDTHS) {
  const { ctx, page } = await newPage({ viewport: { width, height: 900 } });
  for (const route of ROUTES) {
    await page.goto(BASE + route, { waitUntil: 'load' });
    await page.waitForTimeout(1800); // let entrance animations finish; axe reads computed colours
    await page.addScriptTag({ content: axeSource });
    const res = await page.evaluate(async () => {
      const r = await window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag22aa'] } });
      return r.violations.map((v) => ({ id: v.id, impact: v.impact, nodes: v.nodes.length }));
    });
    results.axe.push({ width, route, violations: res });
    for (const v of res) {
      if (v.impact === 'serious' || v.impact === 'critical') fail(`axe ${v.impact} ${v.id} (${v.nodes} nodes) at ${width} ${route}`);
    }
  }
  await ctx.close();
}
console.log(`axe: ${results.axe.reduce((n, r) => n + r.violations.length, 0)} violations recorded (serious/critical fail the run)`);
for (const r of results.axe) for (const v of r.violations) console.log(`  axe ${r.width} ${r.route} ${v.impact} ${v.id} x${v.nodes}`);

// 3. Behaviour checks.
{
  const { ctx, page, errors } = await newPage();
  await page.goto(BASE + '/', { waitUntil: 'load' });
  await page.keyboard.press('Tab');
  const skipFocused = await page.evaluate(() => document.activeElement?.classList.contains('skip-link'));
  results.checks.skipLinkFirstTab = skipFocused;
  if (!skipFocused) fail('first Tab does not focus the skip link');

  // Anchor from home index lands on the capability section.
  await page.goto(BASE + '/capabilities#brand-events', { waitUntil: 'load' });
  await page.waitForTimeout(1200);
  const anchorTop = await page.evaluate(() => Math.round(document.getElementById('brand-events').getBoundingClientRect().top));
  results.checks.anchorTop = anchorTop;
  if (anchorTop < -20 || anchorTop > 200) fail(`anchor #brand-events not at top (top=${anchorTop})`);

  // Scroll restoration: archive position is restored after returning from a detail page.
  await page.goto(BASE + '/work', { waitUntil: 'load' });
  await primeScroll(page);
  // Bring a link on screen first, then record the position. The click must not scroll, as with a real user.
  const link = page.locator('.archive .entry__title a').nth(3);
  await link.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  const before = await page.evaluate(() => window.scrollY);
  await link.click();
  await page.waitForTimeout(700);
  await page.goBack();
  await page.waitForTimeout(1200);
  const restored = await page.evaluate(() => window.scrollY);
  results.checks.scrollRestore = { before, restored };
  if (Math.abs(restored - before) > 120) fail(`scroll not restored (${before} -> ${restored})`);

  // Reels are never playing with sound: all muted, and only one plays at a time.
  await page.goto(BASE + '/work', { waitUntil: 'load' });
  await page.waitForTimeout(500);
  const reels = page.locator('.reel');
  await reels.nth(0).scrollIntoViewIfNeeded();
  await reels.nth(0).hover();
  await page.waitForTimeout(800);
  await reels.nth(1).scrollIntoViewIfNeeded();
  await reels.nth(1).hover();
  await page.waitForTimeout(800);
  const playing = await page.evaluate(() => [...document.querySelectorAll('video')].filter((v) => !v.paused));
  results.checks.playingVideos = playing.length;
  results.checks.anyUnmuted = await page.evaluate(() => [...document.querySelectorAll('video')].some((v) => v.muted === false));
  if (playing.length !== 1) fail(`expected 1 playing video, found ${playing.length}`);
  if (results.checks.anyUnmuted) fail('a video is unmuted');

  // Mobile menu contract.
  await ctx.close();
}
{
  const { ctx, page } = await newPage({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  await page.goto(BASE + '/', { waitUntil: 'load' });
  await page.waitForTimeout(600);
  const toggle = page.locator('.menu-toggle');
  await toggle.click();
  await page.waitForTimeout(400);
  const opened = await toggle.getAttribute('aria-expanded');
  for (let i = 0; i < 10; i++) await page.keyboard.press('Tab');
  const trapped = await page.evaluate(() => !!document.activeElement?.closest('#mobile-nav'));
  await page.keyboard.press('Escape');
  await page.waitForTimeout(300);
  const closed = await toggle.getAttribute('aria-expanded');
  const returned = await page.evaluate(() => document.activeElement?.classList.contains('menu-toggle'));
  await toggle.click();
  await page.waitForTimeout(300);
  await page.locator('#mobile-nav a', { hasText: 'Creators' }).click();
  await page.waitForTimeout(800);
  const navigated = new URL(page.url()).pathname;
  results.checks.mobileMenu = { opened, trapped, closed, returned, navigated };
  if (opened !== 'true' || !trapped || closed !== 'false' || !returned || navigated !== '/creators') fail(`mobile menu contract failed: ${JSON.stringify(results.checks.mobileMenu)}`);
  await ctx.close();
}
{
  const { ctx, page } = await newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(BASE + '/contact?type=creator', { waitUntil: 'load' });
  const preselected = await page.locator('select').inputValue();
  await page.locator('button[type=submit]').click();
  const errs = await page.locator('.field__error').count();
  await page.locator('input[type=url]').fill('https://www.instagram.com/example.creator/');
  await page.locator('input[type=email]').fill('creator@example.com');
  await page.locator('form input').first().fill('Asha Rao');
  await page.locator('textarea').fill('I make food and travel reels in Pune and would like to hear about upcoming briefs.');
  await page.locator('button[type=submit]').click();
  const notice = await page.locator('.notice').count();
  results.checks.form = { preselected, errs, notice };
  if (preselected !== 'creator' || errs < 3 || notice !== 1) fail(`form contract failed: ${JSON.stringify(results.checks.form)}`);
  await ctx.close();
}
{
  // Reduced motion: content is visible without scrolling and no hover previews start.
  const { ctx, page } = await newPage({ reducedMotion: 'reduce' });
  await page.goto(BASE + '/', { waitUntil: 'load' });
  await page.waitForTimeout(300);
  const hidden = await page.evaluate(() => [...document.querySelectorAll('.hero__line > span, [data-reveal]')].filter((el) => parseFloat(getComputedStyle(el).opacity) < 1 || getComputedStyle(el).transform !== 'none').length);
  const smooth = await page.evaluate(() => getComputedStyle(document.documentElement).overflow);
  results.checks.reducedMotion = { elementsStillAnimating: hidden, rootOverflow: smooth };
  if (hidden > 0) fail(`${hidden} elements still animating under reduced motion`);
  await ctx.close();
}
{
  // Save-Data: the hero reel must stay on its poster (no autoplay).
  const { ctx, page } = await newPage({ viewport: { width: 1440, height: 900 } });
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'connection', { value: { saveData: true, effectiveType: '4g' }, configurable: true });
  });
  await page.goto(BASE + '/', { waitUntil: 'load' });
  await page.waitForTimeout(1500);
  const heroPlaying = await page.evaluate(() => [...document.querySelectorAll('.hero video')].some((v) => !v.paused));
  results.checks.saveDataHeroPlaying = heroPlaying;
  if (heroPlaying) fail('hero reel autoplays under Save-Data');
  await ctx.close();
}
await browser.close();

writeFileSync(join(OUT, 'report.json'), JSON.stringify({ results, failures }, null, 2));
console.log(JSON.stringify(results.checks, null, 1));
if (failures.length) {
  console.log(`\n${failures.length} failure(s):`);
  for (const f of failures) console.log(' -', f);
  process.exit(1);
}
console.log('\nQA passed.');

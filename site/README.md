# True.in — independent creative concept

A private, noindexed React + Vite preview of a creator-led website concept for True.in. It is not an official True.in website and implies no commercial relationship.

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build to dist/
npm run preview    # serve dist/ locally
```

## Stack

React 19, Vite 8, TypeScript 5.9 (strict), React Router 7, GSAP + ScrollTrigger (intro, reveals), Lenis (smooth scroll, disabled for reduced motion), Fontsource (Instrument Serif, Inter Tight — self-hosted, OFL). No UI kit and no WebGL, to keep the bundle small.

## Structure

```
src/
  content/
    site.ts              brand facts, nav, services, workflow copy, contact + form endpoint (null = demo)
    media.ts             photo and clip registry with alt text (IDs match public/media)
    media.generated.json real pixel sizes for each exported photo (written by the media script)
    work.ts              content collections; draft entries never render
  components/            Header, MenuOverlay (focus trap, Escape, scroll lock), Intro, Photo, ClipVideo, Reveal, forms
  pages/                 Home, About, Work, WorkDetail, Services, Creators, Experiences, Contact, Collaborate, NotFound
  lib/                   motion preferences, Lenis/GSAP scroll control, per-route meta
  styles/                tokens.css (design tokens), base.css, components.css
scripts/
  process-media.sh         builds web media from the original files in the project root (never modifies them)
  build-media-manifest.mjs writes media.generated.json
docs/
  ASSET_INVENTORY.csv      every source file, its output ID or exclusion reason
  REPORT.md                performance, testing, unverified information, permissions, open items
  screenshots/             desktop and mobile captures of the production preview
```

## Media pipeline

The originals in the project root are untouched. To rebuild the web media (about 80 seconds):

```bash
npm run media
```

- Photos: AVIF and JPEG fallback at 640 and 1280 px, metadata stripped by re-encoding. All 48 source photos are exported.
- Video: muted H.264 at 540 px, capped at 20 s, with posters. All 23 source clips are exported. A hero showreel (720 px and 540 px variants) is cut from eight reels.
- Rights: photos 1–5, 47–48 and clips 17, 18, 23 are marked pending in `docs/ASSET_INVENTORY.csv`. They are for the private preview only until written permission is recorded.

## Changing content

- Brand facts, navigation, services and the business contact: `src/content/site.ts`.
- Business contact: `enquiryEmail` stays `null` until True.in confirms a destination. Setting `formEndpoint` to a URL makes both forms POST JSON to it. While it is `null`, the forms show a "demonstration only" message and send nothing.
- Collections: `src/content/work.ts`. Set `status: "draft"` to hide an entry. Add brand or client names only once they are verified.

## Deploy (Vercel)

1. Import the `site/` folder as a project (or `vercel --cwd site`).
2. Build command `npm run build`, output directory `dist`. `vercel.json` already sets the build, output and SPA rewrites.
3. The site ships `noindex` in the HTML and `Disallow: /` in `robots.txt`. Remove both only after True.in authorises publication. Add a canonical URL and a sitemap at that point, once the domain is confirmed.

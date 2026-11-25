# True.in concept — report

Written for: the True.in team and the developer, to review what was built, what was measured, and what still needs a decision.

Status: a working private preview. Not published. Not deployed. Not indexed.

## 1. What was built

- Nine routes as specified (`/`, `/about`, `/work`, `/work/:slug`, `/services`, `/creators`, `/experiences`, `/contact`, `/collaborate`) plus a 404.
- Homepage sections 01–14, with the impact section replaced by an editorial statement (no metrics exist), and the brand-relationships section omitted (no verified relationships).
- Intro (plays once per session; skipped for reduced motion and slow connections), full-screen menu with focus trap, Escape and scroll lock, hero showreel with native-control dialog.
- Business and creator enquiry forms with validation, accessible errors and a demonstration state. Nothing is sent or stored unless an endpoint is configured.
- Media: all 48 photos and all 23 clips exported as web formats and used on the site. Original files untouched.

## 2. Creative direction

I did not run external design-gallery research in this session, so the direction below is a reasoned choice, not a benchmarked one.

- Chosen: a restrained, editorial, near-black system with off-white type, Instrument Serif display against Inter Tight UI text, and the imagery supplying all colour. This sits between Directions B and C: editorial pacing, with modular collections and a creator-led flow.
- Why not A: oversized campaign energy fights the candid, intimate content, and most of the footage is portrait restaurant and cafe material.
- No accent colour was forced. The original logo was not supplied, so the wordmark is set type ("True.in" in Instrument Serif), not a reproduction of the brand mark.

## 3. Measurements

Lighthouse 12, mobile emulation (default), production preview (`vite preview`), homepage:

| Category | Score |
|---|---|
| Performance | 87 |
| Accessibility | 100 |
| Best practices | 100 |
| SEO | 66 (expected; the site is `noindex` and robots blocks crawling by design) |

| Metric | Result | Target |
|---|---|---|
| LCP | 3.6 s (element: hero poster image) | ≤ 2.5 s — **not met** |
| CLS | 0 to 0.05 | ≤ 0.1 — met |
| Total blocking time | 10–30 ms | — |
| Speed index | 2.5–2.9 s | — |

Bundle and media:

- Main JS 396 KB (134 KB gzipped); homepage chunk 10.5 KB; CSS 23 KB (5.3 KB gzipped). Fonts are self-hosted subsets, loaded on demand by unicode range.
- Photos: 19 MB across 164 files (AVIF and JPEG, 640 and 1280 px).
- Video: 40 MB across 43 files. Each clip loads only on the page that shows it. The hero uses a 2.4 MB mobile cut on narrow screens.

LCP work done: the poster is a plain high-priority image, preloaded from the HTML shell, and the video fades in once decoded. The hero video also starts only after the window load event, so it does not compete with first paint. The homepage stays in a lazy chunk; bundling it eagerly made LCP worse (about 8.3 s) and was reverted.

**Open:** LCP is above target. The remaining cost is main-thread work before the poster can paint (React, router, GSAP and Lenis, about 134 KB gzipped). The next step would be static prerendering of the hero or splitting out GSAP and Lenis from the first route.

## 4. Testing

Done:

- `tsc --noEmit` (strict) and `vite build`: pass.
- All 11 routes in the browser: correct title and heading, no broken images, no horizontal overflow at 390 px or 1440 px, no console errors or warnings on the production build.
- Menu: opens with focus inside, scroll locked; Escape closes, unlocks, and returns focus to the trigger.
- Contact and creator forms: required-field errors, invalid-email and invalid-Instagram errors, focus moves to the first error, and the demonstration notice appears on valid submit.
- Reduced motion (emulated): no intro, no smooth scroll, hero video paused on its poster, reveals visible at once.
- Visual review: desktop homepage (full page), desktop work index, mobile hero.

Not done:

- Firefox and Safari. Only Chromium (via Playwright) was used.
- Breakpoints 320, 375, 430, 768, 1024, 1920 and landscape orientation, beyond the 390 and 1440 checks.
- Real-device touch testing, and a screen-reader pass.
- Slow-network profiles beyond Lighthouse's default throttling.
- An automated Playwright test suite (none was committed). No linter is configured.
- Vercel deployment (not performed; the config is in `vercel.json`).

Harness note: in this environment the first screenshot after each navigation rendered black. The DOM was correct on every check and a second capture rendered properly. This looks like a capture-timing artefact, not a page fault, but it has not been diagnosed further.

## 5. Unverified business information (do not publish until confirmed)

- Business email, phone and office address. None supplied, none invented. The footer says "to be confirmed".
- Founders, team members, staff photos, years of operation, agency history and milestones.
- Client list and campaign results. No metrics appear anywhere on the site.
- Whether True.in has an official website. Searches found none; the site stays `noindex`.
- Operating location. Sourced content is set in Pune venues, which is stated as observed content only.
- The Instagram PDF, the logo file and the highlight-reel brands were not in the project. The highlights were not verifiable from the files.
- The WhatsApp community link. It is not used, and it is not treated as an enquiry channel.
- Creator identities. None are named. Nobody shown is said to be represented by True.in.
- Copy: the manifesto, service descriptions and "How we work" steps are proposed copy and need the agency's review. The workflow is labelled as pending confirmation on the page.

## 6. Brand references from the Instagram highlights

| Reference | Found in supplied media? | Verification |
|---|---|---|
| Mercedes | Yes: one showroom clip (Mercedes-AMG) | Excluded from the site. No link to True.in found. |
| Cherie | Venue name in on-screen text in two clips (v08, v10) | Multiple Pune venues named Cherie exist publicly; none linked to True.in. Not used as a client. |
| PVR, Crossword, And Co, Sunny's World | Not found in the supplied media | Web search found no True.in relationship. Sunny's World not found as a Pune venue. |

None of these is shown as a client, partner or endorsement.

## 7. Media permissions

Every source file is used. Those marked pending in `ASSET_INVENTORY.csv` are shown in the private preview only, under a "Rights pending" label, and need written permission before publication:

- Photos 1–5 and 47–48, and clips 17, 18 and 23, on the "Events and appearances" collection and the Experiences page. They show a film premiere with apparent public figures, celebrity event posters with reservation phone numbers, and Mercedes-AMG showroom footage.

Everything else needs permission or releases before any public launch:

- **Every exported photo shows identifiable people.** Written releases or consent are needed.
- **Venue names and signage are visible**, for example "Ba Ba Reeba", English House, Glasshouse Café and Azzurro. Venue permission is needed for use.
- **On-screen promotional text** appears in many reels, including venue copy such as "Pune's most dreamy Glasshouse Café" and "This is how Pune does Diwali parties". The hero showreel includes some of this text. Clean re-edits from the originals are the fix.
- **Third-party signage and logos** appear in some frames (for example "Savana" on an easel sign).
- No music or audio is included; all exports are muted.

## 8. Asset inventory

`docs/ASSET_INVENTORY.csv` maps all 71 source files to where each one is used and whether its rights are cleared for the preview: 48 photos and 23 clips, 10 of them pending.

Photo collections: events and appearances (p01–p05, p47–p48), creator sessions (p06–p20), evenings out (p21–p40), portrait sessions (p41–p46).
Video collections: venue reels (17 clips), nightlife and creator reels (v01, v19, v20), events and appearances (v17, v18, v23), and the hero showreel cut from eight reels (v02, v12, v19, v21, v13, v10, v20, v16).

Note: the performance numbers in section 3 were measured before the most recent layout and media changes. They need re-measuring.

## 9. Open decisions for the team

1. Confirm the business contact and set `enquiryEmail` or a `formEndpoint`. Until then, forms are demonstration only.
2. Supply the logo file, and decide whether the wordmark stays as set type.
3. Decide how to handle the venue and brand names visible in footage. Options: obtain permissions, or re-edit clean cuts.
4. Confirm or replace the proposed copy: the manifesto, service descriptions and workflow.
5. Decide whether to pursue the LCP fix (prerendering or splitting GSAP/Lenis), which is needed to meet the 2.5 s target.
6. Choose a domain and publication date before removing `noindex`. Then add canonical URLs, a sitemap and an Open Graph image.

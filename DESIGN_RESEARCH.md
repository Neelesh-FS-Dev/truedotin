# True.in: design research

Internal document for the private concept preview by Codevirel Studio. Not an official True.in document.

## 1. Verification status

Only the references marked "inspected" were opened in this session. Everything else is listed as not inspected, and no design decision depends on it.

| Reference | URL | Status | What was used |
|---|---|---|---|
| True.in Instagram profile | https://www.instagram.com/truedotin/ | Inspected (public profile text via scrape, 25 Nov 2026) | Positioning line, Pune-heavy post history, WhatsApp community invite (not a business number), no verified business address or email |
| Digital Leaf | https://www.digitaleaf.in/ | Inspected (homepage text via scrape) | Work-led structure: campaign films and reels, hover previews, service index with numbered practices. Its statistics and client logo wall were **not** copied: they are unverified claims. |
| Creura Media | https://creura.com/ | Inspected (homepage text via scrape) | Entry split at the very top: "I'm a Brand" and "I'm an Influencer" as separate journeys. The stats were not copied. |
| MotionSites.ai, Awwwards, Webflow, SiteInspire, Godly, Land-book, Curated.design | as listed in the brief | Not inspected in this session | Nothing taken from them |
| React Bits, 21st.dev, shadcn/ui, Aceternity UI, Magic UI, Codrops | as listed in the brief | Not inspected in this session | No component was copied or installed from them |
| GSAP, Lenis, Motion docs | gsap.com, lenis.darkroom.engineering, motion.dev | Not re-read online. Code follows the installed versions (gsap 3.15, lenis 1.3, react-router 7). | ScrollTrigger, Lenis on the GSAP ticker |
| Fontshare General Sans | https://www.fontshare.com/ | Downloaded through the public Fontshare API. The variable WOFF2 is self-hosted. The licence text was not extracted from the archive. | Body typeface |
| Bricolage Grotesque, IBM Plex Mono | Fontsource packages | Installed from npm, self-hosted | Display and metadata typefaces |

Before any public use, confirm the General Sans licence terms (the ITF Free Font License is expected but not verified in this repository).

## 2. Visual principles

- **Campaign archive, not Instagram.** Editorial labels (`No. 14 · Events · October 2026`), numbered frames and contact-sheet captions carry the identity. Platform chrome (hearts, comments, feed cards) is never reproduced.
- **Media carries the colour.** The palette is carbon `#111111`, paper `#F4F2EB`, signal lime `#DFFF00`, white, grey, surface `#1B1B1B` and rule `#D9D7D0`. Lime is an accent (index chips, selected states, CTAs on dark), never a page background and never text on white.
- **Contrast.** `#777770` on paper measures below 4.5:1 for small text, so small metadata uses `#5C5C56`. Grey is kept for rules only.
- **Asymmetry with a grid.** A 12-column grid drops to 8 columns on tablet and 4 on mobile. Desktop compositions vary per slot: pair, contact sheet, reel row, wide frame, poster plus reel, and a feature with an offset.
- **Motion has a purpose.** Headline lines reveal inside overflow-hidden masks (900 ms, 90 ms stagger). Media uses a clip-path reveal. The hero media eases back on scroll with a single ScrollTrigger scrub. All motion uses transform, opacity or clip-path.

## 3. Intended sections and adaptations

| Section | Reference influence | True.in adaptation |
|---|---|---|
| Hero | Work-led opening (Digital Leaf) | Contact-sheet composition: one primary reel, one portrait, one collage frame, with captions. Copy follows the brief. |
| Capability strip | Index, not feature cards | Five numbered labels in a ruled row, wrapping on small screens. No marquee. |
| Selected campaigns | Work-led positioning and hover previews | Six compositions. Hover (or tap) plays one muted preview at a time. |
| Creator culture | Creura's creator-facing tone | Native horizontal strip with keyboard focus and no pinning |
| Service index | Numbered practices | Accordion on mobile, master/detail on desktop, both from one DOM |
| Live experiences | Editorial overlay | Full-bleed audience reel, muted, autoplays only while in view |
| Brand and creator split | Creura's separated journeys | Two different surfaces: carbon for brands, paper for creators, with different type voices |
| Footer | Closing statement | Large display statement, two conversion links, concept disclosure |

## 4. Component selections

- **Own components only.** Masthead, mobile dialog, media, reel preview manager, service index, contact sheet, forms. Written for this project and small enough to review.
- **Libraries.** GSAP with ScrollTrigger for motion, Lenis for smooth scroll, React Router 7 for routes. No animation library beyond these.
- **Not used.** shadcn/ui and React Bits were considered. Neither was installed, because the required primitives (dialog, tabs, accordion) are small and the custom styling matched the brief better than a component library.
- **No WebGL or Three.js.** No interaction required it.

## 5. Mobile alternatives

- Hero: one column, headline first, then the reel as a stacked composition with offset frames.
- Filters become a wrapping row. Archive entries become single-column.
- Capabilities: the index becomes an accordion, with an inline frame inside the open panel.
- The masthead shows the wordmark and a 48 px menu button. The full-screen menu uses large display links, a visible "Let's talk" action and Escape to close.
- Reels use an explicit Play/Pause button, because touch devices cannot hover.

## 6. Performance considerations

- Photos: AVIF at 640 and 1280 px with JPEG fallback, `width`/`height` set from the source ratio (no layout shift), `loading="lazy"` except the first frame.
- Video: 15-second H.264 previews (`avconvert` Preset1280x720, 720x1280 portrait), posters from a frame at 1 s, `preload="none"`, src assigned on first activation, paused off-screen.
- Slow network: when `saveData` is on or the connection is 2G/3G, autoplay is suppressed and posters remain.
- Routes are bundled eagerly, not split, because lazy route chunks caused a 0.92 CLS on first load. The main JavaScript bundle is about 145 KB gzipped, of which the page code is about 10 KB.
- Lenis runs on the GSAP ticker so only one animation loop exists. It is disabled under `prefers-reduced-motion`.

## 7. Licensing and rights

- Every photo and video is third-party or rights-pending. Several show identifiable people and third-party promotional posters. No publication permission has been granted.
- The site is private: `noindex` on every page, `robots.txt` disallows all crawling, and no sitemap is generated without a confirmed origin. These are not access controls. See README for private deployment.
- Brand names in the brief (Mercedes, PVR, Crossword, Cherie and others) are not shown as logos or clients. The Instagram profile shows posts, not contracts.
- Names of people in captions are never used. Copy describes only what is visible.

## 8. Open questions

1. Official True.in logo file (none in the repository; a type wordmark stands in).
2. Confirmed business email, phone or contact form endpoint.
3. Rights for each media item, or a decision to use only owned or commissioned material.
4. Whether True.in wants a production domain for canonical URLs and the sitemap.

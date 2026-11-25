# QA report

Scope: the production build served locally with `vite preview` on port 4173, checked in system Google Chrome through playwright-core. Lighthouse 12 (desktop preset, lab data) run on home, work and contact. Results were recorded in this session. Re-run the same checks after any change.

## Automated checks

| Check | Result |
|---|---|
| `tsc --noEmit` (strict, noUnusedLocals, noUnusedParameters) | Pass |
| `vitest run` (validation and filters: 8 tests) | 8 of 8 pass |
| `vite build` | Pass. Main bundle 145 KB gzip. Routes are bundled eagerly (see README). |
| Route load at 390, 820 and 1440 px (9 URLs: home, work, two detail pages, capabilities, creators, about, contact, 404) | All load. No horizontal overflow. Zero console errors or warnings. Titles and H1s correct. |

## Lighthouse (desktop, lab)

| Page | Performance | Accessibility | Best practices | SEO | LCP | CLS |
|---|---|---|---|---|---|---|
| / | 99 | 100 | 100 | 66 | 0.9 s | 0.003 |
| /work | 99 | 100 | 100 | 66 | 1.0 s | 0 |
| /contact | 100 | 100 | 100 | 63 | 0.5 s | 0 |

- The SEO shortfall is intentional. The page is `noindex`, so the crawlability audits fail by design.
- These are laboratory numbers. Field INP and real-user LCP were not measured. INP is not measurable in a lab run without interaction.
- Earlier runs showed CLS 0.92 on home and work. The cause was the lazy route fallback. Routes are now eager, and the score fell to near zero.
- Mobile Lighthouse was not run.

## Interaction checks (headless Chrome)

| Behaviour | Result |
|---|---|
| Mobile menu: `aria-expanded` true/false, focus moves into the dialog | Pass |
| Tab is trapped inside the open menu | Pass |
| Escape closes the menu, focus returns to the toggle, body scroll is unlocked | Pass |
| Choosing a link navigates and closes the menu | Pass |
| Contact form: category preselected from `?type=creator` | Pass |
| Empty submission shows 4 field errors in an alert with links | Pass |
| Valid submission shows the "Not sent" notice and the copyable summary, never a success state | Pass |
| Work filter (`?filter=Hospitality`) updates the URL and persists on reload | Pass |
| Reels-only filter | Pass (4 hospitality entries contain video) |
| Hover previews: only one reel plays at a time | Pass (1 active, 1 playing) |

## Visual review

- Home at 1440 px: scrolled through in 800 px steps. Hero, archive compositions, capability index, creator strip, experience band, brand and creator split, and footer were inspected.
- Home at 390 px and 820 px: top of page inspected.
- Full-page captures were not used for review. They show lazy images and scroll-triggered reveals as blank.

Issues found in review and fixed:

1. Footer lime CTA rendered paper-on-lime (1.01:1). Fixed.
2. "For brands" eyebrow was grey on carbon. Fixed.
3. Contact aside notes used light text on paper. Fixed.
4. Archive titles used `h3` under the page `h1` (heading order). Changed to `h2`.
5. The wide hospitality frame cropped to lips. Lead image changed.
6. Unused photo `a080` removed from the export.

## Not tested

- Real screen readers (VoiceOver, NVDA) and keyboard-only walkthroughs beyond the scripted checks.
- Firefox, Safari and Edge. Only Chrome was used.
- Real devices and touch hover behaviour. Only the mobile viewport emulation was used.
- Every page at every width in the brief's list (320, 375, 430, 768, 1024, 1280, 1920, 2560). Checked: 390, 820 and 1440, plus home at 1440 by scrolling.
- Slow-network behaviour, Save-Data mode and reduced-motion in a real browser (the code paths exist; they were not exercised).
- Lenis behaviour with anchors and nested scrollers (the strip uses native scroll).
- Performance on real hardware or field data.
- The Playwright and Lighthouse scripts were run from a scratch folder and are not committed.

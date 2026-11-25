# QA report

Status at the time of writing: partial. Chrome passed the sweep and accessibility scans. Firefox and WebKit did not launch. Link checks and mobile Lighthouse were not run.

## Automated checks

| Check | Result |
|---|---|
| `tsc --noEmit` (strict) | Pass |
| `vitest run` (8 tests: validation, filters) | 8 of 8 pass |
| `vite build` | Pass. Main bundle about 145 KB gzip. Routes bundled eagerly (see README). |
| Responsive sweep (Chrome): 9 routes at 11 widths (320 to 2560 px), 99 page loads | Pass. No horizontal overflow, no elements past the viewport edge, no broken images, no console errors, every route has an h1. |
| axe-core, WCAG 2.0/2.1/2.2 A and AA (Chrome, 390 and 1440 px, all routes) | 0 violations. Earlier runs flagged contrast on the home hero only because they measured mid-fade. The scan now waits for entrance animations. |
| Behaviour (Chrome) | Skip link is the first tab stop. Anchor `#brand-events` lands at the top. Only one reel plays at a time, all muted. Mobile menu traps focus, closes on Escape, returns focus, and navigates. Form preselects the category, shows 4 errors on empty submit, and shows the "Not sent" notice on valid input. Reduced motion leaves no element animating. Save-Data keeps the hero reel on its poster. |
| Scroll restoration (Chrome) | Failed in the last full run because the test itself scrolled the target into view before recording the position. The test is fixed. Not re-run. |

## Not completed

- **Firefox:** the Playwright Firefox build failed to launch in headless mode (profile error on the installed Nightly). Not run.
- **WebKit:** the Playwright WebKit build closed on launch. Not run.
- **Link check** (`scripts/qa/links.mjs`): written, not run. Both external links return HTTP 200 from a manual check: the Instagram profile and the WhatsApp community invite.
- **Mobile Lighthouse:** not run.
- **Chrome full run after the scroll-restoration test fix:** not completed. The run was stopped.

## Lighthouse (desktop, lab, earlier build)

These numbers were measured before the final ffmpeg re-encode and the scroll-restoration change. They are not current.

| Page | Performance | Accessibility | Best practices | SEO | LCP | CLS |
|---|---|---|---|---|---|---|
| / | 99 | 100 | 100 | 66 | 0.9 s | 0.003 |
| /work | 99 | 100 | 100 | 66 | 1.0 s | 0 |
| /contact | 100 | 100 | 100 | 63 | 0.5 s | 0 |

- SEO is below 100 by design: every page is `noindex`, so the crawlability audits fail.
- Laboratory data only. Field INP and real-user LCP were not measured.

## Issues found and fixed during QA

1. Lazy route loading caused a 0.92 CLS on first load. Routes are now bundled eagerly.
2. Footer lime CTA rendered paper-on-lime (1.01:1). Fixed.
3. Eyebrow on the carbon brand panel was grey on black. Fixed.
4. Contact aside notes were light text on paper. Fixed.
5. Archive titles used `h3` under the page `h1`. Now `h2`.
6. Scroll restoration recorded the position at click time, after the page had already scrolled. Now recorded continuously and restored only on back/forward navigation.
7. Stale a080 export removed. Premiere entry now includes a001 (re-encoded with ffmpeg, no audio).

## Not tested

- Real screen readers (VoiceOver, NVDA).
- Real devices and touch hover behaviour.
- Field performance data.
- Every width is covered by the sweep, but only Chrome has been run through it.

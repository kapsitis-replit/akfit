# Performance baseline (pre-Astro)

- **Measured:** 2026-11-16, against production https://www.akfitness.lv (`main` @ `548a2a2`)
- **Tool:** Lighthouse 12.8.2, mobile preset (simulated: 150 ms RTT, ~1.6 Mbps, **4× CPU slowdown**), headless Chrome, 3 runs per page, medians
- **Raw reports:** not committed. Re-run with the command at the bottom.

| Page | Score (3 runs) | FCP | LCP | TBT | CLS | Speed Index | Page weight | Requests | Main-thread work |
|---|---|---|---|---|---|---|---|---|---|
| `indexreal.html` | 86 / 86 / 86 | 2.70 s | 3.60 s | 0 ms | 0.000 | 2.70 s | **2 146 KB** | 14 | **3.03 s** |
| `online-coaching.html` | 91 / 89 / 93 | 0.94 s | 3.20 s | 178 ms | 0.000 | 1.57 s | 209 KB | 11 | 1.95 s |
| `treneris-anna.html` | 90 / 88 / 86 | 1.68 s | 3.83 s | 0 ms | 0.000 | 1.68 s | 377 KB | 13 | 1.62 s |

## What the numbers say

1. **One image is 80% of the homepage.** `…/661f3020-…_1600w.png` (Krišjānis' coach photo, Supabase storage) transfers **1 698 KB**. The `?w=800&q=80` query is ignored, so the full 1600px PNG is served. Lighthouse estimates **~1.9 MB** savings from image delivery on `indexreal`. The Phase 3 `<Image>` pipeline (AVIF/WebP, right-sized `srcset`) fixes this. It is also worth re-exporting that photo as a JPEG/WebP right away.
2. **Main thread on `indexreal`: 3.0 s, of which "Style & Layout" is 1.44 s.** Script evaluation is only 0.22 s. The cost is the browser restyling, not running JS. This is consistent with the audit: `app.js` tags ~40 elements with `scroll-hidden` + `will-change` after DOMContentLoaded (a full restyle), plus four permanently animating 1600px background layers.
3. **FCP 2.7 s on `indexreal` vs 0.9 s on a service page.** The hero text is hidden until JS runs and the reveal plays (audit item 1).
4. **LCP 3.2–3.8 s everywhere** is the hero image, a 1600px Unsplash JPEG served to a 412px-wide phone.
5. **Third-party runtime:** the Iconify web component (9 KB) plus a runtime fetch of `api.iconify.design/solar.json`, and two Google Fonts files (48 KB). Phase 2 removes all of these by building them in.
6. Layout stability is already perfect (CLS 0), and the DOM is small (609 elements). Keep both.

## Targets for the Astro version (from the plan's Definition of Done)

- `indexreal`: score ≥ 90, TBT ≤ 150 ms, plus: page weight < 600 KB, FCP < 1.5 s, main-thread work < 1.5 s.
- No requests to `code.iconify.design`, `api.iconify.design`, or `fonts.googleapis.com` / `fonts.gstatic.com`.

## Not captured yet

- A DevTools Performance **scroll** trace (4× CPU throttle) of `indexreal`, top to bottom. This needs a human-driven Chrome session. Record frames per second and dropped frames while scrolling past the trust bar, results and FAQ.

## Re-run

```bash
for p in indexreal online-coaching treneris-anna; do for run in 1 2 3; do npx -y lighthouse@12 "https://www.akfitness.lv/$p.html" --quiet --output=json --output-path="lh-$p-$run.json" --only-categories=performance --chrome-flags="--headless=new"; done; done
```

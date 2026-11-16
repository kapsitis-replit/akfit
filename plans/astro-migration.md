# Plan: migrate akfitness.lv to Astro (with React islands for Magic UI)

- **Status:** Phases 0–2 done on `feat/astro`. Next: Phase 3 (pages). Baseline: `plans/baseline.md`
- **Written against:** `main` @ `548a2a2` (includes the hero scroll-pause fix, PR #4)
- **Deploys:** Zeabur builds from GitHub `kapsitis-replit/akfit`, so **a merge to the deployed branch is a production release**
- **Branch for the work:** `feat/astro` (this plan lives on `plan/astro-migration`)

## 1. Why, and what "done" means

**Goals**
1. One source of truth for the nav, footer, theme toggle, contact form and page shell. Today these are copy-pasted into 8 pages.
2. Make Magic UI (shadcn registry, React) usable for a **few** high-value effects without making the site heavier.
3. Make the site **lighter and smoother on weak machines than it is today**: this is the main success criterion, not "uses React".

**Non-goals**
- No SPA, no client-side routing, no server runtime. The output stays plain static files.
- No visual redesign. Pages should look the same, with motion improved per the animation audit.
- The private contract/signature/intake flow (`ligums-*`, `paraksts`, `anketa`) is not rewritten in this project.

**Definition of done**
- Every current public URL returns the same page (same path, including `.html`).
- Per-page JS shipped is **≤ today's**, except on pages that use an island, where islands load only when scrolled into view (`client:visible`).
- Lighthouse mobile performance ≥ 90 on `indexreal`. Total Blocking Time ≤ 150 ms with 4× CPU throttling in Chrome DevTools.
- The n8n webhooks (`/webhook/lead`, `/webhook/intake`, `/webhook/sign`, `/webhook/contract`) receive identical payloads.

## 2. Current state (inventory)

| Page | Size | Notes |
|---|---|---|
| `index.html` | 6 KB | Live "coming soon" page, self-contained CSS. Root URL. |
| `indexreal.html` | 73 KB | The real landing page. Testimonial carousel, contact form, 4 panning backgrounds. |
| `online-coaching.html`, `treninu-coaching.html`, `fitnesa-konsultacija.html` | 22–24 KB | Service pages: same template, contact form. |
| `treninu-plani.html` + `treninu-plani.js` | 21 + 15 KB | Interactive program map. The JS is a vanilla port of an earlier React artifact. |
| `treneris-anna.html`, `treneris-krisjanis.html` | 20–21 KB | Coach profiles (same template). |
| `privatuma-politika.html`, `pakalpojuma-noteikumi.html` | 26–35 KB | Legal text, own nav. |
| `anketa.html` | 26 KB | **Private** intake form, not linked. Posts to `akfitlv.zeabur.app/webhook/intake`, uses `localStorage` + query params. |
| `paraksts.html` | 16 KB | **Private** signing page. Calls `/webhook/contract?t=…` and `/webhook/sign`. |
| `ligums-*.html` (×3) | 19–22 KB | Contract **templates** with `{fname}` / `{lname}` / `{price}` placeholders, filled by the n8n pipeline. |

Shared: `app.css`, `app.js`, `tailwind.css` (built from `tailwind.config.js` with Tailwind v3 and the `darkMode: 'class'` strategy). External: the Iconify web component (CDN, fetches icons at runtime), Google Fonts, images from Unsplash and Supabase storage.

Hosting: served by **Caddy on Zeabur** (the `Server: Caddy` response header), deployed from the GitHub repo https://github.com/kapsitis-replit/akfit. The repo currently has no `package.json`, so Zeabur treats it as a plain static site.

## 3. Target architecture

```
akfit/
├─ astro.config.mjs        # output: 'static', build.format: 'file', integrations: react(), icon()
├─ package.json
├─ public/                 # copied byte-for-byte, NOT processed
│  ├─ robots.txt
│  ├─ ak-logo-white.png
│  ├─ anketa.html          # private flow, moved unchanged
│  ├─ paraksts.html        # served at the ROOT today (see Phase 0 step 2)
│  └─ ligums-*.html        # templates must stay byte-identical for n8n
├─ src/
│  ├─ styles/global.css    # Tailwind v4 entry + the surviving parts of app.css
│  ├─ layouts/
│  │  ├─ Base.astro        # <head>, fonts, inline theme script, noise layer
│  │  └─ Legal.astro       # simpler shell for the policy/terms pages
│  ├─ components/
│  │  ├─ Nav.astro  Footer.astro  ThemeToggle.astro
│  │  ├─ ContactForm.astro          # + tiny <script> posting to /webhook/lead
│  │  ├─ ServiceHero.astro  PricingCard.astro  Faq.astro
│  │  ├─ TestimonialCarousel.astro  # vanilla <script>, no React
│  │  └─ Reveal.astro               # scroll-reveal wrapper (see §5)
│  ├─ islands/             # the ONLY React code; each one is hydrated client:visible
│  │  ├─ NumberTicker.tsx  # Magic UI
│  │  └─ ProgramMap.tsx    # optional, Phase 5
│  ├─ components/ui/       # shadcn/Magic UI copies land here (components.json alias)
│  ├─ data/
│  │  ├─ services.ts       # prices, features, FAQ per service: drives the 3 service pages
│  │  └─ coaches.ts        # Anna / Krišjānis profile data
│  └─ pages/
│     ├─ index.astro              # coming soon (until launch)
│     ├─ indexreal.astro
│     ├─ online-coaching.astro  treninu-coaching.astro  fitnesa-konsultacija.astro
│     ├─ treninu-plani.astro
│     ├─ treneris-anna.astro  treneris-krisjanis.astro
│     └─ privatuma-politika.astro  pakalpojuma-noteikumi.astro
```

Key decisions:

| Decision | Choice | Reason |
|---|---|---|
| Framework | **Astro** (current stable), `output: 'static'` | Zero JS by default. React only where an island is placed. |
| URLs | `build.format: 'file'` | Produces `online-coaching.html` etc., so every existing link and Google result keeps working. |
| Tailwind | v4 via `@tailwindcss/vite` | Magic UI and current shadcn target v4. Dark mode: `@custom-variant dark (&:where(.dark, .dark *));` keeps the existing `class` strategy. |
| Icons | `astro-icon` + `@iconify-json/solar` (and any other sets in use) | Icons become inline SVG at build time. This removes the Iconify runtime script and its network calls to the Iconify API. |
| Fonts | Self-host Plus Jakarta Sans + JetBrains Mono via `@fontsource-variable/*` | One fewer third-party connection, no layout shift from font swap. |
| Images | Astro `<Image>` with `image.domains: ['images.unsplash.com', 'hoirqrkdgbmvpwutwuwj.supabase.co']` | Builds AVIF/WebP `srcset` at the right sizes. The hero currently ships a 1600px JPEG to every device. |
| Interactivity without React | Astro `<script>` in components (bundled, deduped) | Theme toggle, carousel, form and reveal stay vanilla: a few KB, no hydration. |
| Private pages | `public/` verbatim | Zero risk to the n8n contract pipeline. |

## 4. Phases

Each phase ends in something deployable or reviewable. Do not start a phase until the previous one is merged.

### Phase 0: Sync and safety (½ day)
1. **Start from the latest GitHub `main`.** `git pull` first: the hero scroll-pause fix (`548a2a2`) lives on GitHub. A stale local checkout looks like it is missing it.
2. ✅ **Done 2026-11-16 in [PR #6](https://github.com/kapsitis-replit/akfit/pull/6)** (`_headers` lists the five pages explicitly; `robots.txt` no longer blocks them, so crawlers can see the noindex header). **Fix the private-page protection. The README's description of it is wrong.** Verified on production 2026-11-16:
   - There is **no** `dokumenti-priv-8kq2f/` folder. The private pages are served from the **site root**: `/anketa.html`, `/paraksts.html`, `/ligums-coaching-full.html`, `/ligums-coaching-workouts.html`, `/ligums-consultation.html`. Any unknown path, including `/dokumenti-priv-8kq2f/…`, returns the coming-soon page with **HTTP 200** (a soft 404).
   - So `robots.txt` (`Disallow: /dokumenti-priv-8kq2f/`) protects nothing. Zeabur's static hosting **does** support a Netlify-style `_headers` file (via its Caddy `zeaburextension`), but the only rule in it targets that non-existent folder, so it never applies.
   - `anketa.html` and `paraksts.html` carry `<meta name="robots" content="noindex, nofollow">`. The three `ligums-*` templates **do not**.
   - `/_headers` itself is publicly downloadable (HTTP 200), so whatever it lists is visible to anyone.

   Fix in the repo (no Zeabur dashboard change needed), keeping the URLs because n8n and sent links depend on them. Replace `_headers` with:
   ```
   /anketa.html
     X-Robots-Tag: noindex, nofollow
     Cache-Control: no-store
   /paraksts.html
     X-Robots-Tag: noindex, nofollow
     Cache-Control: no-store
   /ligums-*
     X-Robots-Tag: noindex, nofollow
     Cache-Control: no-store
   ```
   Then confirm with `curl -sI https://www.akfitness.lv/paraksts.html` that the header appears. If the wildcard isn't honoured, list the three `ligums-*.html` files explicitly. Also update `robots.txt` to disallow those paths instead of the phantom folder. Adding a `404.html` gives unknown paths a proper page instead of the coming-soon page. Zeabur documents that it still returns status 200, so this improves the page, not the status code. Separate from the migration, but do it on `main` now: it applies to the current site too.
3. Record a **baseline**: Lighthouse mobile scores, plus a DevTools Performance trace (4× CPU throttle) while scrolling `indexreal.html` top to bottom. Save the numbers in `plans/baseline.md`.
4. Zeabur facts (from the dashboard, 2026-11-16): one service `akfit` (static/HTML detection), source `kapsitis-replit/akfit`, server Tencent Frankfurt. Domains: `akfitness.lv`, `www.akfitness.lv` **and `akfittest.zeabur.app`, all on the same production service**, so `akfittest` is *not* a preview environment. Deployed branch (Settings → Source): **`main`**, so any push or merge to `main` releases to production. Other branches never deploy.

### Phase 1: Scaffold (½ day)
1. `git switch -c feat/astro`. Create the Astro project in the repo root (`npm create astro@latest -- --template minimal`), add `@astrojs/react`, `@tailwindcss/vite`, `astro-icon`, `@fontsource-variable/plus-jakarta-sans`, `@fontsource-variable/jetbrains-mono`.
2. Move the private files into `public/` as shown in §3. Move `robots.txt` and the logo there too.
3. `npx shadcn@latest init` (Tailwind v4, `components/ui` alias pointing at `src/components/ui`). No components yet.
4. `npm run build` must output `dist/` containing the private files unchanged. Verify: `diff` each against the original.

### Phase 2: Shell and shared components (1 day): ✅ done
**What landed:** `src/layouts/Base.astro`, `src/components/{Nav,Footer,ThemeToggle,ContactForm}.astro`, `src/scripts/site.ts` (theme toggle + scroll-pause), `src/data/site.ts` (HOME, nav/service/coach/legal/social links, webhook), and `src/styles/global.css` (ported app.css + v3→v4 compatibility). Check page: `/shell-check.html` (noindex; delete in Phase 3). Verified in the browser: the nav and footer match production pixel-for-pixel in dark mode. The theme toggle persists. The form sends the identical JSON payload to `/webhook/lead` (tested with an intercepted fetch, nothing was sent to n8n). No horizontal scroll at 375 px. Page JS ≈ 1.5 KB.

**Decisions and fixes made in Phase 2:**
- **Broken home links fixed.** Legacy service pages link to `index.html#…`, which is the coming-soon page. Every home link now goes through `HOME` in `src/data/site.ts` (`/indexreal.html` now, `/` at launch).
- **Missing icon.** `solar:badge-check-linear` does not exist in Solar (production renders an empty gap). It was replaced with `solar:verified-check-linear`, in the components and the reference HTML.
- **Tailwind v4 renames** were applied to the reference HTML so Phase 3 copies are clean: `backdrop-blur-sm`→`backdrop-blur-xs`, `outline-none`→`outline-hidden`, `rounded-sm`→`rounded-xs`, `shadow-sm`→`shadow-xs` (37 occurrences). No borders relied on v3's default border colour. Placeholder colour and button cursor are kept via a compat layer.
- **Social icons** in the landing footer had `href="#"` placeholders. They are now hidden until real URLs are set in `SOCIAL_LINKS` (owner TODO).
- **Form:** a retry after a failure restores the original button label (the legacy code also handled this). Dropped browser-extension junk attributes (`island_form_infra_*`) and the dead `_next` field. Added `autocomplete` and `aria-label`s.
- **Headline intro** is now the `animate-intro` utility (fade + rise, no blur). In Phase 3, replace `[animation:animationIn_0.8s_ease-out_0.1s_both]` with `animate-intro`.
- **Not ported (deliberately):** the scroll-reveal from `app.js` (rebuilt as `<Reveal>` in Phase 4), the `.reveal` pre-hide rule and the carousel ID rule (move into the carousel component in Phase 3).
- **Known gap, unchanged from production:** on phones the nav shows no section links (no menu). Candidate follow-up after Phase 3.

The original Phase 2 checklist:
1. `Base.astro`: copy the `<head>` from `indexreal.html` (meta, OG, canonical). Keep the inline theme-detection snippet with `is:inline` so it still runs before first paint.
2. Port Tailwind: run `npx @tailwindcss/upgrade` against a copy of the HTML to catch v3→v4 class renames (e.g. `shadow-sm`→`shadow-xs`, `blur-sm`→`blur-xs`, `rounded-sm`→`rounded-xs`). Diff the rendered output visually (Phase 3 checks).
3. Move the still-needed parts of `app.css` into `global.css`: noise texture, scrollbar, `details` marker reset, glitch hover, `slow-pan`, press feedback, `::details-content` accordion. **Drop** the dead `.reveal` / `animationIn` blur rules (replaced in §5).
4. Build `Nav`, `Footer`, `ThemeToggle` (with the 180° spin), and `ContactForm` (port `handleFormSubmit` and keep the payload `{name,email,message,package}` and the endpoint **identical**).
5. Replace `<iconify-icon icon="solar:…">` with `<Icon name="solar:…" />` across the components.

### Phase 3: Pages (2–3 days)
Order: lowest risk first, so the shell is proven before the big page.
1. `privatuma-politika`, `pakalpojuma-noteikumi` → `Legal.astro`. Check that the `#atteikums` anchor still works.
2. `treneris-anna`, `treneris-krisjanis` → one `CoachProfile` template + `data/coaches.ts`.
3. The three service pages → one `ServicePage` template + `data/services.ts`.
4. `treninu-plani` → the page plus `treninu-plani.js` moved into a component `<script>` (unchanged logic).
5. `indexreal` → split into sections (`Hero`, `TrustBar`, `About`, `Pricing`, `Results`, `Process`, `Faq`, `Contact`, `FinalCta`). Carousel → `TestimonialCarousel.astro`.
6. `index` (coming soon) → `index.astro`, unchanged look.

**Check after each page:** compare old and new side by side at 375, 768, 1280 and 1920 px in light and dark mode. Any visible difference other than intended motion changes is a bug.

### Phase 4: Motion fixes (1 day), from the animation audit
Do these in the new components rather than patching the old site twice:
1. **Hero renders immediately.** Nothing above the fold is hidden waiting for JS. `Reveal` is only applied from the trust bar down.
2. **One `Reveal` wrapper** replaces the "scan every element" scroll-reveal in `app.js`: an explicit opt-in per block, one shared `IntersectionObserver`, `rootMargin: "0px 0px 10% 0px"` (start slightly *before* entering view), `opacity 0→1` + `translateY(16px)→0`, `400ms cubic-bezier(0.23, 1, 0.32, 1)`, stagger `min(i,5) × 50ms`, no permanent `will-change`, no overshoot on buttons. Under `prefers-reduced-motion`: opacity only, 200 ms.
3. **Panning backgrounds:** keep `slow-pan` on the hero only. An IntersectionObserver sets `animation-play-state: paused` when the hero is off-screen (and keep the existing pause-while-scrolling). Lower sections get static backgrounds.
4. **Grayscale→color hover:** stack a color `<img>` over the grayscale one and fade its `opacity` over `250ms ease`. Never transition `filter`. Gate it behind `@media (hover: hover) and (pointer: fine)`.
5. **Carousel:** remove the 500 ms `isAnimating` lock (CSS transitions already retarget mid-move), and use `380ms cubic-bezier(0.23, 1, 0.32, 1)` on transform/opacity only.
6. **Headline intro:** remove `filter: blur(8px)` and keep the fade + rise.
7. "Skatīt pilnu profilu" arrow: `translateX(4px)` on hover instead of animating `gap`.

### Phase 5: Magic UI islands (1 day)
Add only these, each in a React island hydrated with `client:visible`:

| Effect | Where | How |
|---|---|---|
| **Number Ticker** | "1000+ Pārveidoti Ķermeņi", "10+ Gadu Pieredze", the "-8kg" result | `npx shadcn@latest add @magicui/number-ticker`. One island wraps all tickers in a section (not one island per number). Counts once, then stops. |
| **Shimmer Button** *or* **Border Beam** | "Izvēlēties Plānu" (hero CTA) only | Both are essentially CSS. Port the classes and keyframes into an `.astro` component, **no React needed**. Must pause under `prefers-reduced-motion`. |
| **Blur Fade** timing | — | Already covered by `Reveal` (Phase 4). Do not add the React version. |

Optional, if time allows: rebuild the program map (`treninu-plani.js`, originally a React artifact) as `ProgramMap.tsx` with `client:visible`, if that makes it easier to maintain. Measure the JS cost first.

**Explicitly excluded:** Globe, Particles, Meteors, Ripple, Confetti (continuous), Warp Background. They run continuously on canvas/many elements and contradict goal 3.

**Budget gate:** after Phase 5, `indexreal` must still pass the Definition of Done. If an island breaks the budget, replace it with a vanilla port.

### Phase 6: Launch (½ day)
All work happens on `feat/astro`. **Nothing reaches the deployed branch until step 4**, because pushing there releases to production.
1. Before merging anything: `git tag pre-astro origin/main && git push origin pre-astro`. That tag is the rollback point.
2. Create a **second Zeabur service** (or environment) in the same project, connected to the same repo but deploying the `feat/astro` branch, on a temporary domain (e.g. the generated `*.zeabur.app` URL). Zeabur auto-detects Astro from `package.json`. In the **Build Logs → Plan Meta**, confirm it chose a static plan with `outputDir` = `dist` (served by Caddy, so `_headers` keeps working), not a Node SSR server. `_headers` must live in `public/` so it lands at the root of `dist/`. Check `curl -sI <preview>/paraksts.html` shows `X-Robots-Tag`.
3. Run every check in §6 against that preview URL.
4. Open a PR `feat/astro` → `main` and merge it. The existing production service rebuilds from `main`. Its build settings must already match step 2, because the repo now has a `package.json` and is no longer a plain static folder. Check the service's build settings **before** merging.
5. Smoke-test https://www.akfitness.lv right after the deploy: the homepage, one service page with a test form submission, and the `/paraksts.html` response headers.
6. **Rollback:** revert the merge commit on `main` (`git revert -m 1 <merge-sha>` + push), or point the Zeabur service at the `pre-astro` tag. Then delete the preview service.
4. Later, as a separate step: when the real landing page goes live, swap `index.astro` ↔ `indexreal.astro` and add a redirect `indexreal.html → /`.

**Estimate:** about 6–8 working days for one developer (or Claude sessions with review), most of it Phase 3.

## 5. Developer workflow after the migration
- `npm run dev` gives a live-reloading local site (replaces `rebuild-css.bat`).
- Prices/FAQ/features are edited in `src/data/*.ts`, so one change updates every page that shows them.
- Add a Magic UI effect: `npx shadcn@latest add @magicui/<name>`, wrap it in `src/islands/`, use it with `client:visible`, then re-check the JS budget.

## 6. Verification checklist (before switching production)
- [ ] Every URL in the old repo (`*.html`) returns 200 on the preview, with the same `<title>`.
- [ ] `public/` private files are byte-identical to the originals (`cmp`).
- [ ] Contact form on each service page and on `indexreal` reaches `/webhook/lead` with the correct `package` value (test with an obvious test name, then delete it in n8n).
- [ ] `anketa.html` submits to `/webhook/intake`. `paraksts.html?t=<test token>` loads a contract and signs it.
- [ ] Dark/light toggle: no flash of the wrong theme on load. The choice persists across pages.
- [ ] `prefers-reduced-motion` (DevTools → Rendering): no movement, content fully visible.
- [ ] Lighthouse mobile and 4× CPU-throttled scroll trace meet the Definition of Done and beat `plans/baseline.md`.
- [ ] Network tab: no requests to `code.iconify.design`, `api.iconify.design` or `fonts.googleapis.com`.
- [ ] `/anketa.html`, `/paraksts.html` and `/ligums-*.html` respond with `X-Robots-Tag: noindex, nofollow`. An unknown path returns 404, not the coming-soon page.
- [ ] Carousel works with mouse, touch and keyboard. No overlap with the headline at 768–1024 px (a current bug: "ZANE M." covers "ROBEŽAS" at about 800 px).

## 7. Risks

| Risk | Mitigation |
|---|---|
| Tailwind v3→v4 class renames subtly change the look | Upgrade tool + side-by-side visual checks per page (Phase 3). Fallback: stay on v3 via `@astrojs/tailwind` and defer Magic UI to a later step. |
| Contract pipeline breaks | Private pages are copied verbatim into `public/` and never touched by the build. Byte-compare in CI. |
| Merging to `main` changes how Zeabur builds the repo (static folder → Node build) | Prove the build on the preview service first (Phase 6 step 2). Check the production service's build settings before merging. The `pre-astro` tag gives a one-step rollback. |
| Someone pushes work-in-progress to `main` and it goes live | All migration work stays on `feat/astro`. Consider branch protection on `main` (PR required). |
| Islands creep, and the site gets heavy again | The JS budget is in the Definition of Done. Islands only with `client:visible`. The excluded-components list above. |
| Working from a stale checkout | Phase 0 step 1: always start from the latest `origin/main`. |

## 8. Open questions for the owner
1. ~~How does the site get onto Zeabur today?~~ **Answered:** git-connected to `kapsitis-replit/akfit`. Still to confirm: which branch it deploys, and whether a preview service on `feat/astro` is possible on your Zeabur plan.
2. Is the "Treniņu Plāni" price still a placeholder (`€39`)? It moves into `data/services.ts` either way.
3. When should `indexreal` replace the coming-soon page at `/`? Same release, or later?
4. Keep the stock Unsplash photos for now, or swap in real ones during Phase 3?

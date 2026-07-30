# AK Fitness — website

A fast, static multi-page site. No framework, no Node required.

## Pages
| File | Purpose |
|------|---------|
| `index.html` | Main landing page (the original 1-pager) |
| `online-coaching.html` | Service: Online Coaching (€239/mēn) |
| `treninu-coaching.html` | Service: Treniņu Coaching (€135/mēn) |
| `fitnesa-konsultacija.html` | Service: Fitnesa Konsultācija (€89/reize) |
| `treninu-plani.html` | Service: Treniņu Plāni — one-off plans, embeds the interactive program map (from €39/plāns, PLACEHOLDER price) |
| `treneris-anna.html` | Coach profile: Anna |
| `treneris-krisjanis.html` | Coach profile: Krišjānis |

## Shared files (edit once, applies everywhere)
- `app.css` — custom styles (animations, noise texture, scroll reveals)
- `app.js` — theme toggle, scroll animations, contact-form handler
- `tailwind.css` — **generated**; do not edit by hand (see Rebuilding)
- `treninu-plani.js` — vanilla-JS interactive program map for `treninu-plani.html` (ported from the React artifact; edit the `programs`/`TIERS` data at the top to change plans)

## Rebuilding the CSS
The site uses a compiled Tailwind stylesheet instead of the slow CDN.
After editing any HTML (adding or removing Tailwind classes), rebuild it:

- **Easiest:** double-click `rebuild-css.bat` (one folder up).
- **Terminal:** from the `site/` folder, run
  `../tools/tailwindcss.exe -c tailwind.config.js -i tailwind.input.css -o tailwind.css --minify`

If you only edit text or colors already used elsewhere, you don't need to rebuild.

## Deploying
Upload the contents of this `site/` folder to your host (e.g. Netlify Drop,
Cloudflare Pages, GitHub Pages, or shared hosting). `index.html` loads at the
root URL. The files `tailwind.config.js`, `tailwind.input.css` and `README.md`
are dev-only — harmless to upload, but not required by the live site.

## TODO — replace placeholder content
- [ ] **Domain:** update `akfitness.lv` in each page's `<link rel="canonical">` and `og:url` if different.
- [x] **Contact email:** all forms send to `anna@akfitness.lv` (set in `app.js` via `AK_FORM_EMAIL`, and in each form's `action=` fallback). To change it later, update `AK_FORM_EMAIL` in `app.js` **and** the `action="https://formsubmit.co/…"` on each form. ⚠️ FormSubmit requires a one-time activation: the first real submission triggers a confirmation email to `anna@akfitness.lv` that must be clicked before messages start arriving.
- [ ] **Coach timelines:** the "Ceļš līdz šodienai" dates/milestones on the coach pages are realistic placeholders — replace with real facts.
- [ ] **Coach names:** the original design used both "Krišjānis" and "Kristaps" for the second coach; this site standardises on **Krišjānis**. Adjust if wrong.
- [ ] **Images:** several photos are stock (Unsplash). Swap for real gym/client photos when available.

## Private documents (not linked / not indexed)
The per-client contract templates and signature page live in
`dokumenti-priv-8kq2f/` (`ligums-*.html`, `paraksts.html`). They are **not**
linked from any page and are excluded from search engines via `robots.txt` +
`_headers` (`X-Robots-Tag: noindex`). NOTE: this is obscurity, not auth — anyone
with the exact URL can still open them. For real protection, put them behind the
Zeabur Caddy basic-auth template or serve them only from the n8n pipeline.

## Legal + intake links
`privatuma-politika.html` and `pakalpojuma-noteikumi.html` are linked from the
footer of all six site pages. `anketa.html` is intentionally NOT linked anywhere
— it is a private onboarding URL, sent to each client individually. The terms page's
"Atteikuma Tiesības" deep-links to `pakalpojuma-noteikumi.html#atteikums`.

## TODO — Treniņu Plāni (4th product)
- [ ] **Real price + purchase flow.** The page shows a PLACEHOLDER `from €39/plāns`
  and the form just emails the lead via FormSubmit. Wire a real checkout (Stripe
  payment link, bank transfer instructions, or per-plan pricing) and set true prices.
- [ ] **Plan delivery.** Decide how a purchased plan is delivered (PDF, CoachRx, etc.).
- [ ] No Tailwind rebuild was needed — the new card/page reuse existing classes and
  `lg:grid-cols-4` was already compiled. Rebuild only if you add NEW Tailwind classes.

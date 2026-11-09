# THE WEDDING EXPERIENCE — ATREZZO STUDIOS

**Commercial design concept, NOT the client's official website.** The client has not confirmed business name, services, contact information, or use of private photographs. The current public repository contains source code only; the site has NOT been published as an official website.

## Phase 04 — working Astro foundation (2026-11-09)

- Astro 7.4.7 static multipage build: Home, About, Services, Gallery, Contact.
- Responsive white / black / muted gold editorial theme, noindex on all routes.
- Shared immersive menu, VEIL document transition and luxury interaction buttons are **exact copies of approved Atrezzo Core source**, not recreated effects.
- Home features a photographic opening and the **original Scroll Sections 01 Expand**. The video supplied for the Hero remains on hold pending permission/license verification.
- The other four pages are accessible, purpose-built **structural foundations**: their approved cinematic chapters (Layered Panels, Atlas, Editorial Index, Lightbox) have NOT been integrated yet.
- Illustrative Unsplash photography is openly recorded in docs/CONTENT-ASSET-REGISTER.md and must never be represented as the client's portfolio.
- Contact form is visibly disabled: no fake submissions or fabricated contact address.
- CI builds actual Astro static pages and runs source + output checks.
- GitHub Pages PREVIEW is now enabled and successfully deployed from main/(root). Browser/device/visual QA has NOT yet been certified.

## Documents
1. [Project status](ATREZZO-PROJECT-STATUS.md) — official approvals and phase history
2. [Technical architecture](docs/TECHNICAL-ARCHITECTURE.md) — page/build choices
3. [Component integration matrix](docs/COMPONENT-INTEGRATION-MATRIX.md) — original motors and current integration state
4. [Content and asset register](docs/CONTENT-ASSET-REGISTER.md) — provisional copy and photography rights
5. [QA gates](docs/QA-RELEASE-GATES.md) — what must be tested before demo acceptance

## Development
Requires Node 22.12+.
- npm install
- npm run dev
- npm run build

Site base is configured for the repository subpath /weedding-experience/ (not a deployment approval). Original engines are committed as readable files under public/atrezzo-core/. Do not modify these approved source engines unless fixing a reproducible integration or accessibility issue; apply site-specific palette and content in src/styles/site.css and src/data/site.js.

## GitHub Pages Preview

**Preview:** https://atrezzostudiosv-spec.github.io/weedding-experience/

The GitHub Pages deployment successfully completed in run [42645049876](https://github.com/atrezzostudiosv-spec/weedding-experience/actions/runs/42645049876) on 2026-11-09. Because Pages is configured to publish `main/(root)`, the repository root contains a committed snapshot of the generated `dist/` HTML/CSS and runtime assets plus `.nojekyll` to disable Jekyll. Source files remain in `src/` and `public/`.

**Important:** A source commit alone triggers CI but does NOT refresh the published preview. For each website update, run `npm run build`, synchronize the `dist/` output into the repository root (preserve source/docs/workflows), and commit those outputs. Alternatively, deliberately switch Pages Source to GitHub Actions and configure a dedicated Astro Pages deploy workflow. Never assume a successful CI compile is a successful Pages deploy.

This is a commercial design demo with `noindex,nofollow,noarchive`, not an authorized official client website. Full visual, interaction and device QA remains pending.

## Next step
Run real browser QA for Home/navigation/transition at 375, 768, 1024 and 1440 pixels, including reduced motion, no JavaScript and reverse scroll; fix proven defects. Only then integrate approved cinematic chapters into the remaining four pages. Never publish as an official client website without authorization.

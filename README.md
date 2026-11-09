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
- No GitHub Pages deployment is configured, and no visual/device/browser QA has yet been certified.

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

## Next step
Run real browser QA for Home/navigation/transition at 375, 768, 1024 and 1440 pixels, including reduced motion, no JavaScript and reverse scroll; fix proven defects. Only then integrate approved cinematic chapters into the remaining four pages. Never publish as an official client website without authorization.

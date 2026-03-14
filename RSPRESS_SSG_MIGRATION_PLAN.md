# Rspress SSG Migration Plan for zephyr-cloud.io

## Goal

Migrate the current React + Rsbuild site to **Rspress with static site generation (SSG)** while preserving:

1. Visual identity and interactions (desktop and mobile)
2. Existing URL structure and behavior
3. SEO quality (crawlability, metadata, structured indexing)
4. Social previews (Open Graph and Twitter thumbnails for all key pages, especially blog/changelog posts)

---

## Non-Negotiable Requirements

- Keep all current public URLs stable and indexable.
- Preserve current look and behavior as closely as possible.
- Render content statically at build time where possible (especially blog/changelog detail pages).
- Ensure each indexable page has complete metadata (`title`, `description`, canonical URL, OG/Twitter tags).
- Ensure social thumbnails resolve with absolute URLs and render correctly in common preview bots.

---

## Current Site Inventory (Migration Scope)

### Routes to preserve

- `/`
- `/pricing`
- `/privacy`
- `/press`
- `/partners`
- `/events`
- `/products/ai`
- `/products/code-elimination-performance`
- `/blog`
- `/blog/:slug`
- `/changelog`
- `/changelog/:slug`

### Behaviors/components to preserve

- Header desktop/mobile navigation and dropdowns
- Header logo context menu (copy logo/wordmark SVG)
- Hero CTA copy interaction
- Testimonial marquee animation and pause-on-hover
- Blog/changelog listing filters and detail rendering
- Embedded media in MDX (images/videos/custom components)
- Footer structure and links
- Analytics/chat integrations (PostHog, GA, Intercom)

---

## Migration Strategy

## 1) Platform Foundation (Rspress)

- Initialize Rspress structure and configure SSG output.
- Add a custom theme layout that hosts current global shell behavior (header/footer/providers/scripts).
- Port global CSS/Tailwind setup and typography tokens with no visual drift.
- Implement route/permalink strategy matching current URLs exactly.

Deliverable: app boots in Rspress with static builds and equivalent global layout.

## 2) Content Model & Static Generation

- Move/bridge blog and changelog MDX into Rspress content routing.
- Replace runtime slug loading with build-time generated pages.
- Preserve frontmatter compatibility, including fallback logic for legacy fields.
- Preserve MDX enhancements (GFM, heading slugs, autolink, code highlighting, custom components such as Twitter embeds).

Deliverable: `/blog/:slug` and `/changelog/:slug` are statically generated and directly indexable.

## 3) SEO & Metadata Architecture

- Build centralized SEO helper (site defaults + page overrides).
- Add per-route metadata:
  - `title`
  - `description`
  - `canonical`
  - `og:title`, `og:description`, `og:type`, `og:url`, `og:image`
  - `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`
- Ensure blog/changelog detail pages use frontmatter metadata for OG and canonical.
- Add/verify structured data where high-value (organization/website/article schema).
- Maintain `robots.txt` and add sitemap generation for all static pages and generated content pages.

Deliverable: full metadata coverage and crawl-ready static outputs.

## 4) Social Thumbnail Pipeline

- Define canonical OG image strategy:
  - Static OG images for core pages
  - Per-post frontmatter image with absolute URL fallback
- Enforce absolute image URLs in metadata (production domain).
- Validate image dimensions and format for social platforms (recommended 1200x630).
- Add fallback thumbnail if a page/post image is missing.

Deliverable: stable, bot-friendly social previews for every shareable URL.

## 5) Visual/Behavioral Parity Validation

- Use Playwright MCP to compare current production (`https://zephyr-cloud.io`) against Rspress build output.
- Validate:
  - Header interactions and mobile nav
  - Section spacing/layout
  - Typography and color fidelity
  - Animation behavior (especially testimonials)
  - Blog/changelog list and detail rendering
- Capture baseline screenshots for desktop/mobile and regression screenshots from local/preview build.

Deliverable: parity checklist completed with any deviations documented and fixed.

## 6) Analytics, Runtime Scripts, and Safety

- Re-integrate GA/PostHog/Intercom in client-safe hooks/layout.
- Ensure no script breaks SSG output or hydration.
- Keep external link behavior consistent (`target="_blank"` + `rel="noopener"` where applicable).

Deliverable: runtime integrations preserved without SEO regressions.

## 7) Cutover, QA, and Verification

- Build and verify static output locally.
- Verify generated routes, sitemap, and robots.
- Validate social cards using representative URLs.
- Smoke test on Zephyr preview URL before final cutover.
- Keep rollback path (current app branch/deploy intact until acceptance).

Deliverable: deploy-ready Rspress site with parity and SEO acceptance.

---

## Subagent Execution Plan (to control context)

Use focused subagents in parallel where possible:

1. **Route & Content Agent**
   - Map route parity and MDX migration details.
   - Produce final old->new route mapping matrix.

2. **SEO Agent**
   - Define metadata contract per page type.
   - Validate canonical/sitemap/robots consistency.

3. **Visual QA Agent**
   - Run Playwright parity checks desktop/mobile.
   - Produce mismatch report with priority labels.

4. **Integration Agent**
   - Port analytics/chat scripts safely to client runtime.
   - Verify no hydration/runtime warnings.

---

## Acceptance Criteria

- All current URLs resolve and are statically generated where applicable.
- Lighthouse/SEO checks show proper titles/descriptions/canonicals and crawlability.
- OG/Twitter previews show expected title, description, and thumbnail for:
  - home page
  - at least one static marketing page
  - at least three blog posts
  - at least three changelog posts
- Playwright parity review passes on desktop and mobile for key pages.
- No critical console/runtime errors on production preview.

---

## Suggested Implementation Order

1. Scaffold Rspress + global theme/layout shell.
2. Port static pages and shared components/styles.
3. Migrate blog/changelog to static generation.
4. Add SEO metadata layer + sitemap/robots.
5. Implement OG thumbnail strategy.
6. Re-enable analytics/runtime integrations.
7. Run Playwright parity + final fixes.
8. Validate preview and perform cutover.

---

## Initial Baseline Artifact

- Desktop baseline screenshot captured from production:
  - `baseline-zephyr-home-desktop.png`

---

## Progress Update (2026-03-14)

- Resolved the recoverable React hydration warning on blog detail pages caused by invalid nested markup in Twitter embed content.
- Updated tweet embed blocks in `src/content/blog/nextjs-without-lock-in-vinext-on-zephyr.mdx` to avoid nested `<p>` and nested `<a>` output in static HTML.
- Rebuilt static output and confirmed the previous `hydrateRoot` warning no longer appears for `/blog/nextjs-without-lock-in-vinext-on-zephyr` (remaining warning is Intercom App ID configuration in local preview).
- Captured desktop and mobile parity screenshots for key pages in `migration-screenshots/`:
  - `desktop-home.png`, `desktop-pricing.png`, `desktop-blog-index.png`, `desktop-blog-nextjs.png`, `desktop-blog-ota.png`, `desktop-changelog-index.png`, `desktop-changelog-2026-03-06.png`, `desktop-changelog-2025-17.png`
  - `mobile-home.png`, `mobile-pricing.png`, `mobile-blog-index.png`, `mobile-blog-nextjs.png`, `mobile-blog-ota.png`, `mobile-changelog-index.png`, `mobile-changelog-2026-03-06.png`, `mobile-changelog-2025-17.png`
- Spot-checked generated metadata in `doc_build` for representative blog/changelog pages and verified title, description, canonical, and OG/Twitter image tags are present with absolute URLs.

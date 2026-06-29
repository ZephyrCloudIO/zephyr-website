# Rspress Maintenance Guide

This site is maintained as a Rspress SSG project. Do not add SSR or restore the old Rsbuild app shell.

## Daily Commands

```bash
pnpm dev
pnpm run generate:rspress-content
pnpm run typecheck
pnpm build
pnpm preview
```

`pnpm dev` and `pnpm build` run `generate:rspress-content` automatically, but run it directly after changing blog or changelog content if you want to inspect generated files before building. The generator formats its output with the project's Prettier config, so regenerating produces no formatting diff and leaves the working tree clean.

## Project Shape

- `docs/`: Rspress route root. Any `.md`/`.mdx` here becomes a public, indexable page — never put internal or contributor docs here.
- `docs/public/`: static public assets copied into the deployed site root.
- `docs-internal/`: contributor and maintenance docs (including this guide). Kept outside `docs/` so Rspress never publishes them.
- `theme/index.tsx`: global Rspress layout, metadata rendering, header/footer, analytics providers.
- `src/routes/`: reusable page components originally written as TanStack routes.
- `src/components/pages/RouteRenderer.tsx`: renders legacy route components from `docs/*.mdx` wrappers.
- `src/router-shim.tsx`: small compatibility shim for legacy `@tanstack/react-router` imports.
- `src/content/blog/`: canonical blog MDX source.
- `src/content/changelog/`: canonical changelog MDX source.
- `scripts/generate-rspress-content.mjs`: generates static Rspress blog/changelog route wrappers and metadata files.

## Adding A Blog Post

Use `date: YYYY-MM-DD` in the post frontmatter. Dates are parsed as UTC (see `parseLocalDate` in `src/lib/utils.ts`) so the static build and client hydration render the same day in every timezone.

The blog index automatically features the **two most recent posts** (by `date`) — there is no per-post `featured` flag. Publishing a newer post promotes it into the Featured section and pushes the previous one down into the main listing. Selection lives in `src/components/pages/BlogIndexPage.tsx`.

1. Add the source MDX file:

```text
src/content/blog/<slug>.mdx
```

2. Add images under:

```text
src/images/blog/<slug>/
```

3. If the post needs a new author, update:

```text
src/data/blog/authors.ts
src/lib/blog/loader.ts
```

4. If the post needs imported listing/hero images in legacy listing components, update:

```text
src/lib/blog/images.ts
```

5. Regenerate static routes:

```bash
pnpm run generate:rspress-content
```

6. Commit both the source and generated output:

```text
src/content/blog/<slug>.mdx
docs/blog/<slug>.mdx
src/generated/blog-metadata.ts
docs/public/images/blog/<slug>/...   # if copied by the generator
```

## Adding A Changelog Entry

1. Add the source MDX file:

```text
src/content/changelog/<slug>.mdx
```

2. Regenerate static routes (entries are auto-discovered by scanning `src/content/changelog/` — no manual registration needed):

```bash
pnpm run generate:rspress-content
```

3. Commit both the source and generated output:

```text
src/content/changelog/<slug>.mdx
docs/changelog/<slug>.mdx
src/generated/changelog-metadata.ts
```

## Adding A Normal Page

Keep page UI in `src/routes/` and expose it with a thin Rspress wrapper in `docs/`.

Example:

```mdx
---
title: Example | Zephyr Cloud
description: Example page description.
head:
  - - meta
    - property: og:title
      content: Example | Zephyr Cloud
  - - meta
    - property: og:description
      content: Example page description.
  - - meta
    - property: og:url
      content: https://zephyr-cloud.io/example
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - property: og:image
      content: https://zephyr-cloud.io/images/og/default-1200x630.png
  - - meta
    - property: og:image:secure_url
      content: https://zephyr-cloud.io/images/og/default-1200x630.png
  - - meta
    - property: og:image:type
      content: image/png
  - - meta
    - property: og:image:width
      content: '1200'
  - - meta
    - property: og:image:height
      content: '630'
  - - meta
    - property: og:image:alt
      content: Zephyr Cloud
  - - meta
    - name: twitter:image
      content: https://zephyr-cloud.io/images/og/default-1200x630.png
  - - meta
    - name: twitter:image:src
      content: https://zephyr-cloud.io/images/og/default-1200x630.png
  - - link
    - rel: canonical
      href: https://zephyr-cloud.io/example
---

import { RouteRenderer } from '../src/components/pages/RouteRenderer';
import { Route as ExampleRoute } from '../src/routes/example';

<RouteRenderer route={ExampleRoute} />
```

Swap in a page-specific `og:image`/`twitter:image` when the page has its own social art; otherwise keep the shared `default-1200x630.png` so the page still has a social preview.

Use `hideChrome: true` in frontmatter for standalone pages that should not render the global header, footer, or Intercom button.

## Adding A Standalone Lander

1. Put the lander UI and assets under:

```text
src/landers/<slug>/
```

2. Add a Rspress wrapper:

```text
docs/<slug>.mdx
```

3. Use `hideChrome: true`.

4. If the lander should respect `ZE_PUBLIC_ENABLED_LANDERS`, render it through `LanderRoute`:

```mdx
---
title: Campaign | Zephyr Cloud
description: Campaign page description.
hideChrome: true
---

import { CampaignLanderPage } from '../src/landers/campaign/LanderPage';
import { LanderRoute } from '../src/landers/LanderRoute';

<LanderRoute slug="campaign" component={CampaignLanderPage} />
```

## Public Files

Put root-level public files under `docs/public/`:

- `docs/public/robots.txt`
- `docs/public/llms.txt`
- `docs/public/llms-full.txt`
- `docs/public/openapi.json`
- `docs/public/.well-known/*`
- `docs/public/_headers`

Do not restore the old root `public/` directory unless the Rspress config changes.

## SEO And Social Metadata

- Normal pages: add metadata in the `docs/*.mdx` frontmatter `head` block, including a social image (see the normal page example above).
- Every page must expose a social image. If there is no page-specific art, use the shared default `https://zephyr-cloud.io/images/og/default-1200x630.png` together with `og:image:secure_url`, `og:image:type`, width/height, `og:image:alt`, `twitter:card: summary_large_image`, `twitter:image`, and `twitter:image:src`. The shared image lives at `docs/public/images/og/default-1200x630.png`.
- Blog/changelog pages: metadata (including a per-post social image that falls back to the shared default) is generated by `scripts/generate-rspress-content.mjs`.
- Canonical URLs should point to `https://zephyr-cloud.io/...`.
- Social images should use absolute URLs.
- Do not add a global `og:image`/`twitter:image` in `rspress.config.ts`. The global config `head` is injected into the HTML template separately from the per-page `@unhead` head, so a global image would render as a duplicate tag on blog/changelog pages that already define their own. Keep image tags per-page.

## Analytics

Analytics is PostHog-only.

- Do not add Google Analytics/GTM scripts.
- Do not add Google Analytics/GTM domains to `docs/public/_headers`.
- If adding third-party scripts or forms, update CSP in `docs/public/_headers` intentionally.

## Validation Checklist

Before opening or merging a PR:

```bash
pnpm run typecheck
pnpm build
```

Then verify:

- The Zephyr plugin prints a deployed preview URL.
- The preview URL loads.
- New or changed routes work on direct refresh.
- All pages (static, blog, and changelog) have title, description, canonical, `og:*` (including `og:image`), and `twitter:*` metadata.
- Re-running `pnpm run generate:rspress-content` leaves the working tree clean (no formatting drift in generated files).
- No `googletagmanager`, `gtag`, `GTM-`, `google-analytics`, or `g.doubleclick` references were added.
- No SSR APIs were introduced.

For visual changes, compare the Zephyr preview against `https://zephyr-cloud.io` with Playwright at desktop and mobile sizes.

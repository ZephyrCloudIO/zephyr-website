# Rspress PR Migration Guide

Use this after PR #228 (`feat/rspress-migration`) lands. The site is now Rspress SSG only; do not reintroduce Rsbuild app entries or SSR.

## First Step For Every Open PR

```bash
git fetch origin
git rebase origin/main
pnpm install
```

Then resolve conflicts against the Rspress structure, run the generator, and validate:

```bash
pnpm run generate:rspress-content
pnpm run typecheck
pnpm build
```

## Where Changes Go Now

| PR type                   | New location / action                                                                                                                                                                                                                                        |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Blog post                 | Add MDX to `src/content/blog/`, images to `src/images/blog/<slug>/`, update authors/images/loaders only if needed, then run `pnpm run generate:rspress-content`.                                                                                             |
| Changelog entry           | Add MDX to `src/content/changelog/`, register it in `src/lib/changelog/loader.ts`, then run `pnpm run generate:rspress-content`.                                                                                                                             |
| Normal page route         | Keep page UI in `src/routes/<route>.tsx`; add or update a thin `docs/<route>.mdx` wrapper using `RouteRenderer`.                                                                                                                                             |
| Existing page redesign    | Usually update the existing `src/routes/*.tsx` file only. The matching `docs/*.mdx` wrapper should remain thin.                                                                                                                                              |
| Standalone lander         | Put UI/assets under `src/landers/<slug>/`; add `docs/<slug>.mdx` with `hideChrome: true`. Use `LanderRoute` if the page should respect `ZE_PUBLIC_ENABLED_LANDERS`.                                                                                          |
| Public/static files       | Put files under `docs/public/`, not root `public/`.                                                                                                                                                                                                          |
| Internal/contributor docs | Put under `docs-internal/` (repo root), never `docs/`. Anything under `docs/` becomes a public, indexable page.                                                                                                                                              |
| SEO/social metadata       | Add static frontmatter `head` entries (including a social image — page-specific or the shared `/images/og/default-1200x630.png` default) in the relevant `docs/*.mdx`; generated blog/changelog pages get these from `scripts/generate-rspress-content.mjs`. |
| Dependencies              | Keep Rspress dependencies and `zephyr-rspress-plugin`; do not bring back Rsbuild-only packages unless there is a specific remaining use.                                                                                                                     |

## Common PR Notes

- Content PRs such as changelog or blog posts should treat `docs/blog/*.mdx`, `docs/changelog/*.mdx`, and `src/generated/*-metadata.ts` as generated output. Regenerate instead of hand-editing them. The generator Prettier-formats its output, so regenerating leaves a clean tree with no formatting diff.
- Pricing PRs should update `src/routes/pricing.tsx`; `docs/pricing.mdx` should continue to render it through `RouteRenderer`.
- Lander PRs should not use separate HTML entrypoints in production anymore unless explicitly needed. Prefer Rspress SSG wrappers.
- Dependency PRs that target Rsbuild, TanStack Router plugin output, or old route tree files likely need to be closed or retargeted after the migration.
- Do not add duplicate global Open Graph tags in `rspress.config.ts`; per-page metadata should live in frontmatter or generated article wrappers.
- Analytics is PostHog-only. Do not add Google Analytics/GTM scripts or CSP allowlist entries.

## Validation Checklist

Before marking a migrated PR ready:

- `pnpm run typecheck` passes.
- `pnpm build` passes and the Zephyr plugin deploys a preview URL.
- Open the Zephyr preview URL printed by the build.
- Check direct page refresh for any new/changed route.
- For visual changes, compare the preview against `https://zephyr-cloud.io` with Playwright.
- For every page (static and content), inspect the rendered head for `title`, `description`, `og:*` (including `og:image`), `twitter:*`, and canonical tags.
- Confirm no SSR APIs were introduced.

## Useful Examples

New normal page wrapper:

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

New standalone lander wrapper:

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

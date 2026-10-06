---
title: Standalone landers
summary: How standalone campaign landers are scaffolded, routed, and gated.
read_when:
  - adding a campaign page outside the main webapp shell
  - changing lander routing or enablement
---

# Standalone landers

Landers live in `src/landers/<slug>`.

- Astro-rendered route with a hydrated React component.
- No TanStack route tree dependency.
- No shared header/footer requirement.
- Build-time gate via `ZE_PUBLIC_ENABLED_LANDERS`.

## Create

```bash
pnpm create-lander founder-briefing
```

That copies `src/landers/_template` into `src/landers/founder-briefing` and registers its page metadata in `src/data/site-pages.json`.

## Enable

Use a comma-separated allowlist:

```bash
ZE_PUBLIC_ENABLED_LANDERS=founder-briefing,partner-launch
```

Supported always-on markers:

```bash
ZE_PUBLIC_ENABLED_LANDERS=all
ZE_PUBLIC_ENABLED_LANDERS=*
```

## Routing

Astro handles `/<slug>` through the generated page registry. The lander's `<PascalCaseSlug>LanderPage` component is imported only when enabled during preparation. Its `hideChrome` metadata suppresses the shared header and footer.

Set the allowlist for `pnpm dev` or `pnpm build`. The generated route registry and browser bundle include only enabled landers. Production is a Cloudflare Worker, not separate lander HTML files.

Disabled landers return 404 and do not appear in the sitemap. See `docs-internal/emdash-maintenance-guide.md` for validation and deployment.

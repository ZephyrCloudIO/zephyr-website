---
title: Standalone landers
summary: How standalone campaign landers are scaffolded, routed, and gated.
read_when:
  - adding a campaign page outside the main webapp shell
  - changing lander routing or enablement
---

# Standalone landers

Landers live in `src/landers/<slug>`.

- Separate HTML entrypoint.
- No TanStack route tree dependency.
- No shared header/footer requirement.
- Runtime gate via `ZE_PUBLIC_ENABLED_LANDERS`.

## Create

```bash
pnpm create-lander founder-briefing
```

That copies `src/landers/_template` into `src/landers/founder-briefing`.

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

## Output

- Main app: `dist/index.html`
- Lander: `dist/<slug>/index.html`

Dev/preview rewrites `/slug` to the lander entry HTML. Production routing can be handled separately at the Zephyr layer.

If a lander slug is not enabled, the runtime redirects back to `/` instead of rendering a disabled message.

---
title: AI readiness
summary: Server-rendered pages, live content discovery, llms files, and security headers for IsAgentReady.
read_when:
  - changing homepage crawlability, semantic fallback content, or freshness metadata
  - updating llms.txt, llms-full.txt, robots.txt, or security headers
---

# AI readiness

Astro renders the site's content on the server so crawlers and visitors without JavaScript can read it. Blog and changelog pages load published content from EmDash.

- `src/routes/index.tsx`: homepage components
- `src/data/site-pages.json`: marketing page metadata
- `src/layouts/Base.astro`: canonical links, social metadata, and structured data
- `src/pages/sitemap.xml.ts`: live published article and enabled page URLs
- `docs/public/robots.txt`: crawler allow rules plus sitemap
- `docs/public/llms.txt`: short agent index
- `docs/public/llms-full.txt`: expanded agent overview
- `docs/public/.well-known/agent.json`: A2A agent card
- `docs/public/.well-known/agents.json`: directory of public Zephyr Cloud agent endpoints
- `docs/public/.well-known/mcp.json`: MCP discovery document
- `docs/public/openapi.json`: public OpenAPI spec
- `docs/public/.well-known/openapi`: OpenAPI discovery alias
- `docs/public/.well-known/webmcp.json`: WebMCP tool manifest
- `docs/public/_headers`: deploy-time security headers
- `docs/public/images/og/default-1200x630.png`: shared default social preview image

## Social preview image

Marketing pages specify their social image in `src/data/site-pages.json`. The shared fallback is `docs/public/images/og/default-1200x630.png`. Blog and changelog pages read their images and SEO overrides from EmDash. `src/layouts/Base.astro` renders the metadata for both kinds of page.

## When homepage copy changes

Update these together:

- homepage content in React components and metadata in `src/data/site-pages.json`
- JSON-LD and declarative WebMCP content where applicable
- publication dates on the articles linked from the homepage
- `docs/public/llms.txt`
- `docs/public/llms-full.txt`

## Freshness signals

Article pages and listings render their publication date as `<time datetime>`. The homepage's recent posts and the sitemap query EmDash at request time, so publication changes become visible without a rebuild. Marketing copy and the static discovery files still require a repository change and deployment.

## Security headers

`docs/public/_headers` carries the baseline policy for:

- CSP
- `Referrer-Policy`
- `X-Content-Type-Options`
- `X-Frame-Options`

Cloudflare applies that file to static assets. `src/middleware.ts` applies the public policy to Worker-rendered pages; EmDash handles its admin and API response headers.

If you add a new third-party script, analytics endpoint, embed, or form submission target, update the CSP allowlist before deploying.

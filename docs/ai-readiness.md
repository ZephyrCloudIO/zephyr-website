---
title: AI readiness
summary: Homepage fallback shell, freshness signals, llms files, and deploy-time security headers for IsAgentReady.
read_when:
  - changing homepage crawlability, semantic fallback content, or freshness metadata
  - updating llms.txt, llms-full.txt, robots.txt, or security headers
---

# AI readiness

The site keeps a crawler-readable fallback in [index.html](/Users/nsttt/work/zephyr-website/index.html).

- `index.html`: semantic non-JS shell for agents and crawlers
- `public/robots.txt`: crawler allow rules plus sitemap
- `public/llms.txt`: short agent index
- `public/llms-full.txt`: expanded agent overview
- `public/.well-known/agent.json`: A2A agent card
- `public/.well-known/agents.json`: directory of public Zephyr Cloud agent endpoints
- `public/.well-known/mcp.json`: MCP discovery document
- `public/openapi.json`: public OpenAPI spec
- `public/.well-known/openapi`: OpenAPI discovery alias
- `public/.well-known/webmcp.json`: WebMCP tool manifest
- `public/_headers`: deploy-time security headers

## When homepage copy changes

Update these together:

- fallback text and links in `index.html`
- JSON-LD and declarative WebMCP form in `index.html`
- freshness tags in `index.html`
- `public/llms.txt`
- `public/llms-full.txt`

## Freshness signals

The homepage fallback publishes:

- `article:published_time`
- `article:modified_time`
- visible `<time datetime>` text

Keep `article:modified_time` aligned with the latest homepage refresh.

## Security headers

`public/_headers` carries the baseline policy for:

- CSP
- `Referrer-Policy`
- `X-Content-Type-Options`
- `X-Frame-Options`

If you add a new third-party script, analytics endpoint, embed, or form submission target, update the CSP allowlist before deploying.

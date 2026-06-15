---
title: AI readiness
summary: Homepage fallback shell, freshness signals, llms files, and deploy-time security headers for IsAgentReady.
read_when:
  - changing homepage crawlability, semantic fallback content, or freshness metadata
  - updating llms.txt, llms-full.txt, robots.txt, or security headers
---

# AI readiness

The site keeps crawler-readable static output through the Rspress homepage source in `docs/index.mdx`.

- `docs/index.mdx`: homepage route source and static metadata
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

## When homepage copy changes

Update these together:

- homepage content and metadata in `docs/index.mdx` and rendered route components
- JSON-LD and declarative WebMCP content where applicable
- freshness tags in generated static metadata where applicable
- `docs/public/llms.txt`
- `docs/public/llms-full.txt`

## Freshness signals

The homepage fallback publishes:

- `article:published_time`
- `article:modified_time`
- visible `<time datetime>` text

Keep `article:modified_time` aligned with the latest homepage refresh.

## Security headers

`docs/public/_headers` carries the baseline policy for:

- CSP
- `Referrer-Policy`
- `X-Content-Type-Options`
- `X-Frame-Options`

If you add a new third-party script, analytics endpoint, embed, or form submission target, update the CSP allowlist before deploying.

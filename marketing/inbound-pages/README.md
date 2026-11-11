# Inbound campaign pages

Run these commands from the repository root:

- `pnpm run dev:inbound-pages` starts the Rsbuild development server.
- `pnpm run build:inbound-pages` builds the 11 campaign pages without publishing.
- `pnpm run preview:inbound-pages` serves the production build locally.
- `pnpm run test:inbound-pages` tests attribution and builds all pages to verify the HTML and asset links.

`rsbuild.config.ts` defines the multi-page application from `pages.json`.
Each entry names its HTML template and browser entry module.
Rsbuild bundles JavaScript, CSS and imported fonts, injects asset URLs, and copies `public/`.
Page templates include the shared `partials/lead-form.html` through Rsbuild template parameters.
Pages 10–11 retain the content and layout of the approved build:
https://zackary-chapple-18690-zephyr-landing-pages-review-660647c05-ze.zephyrcloud.app/.
Each campaign page has its own direct URL. The build has no review index or gallery.

The Rsbuild application exposes `campaigns/pages` and `campaigns/capture` through Module Federation.
The browser and Node build environments emit a public manifest and the server remote used during static generation.
Zephyr publishes both environments as one static `csr` snapshot.
The Node remote is a build input for the host, so it does not need a deployed HTTP server entrypoint.
`federated-pages.mjs` returns the approved HTML and scoped styles without browser dependencies.
`landing.css` supplies the shared designs for pages 1–9. Pages 10–11 keep their own inline CSS and SVGs.

The main Rspress application imports these remote modules through `src/landers/campaigns/CampaignRoute.tsx`.
The 11 `docs/<slug>.mdx` wrappers register public routes without navigation links.
For example, `/always-deployed` renders the first campaign.
Rspress generates complete HTML and adds each route to the main sitemap.
The build fails if a campaign lacks static content, its canonical URL or its sitemap entry.
`docs/public/llms.txt` lists the campaign URLs for agents.

The website workflow runs type checking and generated-content verification in an independent validation job.
That job also runs for fork PRs with read-only permissions and no deployment credentials.
The website workflow calls `Inbound landing pages` before building the host.
The reusable workflow publishes through `zephyr-rsbuild-plugin` with `ZE_DEPLOY=true`.
It uses the existing application configured in `zephyr.config.mjs` and the Depot runner.
Trusted same-repository PRs and pushes to `main` or `development` use this sequence.
The root `zephyr:dependencies` selects the `marketing-pages` tag for production.
That unlocked tag matches CI builds from `main`.
PR builds set `CAMPAIGN_TAG` to the branch tag created by the existing Zack Chapple CI credential.
`zephyr.config.ts` applies that override and requests selector URLs, so runtime resolution follows the selected tag.
The Rspress config hook calls the public Zephyr Agent resolver before configuring Module Federation.
The Rspress SSG deployment adapter does not perform this resolution itself.
A missing manifest or a selector that matches a different entity stops the build.
Local commands do not publish by default.

To build the integrated site locally, first build and serve the remote in separate terminals:

```bash
pnpm run build:inbound-pages
pnpm run preview:inbound-pages
```

Then build the main site against that local manifest:

```bash
ZE_DEPLOY=false CAMPAIGN_REMOTE_URL=http://localhost:4262/mf-manifest.json pnpm build
```

Keep the remote server running during static generation and local preview.
To verify a published tag without publishing the host, use an existing Zephyr login:

```bash
ZE_DEPLOY=false CAMPAIGN_TAG=web_feat-inbound-lead-capture_zackary_chapple pnpm build
```

This command resolves the tag through Zephyr and builds against the published remote. It does not start a deployment.

The browser fetches the published `default/zephyr-book-a-demo` form definition.
The CRM records the actual landing URL, incoming UTM values, form version and contact.
Retries retain the same request ID and require a fresh Turnstile token.
The form reports success only when the CRM returns a submission ID.

PostHog uses the existing Zephyr website project.
Events include `page_id`, `page_path` and incoming UTM values.
`marketing_form_submitted` includes the CRM submission ID.
Form answers are not sent to analytics.
Autocapture, heatmaps, session recording and surveys are disabled.
The final SDK event filter retains only UTM query values in analytics URLs.
It removes session-entry URLs, initial URLs and unexpected SDK events.

Before a hostname collects leads, add that exact hostname to the existing Turnstile widget.
Add its origin to the published CRM form's allowed origins.
Do not authorize all of `zephyrcloud.app`.
Keep the widget secret in the CRM API.

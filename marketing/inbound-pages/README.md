# Inbound campaign pages

Run these commands from the repository root:

- `pnpm run dev:inbound-pages` starts the Rsbuild development server.
- `pnpm run build:inbound-pages` builds the 11 campaign pages without publishing.
- `pnpm run preview:inbound-pages` serves the production build locally.
- `pnpm run test:inbound-pages` tests attribution, independent remote exports, review URLs and emitted asset links.

`rsbuild.config.ts` defines eleven review entries and eleven Module Federation page exports.
Each `pages/<slug>.tsx` file composes shared layout, section, form and logo components.
`design/base.css` contains the common design rules.
The modern and classic styles preserve the existing page variants.
Fonts and the logo belong to the remote and use its asset URLs.
The remote has no HTML parser or registry that imports every page.

The main Rspress application imports each page directly, for example `campaigns/always-deployed`.
The root `campaigns.ts` contract contains only route IDs and SEO metadata.
The host does not import the remote's components, styles, fonts or page content from local source.
The eleven `docs/<slug>.mdx` wrappers register public routes without navigation links.
Rspress renders complete page HTML through the Node remote and adds each route to the main sitemap.
The browser loads the matching page export for hydration.
The build fails if a campaign lacks static content, its canonical URL or its sitemap entry.
`docs/public/llms.txt` lists the campaign URLs for agents.

The browser and Node environments use separate output directories.
Node files and its Zephyr manifest live under `server/`.
This prevents collisions between the two deployment manifests.
The host passes the asset base URL from the resolved Module Federation manifest into each page.
Both environments therefore render the same absolute font and logo URLs from the remote's browser assets.
The Node chunk loader resolves its chunks relative to the server remote entry.
Zephyr publishes the remote as one static `csr` snapshot.
The Node remote serves as a static-generation input, so it does not need a deployed HTTP server entrypoint.

The existing numbered review URLs remain available, for example `/01-always-deployed/`.
These review entries render the same React components in the browser.
The canonical main-site routes contain complete HTML before JavaScript runs.
The build has no review index or gallery.

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
CAMPAIGN_ASSET_ORIGIN=http://localhost:4262/ pnpm run build:inbound-pages
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
If Zephyr rejects your login, refresh that login before retrying a tagged build.
For local development without Zephyr credentials, clear `CAMPAIGN_TAG` and use the local manifest command above.

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

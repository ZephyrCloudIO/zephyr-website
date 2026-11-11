# Inbound review pages

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

The `Inbound landing pages` workflow publishes through `zephyr-rsbuild-plugin` when `ZE_DEPLOY=true`.
It uses the existing review application configured in `zephyr.config.mjs`.
Trusted same-repository PRs and `main` can publish through this workflow.
Local commands do not publish by default.

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

# Inbound review pages

Run `pnpm run test:inbound-pages` from the repository root.
Run `pnpm run build:inbound-pages` to generate this application's `dist/`.
The `Inbound landing pages` workflow uploads the existing review application from trusted PRs and `main`.
It does not deploy the main website or add website navigation.

`pages/` contains complete HTML sources for all 11 pages.
Pages 1–9 implement the published designs with text, responsive sections and native diagrams.
Pages 10–11 preserve the HTML from the approved build:
https://zackary-chapple-18690-zephyr-landing-pages-review-660647c05-ze.zephyrcloud.app/.
The generator replaces each page's form and adds capture scripts and scoped form styles.
Every manifest entry must name an HTML source. There is no screenshot-page fallback.
The index uses the original design images as thumbnails only.

The browser fetches the published `default/zephyr-book-a-demo` form definition.
The CRM records the actual landing URL, incoming UTM values, form version and contact.
Retries retain the same request ID and require a fresh Turnstile token.
The form reports success only when the CRM returns a submission ID.

PostHog uses the existing Zephyr website project.
Events include `page_id`, `page_path` and incoming UTM values.
`marketing_form_submitted` includes the CRM submission ID.
Form answers are not sent to analytics.
Autocapture, session recording and surveys are disabled.
The final SDK event filter retains only UTM query values in analytics URLs.
It removes session-entry URLs, initial URLs and unexpected SDK events.

Before a hostname collects leads, add that exact hostname to the existing Turnstile widget.
Add its origin to the published CRM form's allowed origins.
Do not authorize all of `zephyrcloud.app`.
Keep the widget secret in the CRM API.
Promote a verified workflow build through Zephyr to keep one stable review URL.

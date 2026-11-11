# Inbound review pages

Run `pnpm run test:inbound-pages` from the repository root.
Run `pnpm run build:inbound-pages` to generate this application's `dist/`.
The `Inbound landing pages` workflow uploads the existing review application from trusted PRs and `main`.
It does not deploy the main website or add website navigation.

The designs for pages 1–9 remain at their original immutable Zephyr asset URLs.
`approved/` preserves pages 10–11 from the approved HTML build:
https://zackary-chapple-18690-zephyr-landing-pages-review-660647c05-ze.zephyrcloud.app/.
The generator replaces only their form and adds capture scripts and scoped form styles.

The browser fetches the published `default/zephyr-book-a-demo` form definition.
The CRM records the actual landing URL, incoming UTM values, form version and contact.
Retries retain the same request ID and require a fresh Turnstile token.
The form reports success only when the CRM returns a submission ID.

PostHog uses the existing Zephyr website project.
Events include `page_id`, `page_path` and incoming UTM values.
`marketing_form_submitted` includes the CRM submission ID.
Form answers are not sent to analytics.
Autocapture, session recording and surveys are disabled.
Analytics URLs retain only UTM query values.

Before a hostname collects leads, add that exact hostname to the existing Turnstile widget.
Add its origin to the published CRM form's allowed origins.
Do not authorize all of `zephyrcloud.app`.
Keep the widget secret in the CRM API.
Promote a verified workflow build through Zephyr to keep one stable review URL.

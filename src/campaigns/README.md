# Inbound campaign pages

Eleven lead-capture pages that are part of the main Rspress site.
They build, preview and deploy with it: `pnpm dev`, `pnpm build`, `pnpm preview`.
`pnpm test` covers the route list here and the lead form's attribution, Turnstile loading and CRM handling.

## Layout

- `routes.ts` lists each page's ID, slug, title and description. The theme and the build read it.
- `pages/<id>.tsx` is one page, composed from the shared components.
- `components/` holds the frame, header, footer, sections and the lead form's markup.
- `design/` holds the `modern` and `classic` styles. `CampaignFrame` renders them in `<style>` tags, so they apply only while a campaign page is mounted.
- `src/lib/lead-form/` holds the form's behaviour: `mount.ts` fills and submits it, `submission.ts` talks to the CRM, `turnstile.ts` loads verification. Nothing in it is specific to campaign pages.
- `docs/<slug>.mdx` is the route. It sets the canonical URL and social tags, hides the site header and footer with `hideChrome: true`, and marks the page with `campaign: true`.

Rspress renders each page to complete HTML at build time and adds it to the sitemap.
No navigation links to these pages. `docs/public/llms.txt` lists them for agents.
The build fails if a campaign page is missing from the sitemap, lacks its content or form, has no canonical URL, or is marked `noindex`.

## Adding a page

1. Add the route to `routes.ts`.
2. Create `pages/<id>.tsx`.
3. Copy an existing `docs/<slug>.mdx` wrapper and change the metadata and the import.
4. Add the URL to `docs/public/llms.txt`.

## Lead form

The browser fetches the published `default/zephyr-book-a-demo` form definition from the CRM, so the fields and the Turnstile requirement are set there.
The CRM records the actual landing URL, incoming UTM values, form version and contact.
Retries retain the same request ID and require a fresh Turnstile token.
The form reports success only when the CRM returns a submission ID.

The form fields load with the page. Turnstile loads when the form comes within one viewport of the screen.
Verification was the largest download on each page, and a token issued at page load expires after five minutes.
The submit button stays disabled until the widget returns a token.
The widget replaces an expired token by itself and is removed after an accepted submission.

Before a hostname collects leads, add its exact origin to the published CRM form's allowed origins.
`https://zephyr-cloud.io` is already allowed. `www.zephyr-cloud.io` redirects to it.
The Turnstile widget accepts `zephyr-cloud.io` and its subdomains, which covers the website's preview hostnames.
Keep the widget secret in the CRM API.

## Analytics

Campaign pages are tracked by the site's PostHog instance, like every other page. The theme starts it.
The form adds two events to it: `marketing_form_started` on first focus and `marketing_form_submitted` once the CRM returns a submission ID.
Both carry `page_id` and `form_slug`. The submitted event also carries `form_version` and `submission_id`.
Form answers are never passed to analytics, and session recordings mask input values by default.

# Plugin legal pages — release review

`/terms` and `/support` are prepared for publication; `/privacy` now describes the publishing plugin. The owner requested these page updates on September 30, 2026. The terms' old draft banner has been removed, with a last-updated date instead of a retroactive effective date. No production deployment has been made by this change.

Legal review is recommended before publication; it has not been performed by this change. Review applicability to existing customers and assent/onboarding notice. The copy does not invent a jurisdiction, mandatory arbitration, a liability cap, fixed deletion deadlines, or a support response-time promise. Existing signed agreements prevail. Updating a website page does not implement acceptance tracking in account signup.

The privacy addition follows the MCP implementation: OAuth identity and credentials; organization selection and requested account/chat/project defaults; uploaded content and file references; saved configuration, file hashes and build records; Cloudflare hosting; public immutable URLs; and revocation versus deletion. Existing privacy text is preserved. The support page covers account setup, organization choice and remembered defaults, supported upload formats and limits, build history, promotions, billing boundaries, and deletion requests.

Sources checked September 30, 2026:

- https://zephyr-cloud.io/privacy — existing publisher and support contact.
- https://developers.openai.com/plugins/deploy/submission — accessible terms, support and privacy URLs required for MCP review.
- https://www.ftc.gov/business-guidance/resources/advertising-faqs-guide-small-business — public service claims should be accurate and supported.

Build locally with `pnpm build`, which does not deploy; then inspect `/terms`, `/support`, and `/privacy`. Verify all three public URLs after the website release before submission.

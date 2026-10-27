# Changelogs

The site has three changelogs. They share one generator and the same page components.

| Changelog | URL                  | Source folder                    | Covers                                                                                                                                                                                             |
| --------- | -------------------- | -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Platform  | `/changelog`         | `src/content/changelog/`         | The Zephyr Cloud dashboard, API and platform                                                                                                                                                       |
| Plugins   | `/changelog/plugins` | `src/content/changelog-plugins/` | [zephyr-packages](https://github.com/ZephyrCloudIO/zephyr-packages/releases) releases: build plugins, `ze-cli`, `with-zephyr`, `create-zephyr-apps`                                                |
| Workers   | `/changelog/workers` | `src/content/changelog-workers/` | [zephyr-mono](https://github.com/ZephyrCloudIO/zephyr-mono/releases) releases that change `workers/*`: the edge workers Zephyr deploys (Cloudflare, Akamai, Fastly, AWS, Netlify, Kubernetes, SSR) |

Publishing is manual: write the entry, regenerate, open a PR. CI checks the generated files and builds a preview, and merging to `main` deploys.

## Adding a plugins or Workers entry

Write one entry per release, when the release ships.

1. Read the release on GitHub and open every merged PR it lists. Skip releases that only contain chores, dependency bumps, CI, refactors or internal docs.
2. Add `src/content/changelog-<plugins|workers>/YYYY-MM-DD-vX-Y-Z-<short-slug>.mdx`. Use the release date from the release notes heading. The file name is the URL slug.
3. Start with this frontmatter:

   ```yaml
   ---
   title: 'Plugins v1.7.0: JSON Deploy Output and Vinext on Cloudflare Vite Plugin 2.x'
   date: '2026-10-18'
   version: 'v1.7.0'
   summary: 'One or two sentences. Shown on the card, as the lead, and as the meta description.'
   tags: ['plugins', 'ze-cli']
   category: 'feature' # feature | performance | integration | security | platform | dx
   author: 'Zephyr Team'
   ---
   ```

   `version` must look like `v1.2.3`. It is shown on the card and the article. The platform changelog uses labels such as `Platform Update`, which are hidden.

4. Use the same sections as the platform changelog: `## Summary` (repeat the summary), one `##` section per notable change, `## Smaller Improvements`, `## What This Means for Teams`, and `## Support`. Copy an existing entry as a starting point.
5. Run `pnpm run generate:rspress-content` and commit the source, the generated `docs/changelog/<plugins|workers>/<slug>.mdx`, and `src/generated/changelog-<plugins|workers>-metadata.ts`.

## Writing rules

- Write for the people who use the plugin or whose app the worker serves, not for maintainers. Say what changed for them and what, if anything, they need to do.
- Check every claim against the merged PR, not only its title. PR descriptions often say a feature is opt-in, behind a flag, limited to one cloud, or needs a platform change. Carry those limits into the entry.
- Leave out dependency bumps, CI, refactors, test-only and internal documentation changes. Security updates can be one line under Smaller Improvements.
- Don't describe a fix for a bug that never shipped. If a release both adds a feature and fixes it before release, describe the feature as it shipped.
- Use real package, command, flag and error names in backticks (`ze-cli deploy --format json`, `ZE20024`).
- Follow the claims policy in `design-system.md`: no invented numbers, timings or customer names.

## Adding another changelog

Add the collection to `CHANGELOG_COLLECTIONS` in `scripts/generate-rspress-content.mjs`, its entries to `src/content/changelog-data.ts`, its labels to `src/lib/changelog/products.ts`, and an index page at `docs/changelog/<name>/index.mdx` that renders `<ChangelogIndexPage product="<name>" />`. Add its URL to `docs/public/llms.txt` and `llms-full.txt`.

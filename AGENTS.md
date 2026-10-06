# Repository Guidelines

## Project Structure & Module Organization

- `src/pages/`: Astro server routes; EmDash injects its own admin and API routes.
- `docs/public/`: public files deployed at the site root.
- `src/routes/`: reusable React marketing page components.
- `src/components/`: shared UI, section blocks, and form components.
- `src/content/`: archived MDX migration inputs. Blog and changelog publishing now belongs to EmDash.
- `.emdash/seed.json`: generated initial schema and content import.
- `src/lib/` and `src/data/`: loaders, helpers, and static data.
- `src/images/`: site assets; keep optimized images here.
- `src/landers/`: allowlisted campaign components. Read [`docs-internal/emdash-maintenance-guide.md`](docs-internal/emdash-maintenance-guide.md) before adding one.
- `scripts/`: maintenance utilities such as image conversion and lander scaffolding.

## Build, Test, and Development Commands

- `pnpm dev`: prepare the migration seed and start Astro with local Cloudflare bindings.
- `pnpm build`: build the Worker and assets without deploying.
- `pnpm run deploy`: explicitly deploy with Wrangler. The `run` avoids pnpm's built-in workspace deploy command.
- `pnpm deploy:dry`: validate the production Worker bundle without deploying.
- `pnpm preview`: preview the built output locally.
- `pnpm typecheck`: run Astro diagnostics and TypeScript without emitting files.
- `pnpm format`: format the repo with Prettier.
- `pnpm create-lander <slug>`: scaffold a new standalone lander in `src/landers/<slug>`.
- `pnpm emdash:prepare`: regenerate the initial import, copied assets, and route registries.
- `pnpm emdash:validate` and `pnpm emdash:verify`: validate the migration snapshot.

For gated landers, use the allowlist env var when building or previewing, for example:

```bash
ZE_PUBLIC_ENABLED_LANDERS=cityjs-london pnpm build
```

Blog and changelog pages query EmDash at request time. Do not restore file-backed publishing or overwrite existing D1 content during a build. Repository-owned marketing metadata lives in `src/data/site-pages.json`.

## Coding Style & Naming Conventions

- Use TypeScript + React function components.
- Follow existing Prettier formatting; do not hand-format around it.
- Prefer PascalCase for components (`HeroSection.tsx`), camelCase for helpers, kebab-case for content filenames.
- Keep files focused; split large sections into smaller components when needed.
- Reuse existing UI primitives in `src/components/ui/` before creating new ones.
- Follow [`docs-internal/design-system.md`](docs-internal/design-system.md) for tokens, type, motion, and which product claims the site can make.
- Builds must remain non-deploying. Credentials belong in secret tooling or ignored local variables, never committed configuration.

## Testing Guidelines

- There is no dedicated test runner yet; the minimum gate is `pnpm typecheck` plus `pnpm build`.
- For UI/content changes, verify the affected route or lander in preview and include screenshots for major visual updates.
- For SEO/content changes, verify live CMS metadata and direct refresh on the local Worker or an explicitly deployed Cloudflare preview.
- If you add logic that can be unit tested later, keep it isolated in `src/lib/` or a small helper module.

## Commit & Pull Request Guidelines

- Use Conventional Commits: `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`.
- Keep pull requests focused and explain user-facing impact.
- Link the relevant issue/task when applicable.
- For UI changes, include before/after screenshots or a preview URL.
- Before requesting review, run `pnpm typecheck` and `pnpm build`.

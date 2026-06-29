# Repository Guidelines

## Project Structure & Module Organization

- `docs/`: Rspress route root; files here become static SSG pages.
- `docs/public/`: public files deployed at the site root.
- `src/routes/`: reusable page components rendered by thin `docs/*.mdx` wrappers.
- `src/components/`: shared UI, section blocks, and form components.
- `src/content/`: MDX content for blog and changelog entries.
- `src/lib/` and `src/data/`: loaders, helpers, and static data.
- `src/images/`: site assets; keep optimized images here.
- `src/landers/`: standalone campaign lander components exposed through Rspress wrappers. Read [`docs-internal/rspress-maintenance-guide.md`](docs-internal/rspress-maintenance-guide.md) before adding one.
- `scripts/`: maintenance utilities such as image conversion and lander scaffolding.

## Build, Test, and Development Commands

- `pnpm dev`: generate Rspress content and start the local Rspress dev server.
- `pnpm build`: generate content, build the Rspress SSG site, and run the Zephyr plugin.
- `pnpm preview`: preview the built output locally.
- `pnpm typecheck`: run TypeScript without emitting files.
- `pnpm format`: format the repo with Prettier.
- `pnpm create-lander <slug>`: scaffold a new standalone lander in `src/landers/<slug>`.
- `pnpm run generate:rspress-content`: regenerate static blog/changelog route wrappers and metadata.

For gated landers, use the allowlist env var when building or previewing, for example:

```bash
ZE_PUBLIC_ENABLED_LANDERS=cityjs-london pnpm build
```

Blog and changelog source lives in `src/content/**`; generated route wrappers live in `docs/blog/**` and `docs/changelog/**` and should be regenerated rather than hand-edited.

## Coding Style & Naming Conventions

- Use TypeScript + React function components.
- Follow existing Prettier formatting; do not hand-format around it.
- Prefer PascalCase for components (`HeroSection.tsx`), camelCase for helpers, kebab-case for content filenames.
- Keep files focused; split large sections into smaller components when needed.
- Reuse existing UI primitives in `src/components/ui/` before creating new ones.

## Testing Guidelines

- There is no dedicated test runner yet; the minimum gate is `pnpm typecheck` plus `pnpm build`.
- For UI/content changes, verify the affected route or lander in preview and include screenshots for major visual updates.
- For SEO/content changes, verify generated metadata and direct route refresh on the Zephyr preview URL.
- If you add logic that can be unit tested later, keep it isolated in `src/lib/` or a small helper module.

## Commit & Pull Request Guidelines

- Use Conventional Commits: `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`.
- Keep pull requests focused and explain user-facing impact.
- Link the relevant issue/task when applicable.
- For UI changes, include before/after screenshots or a preview URL.
- Before requesting review, run `pnpm typecheck` and `pnpm build`.

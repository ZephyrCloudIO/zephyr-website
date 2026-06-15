# Repository Guidelines

## Project Structure & Module Organization

- `src/routes/`: TanStack Router pages for the main site.
- `src/components/`: shared UI, section blocks, and form components.
- `src/content/`: MDX content for blog and changelog entries.
- `src/lib/` and `src/data/`: loaders, helpers, and static data.
- `src/images/`: site assets; keep optimized images here.
- `src/landers/`: standalone campaign landers with separate entrypoints. Read [`docs/landers.md`](docs/landers.md) before adding one.
- `scripts/`: maintenance utilities such as image conversion and lander scaffolding.

## Build, Test, and Development Commands

- `pnpm dev`: start the local Rsbuild dev server.
- `pnpm build`: production build for the main app and any enabled landers.
- `pnpm preview`: preview the built output locally.
- `pnpm typecheck`: run TypeScript without emitting files.
- `pnpm format`: format the repo with Prettier.
- `pnpm create-lander <slug>`: scaffold a new standalone lander in `src/landers/<slug>`.

For landers, use the allowlist env var when building or previewing, for example:

```bash
ZE_PUBLIC_ENABLED_LANDERS=cityjs-london pnpm build
```

## Coding Style & Naming Conventions

- Use TypeScript + React function components.
- Follow existing Prettier formatting; do not hand-format around it.
- Prefer PascalCase for components (`HeroSection.tsx`), camelCase for helpers, kebab-case for content filenames.
- Keep files focused; split large sections into smaller components when needed.
- Reuse existing UI primitives in `src/components/ui/` before creating new ones.

## Testing Guidelines

- There is no dedicated test runner yet; the minimum gate is `pnpm typecheck` plus `pnpm build`.
- For UI/content changes, verify the affected route or lander in preview and include screenshots for major visual updates.
- If you add logic that can be unit tested later, keep it isolated in `src/lib/` or a small helper module.

## Commit & Pull Request Guidelines

- Use Conventional Commits: `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`.
- Keep pull requests focused and explain user-facing impact.
- Link the relevant issue/task when applicable.
- For UI changes, include before/after screenshots or a preview URL.
- Before requesting review, run `pnpm typecheck` and `pnpm build`.

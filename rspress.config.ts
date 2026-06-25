import { defineConfig } from '@rspress/core';
import { pluginSitemap } from '@rspress/plugin-sitemap';
import fs from 'node:fs';
import path from 'node:path';
import { withZephyr } from 'zephyr-rspress-plugin';

const siteUrl = 'https://zephyr-cloud.io';
const DOCS_ROOT = path.join(__dirname, 'docs');

// Build-time lander gating.
//
// Lander wrappers live at `docs/<slug>.mdx` and render `<LanderRoute slug=...>`.
// `LanderRoute` redirects disabled landers client-side, but the page is still
// statically built, served, and crawlable (and listed in the sitemap). To keep
// unreleased landers out of the build entirely, we resolve the same
// `ZE_PUBLIC_ENABLED_LANDERS` allowlist here and exclude disabled lander routes
// from Rspress. The client-side gate stays as a defense-in-depth fallback.
const ALWAYS_ON_MARKERS = new Set(['*', 'all']);

function parseEnabledLanders(rawValue: string | undefined): Set<string> {
  if (!rawValue) {
    return new Set<string>();
  }

  return new Set(
    rawValue
      .split(',')
      .map((value) => value.trim().toLowerCase())
      .filter(Boolean),
  );
}

const enabledLanders = parseEnabledLanders(process.env.ZE_PUBLIC_ENABLED_LANDERS);
const landersAllOn = [...ALWAYS_ON_MARKERS].some((marker) => enabledLanders.has(marker));

function isLanderEnabled(slug: string): boolean {
  return landersAllOn || enabledLanders.has(slug.trim().toLowerCase());
}

function findDisabledLanderRoutes(): string[] {
  const excluded: string[] = [];

  const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        // `public` is copied verbatim and never produces routes.
        if (entry.name === 'public') {
          continue;
        }
        walk(fullPath);
        continue;
      }

      if (!entry.name.endsWith('.mdx')) {
        continue;
      }

      const contents = fs.readFileSync(fullPath, 'utf8');
      const match = contents.match(/<LanderRoute\s+slug=["']([^"']+)["']/);

      if (match && !isLanderEnabled(match[1])) {
        // `route.exclude` globs are matched relative to the `docs` root.
        excluded.push(path.relative(DOCS_ROOT, fullPath).split(path.sep).join('/'));
      }
    }
  };

  walk(DOCS_ROOT);
  return excluded;
}

const disabledLanderRoutes = findDisabledLanderRoutes();

if (disabledLanderRoutes.length > 0) {
  console.log(
    `[rspress.config] Excluding ${disabledLanderRoutes.length} disabled lander route(s) from the build: ${disabledLanderRoutes.join(', ')}`,
  );
}

export default defineConfig({
  root: 'docs',
  title: 'Zephyr Cloud',
  description: 'The fastest way to go from Idea to Production',
  icon: '/favicon.ico',
  route: {
    cleanUrls: true,
    exclude: disabledLanderRoutes,
  },
  ssg: true,
  head: [
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    ['meta', { property: 'og:site_name', content: 'Zephyr Cloud' }],
  ],
  builderConfig: {
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src'),
        '@tanstack/react-router': path.join(__dirname, 'src/router-shim.tsx'),
      },
    },
  },
  plugins: [
    pluginSitemap({
      siteUrl,
      defaultChangeFreq: 'weekly',
      defaultPriority: '0.6',
    }),
    withZephyr(),
  ],
});

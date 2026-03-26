import { defineConfig, loadEnv } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { tanstackRouter } from '@tanstack/router-plugin/rspack';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import { withZephyr } from 'zephyr-rspack-plugin';
import { getLanderEntries } from './scripts/landers.js';
import { sitemapGeneratorPlugin } from './src/plugins/sitemap-generator';

const zephyrRsbuildPlugin = () => ({
  name: 'zephyr-rsbuild-plugin',
  setup(api: { modifyRspackConfig: (config: any) => Promise<void> }) {
    api.modifyRspackConfig(async (config: any) => {
      // this is important to avoid multiple zephyr build triggers
      config.name === 'web' && (await withZephyr()(config));
    });
  },
});

function formatEntryTitle(entryName: string) {
  if (entryName === 'index') {
    return 'Zephyr Cloud';
  }

  return `${entryName
    .split('-')
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' ')} | Zephyr`;
}

export default defineConfig(async () => {
  const { publicVars } = loadEnv({
    prefixes: ['PUBLIC_', 'ZE_PUBLIC_'],
  });

  const landerEntries = await getLanderEntries();
  const landerSlugs = Object.keys(landerEntries);

  return {
    source: {
      entry: {
        index: './src/index.tsx',
        ...landerEntries,
      },
      define: publicVars,
    },
    output: {
      copy: [
        { from: 'public/favicon.ico', to: './favicon.ico' },
        { from: 'public/llms.txt', to: './llms.txt' },
        { from: 'public/robots.txt', to: './robots.txt' },
      ],
    },
    html: {
      title: ({ entryName }) => formatEntryTitle(entryName),
      template: './index.html',
    },
    resolve: {
      alias: {
        '@/*': './src/*',
      },
    },
    server: {
      historyApiFallback: {
        index: '/index.html',
        rewrites: landerSlugs.map((slug) => ({
          from: new RegExp(`^/${slug}/?$`),
          to: `/${slug}/index.html`,
        })),
      },
    },
    plugins: [pluginReact(), sitemapGeneratorPlugin(), zephyrRsbuildPlugin()],
    tools: {
      htmlPlugin: (config, { entryName }) => {
        config.filename = entryName === 'index' ? 'index.html' : `${entryName}/index.html`;
      },
      rspack: {
        plugins: [
          tanstackRouter({
            target: 'react',
            autoCodeSplitting: false,
          }),
        ],
        module: {
          rules: [
            {
              test: /\.mdx?$/,
              use: [
                {
                  loader: '@mdx-js/loader',
                  options: {
                    providerImportSource: '@mdx-js/react',
                    remarkPlugins: [remarkGfm, remarkFrontmatter, [remarkMdxFrontmatter, { name: 'metadata' }]],
                    rehypePlugins: [rehypeHighlight, rehypeSlug, rehypeAutolinkHeadings],
                  },
                },
              ],
            },
          ],
        },
      },
      postcss: {
        postcssOptions: (context) => {
          return context.resourcePath.endsWith('.css') ? { plugins: [require('@tailwindcss/postcss')] } : {};
        },
      },
    },
  };
});

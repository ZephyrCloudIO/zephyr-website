import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { tanstackRouter } from '@tanstack/router-plugin/rspack';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import { withZephyr } from 'zephyr-rspack-plugin';
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

export default defineConfig({
  output: {
    copy: [
      { from: 'public/llms.txt', to: './llms.txt' },
      { from: 'public/robots.txt', to: './robots.txt' }
    ],
  },
  html: {
    title: 'Zephyr Cloud',
    template: './index.html',
  },
  resolve: {
    alias: {
      '@/*': './src/*',
    },
  },
  plugins: [pluginReact(), sitemapGeneratorPlugin(), zephyrRsbuildPlugin()],
  tools: {
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
                  remarkPlugins: [
                    remarkGfm,
                    remarkFrontmatter,
                    [remarkMdxFrontmatter, { name: 'metadata' }],
                  ],
                  rehypePlugins: [
                    rehypeHighlight,
                    rehypeSlug,
                    rehypeAutolinkHeadings,
                  ],
                },
              },
            ],
          },
        ],
      },
    },
    postcss: {
      postcssOptions: (context) => {
        return context.resourcePath.endsWith('.css')
          ? { plugins: [require('@tailwindcss/postcss')] }
          : {};
      },
    },
  },
});

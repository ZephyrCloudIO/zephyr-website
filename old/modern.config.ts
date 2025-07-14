import { appTools, defineConfig } from '@modern-js/app-tools';
import { tailwindcssPlugin } from '@modern-js/plugin-tailwindcss';
import { pluginImageCompress } from '@rsbuild/plugin-image-compress';
import { pluginMdx } from '@rsbuild/plugin-mdx';
import { sitemapPlugin } from 'modernjs-sitemap';
import rehypeHighlight from 'rehype-highlight';
import { withZephyr } from 'zephyr-modernjs-plugin';

const tailwindConfig = require('./tailwind.config');

export default defineConfig({
  tools: {
    tailwindcss: tailwindConfig,
    devServer: { historyApiFallback: true },
  },
  runtime: {
    router: true,
  },
  html: {
    outputStructure: 'flat',
    title: 'Zephyr Cloud | The only sane way to do micro-frontends',
    favicon: './config/public/favicon.svg',
    appIcon: './config/public/favicon.svg',
  },
  source: {
    mainEntryName: 'index',
    define: {
      __INTERCOM_APP_ID__: JSON.stringify(process.env.PUBLIC_INTERCOM_APP_ID),
    },
  },
  server: {
    port: 3000,
  },
  output: {
    copy: {
      patterns: [{ from: 'robots.txt' }, { from: 'sitemap.xml' }],
    },
    distPath: {
      html: './',
    },
  },
  builderPlugins: [
    pluginImageCompress(),
    pluginMdx({
      mdxLoaderOptions: {
        rehypePlugins: [[rehypeHighlight, { ignoreMissing: true }]],
        providerImportSource: '@mdx-js/react',
      },
    }),
  ],
  plugins: [
    sitemapPlugin({
      basepath: 'https://zephyr-cloud.io',
    }),
    appTools({
      bundler: 'experimental-rspack',
    }),
    tailwindcssPlugin(),
    withZephyr(),
  ],
});

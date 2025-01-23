import { appTools, defineConfig } from '@modern-js/app-tools';
import { tailwindcssPlugin } from '@modern-js/plugin-tailwindcss';
import { withZephyr } from 'zephyr-modernjs-plugin';

const tailwindConfig = require('./tailwind.config');

// https://modernjs.dev/en/configure/app/usage
export default defineConfig({
  tools: {
    tailwindcss: tailwindConfig,
  },
  runtime: {
    router: true,
    state: true,
  },
  html: {
    outputStructure: 'flat',
  },
  source: {
    mainEntryName: 'index',
  },
  server: {
    port: 3000,
  },
  output: {
    distPath: {
      html: './',
    },
  },
  plugins: [
    appTools({
      bundler: 'rspack',
    }),
    tailwindcssPlugin(),
    //withZephyr(),
  ],
});

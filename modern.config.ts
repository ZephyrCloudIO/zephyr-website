import { appTools, defineConfig } from '@modern-js/app-tools';
import { tailwindcssPlugin } from '@modern-js/plugin-tailwindcss';
import { withZephyr } from 'zephyr-webpack-plugin';

const tailwindConfig = require('./tailwind.config');

// https://modernjs.dev/en/configure/app/usage
export default defineConfig({
  tools: {
    tailwindcss: tailwindConfig,
    //   rspack(config) {
    // return withZephyr()(config);
    //   },
  },
  // html: {
  //  disableHtmlFolder: true,
  //  },
  runtime: {
    router: true,
    state: true,
  },
  server: {
    port: 3000,
  },
  plugins: [
    appTools({
      bundler: 'experimental-rspack',
    }),
    tailwindcssPlugin(),
  ],
});

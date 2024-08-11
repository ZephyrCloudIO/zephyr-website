import { appTools, defineConfig } from '@modern-js/app-tools';
import { tailwindcssPlugin } from '@modern-js/plugin-tailwindcss';
import { withZephyr } from 'zephyr-webpack-plugin';
// https://modernjs.dev/en/configure/app/usage
export default defineConfig({
  // @ts-expect-error this exists
  runtime: {
    router: true,
    state: true,
  },
  plugins: [
    appTools({
      bundler: 'experimental-rspack',
    }),
    tailwindcssPlugin(),
  ],
});

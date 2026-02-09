# Nuxt + Zephyr snippets (from zephyr-packages examples)

- Upload happens on Nuxt close hook and is skipped in dev mode.
- Output dir resolves from zephyr.outputDir, nitro.output.dir, or .output.
- Entrypoint auto-detected: server/index.mjs | server/index.js | server/index.cjs.
- Default snapshotType: SSR when entrypoint exists, otherwise CSR.
- Base URL (nuxt.options.app.baseURL) is forwarded as baseHref.
- Example app uses useFetch('/api/hello', { server: true }) during SSR.
- /api/hello returns ok, time (ISO), requestId from x-request-id or generated.
- Example Nuxt config uses preset cloudflare_module and modules nitro-cloudflare-dev + zephyr-nuxt-module.

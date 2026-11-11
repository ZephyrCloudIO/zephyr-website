import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(root, 'dist');
const pages = JSON.parse(await readFile(path.join(root, 'pages.json'), 'utf8'));
const escape = (text) =>
  String(text).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
for (const file of [
  'zephyr-logo.svg',
  'style.css',
  'landing.css',
  'form.css',
  'capture.mjs',
  'attribution.mjs',
  'turnstile.mjs',
])
  await cp(path.join(root, file), path.join(out, file));
await cp(path.join(root, '../../node_modules/posthog-js/dist/array.js'), path.join(out, 'posthog.js'));
await mkdir(path.join(out, 'fonts'));
await cp(
  path.join(root, '../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2'),
  path.join(out, 'fonts/inter.woff2'),
);
await cp(
  path.join(root, '../../node_modules/@fontsource-variable/chivo-mono/files/chivo-mono-latin-wght-normal.woff2'),
  path.join(out, 'fonts/chivo-mono.woff2'),
);
const head = (title) =>
  `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>${escape(title)} | Zephyr Cloud</title><link rel="stylesheet" href="../style.css"></head>`;
for (const page of pages) {
  if (!page.html) throw new Error(`Missing HTML source for ${page.path}.`);
  const source = await readFile(path.join(root, page.html), 'utf8');
  const form = `<form class="card" data-lead-form><div data-form-fields></div><label class="hp" aria-hidden="true">Website<input name="website" tabindex="-1" autocomplete="off"></label><div data-turnstile data-action="turnstile-spin-v1"></div><p data-form-status role="status" aria-live="polite">Loading the form…</p><button class="btn primary" type="submit" disabled>Book a demo</button><p class="alt"><a href="https://zephyr-cloud.io/privacy" target="_blank" rel="noopener">Privacy policy</a></p><noscript>Enable JavaScript to submit this form.</noscript></form>`;
  if ((source.match(/<form\b/g) ?? []).length !== 1) throw new Error('Expected one lead form.');
  const html = source
    .replace(/<form\b[\s\S]*?<\/form>/, form)
    .replace('<body', `<body data-page-id="${escape(page.id)}"`)
    .replace('</head>', '<link rel="stylesheet" href="../form.css"></head>')
    .replace(
      '</body>',
      '<script src="../posthog.js" defer></script><script type="module" src="../capture.mjs"></script></body>',
    );
  await mkdir(path.join(out, page.path));
  await writeFile(path.join(out, page.path, 'index.html'), html);
}
await writeFile(
  path.join(out, 'index.html'),
  `${head('Zephyr Cloud landing pages').replace('../style.css', './style.css')}<body data-page-id="landing-page-index"><header>Zephyr Cloud</header><main class="intro"><h1>Zephyr Cloud landing pages</h1><p>Explore 11 concepts. Each page has a demo request form.</p></main><div class="grid">${pages.map((page) => `<a class="tile" href="${page.path}/"><img src="${escape(page.thumbnail)}" alt="" loading="lazy"><h2>${escape(page.title)}</h2></a>`).join('')}</div><script src="./posthog.js" defer></script><script type="module" src="./capture.mjs"></script></body></html>`,
);
await writeFile(
  path.join(out, '_headers'),
  `/*\n  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://zackary-chapple-18683-zephyr-landing-pages-review-cdec3407e-ze.zephyrcloud.app; connect-src 'self' https://api.with-tap.ai https://m.zephyr-cloud.io https://challenges.cloudflare.com; frame-src https://challenges.cloudflare.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'\n  Referrer-Policy: strict-origin-when-cross-origin\n  X-Content-Type-Options: nosniff\n`,
);
console.log(`Built ${pages.length} landing pages with CRM lead capture.`);

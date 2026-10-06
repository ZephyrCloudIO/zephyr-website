import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { parse } from 'parse5';

const base = new URL(process.argv[2] ?? 'http://localhost:4321');
const manifest = JSON.parse(await readFile('.emdash/migration-manifest.json', 'utf8'));
const pages = JSON.parse(await readFile('src/generated/site-pages.json', 'utf8'));
const paths = [
  ...Object.keys(pages).map((page) => `/${page}`),
  ...Object.entries(manifest.collections).flatMap(([collection, slugs]) =>
    slugs.map((slug) => `/${collection}/${slug}`),
  ),
];
const assets = new Set(manifest.assets);

function elements(node, tag) {
  return [...(node.tagName === tag ? [node] : []), ...(node.childNodes ?? []).flatMap((child) => elements(child, tag))];
}
function attrs(node) {
  return Object.fromEntries(node.attrs.map((attribute) => [attribute.name, attribute.value]));
}

for (const pathname of paths) {
  const response = await fetch(new URL(pathname, base));
  assert.equal(response.status, 200, `${pathname}: HTTP ${response.status}`);
  const html = await response.text();
  const document = parse(html);
  const head = elements(document, 'head')[0];
  assert.equal(elements(head, 'title').length, 1, `${pathname}: missing or duplicate title`);
  const meta = elements(head, 'meta').map(attrs);
  for (const name of ['description', 'twitter:card', 'twitter:image'])
    assert.equal(meta.filter((value) => value.name === name).length, 1, `${pathname}: missing or duplicate ${name}`);
  for (const property of ['og:title', 'og:description', 'og:image', 'og:url'])
    assert.equal(
      meta.filter((value) => value.property === property).length,
      1,
      `${pathname}: missing or duplicate ${property}`,
    );
  const canonical = elements(head, 'link')
    .map(attrs)
    .find((value) => value.rel === 'canonical');
  assert.equal(canonical?.href, `https://zephyr-cloud.io${pathname}`, `${pathname}: wrong canonical URL`);
  assert.equal(elements(document, 'h1').length, 1, `${pathname}: expected one H1`);
  assert.equal(response.headers.get('x-content-type-options'), 'nosniff', `${pathname}: missing security headers`);
  for (const image of elements(document, 'img').map(attrs)) {
    assert.ok(image.src && image.src !== '[object Object]', `${pathname}: invalid image URL`);
    if (image.src.startsWith('/')) assets.add(image.src);
  }
  const ogImage = meta.find((value) => value.property === 'og:image')?.content;
  if (ogImage?.startsWith('https://zephyr-cloud.io/')) assets.add(new URL(ogImage).pathname);
}
for (const asset of assets) {
  const response = await fetch(new URL(asset, base));
  assert.equal(response.status, 200, `${asset}: missing asset`);
  await response.body?.cancel();
}
for (const pathname of [
  '/this-page-does-not-exist',
  '/constructor',
  '/toString',
  '/__proto__',
  '/blog/this-post-does-not-exist',
  '/changelog/this-entry-does-not-exist',
  ...(!pages['cityjs-london'] ? ['/cityjs-london'] : []),
]) {
  const response = await fetch(new URL(pathname, base));
  assert.equal(response.status, 404, `${pathname}: expected 404`);
  assert.match(await response.text(), /noindex/, `${pathname}: missing noindex`);
}
const sitemap = await (await fetch(new URL('/sitemap.xml', base))).text();
assert.equal((sitemap.match(/<loc>/g) ?? []).length, paths.length, 'Unexpected sitemap entry count');
assert.ok(!sitemap.includes('/_emdash/'), 'Admin routes must not appear in sitemap');
for (const pathname of ['/robots.txt', '/llms.txt', '/llms-full.txt', '/openapi.json', '/_emdash/admin']) {
  const response = await fetch(new URL(pathname, base));
  assert.equal(response.status, 200, `${pathname}: missing public file or admin`);
  await response.body?.cancel();
}

if (process.argv.includes('--cms-writes')) {
  assert.ok(['localhost', '127.0.0.1', '[::1]'].includes(base.hostname), 'CMS write checks are local-only');
  const setup = await (await fetch(new URL('/_emdash/api/setup/dev-bypass?token=1', base), { method: 'POST' })).json();
  const token = setup.data?.token;
  assert.ok(token, 'Development setup did not provide an API token');
  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
  const slug = `migration-smoke-${Date.now()}`;
  const title = `EmDash migration smoke ${slug}`;
  const response = await fetch(new URL('/_emdash/api/content/blog', base), {
    method: 'POST',
    headers,
    body: JSON.stringify({
      slug,
      status: 'draft',
      data: {
        title,
        description: title,
        published_on: new Date().toISOString(),
        tags: [],
        authors: [],
        content: [
          {
            _type: 'block',
            _key: 'smoke',
            style: 'normal',
            children: [
              { _type: 'span', _key: 'text', text: 'Published through the CMS without a rebuild.', marks: [] },
            ],
            markDefs: [],
          },
        ],
      },
    }),
  });
  const created = await response.json();
  assert.ok(response.ok, `CMS create failed: ${created.error?.code}`);
  const id = created.data?.item?.id;
  assert.ok(id, 'CMS create did not return an entry ID');
  try {
    assert.equal((await fetch(new URL(`/blog/${slug}`, base))).status, 404, 'Anonymous visitors can see a draft');
    assert.ok(
      !(await (await fetch(new URL('/blog', base))).text()).includes(title),
      'A draft appears in the blog listing',
    );
    const published = await fetch(new URL(`/_emdash/api/content/blog/${id}/publish`, base), {
      method: 'POST',
      headers,
    });
    assert.ok(published.ok, `CMS publish failed: HTTP ${published.status}`);
    const article = await fetch(new URL(`/blog/${slug}`, base));
    assert.equal(article.status, 200, 'Publishing did not make the article live');
    assert.match(await article.text(), /Published through the CMS without a rebuild/);
    assert.ok(
      (await (await fetch(new URL('/blog', base))).text()).includes(title),
      'New CMS post is missing from listing',
    );
    assert.ok(
      (await (await fetch(new URL('/', base))).text()).includes(title),
      'New CMS post is missing from home page',
    );
    assert.ok(
      (await (await fetch(new URL('/sitemap.xml', base))).text()).includes(`/blog/${slug}`),
      'New CMS post is missing from sitemap',
    );
    const unpublished = await fetch(new URL(`/_emdash/api/content/blog/${id}/unpublish`, base), {
      method: 'POST',
      headers,
    });
    assert.ok(unpublished.ok, `CMS unpublish failed: HTTP ${unpublished.status}`);
    assert.equal((await fetch(new URL(`/blog/${slug}`, base))).status, 404, 'Unpublished content remains public');
    console.log(
      'Verified local CMS draft isolation, publishing, live listings, sitemap updates, and unpublishing without rebuilding.',
    );
  } finally {
    const removed = await fetch(new URL(`/_emdash/api/content/blog/${id}`, base), { method: 'DELETE', headers });
    assert.ok(removed.ok, 'Could not move the local smoke entry to CMS trash');
  }
}
console.log(
  `Verified ${paths.length} public routes, ${assets.size} assets, SEO, security headers, 404s, discovery files, sitemap, and the EmDash admin.`,
);

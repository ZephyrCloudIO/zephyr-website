import { createProcessor } from '@mdx-js/mdx';
import { portableTextToProsemirror, prosemirrorToPortableText } from 'emdash';
import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { existsSync } from 'node:fs';
import { cp, mkdir, mkdtemp, readFile, symlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { promisify } from 'node:util';
import remarkGfm from 'remark-gfm';

const root = process.cwd();
if (process.argv.includes('--clean-checkout')) {
  const run = promisify(execFile);
  const fixture = await mkdtemp(path.join(tmpdir(), 'zephyr-emdash-checkout-'));
  const { stdout } = await run('git', ['ls-files', '-z', '--cached', '--others', '--exclude-standard'], { cwd: root });
  const files = [...new Set(stdout.split('\0').filter(Boolean))];
  for (const file of files) {
    const source = path.join(root, file);
    if (!existsSync(source)) continue;
    const destination = path.join(fixture, file);
    await mkdir(path.dirname(destination), { recursive: true });
    await cp(source, destination, { recursive: true });
  }
  assert.equal(existsSync(path.join(fixture, 'src/generated')), false, 'Fixture contains cached route output');
  await symlink(path.join(root, 'node_modules'), path.join(fixture, 'node_modules'), 'dir');
  const preparation = await run(process.execPath, ['scripts/migrate-emdash.mjs'], { cwd: fixture });
  const verification = await run(process.execPath, ['scripts/verify-emdash.mjs'], { cwd: fixture });
  console.log(preparation.stdout.trim());
  console.log(verification.stdout.trim());
  console.log('Verified migration preparation and content from a clean checkout without cached output.');
  process.exit(0);
}
const seed = JSON.parse(await readFile(path.join(root, '.emdash/seed.json'), 'utf8'));
const manifest = JSON.parse(await readFile(path.join(root, '.emdash/migration-manifest.json'), 'utf8'));
for (const [collection, slugs] of Object.entries(manifest.collections)) {
  const entries = seed.content[collection];
  assert.deepEqual(
    entries.map((entry) => entry.slug),
    slugs,
  );
  assert.equal(new Set(slugs).size, slugs.length);
  for (const entry of entries) {
    assert.ok(entry.data.title, `${entry.slug}: missing title`);
    assert.ok(Number.isFinite(Date.parse(entry.data.published_on)), `${entry.slug}: invalid publication date`);
    assert.ok(entry.data.content.length, `${entry.slug}: empty content`);
    assert.ok(
      entry.data.content.every((block) => block._key && block._type),
      `${entry.slug}: invalid content blocks`,
    );
    const source = await readFile(path.join(root, 'src/content', collection, `${entry.slug}.mdx`), 'utf8');
    const tree = createProcessor({ remarkPlugins: [remarkGfm] }).parse(
      source.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, ''),
    );
    const expected = [];
    const expectedLists = [];
    let expectedTables = 0;
    function collectSource(node, level = 0) {
      if (node.type === 'code') expected.push({ code: node.value, language: node.lang ?? 'text' });
      if (node.type === 'table') expectedTables += 1;
      if (node.type === 'list') {
        for (const item of node.children) {
          expectedLists.push({ listItem: node.ordered ? 'number' : 'bullet', level: level + 1 });
          collectSource(item, level + 1);
        }
      } else {
        node.children?.forEach((child) => collectSource(child, level));
      }
    }
    collectSource(tree);
    const actual = [];
    const actualLists = [];
    let actualTables = 0;
    function collectBlocks(value) {
      if (Array.isArray(value)) return value.forEach(collectBlocks);
      if (!value || typeof value !== 'object') return;
      if (value._type === 'code') actual.push({ code: value.code, language: value.language });
      if (value.listItem) actualLists.push({ listItem: value.listItem, level: value.level ?? 1 });
      if (value._type === 'table') actualTables += 1;
      Object.values(value).forEach(collectBlocks);
    }
    collectBlocks(entry.data.content);
    assert.deepEqual(actual, expected, `${entry.slug}: code snippets or languages changed during conversion`);
    assert.deepEqual(actualLists, expectedLists, `${entry.slug}: list items or nesting changed during conversion`);
    assert.equal(actualTables, expectedTables, `${entry.slug}: table structure changed during conversion`);
    const customBlocks = entry.data.content.filter((block) => block._type.startsWith('zephyr'));
    if (customBlocks.length) {
      const roundTrip = prosemirrorToPortableText(
        portableTextToProsemirror(entry.data.content, { preserveIdentity: true }),
      );
      assert.deepEqual(
        roundTrip.filter((block) => block._type.startsWith('zephyr')),
        customBlocks,
        `${entry.slug}: custom blocks changed during editor conversion`,
      );
    }
  }
}
for (const asset of manifest.assets) await readFile(path.join(root, 'docs/public', asset));
const film = seed.content.blog.find((entry) => entry.slug === 'production-evidence-before-you-merge');
assert.equal(film.data.content.filter((block) => block._type === 'zephyrComponent').length, 4);
const skills = seed.content.blog.find((entry) => entry.slug === 'zephyr-skills');
assert.equal(skills.data.content.find((block) => block._type === 'zephyrTabs').tabs.length, 4);
const video = seed.content.blog.find((entry) => entry.slug === 'ota-with-zephyr');
assert.ok(video.data.content.some((block) => block.html?.includes('<video')));
assert.ok(
  seed.content.blog
    .find((entry) => entry.slug === 'vibe-coding')
    .data.content.some((block) => block._type === 'iframe'),
);
assert.equal(
  seed.content.blog
    .find((entry) => entry.slug === 'nextjs-without-lock-in-vinext-on-zephyr')
    .data.content.filter((block) => block._type === 'zephyrTweet').length,
  2,
);
console.log(
  `Verified ${seed.content.blog.length + seed.content.changelog.length} entries, ${manifest.assets.length} assets, the release-path figures, installation tabs, video, and iframe.`,
);

// Demo data for the home page stage. Shapes mirror the real product:
// - app id `<app>.<project>.<org>` and log line `<app>.<project>.<org>#<buildId>`
// - version host: sanitized snapshot id + 9 hex chars + `-ze.zephyrcloud.app`
// - environment host: `<env>-<app_uid>-ze.zephyrcloud.app`
// - every build is attributed to its author; the plugin greets them ("Hi priya!")
// Numbers in build logs are illustrative and labelled "example output" in the UI.

export type Branch = 'main' | 'feat/cart' | 'fix/tax' | 'feat/search' | 'ai/speed';

export interface Version {
  n: number;
  branch: Branch;
  /** Git username of whoever built it. */
  author: string;
}

export interface Person {
  id: string;
  name: string;
  /** Avatar color. Muted on purpose: violet, green and coral carry product meaning. */
  tint: string;
}

/** The visitor, when they take over the demo. */
export const YOU = 'you';

export const PEOPLE: Record<string, Person> = {
  priya: { id: 'priya', name: 'Priya', tint: '#7d95c4' },
  marcus: { id: 'marcus', name: 'Marcus', tint: '#c9a063' },
  ana: { id: 'ana', name: 'Ana', tint: '#62a8a2' },
  jonas: { id: 'jonas', name: 'Jonas', tint: '#b58676' },
  sofia: { id: 'sofia', name: 'Sofia', tint: '#98a462' },
};

export const TEAM = Object.keys(PEOPLE);

/** Coding agents on the same app. They build and deploy like anyone else. */
export const AGENTS: Record<string, Person> = {
  'cart-agent': { id: 'cart-agent', name: 'cart-agent', tint: '' },
  'search-agent': { id: 'search-agent', name: 'search-agent', tint: '' },
};

export const AGENT_IDS = Object.keys(AGENTS);

export function isAgent(id: string) {
  return id in AGENTS;
}

export function personName(id: string) {
  if (id === YOU) return 'You';
  return PEOPLE[id]?.name ?? AGENTS[id]?.name ?? id;
}

export const APP_ID = 'checkout.shop.acme';
const APP_HOST_ID = 'checkout-shop-acme';
const EDGE_SUFFIX = 'ze.zephyrcloud.app';

/** Small deterministic PRNG so SSR and client render identical numbers. */
function seeded(n: number, salt: number) {
  let x = (n * 2654435761 + salt * 40503) >>> 0;
  x = (x ^ (x >>> 15)) >>> 0;
  x = Math.imul(x, 2246822519) >>> 0;
  x = (x ^ (x >>> 13)) >>> 0;
  return x / 4294967296;
}

export function versionHash(n: number) {
  return Array.from({ length: 9 }, (_, i) => Math.floor(seeded(n, i + 1) * 16).toString(16)).join('');
}

export function versionHost(v: Version) {
  return `${v.author}-${v.n}-${APP_HOST_ID}-${versionHash(v.n)}-${EDGE_SUFFIX}`;
}

export function environmentHost(environment: string) {
  return `${environment}-${APP_HOST_ID}-${EDGE_SUFFIX}`;
}

export function tagHost(tag: string) {
  return `t-${tag}-${APP_HOST_ID}-${EDGE_SUFFIX}`;
}

export const TOTAL_ASSETS = 48;

export function changedAssetCount(n: number) {
  return 3 + Math.floor(seeded(n, 7) * 12);
}

/** Which of the build's files changed; the same set every render for build `n`. */
export function changedAssets(n: number): Set<number> {
  const order = Array.from({ length: TOTAL_ASSETS }, (_, i) => i);
  for (let i = order.length - 1; i > 0; i -= 1) {
    const j = Math.floor(seeded(n, 100 + i) * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return new Set(order.slice(0, changedAssetCount(n)));
}

export interface LogLine {
  kind: 'bundler' | 'zephyr' | 'url';
  text: string;
}

export function buildLog(v: Version): LogLine[] {
  const changed = changedAssetCount(v.n);
  const uploadMs = 180 + Math.floor(seeded(v.n, 3) * 520);
  const kb = (changed * 41 + seeded(v.n, 4) * 90).toFixed(2);
  const deployMs = uploadMs + 240 + Math.floor(seeded(v.n, 5) * 380);
  const builtIn = (1.6 + seeded(v.n, 6) * 1.4).toFixed(2);

  return [
    { kind: 'bundler', text: `✓ built in ${builtIn}s` },
    { kind: 'zephyr', text: `Hi ${v.author}!` },
    { kind: 'zephyr', text: `${APP_ID}#${v.n}` },
    { kind: 'zephyr', text: `(${changed}/${TOTAL_ASSETS} assets uploaded in ${uploadMs}ms, ${kb}kb)` },
    { kind: 'zephyr', text: `Deployed to Zephyr's edge in ${deployMs}ms.` },
    { kind: 'url', text: `https://${versionHost(v)}` },
  ];
}

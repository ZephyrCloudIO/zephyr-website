// Shared data for the "Build-time checks aren't enough" film and figures.
// Versions match the home page product demo (host 120, catalog 211, search 86) and the blog post.
// "Snapshot" is an informal, schematic word for a set of versions held still. It isn't a product noun.

export type AppId = 'host' | 'catalog' | 'search' | 'checkout';

/** Row order inside a snapshot: the host first, then the remotes it loads. */
export const ROWS: readonly AppId[] = ['host', 'catalog', 'search', 'checkout'];

export const APP_LABEL: Record<AppId, string> = {
  host: 'Host',
  catalog: 'Catalog',
  search: 'Search',
  checkout: 'Checkout',
};

export interface Snapshot {
  name: string;
  versions: Record<AppId, number>;
}

/** What ordinary users run today. */
export const PREVIOUS: Snapshot = {
  name: 'snap-checkout-53',
  versions: { host: 120, catalog: 211, search: 86, checkout: 53 },
};

/** The combination under test: the same host and remotes, plus the candidate. */
export const CANDIDATE: Snapshot = {
  name: 'snap-checkout-54',
  versions: { host: 120, catalog: 211, search: 86, checkout: 54 },
};

/** A remote that shipped on its own. It tries to join the candidate and the frame refuses it. */
export const STRAY = { app: 'catalog', n: 212 } as const satisfies { app: AppId; n: number };

/** The meeting nobody tested: the same host loading each remote's newest build. */
export const UNTESTED: Record<AppId, number> = { host: 120, catalog: STRAY.n, search: 86, checkout: 54 };

/** Exposure steps for ordinary traffic. Illustrative: how far to go is a policy. */
export const STOPS = [0, 1, 10, 50, 100] as const;
export type StopIndex = 0 | 1 | 2 | 3 | 4;

/** The candidate's change, as a reviewer would see it. Illustrative. */
export const DIFF = { added: 214, removed: 37 };

/** Who reviews the candidate; one of the home page's cast. */
export const REVIEWER = 'marcus';

/** A conversation, not "available today". */
export const CTA = {
  label: 'Evaluate this workflow with Zephyr Cloud',
  href: 'mailto:inbound@zephyr-cloud.io?subject=Evaluate%20the%20release%20path',
};

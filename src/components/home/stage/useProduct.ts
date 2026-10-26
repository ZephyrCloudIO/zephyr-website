import { useCallback, useRef, useState } from 'react';
import type { Version } from './model';

// Chapter 3: the checkout app is one remote in a Module Federation product.
// Remotes resolve per environment (`zephyr:<app>.shop.acme@<environment>`), so
// releasing a remote changes what that environment loads without rebuilding the shell.

export type EnvironmentName = 'staging' | 'production';
export type RemoteId = 'shell' | 'checkout' | 'catalog' | 'search';

export interface RemoteApp {
  id: RemoteId;
  team: string;
  owners: string[];
  versions: Version[];
  staging: number;
  production: number;
}

export interface AuditEntry {
  id: number;
  who: string;
  text: string;
}

type OtherRemote = Exclude<RemoteId, 'checkout'>;

const START: Record<OtherRemote, RemoteApp> = {
  shell: {
    id: 'shell',
    team: 'Platform',
    owners: ['jonas'],
    versions: [
      { n: 118, branch: 'main', author: 'jonas' },
      { n: 119, branch: 'main', author: 'jonas' },
      { n: 120, branch: 'main', author: 'jonas' },
    ],
    staging: 120,
    production: 119,
  },
  catalog: {
    id: 'catalog',
    team: 'Catalog',
    owners: ['ana'],
    versions: [
      { n: 210, branch: 'main', author: 'ana' },
      { n: 211, branch: 'main', author: 'ana' },
      { n: 212, branch: 'main', author: 'ana' },
    ],
    staging: 212,
    production: 211,
  },
  search: {
    id: 'search',
    team: 'Discovery',
    owners: ['sofia', 'search-agent'],
    versions: [
      { n: 86, branch: 'main', author: 'sofia' },
      { n: 87, branch: 'main', author: 'search-agent' },
      { n: 88, branch: 'main', author: 'search-agent' },
    ],
    staging: 88,
    production: 86,
  },
};

export const CHECKOUT_TEAM = { team: 'Payments', owners: ['priya', 'marcus', 'cart-agent'] };

/** Only the protected environment's members can publish to it. */
export const PROTECTED: Record<EnvironmentName, boolean> = { staging: false, production: true };

export function useProduct() {
  const [remotes, setRemotes] = useState(START);
  const [environment, setEnvironment] = useState<EnvironmentName>('production');
  const [audit, setAudit] = useState<AuditEntry[]>(() => [
    { id: 2, who: 'priya', text: 'released checkout to production' },
    { id: 1, who: 'ana', text: 'released catalog #211 to production' },
  ]);
  const auditId = useRef(2);

  const log = useCallback((who: string, text: string) => {
    auditId.current += 1;
    const id = auditId.current;
    setAudit((a) => [{ id, who, text }, ...a].slice(0, 3));
  }, []);

  // Allocated synchronously, like the rail, so scripts know a build's number right away.
  const nextRef = useRef<Record<OtherRemote, number>>({ shell: 121, catalog: 213, search: 89 });

  /** A remote team (or agent) ships a build; staging follows it, production waits. */
  const deployRemote = useCallback((id: OtherRemote, author: string) => {
    const n = nextRef.current[id];
    nextRef.current[id] += 1;
    setRemotes((all) => {
      const app = all[id];
      const versions = [...app.versions, { n, branch: 'main' as const, author }].slice(-6);
      return { ...all, [id]: { ...app, versions, staging: n } };
    });
    return n;
  }, []);

  const releaseRemote = useCallback(
    (id: OtherRemote, n: number, by: string) => {
      setRemotes((all) => ({ ...all, [id]: { ...all[id], production: n } }));
      log(by, `released ${id} #${n} to production`);
    },
    [log],
  );

  const peekRemote = useCallback((id: OtherRemote) => nextRef.current[id], []);

  return { remotes, environment, setEnvironment, audit, log, peekRemote, deployRemote, releaseRemote };
}

export type Product = ReturnType<typeof useProduct>;

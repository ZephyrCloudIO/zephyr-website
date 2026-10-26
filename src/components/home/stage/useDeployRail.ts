import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { Branch, Version } from './model';

export type RailEvent =
  | { type: 'deployed'; n: number; by: string; branch: Branch }
  | { type: 'released'; n: number; from: number; rollback: boolean; by: string }
  /** A person spotted a problem with a build. Zephyr doesn't detect it; people do. */
  | { type: 'reported'; n: number; by: string; note: string };

export interface RailState {
  versions: Version[];
  /** Environment: moves only on release. */
  production: number;
  /** Who last moved `production`. */
  releasedBy: string;
  /** Tag: follows every new build on `main` automatically. */
  latest: number;
  /** Build someone reported as broken, if any. */
  fault: number | null;
  lastEvent: RailEvent | null;
}

const MAX_VERSIONS = 16;

export function newestOn(versions: Version[], branch: Branch): number | null {
  for (let i = versions.length - 1; i >= 0; i -= 1) if (versions[i].branch === branch) return versions[i].n;
  return null;
}

export function useDeployRail(initial: {
  versions: Version[];
  production: number;
  releasedBy: string;
  lastEvent?: RailEvent | null;
}) {
  const [state, setState] = useState<RailState>(() => ({
    versions: initial.versions,
    production: initial.production,
    releasedBy: initial.releasedBy,
    latest: newestOn(initial.versions, 'main') ?? initial.versions[initial.versions.length - 1].n,
    fault: null,
    lastEvent: initial.lastEvent ?? null,
  }));

  // Build numbers are allocated synchronously so back-to-back deploys never collide.
  const nextRef = useRef(initial.versions[initial.versions.length - 1].n + 1);
  const peekNext = useCallback(() => nextRef.current, []);

  const deploy = useCallback((branch: Branch, author: string) => {
    const n = nextRef.current;
    nextRef.current += 1;
    setState((s) => {
      const versions = [...s.versions, { n, branch, author }];
      if (versions.length > MAX_VERSIONS) {
        // Drop the oldest build that isn't currently released.
        versions.splice(
          versions.findIndex((v) => v.n !== s.production),
          1,
        );
      }
      return {
        ...s,
        versions,
        latest: branch === 'main' ? n : s.latest,
        lastEvent: { type: 'deployed', n, by: author, branch },
      };
    });
    return n;
  }, []);

  const release = useCallback((n: number, by: string) => {
    setState((s) =>
      s.production === n
        ? s
        : {
            ...s,
            production: n,
            releasedBy: by,
            lastEvent: { type: 'released', n, from: s.production, rollback: n < s.production, by },
          },
    );
  }, []);

  const report = useCallback((n: number, by: string, note: string) => {
    setState((s) => ({ ...s, fault: n, lastEvent: { type: 'reported', n, by, note } }));
  }, []);

  const clearFault = useCallback(() => {
    setState((s) => (s.fault === null ? s : { ...s, fault: null }));
  }, []);

  return {
    ...state,
    peekNext,
    newestMain: newestOn(state.versions, 'main') ?? state.latest,
    newestAi: newestOn(state.versions, 'ai/speed'),
    deploy,
    release,
    report,
    clearFault,
  };
}

export type DeployRail = ReturnType<typeof useDeployRail>;

/**
 * Cancellable sleeps for scripted demo sequences. `sleep` resolves to false once
 * `cancel()` runs (or the component unmounts), so sequences can bail out early.
 */
export function useSequencer() {
  const token = useRef(0);
  const timers = useRef<number[]>([]);

  const cancel = useCallback(() => {
    token.current += 1;
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  }, []);

  const sleep = useCallback((ms: number) => {
    const issued = token.current;
    return new Promise<boolean>((resolve) => {
      const id = window.setTimeout(() => resolve(issued === token.current), ms);
      timers.current.push(id);
    });
  }, []);

  useEffect(() => cancel, [cancel]);

  return useMemo(() => ({ sleep, cancel }), [sleep, cancel]);
}

/** Always-current ref, for reading fresh state inside long-running sequences. */
export function useLatest<T>(value: T) {
  const ref = useRef(value);
  ref.current = value;
  return ref;
}

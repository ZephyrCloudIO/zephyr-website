// The film's edit decision list. Each cut is a list of timed cues; the frame at any time is the
// initial state with every cue up to that time applied, so playing, scrubbing and jumping to a
// chapter all land on the same picture. Captions are canonical: the film has no sound.
//
// Three ideas stay on screen once the snapshot is named, each on its own clock:
// composition (the frame and its versions), exposure (who is connected), acceptance (the chip).

import type { Acceptance } from '../AcceptanceChip';
import type { AppId, StopIndex } from '../model';

export type CutId = '90' | '30' | '15';

export interface FilmState {
  scene: 'cold' | 'main' | 'end';

  // Cold open: remotes pass their builds, meet under a host, and one interaction fails.
  coldCards: number;
  coldPassed: number;
  coldAssembled: boolean;
  coldCursor: 'hidden' | 'moving' | 'click';
  coldFault: boolean;

  // Composition
  /** The set ordinary users run, framed; named once the candidate is. */
  prevNamed: boolean;
  /** `checkout`: the candidate is deployed on its own. `all`: the host and remotes join it. */
  candidate: 'none' | 'checkout' | 'all';
  frame: 'none' | 'plain' | 'named' | 'locked';
  deployedNote: boolean;
  stray: 'hidden' | 'shelf' | 'approach' | 'refused';

  // Exposure
  qa: 'hidden' | 'connected' | 'running' | 'done';
  qaLog: number;
  lit: AppId[];
  result: boolean;
  stops: boolean;
  exposure: StopIndex;
  gate: { stop: StopIndex; state: 'checking' | 'passed' | 'failed' } | null;
  offRamp: boolean;
  edgeNote: boolean;
  burnIn: number;
  /** The second evidence card: what the change was for. Illustrative. */
  intended: boolean;
  /** Ordinary traffic moved back; the candidate stays deployed, off the path. */
  shelved: boolean;

  // Acceptance
  /** How far exposure had gone when the evidence went to review. */
  evidence: StopIndex;
  acceptance: Acceptance | 'hidden';
  pulse: number;
  reviewer: 'hidden' | 'arrive' | 'approved' | 'rejected';
  merge: 'hidden' | 'branch' | 'merged';
  pointerNote: boolean;

  /** What the lane under the track shows. */
  lane: 'none' | 'qa' | 'packet' | 'outcomes' | 'review';
  /** An alternate path, e.g. "If a check fails". The main path resumes after it. */
  branch: string | null;
  caption: string;
}

export const INITIAL: FilmState = {
  scene: 'cold',
  coldCards: 0,
  coldPassed: 0,
  coldAssembled: false,
  coldCursor: 'hidden',
  coldFault: false,
  prevNamed: false,
  candidate: 'none',
  frame: 'none',
  deployedNote: false,
  stray: 'hidden',
  qa: 'hidden',
  qaLog: 0,
  lit: [],
  result: false,
  stops: false,
  exposure: 0,
  gate: null,
  offRamp: false,
  edgeNote: false,
  burnIn: 0,
  intended: false,
  shelved: false,
  evidence: 0,
  acceptance: 'hidden',
  pulse: 0,
  reviewer: 'hidden',
  merge: 'hidden',
  pointerNote: false,
  lane: 'none',
  branch: null,
  caption: '',
};

export interface Cue {
  at: number;
  set: Partial<FilmState>;
  /** A discontinuity (new scene, or back from a branch): the stage dips and elements jump. */
  cut?: boolean;
}

export interface Chapter {
  at: number;
  label: string;
  /** What's on screen, for the transcript. Captions come from the cues. */
  describe: string;
}

export interface Cut {
  id: CutId;
  /** `1:30` */
  length: string;
  duration: number;
  /** A representative frame for no-JS, reduced motion and the first paint. */
  poster: number;
  cues: Cue[];
  chapters: Chapter[];
}

export const CAPTIONS = {
  built: 'Build passed.',
  failed: 'Build passed. Runtime failed.',
  deployed: 'Deployed is not released.',
  combination: 'Check the exact combination.',
  qa: 'Start with a QA user in production.',
  expand: 'Expand only if you choose to.',
  rollBack: 'Failed checks roll back.',
  fullTraffic: 'Full traffic can precede merge.',
  review: 'Review with production evidence.',
  rejection: 'Rejection is also a release action.',
  before: 'Check the combination before ordinary traffic moves.',
  end: 'Build-time checks aren’t enough.',
} as const;

export const BRANCHES = {
  check: 'If a check fails',
  reject: 'If the reviewer says no',
} as const;

const round = (n: number) => Math.round(n * 100) / 100;

/** Three remotes pass, meet under a host, and adding to cart fails. `pace` scales the beat. */
function coldOpen(pace: number, splitCaption: boolean): Cue[] {
  const at = (s: number) => round(s * pace);
  return [
    { at: at(0.2), set: { coldCards: 1 } },
    { at: at(0.6), set: { coldCards: 2, coldPassed: 1 } },
    { at: at(1.0), set: { coldCards: 3, coldPassed: 2 } },
    { at: at(1.4), set: { coldPassed: 3 } },
    ...(splitCaption ? [{ at: at(1.9), set: { caption: CAPTIONS.built } }] : []),
    { at: at(2.7), set: { coldAssembled: true } },
    { at: at(4.0), set: { coldCursor: 'moving' } },
    { at: at(4.9), set: { coldCursor: 'click' } },
    { at: at(5.2), set: { coldFault: true } },
    { at: at(5.6), set: { caption: CAPTIONS.failed } },
  ];
}

/** Each step follows a check. */
function step(t: number, stop: StopIndex, pace = 1): Cue[] {
  return [
    { at: round(t), set: { gate: { stop, state: 'checking' } } },
    { at: round(t + 0.8 * pace), set: { gate: { stop, state: 'passed' } } },
    { at: round(t + 1.0 * pace), set: { exposure: stop } },
    { at: round(t + 1.9 * pace), set: { gate: null } },
  ];
}

/** QA runs real interactions through the assembled app, then reports. */
function qaRun(t: number, pace = 1): Cue[] {
  const at = (s: number) => round(t + s * pace);
  return [
    { at: at(0), set: { qa: 'running', lane: 'qa', qaLog: 1, lit: ['host', 'search'] } },
    { at: at(1.3), set: { qaLog: 2, lit: ['catalog', 'checkout'] } },
    { at: at(2.6), set: { qaLog: 3, lit: ['host', 'checkout'] } },
    { at: at(3.9), set: { qa: 'done', lit: [], result: true } },
  ];
}

function burnIn(t: number, ticks: number, every: number): Cue[] {
  return Array.from({ length: ticks }, (_, i) => ({ at: round(t + i * every), set: { burnIn: i + 1 } }));
}

/** The set ordinary users are on, and the candidate deployed beside it. */
const MAIN: Partial<FilmState> = { scene: 'main', caption: '' };

const sortCues = (cues: Cue[]) => [...cues].sort((a, b) => a.at - b.at);

const CUT_90: Cut = {
  id: '90',
  length: '1:30',
  duration: 90,
  poster: 38,
  cues: sortCues([
    ...coldOpen(1, true),

    { at: 8, cut: true, set: MAIN },
    { at: 9, set: { candidate: 'checkout', deployedNote: true } },
    { at: 9.8, set: { stray: 'shelf' } },
    { at: 10.4, set: { caption: CAPTIONS.deployed } },

    { at: 17, set: { candidate: 'all', deployedNote: false, caption: '' } },
    { at: 18.6, set: { frame: 'plain' } },
    { at: 19.3, set: { frame: 'named', prevNamed: true } },
    { at: 20, set: { frame: 'locked', acceptance: 'unmerged' } },
    { at: 20.5, set: { caption: CAPTIONS.combination } },
    { at: 22.6, set: { stray: 'approach' } },
    { at: 23.3, set: { stray: 'refused' } },
    { at: 24.8, set: { stray: 'shelf' } },

    { at: 28, set: { qa: 'connected', stray: 'hidden', caption: '' } },
    { at: 28.8, set: { caption: CAPTIONS.qa } },
    ...qaRun(29.6),

    { at: 40, set: { stops: true, lane: 'none', result: false, caption: '' } },
    { at: 40.6, set: { caption: CAPTIONS.expand } },
    ...step(41.2, 1),
    ...step(43.4, 2),
    { at: 45.4, set: { offRamp: true, lane: 'packet' } },
    { at: 49, set: { lane: 'none' } },
    ...step(49.4, 3),

    { at: 54, set: { branch: BRANCHES.check, caption: '' } },
    { at: 54.4, set: { gate: { stop: 4, state: 'checking' } } },
    { at: 55.3, set: { gate: { stop: 4, state: 'failed' } } },
    { at: 55.5, set: { caption: CAPTIONS.rollBack } },
    { at: 55.9, set: { exposure: 0 } },
    { at: 56.8, set: { shelved: true, gate: null } },

    { at: 59, cut: true, set: { branch: null, shelved: false, exposure: 3, gate: null, caption: '' } },
    ...step(59.6, 4),
    { at: 61.2, set: { caption: CAPTIONS.fullTraffic, edgeNote: true } },
    { at: 62, set: { pulse: 1 } },
    { at: 64.2, set: { lane: 'outcomes' } },
    ...burnIn(64.4, 12, 0.25),
    { at: 67.4, set: { intended: true } },

    { at: 70, set: { lane: 'review', reviewer: 'arrive', evidence: 4, caption: '' } },
    { at: 70.5, set: { caption: CAPTIONS.review } },
    { at: 71.8, set: { acceptance: 'review' } },

    { at: 74.5, set: { branch: BRANCHES.reject, caption: '' } },
    { at: 74.9, set: { reviewer: 'rejected', acceptance: 'rejected' } },
    { at: 75.6, set: { exposure: 0 } },
    { at: 76.1, set: { caption: CAPTIONS.rejection } },
    { at: 76.6, set: { shelved: true } },

    {
      at: 79,
      cut: true,
      set: {
        branch: null,
        shelved: false,
        exposure: 4,
        reviewer: 'arrive',
        evidence: 4,
        acceptance: 'review',
        caption: CAPTIONS.review,
      },
    },
    { at: 79.8, set: { reviewer: 'approved' } },
    { at: 80.5, set: { pointerNote: true } },
    { at: 81.1, set: { acceptance: 'accepted' } },
    { at: 82, set: { merge: 'branch' } },
    { at: 83, set: { merge: 'merged' } },

    { at: 85, cut: true, set: { scene: 'end', caption: '' } },
  ]),
  chapters: [
    {
      at: 0,
      label: 'Runtime failed',
      describe:
        'Checkout 54, Catalog 212 and Search 86 each pass their builds and assemble under Host 120. Adding to cart fails: cart.add is not a function.',
    },
    {
      at: 8,
      label: 'Deployed',
      describe:
        'Ordinary users stay on the versions they have: Host 120, Catalog 211, Search 86, Checkout 53. Checkout 54 is deployed beside them, live at its own URL, with nobody pointed at it. Catalog 212 is deployed too.',
    },
    {
      at: 17,
      label: 'Snapshot',
      describe:
        'Host 120, Catalog 211 and Search 86 join Checkout 54 inside a frame named snap-checkout-54, and the frame locks. The set users are on is snap-checkout-53. Catalog 212 tries to join on its own and the frame refuses it. The acceptance chip reads Unmerged.',
    },
    {
      at: 28,
      label: 'QA in production',
      describe:
        'A QA user connects to snap-checkout-54 in production and runs search, add to cart and place order through the assembled app. Result: compatible. Ordinary users have not moved.',
    },
    {
      at: 40,
      label: 'Exposure',
      describe:
        'Ordinary traffic walks 1%, then 10%, each step after a check. At 10% a person can pull the evidence packet and stop there. The team keeps going to 50%.',
    },
    {
      at: 54,
      label: 'Failed check',
      describe:
        'If a check fails: the pointer moves ordinary users back to snap-checkout-53. The candidate stays deployed, off the path.',
    },
    {
      at: 59,
      label: 'Full traffic',
      describe:
        'The optional edge: everyone is on snap-checkout-54 while the chip still reads Unmerged. A burn-in period passes. Two evidence cards: composition held, and an intended outcome that is illustrative and needs a comparison window.',
    },
    {
      at: 70,
      label: 'Review',
      describe: 'The diff, the snapshot and the evidence arrive with a reviewer. The chip reads Review.',
    },
    {
      at: 74.5,
      label: 'Rejection',
      describe:
        'If the reviewer says no: the pointer moves ordinary users back to snap-checkout-53, the chip reads Rejected, and the candidate stays deployed and dim.',
    },
    {
      at: 79,
      label: 'Accept',
      describe:
        'The reviewer approves. The pointer stays where it is. The chip flips to Accepted, and the branch merges last. Merge keeps the snapshot as baseline.',
    },
    { at: 85, label: 'End', describe: 'The Zephyr Cloud wordmark.' },
  ],
};

const CUT_30: Cut = {
  id: '30',
  length: '0:30',
  duration: 30,
  poster: 11.6,
  cues: sortCues([
    ...coldOpen(0.72, true),

    { at: 6, cut: true, set: { ...MAIN, candidate: 'all', stray: 'shelf' } },
    { at: 6.3, set: { frame: 'plain' } },
    { at: 6.6, set: { frame: 'named', prevNamed: true, caption: CAPTIONS.combination } },
    { at: 6.9, set: { frame: 'locked', acceptance: 'unmerged' } },
    { at: 7.5, set: { stray: 'approach' } },
    { at: 8, set: { stray: 'refused' } },
    { at: 8.8, set: { stray: 'hidden' } },
    { at: 9, set: { qa: 'connected', caption: CAPTIONS.qa } },
    ...qaRun(9.4, 0.4),

    { at: 12, set: { stops: true, lane: 'none', result: false, caption: CAPTIONS.expand } },
    ...step(12.4, 1, 0.6),
    ...step(13.6, 2, 0.6),
    { at: 14.8, set: { offRamp: true, lane: 'packet' } },

    { at: 17, set: { branch: BRANCHES.check, lane: 'none', caption: '' } },
    { at: 17.3, set: { gate: { stop: 3, state: 'checking' } } },
    { at: 18, set: { gate: { stop: 3, state: 'failed' } } },
    { at: 18.2, set: { caption: CAPTIONS.rollBack } },
    { at: 18.5, set: { exposure: 0 } },
    { at: 19.3, set: { shelved: true, gate: null } },

    {
      at: 22,
      cut: true,
      set: {
        branch: null,
        shelved: false,
        exposure: 2,
        gate: null,
        lane: 'review',
        reviewer: 'arrive',
        evidence: 2,
        caption: CAPTIONS.review,
      },
    },
    { at: 23, set: { acceptance: 'review' } },
    { at: 24, set: { reviewer: 'approved' } },
    { at: 24.6, set: { pointerNote: true } },
    { at: 25, set: { acceptance: 'accepted' } },
    { at: 25.7, set: { merge: 'branch' } },
    { at: 26.5, set: { merge: 'merged' } },

    { at: 28, cut: true, set: { scene: 'end', caption: '' } },
  ]),
  chapters: [
    {
      at: 0,
      label: 'Runtime failed',
      describe: 'Three remotes pass their builds and assemble under Host 120. Adding to cart fails.',
    },
    {
      at: 6,
      label: 'Snapshot + QA',
      describe:
        'snap-checkout-54 locks Host 120, Catalog 211, Search 86 and Checkout 54 together and refuses Catalog 212. A QA user runs it in production: compatible.',
    },
    {
      at: 12,
      label: 'Exposure',
      describe: 'Ordinary traffic walks to 1%, then 10%, where a person can stop and pull the evidence packet.',
    },
    {
      at: 17,
      label: 'Failed check',
      describe: 'If a check fails, the pointer moves ordinary users back and the candidate stays deployed.',
    },
    {
      at: 22,
      label: 'Review',
      describe:
        'At 10%, the evidence packet goes to a reviewer with the diff. Approved, the chip flips to Accepted and the branch merges last.',
    },
    { at: 28, label: 'End', describe: 'The Zephyr Cloud wordmark.' },
  ],
};

const CUT_15: Cut = {
  id: '15',
  length: '0:15',
  duration: 15,
  poster: 10,
  cues: sortCues([
    ...coldOpen(0.55, false),

    { at: 4.5, cut: true, set: { ...MAIN, candidate: 'all' } },
    { at: 4.7, set: { frame: 'plain' } },
    { at: 5, set: { frame: 'named', prevNamed: true } },
    { at: 5.3, set: { frame: 'locked', acceptance: 'unmerged', caption: CAPTIONS.before } },
    { at: 6.6, set: { qa: 'connected' } },
    ...qaRun(7.1, 0.4),

    { at: 12, cut: true, set: { scene: 'end', caption: '' } },
  ]),
  chapters: [
    {
      at: 0,
      label: 'Runtime failed',
      describe: 'Remotes pass their builds and assemble under a host. Adding to cart fails.',
    },
    {
      at: 4.5,
      label: 'Snapshot + QA',
      describe:
        'snap-checkout-54 holds the exact combination. A QA user runs it in production and it is compatible, while ordinary users stay where they are.',
    },
    { at: 12, label: 'End', describe: 'The Zephyr Cloud wordmark.' },
  ],
};

/** The blog embeds the 0:30 cut; the 1:30 and 0:15 cuts render to video from the same timeline. */
export const CUTS: Record<CutId, Cut> = { '90': CUT_90, '30': CUT_30, '15': CUT_15 };

/** The frame at time `t`. */
export function stateAt(cut: Cut, t: number): FilmState {
  let state = INITIAL;
  for (const cue of cut.cues) {
    if (cue.at > t) break;
    state = { ...state, ...cue.set };
  }
  return state;
}

/** Index of the last cue at or before `t`, so the player knows when the frame changes. */
export function cueIndexAt(cut: Cut, t: number): number {
  let index = -1;
  for (let i = 0; i < cut.cues.length; i += 1) {
    if (cut.cues[i].at > t) break;
    index = i;
  }
  return index;
}

export function chapterAt(cut: Cut, t: number): number {
  let index = 0;
  cut.chapters.forEach((chapter, i) => {
    if (chapter.at <= t) index = i;
  });
  return index;
}

/** Captions in order, for the transcript. */
export function captionsOf(cut: Cut): { at: number; text: string }[] {
  const out: { at: number; text: string }[] = [];
  for (const cue of cut.cues) {
    const text = cue.set.caption;
    if (text) out.push({ at: cue.at, text });
  }
  return out;
}

export function formatTime(seconds: number): string {
  const s = Math.max(0, Math.floor(seconds));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

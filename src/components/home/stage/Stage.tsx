import { cn } from '@/lib/utils';
import { Pause, Play } from 'lucide-react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react';
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { EASE_IN_OUT, FADE } from '../../motion/tokens';
import { AgentSession, type SessionLine } from './AgentSession';
import { CLOUDS, CloudsScene, type CloudEnvName, type CloudId, type CloudUpload } from './CloudsScene';
import { ConfigEditor } from './ConfigEditor';
import { DeployRail } from './DeployRail';
import { FileGrid, type FilePhase } from './FileGrid';
import { buildLog, changedAssetCount, changedAssets, TOTAL_ASSETS, YOU, type Branch, type Version } from './model';
import { ProductScene } from './ProductScene';
import { RulesPanel } from './RulesPanel';
import { ScaleReadout } from './ScaleReadout';
import { SKILLS_STEPS, SkillsPanel } from './SkillsPanel';
import { CONFIG_SNIPPETS } from './snippets';
import { STACK, StackScene } from './StackScene';
import { TeamStrip } from './TeamStrip';
import { BUILD_COMMAND, Terminal } from './Terminal';
import { useDeployRail, useLatest, useSequencer } from './useDeployRail';
import { CHECKOUT_TEAM, useProduct, type RemoteApp, type RemoteId } from './useProduct';

export type BeatId =
  | 'hero'
  | 'solo-config'
  | 'solo-files'
  | 'solo-urls'
  | 'ai-attempts'
  | 'ai-release'
  | 'ai-skills'
  | 'teams-split'
  | 'teams-envs'
  | 'teams-guardrails'
  | 'clouds-deploy'
  | 'clouds-release'
  | 'clouds-switch'
  | 'stack-web'
  | 'stack-ssr'
  | 'stack-native';

const BEAT_LEVEL: Record<BeatId, number> = {
  hero: 0,
  'solo-config': 0,
  'solo-files': 0,
  'solo-urls': 0,
  'ai-attempts': 1,
  'ai-release': 1,
  'ai-skills': 1,
  'teams-split': 2,
  'teams-envs': 2,
  'teams-guardrails': 2,
  'clouds-deploy': 3,
  'clouds-release': 3,
  'clouds-switch': 3,
  'stack-web': 4,
  'stack-ssr': 4,
  'stack-native': 4,
};

// The camera only pulls back: each level's view zooms out of the previous one's focal point.
type View = 'app' | 'product' | 'clouds' | 'stack';
const VIEWS: View[] = ['app', 'product', 'clouds', 'stack'];
const viewOf = (level: number): View => VIEWS[Math.max(0, level - 1)] ?? 'app';
/**
 * Where the previous view sits inside each view (fractions of the stage). A zoom between two
 * views scales both about the higher view's focal point, so one reads as a part of the other.
 */
const FOCAL: Record<View, { x: number; y: number }> = {
  app: { x: 0.5, y: 0.5 },
  product: { x: 0.17, y: 0.37 },
  clouds: { x: 0.17, y: 0.32 },
  stack: { x: 0.5, y: 0.62 },
};
const ZOOM = { duration: 1.05, ease: EASE_IN_OUT } as const;
interface ZoomCustom {
  dir: number;
  x: number;
  y: number;
}
const viewVariants = {
  enter: (c: ZoomCustom) => ({ opacity: 0, scale: c.dir > 0 ? 2.4 : 0.42, originX: c.x, originY: c.y }),
  center: (c: ZoomCustom) => ({ opacity: 1, scale: 1, originX: c.x, originY: c.y }),
  exit: (c: ZoomCustom) => ({ opacity: 0, scale: c.dir > 0 ? 0.42 : 2.4, originX: c.x, originY: c.y }),
};

const CLOUD_ENVS: CloudEnvName[] = ['staging', 'production', 'production-eu'];

/** Which chip in the full-stack view sends the next build. */
const STACK_SWEEP = [0, 7, 2, 11, 4, 8, 13, 19, 1, 22, 9, 3];

/** Who ships next in the product view, and to which remote. */
const REMOTE_BUILDS: { remote: RemoteId; who: string }[] = [
  { remote: 'catalog', who: 'ana' },
  { remote: 'search', who: 'search-agent' },
  { remote: 'checkout', who: 'marcus' },
  { remote: 'shell', who: 'jonas' },
  { remote: 'search', who: 'sofia' },
  { remote: 'checkout', who: 'cart-agent' },
];

// A small team on one app: builds come from everyone and every branch.
const INITIAL_VERSIONS: Version[] = [
  { n: 39, branch: 'main', author: 'jonas' },
  { n: 40, branch: 'main', author: 'ana' },
  { n: 41, branch: 'feat/cart', author: 'marcus' },
  { n: 42, branch: 'main', author: 'priya' },
];
const INITIAL_PRODUCTION = 40;
const INITIAL_RELEASER = 'marcus';
/** Builds between epochs, so a later figure opens further into the story. */
const EPOCH_BUILDS = 4;

/** Who builds next in the demo, and from which branch. Feature branches deploy too. */
const BUILDS: { author: string; branch: Branch }[] = [
  { author: 'marcus', branch: 'feat/cart' },
  { author: 'jonas', branch: 'main' },
  { author: 'sofia', branch: 'fix/tax' },
  { author: 'priya', branch: 'main' },
  { author: 'ana', branch: 'feat/search' },
  { author: 'marcus', branch: 'main' },
];

/** Releases are usually someone reviewing a teammate's build. */
const RELEASERS = ['ana', 'priya', 'jonas', 'sofia'];

const AGENT = 'cart-agent';
const AGENT_IDEAS = [
  'lazy-load the payment form',
  'split the vendor bundle',
  'inline the critical CSS',
  'defer address autocomplete',
  'prefetch shipping rates',
  'fix the coupon field on Safari',
];
const PROMPT: Omit<SessionLine, 'id'> = { who: 'priya', text: 'Make checkout load faster on mobile.' };

interface StageProps {
  beat: BeatId;
  /** The desktop stage pinned beside the story; fixed height so views can zoom in place. */
  pinned?: boolean;
  /**
   * Phones show one figure per chapter, each its own demo. Later chapters start further along
   * (higher build numbers) so consecutive figures don't open on identical rails.
   */
  epoch?: number;
  /** Controlled pause; the phone chapter stops auto-advancing its steps while paused. */
  paused?: boolean;
  onPausedChange?: (paused: boolean) => void;
  /** The visitor took over the demo: released, built, or switched something by hand. */
  onInteract?: () => void;
  className?: string;
}

export function Stage({
  beat,
  pinned = false,
  epoch = 0,
  paused: pausedProp,
  onPausedChange,
  onInteract,
  className,
}: StageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const reduce = useReducedMotion();
  const auto = useSequencer();
  const manual = useSequencer();

  const level = BEAT_LEVEL[beat];
  const view = viewOf(level);
  const lastLevel = useRef(level);
  const zoomDir = level >= lastLevel.current ? 1 : -1;
  useEffect(() => {
    lastLevel.current = level;
  }, [level]);

  const product = useProduct();
  const productRef = useLatest(product);
  const [activeRemote, setActiveRemote] = useState<RemoteId | null>(null);
  const [blocked, setBlocked] = useState<RemoteId | null>(null);

  // Chapter 4: shop.acme's environments, each on its own edge.
  const [envClouds, setEnvClouds] = useState<Record<CloudEnvName, CloudId>>({
    staging: 'zephyr',
    production: 'aws',
    'production-eu': 'akamai',
  });
  const envCloudsRef = useLatest(envClouds);
  const [euBuild, setEuBuild] = useState<number | null>(() => product.remotes.shell.production);
  const [upload, setUpload] = useState<CloudUpload | null>(null);
  const [switched, setSwitched] = useState<CloudEnvName | null>(null);
  /** Edges that already hold earlier builds; a fresh edge gets every file once. */
  const seenEdges = useRef(new Set<CloudId>(['zephyr', 'aws', 'akamai']));
  const pendingSwitch = useRef<CloudId | null>(null);

  // Chapter 5: the full stack.
  const [lit, setLit] = useState<number | null>(null);
  const [nativeVersion, setNativeVersion] = useState(52);
  const [nativeUpdated, setNativeUpdated] = useState(false);

  const lastView = useRef(view);
  useEffect(() => {
    lastView.current = view;
  }, [view]);
  const zoomCustom: ZoomCustom = { dir: zoomDir, ...FOCAL[zoomDir > 0 ? view : lastView.current] };

  const [start] = useState(() => {
    const shift = epoch * EPOCH_BUILDS;
    return {
      versions: INITIAL_VERSIONS.map((v) => ({ ...v, n: v.n + shift })),
      production: INITIAL_PRODUCTION + shift,
    };
  });
  const newest = start.versions[start.versions.length - 1];
  const rail = useDeployRail({
    versions: start.versions,
    production: start.production,
    releasedBy: INITIAL_RELEASER,
    lastEvent: { type: 'deployed', n: newest.n, by: newest.author, branch: newest.branch },
  });
  const railRef = useLatest(rail);
  /** The beat a visitor took over; its autoplay stops, other beats keep playing. */
  const [takeover, setTakeover] = useState<BeatId | null>(null);
  const [builder, setBuilder] = useState<string | null>(null);
  /** Visitor pause (WCAG 2.2.2): stops scripted loops and freezes CSS animations inside the stage. */
  const [pausedState, setPausedState] = useState(false);
  const paused = pausedProp ?? pausedState;
  const togglePaused = () => {
    setPausedState(!paused);
    onPausedChange?.(!paused);
  };

  const [terminal, setTerminal] = useState(() => ({
    author: newest.author,
    typed: BUILD_COMMAND.length,
    lines: buildLog(newest),
    busy: false,
  }));
  const [snippet, setSnippet] = useState(0);
  const [snippetPinned, setSnippetPinned] = useState(false);
  const [files, setFiles] = useState<{ phase: FilePhase; changed: Set<number>; version: Version }>(() => ({
    phase: 'done',
    changed: changedAssets(newest.n + 1),
    version: { n: newest.n + 1, ...BUILDS[0] },
  }));
  const [session, setSession] = useState<SessionLine[]>(() => [{ id: 0, ...PROMPT }]);
  const [reloads, setReloads] = useState(0);
  const [skillsStep, setSkillsStep] = useState(SKILLS_STEPS);

  const buildTurn = useRef(0);
  const releaseTurn = useRef(0);
  const attemptTurn = useRef(0);
  const lineId = useRef(0);

  const nextBuild = useCallback((): Version => {
    const plan = BUILDS[buildTurn.current % BUILDS.length];
    buildTurn.current += 1;
    return { n: railRef.current.peekNext(), ...plan };
  }, [railRef]);
  const nextReleaser = useCallback(() => {
    const who = RELEASERS[releaseTurn.current % RELEASERS.length];
    releaseTurn.current += 1;
    return who;
  }, []);

  const say = useCallback((line: Omit<SessionLine, 'id'>) => {
    lineId.current += 1;
    const id = lineId.current;
    setSession((s) => [...s, { ...line, id }].slice(-6));
  }, []);
  const patchLast = useCallback((patch: Partial<SessionLine>) => {
    setSession((s) => s.map((line, i) => (i === s.length - 1 ? { ...line, ...patch } : line)));
  }, []);

  /** The agent tries something and deploys it like any other build. */
  const agentAttempt = useCallback(
    async (sleep: (ms: number) => Promise<boolean>, instant = false) => {
      const idea = AGENT_IDEAS[attemptTurn.current % AGENT_IDEAS.length];
      attemptTurn.current += 1;
      say({ who: AGENT, text: `Attempt ${attemptTurn.current}: ${idea}.`, pending: !instant });
      if (!instant) {
        setBuilder(AGENT);
        if (!(await sleep(1300))) return null;
      }
      const n = railRef.current.deploy('ai/speed', AGENT);
      patchLast({ n, pending: false });
      setReloads((r) => r + 1);
      setBuilder(null);
      return n;
    },
    [railRef, say, patchLast],
  );

  /** Who is driving the terminal right now; only autoplay builds get interrupted. */
  const buildOwner = useRef<'auto' | 'manual' | null>(null);

  const settleTerminal = useCallback(() => {
    const last = railRef.current.versions[railRef.current.versions.length - 1];
    setTerminal({ author: last.author, typed: BUILD_COMMAND.length, lines: buildLog(last), busy: false });
    setBuilder(null);
  }, [railRef]);

  /** Types the command, streams the plugin log, then lands the build on the rail. */
  const runBuild = useCallback(
    async (version: Version, sleep: (ms: number) => Promise<boolean>, owner: 'auto' | 'manual') => {
      buildOwner.current = owner;
      const log = buildLog(version);
      setBuilder(version.author);
      setTerminal({ author: version.author, typed: 0, lines: [], busy: true });
      for (let i = 1; i <= BUILD_COMMAND.length; i += 1) {
        if (!(await sleep(42))) return false;
        setTerminal((t) => ({ ...t, typed: i }));
      }
      for (let i = 0; i < log.length; i += 1) {
        if (!(await sleep(i === 0 ? 520 : 240))) return false;
        setTerminal((t) => ({ ...t, lines: log.slice(0, i + 1) }));
      }
      if (!(await sleep(220))) return false;
      railRef.current.deploy(version.branch, version.author);
      setTerminal((t) => ({ ...t, busy: false }));
      setBuilder(null);
      buildOwner.current = null;
      return true;
    },
    [railRef],
  );

  // Reduced motion: agent beats jump straight to a coherent end state instead of playing.
  useEffect(() => {
    if (!reduce || !inView || (beat !== 'ai-attempts' && beat !== 'ai-release')) return;
    const noop = () => Promise.resolve(true);
    void (async () => {
      const attempts: number[] = [];
      if (railRef.current.newestAi === null) {
        for (let i = 0; i < 3; i += 1) {
          const n = await agentAttempt(noop, true);
          if (n !== null) attempts.push(n);
        }
      }
      if (beat !== 'ai-release' || railRef.current.fault !== null) return;
      const ai = attempts.length
        ? attempts
        : railRef.current.versions.filter((v) => v.branch === 'ai/speed').map((v) => v.n);
      if (ai.length < 2) return;
      const [good, bad] = ai.slice(-2);
      say({ who: 'priya', text: `#${good} looks good. Releasing it.` });
      railRef.current.release(good, 'priya');
      say({ who: 'sofia', text: `#${bad} breaks the coupon field on Safari.`, tone: 'fault' });
      railRef.current.report(bad, 'sofia', 'breaks the coupon field on Safari');
    })();
  }, [reduce, inView, beat, railRef, agentAttempt, say]);

  // Director: plays the active beat's script while the stage is visible.
  useEffect(() => {
    if (!inView || reduce || paused) return;
    const { sleep } = auto;
    let stopped = false;
    const takenOver = takeover === beat;

    const releaseNewestMain = () => railRef.current.release(railRef.current.newestMain, nextReleaser());

    async function hero() {
      if (takenOver) return;
      for (;;) {
        if (!(await sleep(1800))) return;
        releaseNewestMain();
        if (!(await sleep(2600))) return;
        if (!(await runBuild(nextBuild(), sleep, 'auto'))) return;
        if (!(await sleep(2800))) return;
        if (!(await runBuild(nextBuild(), sleep, 'auto'))) return;
      }
    }

    async function config() {
      if (snippetPinned) return;
      for (;;) {
        if (!(await sleep(2600))) return;
        setSnippet((i) => (i + 1) % CONFIG_SNIPPETS.length);
      }
    }

    async function filesScript() {
      for (;;) {
        const version = nextBuild();
        setFiles({ phase: 'idle', changed: changedAssets(version.n), version });
        setBuilder(version.author);
        if (!(await sleep(700))) return;
        setFiles((f) => ({ ...f, phase: 'scan' }));
        if (!(await sleep(1200))) return;
        setFiles((f) => ({ ...f, phase: 'compare' }));
        if (!(await sleep(1200))) return;
        setFiles((f) => ({ ...f, phase: 'upload' }));
        if (!(await sleep(900))) return;
        railRef.current.deploy(version.branch, version.author);
        setFiles((f) => ({ ...f, phase: 'done' }));
        setBuilder(null);
        if (!(await sleep(2800))) return;
      }
    }

    async function urls() {
      for (let count = 1; ; count += 1) {
        if (!(await sleep(2300))) return;
        const version = nextBuild();
        railRef.current.deploy(version.branch, version.author);
        if (count % 3 === 0 && !takenOver) {
          if (!(await sleep(1400))) return;
          releaseNewestMain();
        }
      }
    }

    async function aiAttempts() {
      for (;;) {
        if (!(await sleep(1500))) return;
        if ((await agentAttempt(sleep)) === null) return;
      }
    }

    // The team reviews attempts: one gets released, a bad one gets reported and rolled back.
    async function aiRelease() {
      if (takenOver) return;
      for (;;) {
        if (!(await sleep(900))) return;
        const good = await agentAttempt(sleep);
        if (good === null || !(await sleep(1200))) return;
        say({ who: 'priya', text: `#${good} looks good. Releasing it.` });
        railRef.current.release(good, 'priya');
        if (!(await sleep(1900))) return;
        const bad = await agentAttempt(sleep);
        if (bad === null || !(await sleep(1300))) return;
        say({ who: 'marcus', text: `Releasing #${bad} as well.` });
        railRef.current.release(bad, 'marcus');
        if (!(await sleep(1700))) return;
        say({ who: 'sofia', text: `#${bad} breaks the coupon field on Safari.`, tone: 'fault' });
        railRef.current.report(bad, 'sofia', 'breaks the coupon field on Safari');
        if (!(await sleep(1600))) return;
        say({ who: 'priya', text: `Rolling back to #${good}.` });
        railRef.current.release(good, 'priya');
        if (!(await sleep(3600))) return;
        railRef.current.clearFault();
      }
    }

    async function skills() {
      setSkillsStep(0);
      setBuilder('search-agent');
      for (let i = 1; i <= SKILLS_STEPS; i += 1) {
        if (!(await sleep(i === 1 ? 500 : 750))) return;
        setSkillsStep(i);
      }
      setBuilder(null);
    }

    /** Each team, or agent, ships its own remote on its own schedule. */
    async function shipRemote(turn: number) {
      const { remote, who } = REMOTE_BUILDS[turn % REMOTE_BUILDS.length];
      setActiveRemote(remote);
      setBuilder(who);
      if (!(await sleep(700))) return false;
      if (remote === 'checkout') railRef.current.deploy(who === 'cart-agent' ? 'ai/speed' : 'main', who);
      else productRef.current.deployRemote(remote, who);
      if (!(await sleep(450))) return false;
      setActiveRemote(null);
      setBuilder(null);
      return true;
    }

    async function teamsSplit() {
      for (let turn = 0; ; turn += 1) {
        if (!(await sleep(1300))) return;
        if (!(await shipRemote(turn))) return;
      }
    }

    // Flip environments to show each one loading its own set; owners release pieces independently.
    async function teamsEnvs() {
      for (let turn = 0; ; turn += 1) {
        if (!(await sleep(2600))) return;
        if (!takenOver) productRef.current.setEnvironment((e) => (e === 'production' ? 'staging' : 'production'));
        if (turn % 2 === 1) {
          if (!(await sleep(1300))) return;
          const remote = turn % 4 === 1 ? 'catalog' : 'shell';
          const app = productRef.current.remotes[remote];
          if (app.staging !== app.production) {
            productRef.current.releaseRemote(remote, app.staging, remote === 'catalog' ? 'ana' : 'jonas');
          } else if (!(await shipRemote(turn))) return;
        }
      }
    }

    // Production is protected: an agent's build lands in staging only, until a member releases it.
    async function teamsGuardrails() {
      if (!takenOver) productRef.current.setEnvironment('production');
      for (;;) {
        if (!(await sleep(1400))) return;
        setActiveRemote('search');
        setBuilder('search-agent');
        if (!(await sleep(700))) return;
        const n = productRef.current.deployRemote('search', 'search-agent');
        setActiveRemote(null);
        setBuilder(null);
        setBlocked('search');
        productRef.current.log('search-agent', `deployed search #${n} to staging only`);
        if (!(await sleep(2400))) return;
        setBlocked(null);
        productRef.current.releaseRemote('search', n, 'sofia');
        if (!(await sleep(3400))) return;
      }
    }

    /** A shell build uploads to every environment's edge at once, each edge getting only what it lacks. */
    async function cloudUpload() {
      const n = productRef.current.peekRemote('shell');
      const changed = changedAssetCount(n);
      const files: CloudUpload['files'] = {};
      for (const env of CLOUD_ENVS) {
        const cloud = envCloudsRef.current[env];
        files[env] = seenEdges.current.has(cloud) ? changed : TOTAL_ASSETS;
        seenEdges.current.add(cloud);
      }
      setBuilder('jonas');
      setUpload({ n, phase: 'upload', files });
      if (!(await sleep(1500))) return null;
      productRef.current.deployRemote('shell', 'jonas');
      setUpload((u) => (u ? { ...u, phase: 'done' } : u));
      setBuilder(null);
      return n;
    }

    async function cloudsDeploy() {
      for (;;) {
        if (!(await sleep(1300))) return;
        if ((await cloudUpload()) === null) return;
        if (!(await sleep(2600))) return;
        setUpload(null);
      }
    }

    // The build is already on every edge, so each environment releases it on its own schedule.
    async function cloudsRelease() {
      for (;;) {
        if (!(await sleep(900))) return;
        const n = await cloudUpload();
        if (n === null || !(await sleep(1300))) return;
        productRef.current.releaseRemote('shell', n, 'priya');
        if (!(await sleep(1500))) return;
        setEuBuild(n);
        productRef.current.log('sofia', `released shell #${n} to production-eu`);
        if (!(await sleep(2800))) return;
        setUpload(null);
      }
    }

    // Moving an environment to another provider is a setting; the next build deploys there.
    async function cloudsSwitch() {
      for (;;) {
        if (!(await sleep(1400))) return;
        const next: CloudId = envCloudsRef.current['production-eu'] === 'akamai' ? 'fastly' : 'akamai';
        pendingSwitch.current = envCloudsRef.current['production-eu'];
        setEnvClouds((c) => ({ ...c, 'production-eu': next }));
        setEuBuild(null);
        setSwitched('production-eu');
        productRef.current.log('jonas', `moved production-eu to ${CLOUDS[next].name}`);
        if (!(await sleep(1900))) return;
        setSwitched(null);
        const n = await cloudUpload();
        if (n === null || !(await sleep(1200))) return;
        setEuBuild(n);
        pendingSwitch.current = null;
        if (!(await sleep(2800))) return;
        setUpload(null);
      }
    }

    async function stackWeb() {
      for (let i = 0; ; i += 1) {
        setLit(STACK_SWEEP[i % STACK_SWEEP.length]);
        if (!(await sleep(900))) return;
        setLit(null);
        if (!(await sleep(250))) return;
      }
    }

    async function stackSsr() {
      const ssr = STACK.map((item, i) => (item.ssr ? i : -1)).filter((i) => i >= 0);
      for (let i = 0; ; i += 1) {
        setLit(ssr[i % ssr.length]);
        if (!(await sleep(1100))) return;
      }
    }

    // Release a new cart mini-app; installed apps pick it up on their next update check.
    async function stackNative() {
      for (;;) {
        setNativeUpdated(false);
        setLit(STACK.findIndex((item) => item.name === 'Re.Pack'));
        if (!(await sleep(1800))) return;
        setLit(null);
        setNativeVersion((v) => v + 1);
        setNativeUpdated(true);
        if (!(await sleep(2600))) return;
      }
    }

    const scripts: Record<BeatId, () => Promise<void>> = {
      hero,
      'solo-config': config,
      'solo-files': filesScript,
      'solo-urls': urls,
      'ai-attempts': aiAttempts,
      'ai-release': aiRelease,
      'ai-skills': skills,
      'teams-split': teamsSplit,
      'teams-envs': teamsEnvs,
      'teams-guardrails': teamsGuardrails,
      'clouds-deploy': cloudsDeploy,
      'clouds-release': cloudsRelease,
      'clouds-switch': cloudsSwitch,
      'stack-web': stackWeb,
      'stack-ssr': stackSsr,
      'stack-native': stackNative,
    };

    scripts[beat]();

    return () => {
      if (stopped) return;
      stopped = true;
      auto.cancel();
      setBuilder(null);
      setActiveRemote(null);
      setBlocked(null);
      setLit(null);
      setSwitched(null);
      // A cloud switch interrupted before any build reached the new edge is undone, not left half-true.
      if (pendingSwitch.current) {
        const from = pendingSwitch.current;
        pendingSwitch.current = null;
        setEnvClouds((c) => ({ ...c, 'production-eu': from }));
        setEuBuild(productRef.current.remotes.shell.production);
      }
      // An autoplay build interrupted mid-stream snaps to the last finished one.
      if (buildOwner.current === 'auto') {
        buildOwner.current = null;
        settleTerminal();
      }
      if (beat === 'solo-files') setFiles((f) => ({ ...f, phase: 'done' }));
      if (beat === 'ai-skills') setSkillsStep(SKILLS_STEPS);
      if (beat === 'ai-attempts' || beat === 'ai-release') {
        setSession((s) =>
          s.map((line) => (line.pending ? { ...line, pending: false, text: `${line.text} Paused.` } : line)),
        );
      }
    };
  }, [
    beat,
    inView,
    paused,
    reduce,
    takeover,
    snippetPinned,
    auto,
    railRef,
    runBuild,
    settleTerminal,
    nextBuild,
    nextReleaser,
    agentAttempt,
    say,
    productRef,
    envCloudsRef,
  ]);

  const release = (n: number) => {
    setTakeover(beat);
    onInteract?.();
    rail.release(n, YOU);
  };

  const runManualBuild = () => {
    setTakeover('hero');
    onInteract?.();
    const version: Version = { n: railRef.current.peekNext(), branch: 'main', author: YOU };
    if (reduce) {
      rail.deploy(version.branch, version.author);
      setTerminal({ author: YOU, typed: BUILD_COMMAND.length, lines: buildLog(version), busy: false });
      return;
    }
    void runBuild(version, manual.sleep, 'manual');
  };

  const agentBeat = beat === 'ai-attempts' || beat === 'ai-release';

  const panel =
    beat === 'hero' ? (
      <Terminal
        author={terminal.author}
        typed={terminal.typed}
        lines={terminal.lines}
        busy={terminal.busy}
        onRun={runManualBuild}
      />
    ) : beat === 'solo-config' ? (
      <ConfigEditor
        index={snippet}
        onSelect={(i) => {
          setSnippetPinned(true);
          onInteract?.();
          setSnippet(i);
        }}
      />
    ) : beat === 'solo-files' ? (
      <FileGrid build={`#${files.version.n} by ${files.version.author}`} phase={files.phase} changed={files.changed} />
    ) : beat === 'solo-urls' ? (
      <RulesPanel latest={rail.latest} production={rail.production} />
    ) : agentBeat ? (
      <AgentSession lines={session} tagN={rail.newestAi} reloads={reloads} />
    ) : (
      <SkillsPanel step={skillsStep} />
    );

  const panelKey = beat === 'hero' ? 'terminal' : agentBeat ? 'agent' : beat;
  const interactive = beat === 'hero' || beat === 'solo-urls' || agentBeat;
  const tag =
    beat === 'solo-urls' ? { label: 'latest', n: rail.latest } : agentBeat ? { label: 'ai', n: rail.newestAi } : null;

  // Checkout in the product view is the same app the rail has been showing.
  const checkout: RemoteApp = {
    id: 'checkout',
    ...CHECKOUT_TEAM,
    versions: rail.versions,
    staging: rail.latest,
    production: rail.production,
  };

  const appView = (
    <div>
      {/* Fixed-height frame so the rail below never moves when the panel changes. */}
      <div className="relative h-[17.25rem]">
        <AnimatePresence initial={false}>
          <motion.div
            key={panelKey}
            className="absolute inset-0"
            initial={reduce ? false : { opacity: 0, y: 12, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: -10, filter: 'blur(4px)' }}
            transition={FADE}
          >
            {panel}
          </motion.div>
        </AnimatePresence>
      </div>

      <DeployRail
        className="mt-6"
        // Server-rendered before measuring: a phone-sized guess inline, the pinned column's width beside the story.
        initialWidth={pinned ? 520 : 320}
        versions={rail.versions}
        production={rail.production}
        releasedBy={rail.releasedBy}
        tag={tag}
        faultN={rail.fault}
        lastEvent={rail.lastEvent}
        onRelease={interactive ? release : undefined}
        interactive={interactive}
        dim={beat === 'solo-config' || beat === 'ai-skills'}
      />

      <p
        className={cn(
          'mt-3 text-xs text-ink-faint transition-opacity duration-500',
          interactive ? 'opacity-100' : 'opacity-0',
        )}
        aria-hidden={!interactive}
      >
        Try it: drag <span className="text-ident text-released-ink">production</span> onto any build
        {beat === 'hero' ? ', click one, or run another build.' : ' or click one.'}
      </p>
    </div>
  );

  const productView = (
    <ProductScene
      shell={product.remotes.shell}
      remotes={[checkout, product.remotes.catalog, product.remotes.search]}
      environment={product.environment}
      onEnvironment={(env) => {
        setTakeover(beat);
        onInteract?.();
        product.setEnvironment(env);
      }}
      audit={product.audit}
      active={activeRemote}
      blocked={blocked}
      focus={beat === 'teams-split' ? 'split' : beat === 'teams-envs' ? 'environments' : 'guardrails'}
    />
  );

  const cloudsView = (
    <CloudsScene
      envs={CLOUD_ENVS.map((env) => ({
        env,
        cloud: envClouds[env],
        n:
          env === 'staging'
            ? product.remotes.shell.staging
            : env === 'production'
              ? product.remotes.shell.production
              : euBuild,
      }))}
      upload={upload}
      switched={switched}
      focus={beat === 'clouds-deploy' ? 'deploy' : beat === 'clouds-release' ? 'release' : 'switch'}
    />
  );

  const stackView = (
    <StackScene
      focus={beat === 'stack-ssr' ? 'ssr' : beat === 'stack-native' ? 'native' : 'web'}
      lit={lit}
      nativeVersion={nativeVersion}
      nativeUpdated={nativeUpdated}
    />
  );

  const views: Record<View, ReactNode> = { app: appView, product: productView, clouds: cloudsView, stack: stackView };

  return (
    <div
      ref={ref}
      role="group"
      aria-label="Interactive demo: builds, releases and environments"
      translate="no"
      data-paused={paused || undefined}
      className={cn('w-full', className)}
    >
      <div className="mb-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <ScaleReadout level={level} />
        <div className="flex items-center gap-3">
          <TeamStrip active={builder} withAgents={level >= 1} />
          {reduce ? null : (
            <button
              type="button"
              onClick={togglePaused}
              aria-pressed={paused}
              aria-label="Pause the demo"
              className="flex size-7 shrink-0 items-center justify-center rounded-full border border-line text-ink-faint transition-colors hover:border-line-strong hover:text-ink focus-visible:ring-2 focus-visible:ring-released-ink"
            >
              {paused ? <Play className="size-3" aria-hidden /> : <Pause className="size-3" aria-hidden />}
            </button>
          )}
        </div>
      </div>

      {pinned ? (
        // Padding outside the clip keeps panel shadows visible while zoomed layers are cropped.
        <div className="-m-6 overflow-hidden p-6">
          <div className="relative h-[33.5rem]">
            <AnimatePresence initial={false} custom={zoomCustom}>
              <motion.div
                key={view}
                custom={zoomCustom}
                variants={reduce ? undefined : viewVariants}
                initial={reduce ? false : 'enter'}
                animate="center"
                exit={reduce ? { opacity: 0, transition: { duration: 0 } } : 'exit'}
                transition={{ scale: ZOOM, opacity: { duration: 0.55, ease: EASE_IN_OUT } }}
                className="absolute inset-0"
              >
                {views[view]}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      ) : (
        views[view]
      )}
    </div>
  );
}

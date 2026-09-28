import { cn } from '@/lib/utils';
import { Smartphone } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { EASE_IN_OUT, FADE, SPRING_MARKER } from '../../motion/tokens';
import { CLOUDS, type CloudId } from './CloudsScene';
import { useElementWidth } from './useElementWidth';

// Coverage from zephyr-packages: bundler plugins, framework integrations, and
// create-zephyr-apps templates. "beta" marks integrations their own READMEs call WIP or beta.
export interface StackItem {
  name: string;
  beta?: boolean;
  ssr?: boolean;
  native?: boolean;
}

export const STACK: StackItem[] = [
  { name: 'Vite' },
  { name: 'Rsbuild' },
  { name: 'Rspack' },
  { name: 'webpack' },
  { name: 'Rollup' },
  { name: 'Rolldown', beta: true },
  { name: 'Parcel' },
  { name: 'Astro' },
  { name: 'Nuxt', ssr: true },
  { name: 'Modern.js' },
  { name: 'Rspress' },
  { name: 'TanStack Start', ssr: true },
  { name: 'Vinext', beta: true, ssr: true },
  { name: 'Angular' },
  { name: 'Svelte' },
  { name: 'Solid' },
  { name: 'Ember' },
  { name: 'Nx' },
  { name: 'Turborepo' },
  { name: 'Hono', ssr: true },
  { name: 'Elysia', ssr: true },
  { name: 'Nitro', ssr: true },
  { name: 'Re.Pack', native: true },
  { name: 'Metro', native: true },
];

const EDGE_CLOUDS: CloudId[] = ['zephyr', 'cloudflare', 'aws', 'fastly', 'akamai'];

const FUNNEL_H = 28;
/** Where the funnel lines start, as fractions of its width. */
const FUNNEL_STARTS = [0.1, 0.3, 0.5, 0.7, 0.9];

export type StackFocus = 'web' | 'ssr' | 'native';

interface StackSceneProps {
  focus: StackFocus;
  /** Index into STACK currently sending a build, for the "any stack" sweep. */
  lit: number | null;
  /** Native beat: the mini-app version installed apps are running. */
  nativeVersion: number;
  nativeUpdated: boolean;
}

function isHighlighted(item: StackItem, focus: StackFocus) {
  if (focus === 'ssr') return Boolean(item.ssr);
  if (focus === 'native') return Boolean(item.native);
  return true;
}

/** The whole system: any stack in, one plugin, every build deployed, released per environment, any edge out. */
export function StackScene({ focus, lit, nativeVersion, nativeUpdated }: StackSceneProps) {
  const reduce = useReducedMotion();
  const [funnelRef, funnelW] = useElementWidth<HTMLDivElement>(320);
  const starts = FUNNEL_STARTS.map((f) => f * funnelW);
  // Ends exactly on the pill's top edge, centered.
  const funnelCurve = (x: number) => `M ${x} 0 C ${x} 16, ${funnelW / 2} 12, ${funnelW / 2} ${FUNNEL_H}`;

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="rounded-2xl border border-line-strong bg-[#0a0c11]/60 p-4">
        <p className="m-0 mb-3 text-[0.6875rem] text-ink-faint">Bundlers, frameworks and servers</p>
        <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0">
          {STACK.map((item, i) => {
            const on = isHighlighted(item, focus);
            return (
              <li
                key={item.name}
                className={cn(
                  'relative rounded-full border px-2.5 py-1 text-xs transition-[color,border-color,background-color,opacity] duration-300',
                  lit === i
                    ? 'border-ink/70 bg-surface-3 text-ink'
                    : on
                      ? 'border-line-strong bg-surface text-ink-muted'
                      : 'border-line bg-transparent text-ink-faint opacity-50',
                )}
              >
                {item.name}
                {item.beta ? <span className="ml-1 text-[0.625rem] text-ink-faint">beta</span> : null}
              </li>
            );
          })}
        </ul>

        {/* Everything funnels through the same plugin; the lit line runs all the way into the pill. */}
        <div ref={funnelRef} className="mx-auto mt-3 w-full max-w-[20rem]" aria-hidden>
          <svg
            width={funnelW}
            height={FUNNEL_H}
            viewBox={`0 0 ${funnelW} ${FUNNEL_H}`}
            className="block h-7 w-full overflow-visible"
          >
            {starts.map((x) => (
              <path key={x} d={funnelCurve(x)} fill="none" stroke="var(--ze-line-strong)" strokeWidth={1} />
            ))}
            <AnimatePresence>
              {lit !== null ? (
                <motion.path
                  key={lit}
                  d={funnelCurve(starts[lit % starts.length])}
                  fill="none"
                  stroke="var(--ze-ink)"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  initial={reduce ? false : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: EASE_IN_OUT }}
                />
              ) : null}
            </AnimatePresence>
          </svg>
        </div>
        <div className="flex justify-center">
          <span className="rounded-full border border-line-strong bg-surface-2 px-3 py-1 text-ident text-ink">
            withZephyr()
          </span>
        </div>

        {/* The clouds view, shrunk: your site, every edge. */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 rounded-xl border border-line bg-surface/60 px-3 py-2.5">
          <span className="text-ident text-[0.75rem] text-ink">your-site.com</span>
          <span aria-hidden className="text-ink-faint">
            →
          </span>
          {EDGE_CLOUDS.map((id) => (
            <img
              key={id}
              src={CLOUDS[id].logo}
              alt={CLOUDS[id].name}
              height={14}
              className="max-h-3.5 w-auto max-w-[2.5rem] object-contain opacity-75"
              loading="lazy"
              decoding="async"
            />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={focus}
          // Tall enough for the phone mock, so switching steps never changes the figure's height.
          className="flex min-h-[7.875rem] flex-col justify-center rounded-xl border border-line bg-surface/60 px-4 py-3.5"
          initial={reduce ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: -8 }}
          transition={FADE}
        >
          {focus === 'web' ? (
            <dl className="m-0 grid gap-2 text-ident text-[0.72rem]">
              <div className="flex min-w-0 gap-3">
                <dt className="w-24 shrink-0 font-sans text-xs text-ink-faint">New project</dt>
                <dd className="m-0 truncate text-ink">npx create-zephyr-apps@latest</dd>
              </div>
              <div className="flex min-w-0 gap-3">
                <dt className="w-24 shrink-0 font-sans text-xs text-ink-faint">Existing app</dt>
                <dd className="m-0 truncate text-ink">npx with-zephyr</dd>
              </div>
              <div className="flex min-w-0 gap-3">
                <dt className="w-24 shrink-0 font-sans text-xs text-ink-faint">Prebuilt folder</dt>
                <dd className="m-0 truncate text-ink">npx zephyr-cli deploy ./dist</dd>
              </div>
            </dl>
          ) : focus === 'ssr' ? (
            <dl className="m-0 grid gap-2 text-ident text-[0.72rem]">
              <div className="flex min-w-0 gap-3">
                <dt className="w-24 shrink-0 font-sans text-xs text-ink-faint">Snapshot</dt>
                <dd className="m-0 truncate text-ink">type: ssr · entrypoint: server/index.js</dd>
              </div>
              <div className="flex min-w-0 gap-3">
                <dt className="w-24 shrink-0 font-sans text-xs text-ink-faint">Runs on</dt>
                <dd className="m-0 truncate text-ink">Zephyr Cloud · your Cloudflare account</dd>
              </div>
              <div className="flex min-w-0 gap-3">
                <dt className="w-24 shrink-0 font-sans text-xs text-ink-faint">Isolation</dt>
                <dd className="m-0 truncate text-ink">one isolate per version</dd>
              </div>
            </dl>
          ) : (
            <div className="flex items-center gap-4">
              <div className="relative flex h-24 w-14 shrink-0 flex-col items-center justify-center gap-1 rounded-[14px] border border-line-strong bg-night">
                <Smartphone className="size-4 text-ink-faint" aria-hidden />
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={nativeVersion}
                    className="text-ident text-[0.625rem] text-released-ink"
                    initial={reduce ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: -6 }}
                    transition={SPRING_MARKER}
                  >
                    cart #{nativeVersion}
                  </motion.span>
                </AnimatePresence>
                {nativeUpdated ? <span className="absolute top-2 right-2 size-1.5 rounded-full bg-live" /> : null}
              </div>
              <dl className="m-0 grid min-w-0 gap-2 text-ident text-[0.72rem]">
                <div className="flex min-w-0 gap-3">
                  <dt className="w-20 shrink-0 font-sans text-xs text-ink-faint">Released</dt>
                  <dd className="m-0 truncate text-ink">cart mini-app #{nativeVersion}</dd>
                </div>
                <div className="flex min-w-0 gap-3">
                  <dt className="w-20 shrink-0 font-sans text-xs text-ink-faint">Installed apps</dt>
                  <dd className="m-0 truncate text-ink">
                    {nativeUpdated ? 'updated on last check' : 'checking for updates…'}
                  </dd>
                </div>
                <div className="flex min-w-0 gap-3">
                  <dt className="w-20 shrink-0 font-sans text-xs text-ink-faint">App store</dt>
                  <dd className="m-0 truncate text-ink">no new submission</dd>
                </div>
              </dl>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

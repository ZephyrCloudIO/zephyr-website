import { Avatar } from '@/components/home/stage/Avatar';
import { personName } from '@/components/home/stage/model';
import { cn } from '@/lib/utils';
import { Check, CornerDownRight, MousePointer2, ScanSearch, Users, X } from 'lucide-react';
import { AnimatePresence, motion, type Transition } from 'motion/react';
import { useRef, type CSSProperties, type ReactNode } from 'react';
import { EASE_IN_OUT, FADE, SPRING_CARD, SPRING_MARKER } from '../../motion/tokens';
import { AcceptanceChip } from '../AcceptanceChip';
import { AppVersionCard, type VersionTone } from '../AppVersionCard';
import { CANDIDATE, DIFF, PREVIOUS, REVIEWER, ROWS, STOPS, STRAY, UNTESTED, type AppId } from '../model';
import { SnapshotFrame } from '../SnapshotFrame';
import type { StageLayout } from './layout';
import type { FilmState } from './timeline';

const INSTANT = { duration: 0 } as const;
const CURSOR: Transition = { duration: 0.85, ease: EASE_IN_OUT };
/** The stray remote pushes in a little harder than a card lands. */
const PUSH: Transition = { type: 'spring', stiffness: 180, damping: 22 };

interface PlaceProps {
  x: number;
  y: number;
  w?: number;
  h?: number;
  show?: boolean;
  still: boolean;
  spring?: Transition;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

/** An absolutely positioned layer that springs to (x, y) and fades with `show`. */
function Place({ x, y, w, h, show = true, still, spring = SPRING_CARD, className, style, children }: PlaceProps) {
  return (
    <motion.div
      className={cn('absolute top-0 left-0', !show && 'pointer-events-none', className)}
      style={style}
      initial={false}
      animate={{
        x,
        y,
        opacity: show ? 1 : 0,
        ...(w === undefined ? {} : { width: w }),
        ...(h === undefined ? {} : { height: h }),
      }}
      transition={still ? INSTANT : { ...spring, opacity: FADE }}
    >
      {children}
    </motion.div>
  );
}

function Label({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn('m-0 text-[0.6875rem] leading-tight text-ink-faint', className)}>{children}</p>;
}

/** Keeps the last non-empty value so a label can fade out instead of vanishing. */
function useLastValue<T>(value: T | null): T | null {
  const last = useRef(value);
  if (value !== null) last.current = value;
  return last.current;
}

function BuildStatus({ passed, compact, still }: { passed: boolean; compact: boolean; still: boolean }) {
  return (
    <span
      className={cn(
        'flex items-center gap-1.5 text-[0.6875rem] leading-none transition-colors duration-300',
        passed ? 'text-ink-muted' : 'text-ink-faint',
      )}
    >
      <span className="relative flex size-1.5">
        {passed && !still ? (
          <motion.span
            className="absolute inset-0 rounded-full bg-live"
            initial={{ scale: 0.6, opacity: 0.9 }}
            animate={{ scale: 3.2, opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        ) : null}
        <span className={cn('relative size-1.5 rounded-full', passed ? 'bg-live' : 'bg-ink-faint/40')} />
      </span>
      {compact ? null : passed ? 'build passed' : 'building'}
    </span>
  );
}

// ─── Cold open ────────────────────────────────────────────────────────────────

const COLD_REMOTES: AppId[] = ['catalog', 'search', 'checkout'];

function ColdOpen({ s, L, still }: { s: FilmState; L: StageLayout; still: boolean }) {
  const { cold } = L;
  const assembled = s.coldAssembled;
  const target = { x: cold.button.x + cold.button.w * 0.62, y: cold.button.y + cold.button.h * 0.45 };
  const cursor = s.coldCursor === 'hidden' ? cold.cursorFrom : target;

  return (
    <>
      <Place x={cold.panel.x} y={cold.panel.y} w={cold.panel.w} h={cold.panel.h} show={assembled} still={still}>
        <SnapshotFrame
          state="plain"
          title="Assembled at runtime"
          fault={s.coldFault}
          instant={still}
          className="h-full"
        />
      </Place>

      <Place x={cold.rowX} y={L.rowY(0)} w={cold.rowW} h={L.rowH} show={assembled} still={still}>
        <AppVersionCard app="host" n={UNTESTED.host} />
      </Place>

      {COLD_REMOTES.map((app, k) => {
        const at = assembled ? { x: cold.rowX, y: L.rowY(k + 1) } : cold.spread[k];
        const fault = s.coldFault && (app === 'catalog' || app === 'checkout');
        return (
          <Place
            key={app}
            x={at.x}
            y={at.y}
            w={assembled ? cold.rowW : cold.cardW}
            h={L.rowH}
            show={k < s.coldCards}
            still={still}
          >
            <AppVersionCard
              app={app}
              n={UNTESTED[app]}
              tone={fault ? 'fault' : 'default'}
              aside={<BuildStatus passed={k < s.coldPassed} compact={assembled} still={still} />}
            />
          </Place>
        );
      })}

      <Place x={cold.button.x} y={cold.button.y} w={cold.button.w} h={cold.button.h} show={assembled} still={still}>
        <div
          className={cn(
            'flex h-full items-center justify-center rounded-md border text-[0.75rem] leading-none transition-colors duration-300',
            s.coldFault
              ? 'border-fault/70 text-fault'
              : s.coldCursor === 'click'
                ? 'border-ink/70 bg-surface-3 text-ink'
                : 'border-line-strong text-ink-muted',
          )}
        >
          Add to cart
        </div>
      </Place>

      <Place x={cursor.x} y={cursor.y} show={s.coldCursor !== 'hidden'} still={still} spring={CURSOR}>
        <motion.span
          className="relative flex text-ink"
          initial={false}
          animate={{ scale: s.coldCursor === 'click' && !s.coldFault ? 0.84 : 1 }}
          transition={still ? INSTANT : { duration: 0.18 }}
        >
          <MousePointer2 className="size-4 fill-night" strokeWidth={2} />
        </motion.span>
      </Place>

      <Place
        x={cold.panel.x - 30}
        y={cold.panel.y + cold.panel.h + 12}
        w={cold.panel.w + 60}
        show={s.coldFault}
        still={still}
      >
        <p className="m-0 text-center text-ident text-[0.75rem] text-fault">TypeError: cart.add is not a function</p>
      </Place>
    </>
  );
}

// ─── Main scene ───────────────────────────────────────────────────────────────

const QA_STEPS = ['search', 'add to cart', 'place order'];

function GateChip({ state }: { state: 'checking' | 'passed' | 'failed' }) {
  return (
    <span
      className={cn(
        'inline-flex h-5 items-center gap-1 rounded-full border bg-night px-2 text-[0.625rem] leading-none whitespace-nowrap',
        state === 'failed'
          ? 'border-fault/70 text-fault'
          : state === 'passed'
            ? 'border-line-strong text-ink'
            : 'border-line text-ink-faint',
      )}
    >
      {state === 'failed' ? (
        <X className="size-2.5" strokeWidth={2.6} aria-hidden />
      ) : state === 'passed' ? (
        <span className="size-1.5 rounded-full bg-live" aria-hidden />
      ) : (
        <span className="size-1.5 rounded-full bg-ink-faint motion-safe:animate-pulse" aria-hidden />
      )}
      {state === 'failed' ? 'check failed' : state === 'passed' ? 'check passed' : 'checking'}
    </span>
  );
}

function Note({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex h-5 items-center rounded-full border border-line bg-night px-2 text-[0.625rem] leading-none whitespace-nowrap text-ink-muted">
      {children}
    </span>
  );
}

/** A layer inside the lane under the track; one shows at a time. */
function LaneLayer({
  show,
  still,
  children,
  className,
}: {
  show: boolean;
  still: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={cn('absolute inset-0', !show && 'pointer-events-none', className)}
      initial={false}
      animate={{ opacity: show ? 1 : 0, y: show ? 0 : 6 }}
      transition={still ? INSTANT : FADE}
    >
      {children}
    </motion.div>
  );
}

function Chip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex h-6 items-center gap-1.5 rounded-md border border-line-strong bg-surface px-2 text-ident text-[0.6875rem] leading-none whitespace-nowrap text-ink-muted',
        className,
      )}
    >
      {children}
    </span>
  );
}

function DiffCount() {
  return (
    <>
      <span className="text-ink">+{DIFF.added}</span>
      <span>−{DIFF.removed}</span>
    </>
  );
}

function MergeGlyph({ merged }: { merged: boolean }) {
  return (
    <svg width="46" height="18" viewBox="0 0 46 18" aria-hidden className="shrink-0 overflow-visible">
      <path d="M0 13.5H46" stroke="var(--ze-line-strong)" strokeWidth="1.5" />
      <path
        d="M2 4.5H22C29 4.5 30 13.5 37 13.5"
        fill="none"
        stroke="var(--ze-ink)"
        strokeWidth="1.5"
        strokeDasharray={merged ? undefined : '3 3'}
        className="transition-all duration-500"
      />
      <circle cx="2" cy="4.5" r="2" fill="var(--ze-ink)" />
      <circle
        cx="37"
        cy="13.5"
        r="3"
        fill={merged ? 'var(--ze-ink)' : 'var(--ze-night)'}
        stroke="var(--ze-ink)"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function MainScene({ s, L, still }: { s: FilmState; L: StageLayout; still: boolean }) {
  const share = STOPS[s.exposure] / 100;
  const framed = s.frame !== 'none';
  const joined = s.candidate === 'all';
  const pillW = L.narrow ? 108 : 118;
  const pointerX = L.stopX(s.exposure);
  const branch = useLastValue(s.branch);
  const refused = s.stray === 'refused';
  const offRamp = s.offRamp && (s.lane === 'none' || s.lane === 'packet');
  const decision = s.reviewer;

  // One slot above the track: a check beats a note.
  const slot = s.gate
    ? { key: `gate-${s.gate.stop}-${s.gate.state}`, stop: s.gate.stop, node: <GateChip state={s.gate.state} /> }
    : s.pointerNote
      ? { key: 'stays', stop: s.exposure, node: <Note>pointer stays</Note> }
      : s.edgeNote && s.exposure === 4
        ? { key: 'optional', stop: 4, node: <Note>optional</Note> }
        : null;

  const packetW = Math.min(320, L.lane.w);
  const packetX = Math.min(Math.max(0, L.stopX(2) - L.lane.x - packetW / 2), L.lane.w - packetW);

  return (
    <>
      {/* Top bar: an alternate path, and where all of this runs */}
      <Place x={L.pad} y={6} show={s.branch !== null} still={still}>
        <span className="flex h-6 items-center gap-1.5 rounded-full border border-dashed border-ink/50 bg-night px-2.5 text-[0.6875rem] leading-none whitespace-nowrap text-ink">
          <CornerDownRight className="size-3" aria-hidden />
          {branch}
        </span>
      </Place>
      <Place x={L.W - L.pad - 140} y={10} w={140} still={still}>
        <Label className="flex items-center justify-end gap-1.5">
          <span className="size-1.5 rounded-full bg-live" aria-hidden />
          In production
        </Label>
      </Place>

      {/* Previous snapshot: what ordinary users run */}
      <Place x={L.leftX} y={L.frameY} w={L.colW} h={L.frameH} still={still}>
        <SnapshotFrame
          name={PREVIOUS.name}
          state={s.prevNamed ? 'locked' : 'plain'}
          title="What users run"
          served={1 - share}
          instant={still}
          className="h-full"
        />
      </Place>
      {ROWS.map((app, i) => (
        <Place key={`prev-${app}`} x={L.rowX(L.leftX)} y={L.rowY(i)} w={L.rowW} h={L.rowH} still={still}>
          <AppVersionCard app={app} n={PREVIOUS.versions[app]} />
        </Place>
      ))}

      {/* Candidate snapshot */}
      <Place x={L.rightX} y={L.frameY} w={L.colW} h={L.frameH} show={framed} still={still}>
        <div className={cn('h-full transition-opacity duration-500', s.shelved && 'opacity-45')}>
          <SnapshotFrame
            name={CANDIDATE.name}
            state={s.frame === 'plain' ? 'plain' : s.frame === 'named' ? 'named' : 'locked'}
            served={share}
            flash={refused}
            instant={still}
            className="h-full"
          />
        </div>
      </Place>
      {ROWS.map((app, i) => {
        const isCandidate = app === 'checkout';
        const shown = isCandidate ? s.candidate !== 'none' : joined;
        // The host and remotes join as copies of the rows ordinary users run; they wait underneath until then.
        const x = shown ? L.rowX(L.rightX) : L.rowX(L.leftX);
        const tone: VersionTone = s.lit.includes(app)
          ? 'lit'
          : isCandidate
            ? joined
              ? 'candidate'
              : 'deployed'
            : 'default';
        return (
          <Place key={`cand-${app}`} x={x} y={L.rowY(i)} w={L.rowW} h={L.rowH} show={shown} still={still}>
            <div className={cn('h-full transition-opacity duration-500', s.shelved && 'opacity-45')}>
              <AppVersionCard app={app} n={CANDIDATE.versions[app]} tone={tone} live={isCandidate && !joined} />
            </div>
          </Place>
        );
      })}
      <Place x={L.rowX(L.rightX)} y={L.rowY(3) + L.rowH + 9} w={L.rowW} show={s.deployedNote} still={still}>
        <Label className="text-center">deployed · not released</Label>
      </Place>

      {/* A remote that shipped on its own tries to join; the frame refuses it */}
      <Place
        x={s.stray === 'approach' ? L.stray.approach.x : L.stray.shelf.x}
        y={s.stray === 'approach' ? L.stray.approach.y : L.stray.shelf.y}
        w={L.stray.w}
        h={L.rowH}
        show={s.stray !== 'hidden'}
        still={still}
        spring={s.stray === 'approach' ? PUSH : SPRING_CARD}
      >
        <motion.div
          className="relative h-full"
          initial={false}
          animate={refused && !still ? { x: [0, -10, 5, -2, 0] } : { x: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          <AppVersionCard app={STRAY.app} n={STRAY.n} tone="deployed" live />
          <motion.p
            className="absolute top-full right-0 left-0 m-0 mt-1.5 text-center text-[0.6875rem] leading-tight text-ink"
            initial={false}
            animate={{ opacity: refused ? 1 : 0 }}
            transition={still ? INSTANT : FADE}
          >
            not in this snapshot
          </motion.p>
        </motion.div>
      </Place>

      {/* Acceptance, on its own clock */}
      <Place x={L.rightX} y={L.chipY + 3} w={L.colW} show={s.acceptance !== 'hidden'} still={still}>
        <div className="flex justify-end">
          <AcceptanceChip
            state={s.acceptance === 'hidden' ? 'unmerged' : s.acceptance}
            pulse={s.pulse}
            instant={still}
          />
        </div>
      </Place>

      {/* QA user, connected to the candidate in production */}
      {/* Phones: a tighter chip that clears the acceptance chip beside it. */}
      <Place x={L.narrow ? L.rightX : L.rightX + 6} y={L.chipY} show={s.qa !== 'hidden'} still={still}>
        <span
          className={cn(
            'flex h-7 items-center rounded-full border border-ink/60 bg-night text-[0.6875rem] leading-none font-medium whitespace-nowrap text-ink',
            L.narrow ? 'gap-1 px-2' : 'gap-1.5 pr-2.5 pl-1',
          )}
        >
          <span className={cn('flex items-center justify-center rounded-full', !L.narrow && 'size-5 bg-surface-3')}>
            <ScanSearch className="size-3" aria-hidden />
          </span>
          {L.narrow ? 'QA' : 'QA user'}
        </span>
      </Place>
      <Place
        x={L.rightX + (L.narrow ? 13 : 16)}
        y={L.chipY + 28}
        w={1}
        h={L.frameY - L.chipY - 28}
        show={s.qa !== 'hidden'}
        still={still}
      >
        <span className={cn('block h-full w-px text-ink', s.qa === 'running' ? 'film-flow' : 'bg-ink/60')} />
      </Place>
      <Place x={L.rightX} y={L.frameY + L.frameH - 11} w={L.colW - 10} show={s.result} still={still}>
        <div className="flex justify-end">
          <span className="inline-flex h-[1.375rem] items-center gap-1.5 rounded-full border border-line-strong bg-night px-2 text-ident text-[0.6875rem] leading-none text-ink">
            <span className="size-1.5 rounded-full bg-live" aria-hidden />
            compatible
          </span>
        </div>
      </Place>

      {/* Exposure: a pointer that walks from the previous snapshot to the candidate */}
      <Place x={L.x0} y={L.frameY + L.frameH} w={1} h={L.trackY - L.frameY - L.frameH} still={still}>
        <span className="block h-full w-px bg-line-strong" />
      </Place>
      <Place x={L.x1} y={L.frameY + L.frameH} w={1} h={L.trackY - L.frameY - L.frameH} show={framed} still={still}>
        <span className="block h-full w-px bg-line-strong" />
      </Place>
      <Place x={L.x0} y={L.trackY} w={L.x1 - L.x0} h={1} show={framed} still={still}>
        <span className="block h-px w-full bg-line-strong" />
      </Place>
      <motion.div
        className="absolute top-0 left-0 h-0.5 origin-left rounded-full bg-released"
        style={{ x: L.x0, y: L.trackY - 0.5, width: L.x1 - L.x0 }}
        initial={false}
        animate={{ scaleX: s.exposure / 4 }}
        transition={still ? INSTANT : SPRING_MARKER}
      />
      {STOPS.map((pct, i) => (
        <Place key={`stop-${pct}`} x={L.stopX(i) - 3} y={L.trackY - 2.5} w={6} h={6} show={s.stops} still={still}>
          <span
            className={cn(
              'block size-1.5 rounded-full transition-colors duration-300',
              i <= s.exposure ? 'bg-released' : 'bg-deployed/60',
            )}
          />
        </Place>
      ))}
      {STOPS.map((pct, i) => (
        <Place key={`label-${pct}`} x={L.stopX(i) - 22} y={L.trackY + 15} w={44} show={s.stops} still={still}>
          <p
            className={cn(
              'm-0 mx-auto w-fit bg-night px-1 text-center text-ident text-[0.6875rem] leading-none transition-colors duration-300',
              i === s.exposure ? 'text-ink' : 'text-ink-faint',
            )}
          >
            {pct}%
          </p>
        </Place>
      ))}
      <Place x={L.pad} y={L.trackY + 15} w={L.x0 - L.pad - 26} show={s.stops && !L.narrow} still={still}>
        <Label className="text-right">illustrative</Label>
      </Place>

      {/* Stop and review at 10%: the path doesn't have to run to the end */}
      <Place x={L.stopX(2)} y={L.trackY + 4} w={1} h={L.lane.y - L.trackY + 8} show={offRamp} still={still}>
        <span className="block h-full w-px border-l border-dashed border-ink/60" />
      </Place>

      <div className="pointer-events-none absolute left-0" style={{ top: L.trackY - 38 }}>
        <AnimatePresence initial={false}>
          {slot ? (
            <motion.div
              key={slot.key}
              className="absolute top-0 flex w-[120px] justify-center"
              style={{ left: L.stopX(slot.stop) - 60 }}
              initial={still ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={still ? { opacity: 0, transition: INSTANT } : { opacity: 0, transition: FADE }}
              transition={still ? INSTANT : FADE}
            >
              {slot.node}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <Place x={pointerX - pillW / 2} y={L.trackY - 11} w={pillW} h={22} still={still} spring={SPRING_MARKER}>
        <span className="flex h-full items-center justify-center gap-1.5 rounded-full bg-released px-2 text-[0.6875rem] leading-none font-medium whitespace-nowrap text-white shadow-[0_6px_24px_-8px_rgb(124_58_237/0.9)]">
          <Users className="size-3" aria-hidden />
          ordinary users
        </span>
      </Place>

      {/* The lane under the track */}
      <div className="absolute" style={{ left: L.lane.x, top: L.lane.y, width: L.lane.w, height: L.lane.h }}>
        <LaneLayer show={s.lane === 'qa'} still={still}>
          <div className={cn('ml-auto w-fit pt-1', L.narrow ? 'mr-0' : 'mr-[3%]')}>
            <Label>QA user · automated · in production</Label>
            <ul className={cn('m-0 mt-2 flex list-none gap-x-4 gap-y-1.5 p-0', L.narrow ? 'flex-col' : 'flex-row')}>
              {QA_STEPS.map((label, i) => (
                <li
                  key={label}
                  className={cn(
                    'flex items-center gap-1.5 text-[0.75rem] leading-none transition-opacity duration-300',
                    i < s.qaLog ? 'opacity-100' : 'opacity-0',
                    i === s.qaLog - 1 && s.qa === 'running' ? 'text-ink' : 'text-ink-muted',
                  )}
                >
                  <Check className="size-3 text-ink" strokeWidth={2.4} aria-hidden />
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </LaneLayer>

        <LaneLayer show={offRamp} still={still}>
          <span
            className="absolute top-0.5 text-[0.6875rem] leading-none whitespace-nowrap text-ink"
            style={{ left: L.stopX(2) - L.lane.x + 8 }}
          >
            stop and review
          </span>
        </LaneLayer>

        <LaneLayer show={s.shelved && s.lane === 'none'} still={still}>
          <Label className="ml-auto w-fit pt-1 text-ink-muted">The candidate stays deployed, off the path.</Label>
        </LaneLayer>

        <LaneLayer show={s.lane === 'packet'} still={still}>
          <div
            className="absolute top-[1.125rem] rounded-xl border border-line-strong bg-surface/95 px-3 py-2.5"
            style={{ left: packetX, width: packetW }}
          >
            <div className="flex items-center justify-between gap-2">
              <p className="m-0 text-[0.75rem] leading-none font-medium text-ink">Evidence packet</p>
              <span className="flex items-center gap-1.5 text-[0.6875rem] leading-none text-ink-faint">
                <Avatar id={REVIEWER} size={16} />
                {personName(REVIEWER)} pulls it
              </span>
            </div>
            <p className="m-0 mt-2 truncate text-ident text-[0.6875rem] leading-none text-ink-muted">
              {CANDIDATE.name} · compatible
            </p>
            <p className="m-0 mt-1.5 flex gap-1.5 truncate text-ident text-[0.6875rem] leading-none text-ink-faint">
              {STOPS[2]}% of ordinary traffic · diff <DiffCount />
            </p>
          </div>
        </LaneLayer>

        <LaneLayer show={s.lane === 'outcomes'} still={still}>
          <div className="mx-auto grid max-w-[34rem] grid-cols-2 items-start gap-2.5 pt-0.5 sm:gap-3">
            <div className="rounded-xl border border-line-strong bg-surface/95 px-3 py-2.5">
              <p className="m-0 flex items-center gap-1.5 text-[0.75rem] leading-none font-medium text-ink">
                <span className="size-1.5 rounded-full bg-live" aria-hidden />
                Composition held
              </p>
              <p className="m-0 mt-2 text-[0.6875rem] leading-tight text-ink-muted">No new runtime errors</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="flex gap-[3px]" aria-hidden>
                  {Array.from({ length: 12 }, (_, i) => (
                    <span
                      key={i}
                      className={cn(
                        'block h-2.5 w-px transition-colors duration-200',
                        i < s.burnIn ? 'bg-ink' : 'bg-line-strong',
                      )}
                    />
                  ))}
                </span>
                <Label className="leading-none">burn-in</Label>
              </div>
            </div>
            <motion.div
              className="rounded-xl border border-dashed border-line-strong bg-surface/80 px-3 py-2.5"
              initial={false}
              animate={{ opacity: s.intended ? 1 : 0, y: s.intended ? 0 : 6 }}
              transition={still ? INSTANT : FADE}
            >
              <p className="m-0 text-[0.75rem] leading-none font-medium text-ink">Intended outcome</p>
              <p className="m-0 mt-2 text-[0.6875rem] leading-tight text-ink-muted">Checkout completion +2.1%</p>
              <Label className="mt-2 leading-tight">illustrative · needs a comparison window</Label>
            </motion.div>
          </div>
        </LaneLayer>

        <LaneLayer show={s.lane === 'review'} still={still}>
          <div className="flex h-full flex-col gap-2.5 pt-0.5">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
              <span className="flex items-center gap-1.5 pr-1 text-[0.75rem] leading-none text-ink">
                <Avatar id={REVIEWER} size={20} />
                {personName(REVIEWER)}
                <span className="text-ink-faint">reviews</span>
              </span>
              <Chip>
                diff <DiffCount />
              </Chip>
              <Chip>{CANDIDATE.name}</Chip>
              <Chip>evidence · {STOPS[s.evidence]}%</Chip>
              <span
                className={cn(
                  'inline-flex h-6 items-center gap-1 rounded-full border px-2 text-[0.6875rem] leading-none font-medium whitespace-nowrap transition-colors duration-300',
                  decision === 'approved'
                    ? 'border-ink bg-ink text-night'
                    : decision === 'rejected'
                      ? 'border-ink-faint/60 text-ink-muted'
                      : 'border-line text-ink-faint',
                )}
              >
                {decision === 'approved' ? (
                  <Check className="size-3" strokeWidth={2.6} aria-hidden />
                ) : decision === 'rejected' ? (
                  <X className="size-3" strokeWidth={2.6} aria-hidden />
                ) : null}
                {decision === 'approved' ? 'Approved' : decision === 'rejected' ? 'Rejected' : 'reviewing'}
              </span>
            </div>
            <div className="relative">
              <motion.p
                className="absolute inset-x-0 top-0 m-0 text-[0.6875rem] leading-tight text-ink-muted"
                initial={false}
                animate={{ opacity: decision === 'rejected' && s.merge === 'hidden' ? 1 : 0 }}
                transition={still ? INSTANT : FADE}
              >
                The candidate stays deployed, off the path.
              </motion.p>
              <motion.div
                className="flex flex-wrap items-center gap-x-3 gap-y-1"
                initial={false}
                animate={{ opacity: s.merge === 'hidden' ? 0 : 1 }}
                transition={still ? INSTANT : FADE}
              >
                <MergeGlyph merged={s.merge === 'merged'} />
                <span className="text-ident text-[0.6875rem] leading-none text-ink-muted">
                  feat/checkout-54 → main
                  <span className="text-ink-faint">{s.merge === 'merged' ? ' · merged last' : ''}</span>
                </span>
                <Label
                  className={cn('transition-opacity duration-300', s.merge === 'merged' ? 'opacity-100' : 'opacity-0')}
                >
                  Merge keeps the snapshot as baseline.
                </Label>
              </motion.div>
            </div>
          </div>
        </LaneLayer>
      </div>
    </>
  );
}

// ─── Stage ────────────────────────────────────────────────────────────────────

/** Draws one frame of the film. Decorative: the caption and transcript carry the words. */
export function FilmStage({ state, layout, still }: { state: FilmState; layout: StageLayout; still: boolean }) {
  return (
    <div className="relative mx-auto overflow-hidden" style={{ width: layout.W, height: layout.H }}>
      <Place x={0} y={0} w={layout.W} h={layout.H} show={state.scene === 'cold'} still={still}>
        <ColdOpen s={state} L={layout} still={still} />
      </Place>
      <Place x={0} y={0} w={layout.W} h={layout.H} show={state.scene === 'main'} still={still}>
        <MainScene s={state} L={layout} still={still} />
      </Place>
    </div>
  );
}

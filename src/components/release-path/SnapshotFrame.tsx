import { cn } from '@/lib/utils';
import { Lock, LockOpen } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import type { CSSProperties, ReactNode } from 'react';
import { FADE, SPRING_MARKER } from '../motion/tokens';

export type FrameState = 'plain' | 'named' | 'locked';

interface SnapshotFrameProps {
  /** Shown on the frame once it's named, e.g. `snap-checkout-54`. */
  name?: string;
  state?: FrameState;
  /** Header for a plain frame, e.g. "Assembled at runtime". */
  title?: string;
  /** Share of ordinary traffic this set serves (0–1). Violet means users get it. */
  served?: number;
  /** The edge lights up when something that isn't part of the set tries to join. */
  flash?: boolean;
  fault?: boolean;
  /** Skip transitions (scrubbing, reduced motion, first paint). */
  instant?: boolean;
  className?: string;
  style?: CSSProperties;
  /** Rows in normal flow (static figures). The film positions its rows itself. */
  children?: ReactNode;
}

const INSTANT = { duration: 0 } as const;

/** A lockable frame around the versions that run together. The word on it is "Snapshot". */
export function SnapshotFrame({
  name,
  state = 'named',
  title,
  served = 0,
  flash = false,
  fault = false,
  instant = false,
  className,
  style,
  children,
}: SnapshotFrameProps) {
  const named = state !== 'plain';
  const share = Math.round(Math.min(1, Math.max(0, served)) * 100);
  const borderColor = fault
    ? 'var(--ze-fault)'
    : flash
      ? 'var(--ze-ink)'
      : `color-mix(in oklab, var(--ze-released) ${share}%, var(--ze-line-strong))`;

  return (
    <div
      className={cn(
        'relative rounded-2xl border-[1.5px] bg-[#0a0c11]/80 transition-[border-color,box-shadow] duration-500',
        className,
      )}
      style={{
        borderColor,
        boxShadow: share >= 50 && !fault ? '0 18px 50px -30px rgb(124 58 237 / 0.9)' : undefined,
        ...style,
      }}
    >
      {/* The name gets the full width on its own line, so it fits a phone-width frame. */}
      <div className="h-[2.625rem] px-2.5 pt-2.5">
        <div className="flex h-3 items-center justify-between gap-2">
          <p className="m-0 min-w-0 truncate text-[0.6875rem] leading-none text-ink-faint">
            {named ? 'Snapshot' : title}
          </p>
          {named ? <LockGlyph locked={state === 'locked'} instant={instant} /> : null}
        </div>
        <AnimatePresence initial={false}>
          {named && name ? (
            <motion.p
              key={name}
              className="m-0 mt-1.5 truncate text-ident text-[0.75rem] leading-none text-ink"
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={instant ? INSTANT : FADE}
            >
              {name}
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>
      {children ? <div className="grid gap-1.5 px-2 pb-2">{children}</div> : null}
    </div>
  );
}

/** Closes once the set is held still. */
function LockGlyph({ locked, instant }: { locked: boolean; instant: boolean }) {
  return (
    <span className="flex size-4 shrink-0 items-center justify-center text-ink-muted" aria-hidden>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={locked ? 'locked' : 'open'}
          className="flex"
          initial={{ scale: 0.6, opacity: 0, y: -2 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.6, opacity: 0 }}
          transition={instant ? INSTANT : SPRING_MARKER}
        >
          {locked ? <Lock className="size-3.5 text-ink" strokeWidth={2.2} /> : <LockOpen className="size-3.5" />}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

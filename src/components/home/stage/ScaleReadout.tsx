import { cn } from '@/lib/utils';
import { motion, useReducedMotion } from 'motion/react';
import { SCENE } from '../../motion/tokens';

export const SCALE_LEVELS = ['one app', 'with agents', 'one product', 'many clouds', 'every stack'] as const;

/** Where the camera is in the zoom-out: the story only ever pulls back. */
export function ScaleReadout({ level, className }: { level: number; className?: string }) {
  const reduce = useReducedMotion();
  const pct = (level / (SCALE_LEVELS.length - 1)) * 100;

  return (
    <div className={cn('flex items-center gap-3 text-xs text-ink-faint', className)}>
      <span>Scale</span>
      <span className="relative flex h-3 w-28 items-center" aria-hidden>
        <span className="absolute inset-x-0 h-px bg-line-strong" />
        {SCALE_LEVELS.map((_, i) => (
          <span
            key={i}
            className={cn(
              'absolute size-1.5 -translate-x-1/2 rounded-full',
              i <= level ? 'bg-ink-muted' : 'bg-surface-3',
            )}
            style={{ left: `${(i / (SCALE_LEVELS.length - 1)) * 100}%` }}
          />
        ))}
        <motion.span
          className="absolute size-2.5 -translate-x-1/2 rounded-full border border-ink bg-night"
          initial={false}
          animate={{ left: `${pct}%` }}
          transition={reduce ? { duration: 0 } : SCENE}
        />
      </span>
      <span className="text-ink-muted">{SCALE_LEVELS[level]}</span>
    </div>
  );
}

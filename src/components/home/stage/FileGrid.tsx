import { cn } from '@/lib/utils';
import { motion, useReducedMotion } from 'motion/react';
import { TOTAL_ASSETS } from './model';
import { Panel } from './Panel';

export type FilePhase = 'idle' | 'scan' | 'compare' | 'upload' | 'done';

interface FileGridProps {
  /** The build being uploaded, e.g. "#43 by marcus". */
  build: string;
  phase: FilePhase;
  changed: ReadonlySet<number>;
  className?: string;
}

/** Fingerprint every file, skip what the edge already has, upload the rest. */
export function FileGrid({ build, phase, changed, className }: FileGridProps) {
  const reduce = useReducedMotion();
  const compared = phase === 'compare' || phase === 'upload' || phase === 'done';
  const sent = phase === 'upload' || phase === 'done';
  const count = changed.size;

  return (
    <Panel title={`dist/ · ${TOTAL_ASSETS} files · ${build}`} aside="edge: ze.zephyrcloud.app" className={className}>
      <div className="grid grid-cols-12 gap-1.5" aria-hidden>
        {Array.from({ length: TOTAL_ASSETS }, (_, i) => {
          const isChanged = changed.has(i);
          return (
            <motion.span
              key={i}
              className={cn(
                'relative flex aspect-square items-center justify-center rounded-md border transition-[opacity,border-color,background-color] duration-300',
                phase === 'idle' && 'border-line bg-surface',
                phase === 'scan' && 'border-line-strong bg-surface-2',
                compared && !isChanged && 'border-line bg-surface',
                compared && isChanged && 'border-ink/45 bg-surface-3',
              )}
              style={{
                transitionDelay: phase === 'scan' && !reduce ? `${(i % 12) * 18 + Math.floor(i / 12) * 40}ms` : '0ms',
              }}
              animate={
                sent && isChanged && !reduce
                  ? { y: [0, -5, 0], opacity: [1, 0.55, 1] }
                  : { y: 0, opacity: compared && !isChanged ? 0.35 : 1 }
              }
              transition={
                reduce
                  ? { duration: 0 }
                  : { duration: sent && isChanged ? 0.7 : 0.3, delay: sent && isChanged ? (i % 12) * 0.03 : 0 }
              }
            >
              <span className="flex w-[46%] flex-col gap-[3px]">
                <span className={cn('h-[2px] rounded-full', isChanged && compared ? 'bg-ink/70' : 'bg-deployed/40')} />
                <span
                  className={cn('h-[2px] w-2/3 rounded-full', isChanged && compared ? 'bg-ink/50' : 'bg-deployed/30')}
                />
              </span>
              {compared && !isChanged ? (
                <span className="absolute right-0.5 bottom-0 text-[8px] leading-none text-ink-faint">✓</span>
              ) : null}
            </motion.span>
          );
        })}
      </div>
      <p className="mt-3.5 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-ident text-[0.75rem]">
        <span className={cn('transition-colors', sent ? 'text-ink' : 'text-ink-faint')}>
          {sent ? count : 0}/{TOTAL_ASSETS} assets uploaded
        </span>
        <span className={cn('text-ink-faint transition-opacity duration-300', compared ? 'opacity-100' : 'opacity-0')}>
          {TOTAL_ASSETS - count} already on the edge
        </span>
      </p>
    </Panel>
  );
}

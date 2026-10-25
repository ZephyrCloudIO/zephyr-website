import { cn } from '@/lib/utils';
import { motion, useReducedMotion } from 'motion/react';
import type { LogLine } from './model';
import { Panel } from './Panel';

export const BUILD_COMMAND = 'pnpm build';

interface TerminalProps {
  /** Whoever is at the keyboard; the plugin greets them by git username. */
  author: string;
  typed: number;
  lines: LogLine[];
  busy: boolean;
  onRun?: () => void;
  className?: string;
}

export function Terminal({ author, typed, lines, busy, onRun, className }: TerminalProps) {
  const reduce = useReducedMotion();
  const command = BUILD_COMMAND.slice(0, typed);
  const caret = busy && typed < BUILD_COMMAND.length;

  return (
    <Panel title={`${author} · ~/checkout`} aside="example output" className={className}>
      <div className="text-ident text-[0.78rem] leading-[1.7]" aria-live="off">
        <div className="flex items-center gap-2">
          <span className="text-ink-faint">$</span>
          {onRun && !busy ? (
            <button
              type="button"
              onClick={onRun}
              className="group -mx-1 flex items-center gap-2 rounded px-1 text-ink outline-none hover:bg-surface-2 focus-visible:ring-2 focus-visible:ring-released-ink"
            >
              <span>{BUILD_COMMAND}</span>
              <span className="text-[0.6875rem] text-ink-faint group-hover:text-ink-muted">⏎ run</span>
            </button>
          ) : (
            <span className="text-ink">
              {command}
              {caret ? (
                <span className="ml-px inline-block h-[1.05em] w-[0.5em] translate-y-[0.15em] bg-ink/80" />
              ) : null}
            </span>
          )}
        </div>
        <div className="min-h-[10.2em]">
          {lines.map((line, i) => (
            <motion.div
              key={`${i}-${line.text}`}
              initial={reduce ? false : { opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.22 }}
              className="flex min-w-0 items-center gap-2"
            >
              {line.kind === 'bundler' ? (
                <span className="text-ink-muted">{line.text}</span>
              ) : (
                <>
                  <span className="shrink-0 bg-log-badge px-1 text-[0.6875rem] font-semibold leading-[1.35] text-night">
                    ZEPHYR
                  </span>
                  <span className={cn('truncate', line.kind === 'url' ? 'text-ink' : 'text-ink-muted')}>
                    {line.text}
                  </span>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </Panel>
  );
}

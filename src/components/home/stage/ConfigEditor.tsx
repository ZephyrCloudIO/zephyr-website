import { cn } from '@/lib/utils';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { FADE } from '../../motion/tokens';
import { Panel } from './Panel';
import { CONFIG_SNIPPETS } from './snippets';

interface ConfigEditorProps {
  index: number;
  onSelect?: (index: number) => void;
  className?: string;
}

/** The config you already have, with the lines Zephyr adds highlighted. */
export function ConfigEditor({ index, onSelect, className }: ConfigEditorProps) {
  const reduce = useReducedMotion();
  const snippet = CONFIG_SNIPPETS[index];

  return (
    <Panel
      title={snippet.file}
      aside={snippet.tool}
      className={className}
      bodyClassName="px-0 py-3"
      footer={
        <div
          className="flex gap-1 overflow-x-auto px-3 py-2 [scrollbar-width:none]"
          role="tablist"
          aria-label="Bundler or framework"
        >
          {CONFIG_SNIPPETS.map((s, i) => (
            <button
              key={s.tool}
              type="button"
              role="tab"
              aria-selected={i === index}
              onClick={() => onSelect?.(i)}
              aria-label={s.tool}
              className={cn(
                'shrink-0 rounded-full px-2 py-1 text-xs whitespace-nowrap transition-colors outline-none focus-visible:ring-2 focus-visible:ring-released-ink',
                i === index ? 'bg-surface-3 text-ink' : 'text-ink-faint hover:text-ink-muted',
              )}
            >
              {s.short ?? s.tool}
            </button>
          ))}
        </div>
      }
    >
      <div className="relative text-ident text-[0.78rem] leading-[1.8]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.ol
            key={snippet.tool}
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: -6 }}
            transition={FADE}
            className="m-0 list-none p-0"
            aria-label={`${snippet.tool} config with Zephyr added`}
          >
            {snippet.lines.map((line, i) => (
              <li
                key={i}
                className={cn('flex min-w-0 gap-3 pr-4', line.add ? 'bg-surface-3/80 text-ink' : 'text-ink-faint')}
              >
                <span
                  aria-hidden
                  className={cn('w-8 shrink-0 text-right tabular-nums', line.add ? 'text-ink-muted' : 'text-surface-3')}
                >
                  {line.add ? '+' : i + 1}
                </span>
                <span className="truncate whitespace-pre">{line.code || ' '}</span>
              </li>
            ))}
          </motion.ol>
        </AnimatePresence>
      </div>
    </Panel>
  );
}

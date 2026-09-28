import { cn } from '@/lib/utils';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { FADE } from '../../motion/tokens';
import { Avatar } from './Avatar';
import { isAgent, personName, tagHost } from './model';
import { Panel } from './Panel';

export interface SessionLine {
  id: number;
  who: string;
  text: string;
  /** Build this message deployed. */
  n?: number;
  pending?: boolean;
  tone?: 'fault';
}

interface AgentSessionProps {
  lines: SessionLine[];
  /** Build the `ai` tag points at. */
  tagN: number | null;
  /** Bumps each time the tag moves; open previews reload. */
  reloads: number;
  className?: string;
}

/** A shared thread: the agent posts attempts as deployed builds, the team reviews and releases. */
export function AgentSession({ lines, tagN, reloads, className }: AgentSessionProps) {
  const reduce = useReducedMotion();
  const visible = lines.slice(-4);

  return (
    <Panel
      title="cart-agent · session with priya"
      aside="agent"
      className={className}
      bodyClassName="flex flex-col justify-end overflow-hidden px-4 py-3"
      footer={
        <div className="flex min-w-0 items-center gap-2 px-4 py-2.5 text-ident text-[0.72rem]">
          <span className="shrink-0 text-ink-faint">preview</span>
          <span className="min-w-0 truncate text-ink-muted">{tagHost('ai')}</span>
          <span aria-hidden className="text-ink-faint">
            →
          </span>
          <span className="shrink-0 text-deployed">{tagN === null ? '—' : `#${tagN}`}</span>
          <AnimatePresence mode="wait" initial={false}>
            {reloads > 0 ? (
              <motion.span
                key={reloads}
                className="ml-auto flex shrink-0 items-center gap-1.5 font-sans text-[0.6875rem] text-ink-faint"
                initial={reduce ? false : { opacity: 0, x: 6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={FADE}
              >
                <span className="size-1.5 rounded-full bg-live" />
                reloaded
              </motion.span>
            ) : null}
          </AnimatePresence>
        </div>
      }
    >
      <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
        <AnimatePresence initial={false}>
          {visible.map((line) => (
            <motion.li
              key={line.id}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: -8 }}
              transition={FADE}
              className="flex min-w-0 items-start gap-2.5"
            >
              <Avatar id={line.who} size={20} className="mt-0.5" />
              <div className="min-w-0 flex-1 text-[0.8125rem] leading-snug">
                <span
                  className={cn('mr-1.5 text-xs', isAgent(line.who) ? 'text-ident text-ink-faint' : 'text-ink-faint')}
                >
                  {personName(line.who)}
                </span>
                <span className={line.tone === 'fault' ? 'text-fault' : 'text-ink-muted'}>{line.text}</span>
                {line.pending ? (
                  <span className="ml-2 text-ident text-[0.72rem] text-ink-faint motion-safe:animate-pulse">
                    deploying…
                  </span>
                ) : line.n !== undefined ? (
                  <span className="ml-2 text-ident text-[0.72rem] text-deployed">deployed #{line.n}</span>
                ) : null}
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </Panel>
  );
}

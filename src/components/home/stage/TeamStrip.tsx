import { cn } from '@/lib/utils';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { FADE, SPRING_MARKER } from '../../motion/tokens';
import { Avatar } from './Avatar';
import { AGENT_IDS, isAgent, personName, TEAM, YOU } from './model';

/** Everyone deploying to the app, with whoever is building right now lifted out of the stack. */
export function TeamStrip({
  active,
  withAgents = false,
  className,
}: {
  active: string | null;
  withAgents?: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const members = withAgents ? [...TEAM, ...AGENT_IDS] : TEAM;
  const idle = withAgents ? `${TEAM.length} people, ${AGENT_IDS.length} agents` : `${TEAM.length} people ship checkout`;
  const label = active
    ? active === YOU
      ? 'You’re building…'
      : `${personName(active)} ${isAgent(active) ? 'is iterating…' : 'is building…'}`
    : idle;

  return (
    <div className={cn('flex items-center gap-2.5 text-xs text-ink-faint', className)}>
      <span className="flex -space-x-1.5" aria-hidden>
        <AnimatePresence initial={false}>
          {members.map((id) => (
            <motion.span
              key={id}
              className={cn(
                'ring-2 transition-[box-shadow] duration-300',
                isAgent(id) ? 'rounded-[28%]' : 'rounded-full',
                active === id ? 'ring-ink/80' : 'ring-night',
              )}
              initial={reduce ? false : { opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1, y: active === id && !reduce ? -3 : 0 }}
              exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, scale: 0.5 }}
              transition={reduce ? { duration: 0 } : SPRING_MARKER}
            >
              <Avatar id={id} size={20} />
            </motion.span>
          ))}
        </AnimatePresence>
      </span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={label}
          initial={reduce ? false : { opacity: 0, y: 3 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: -3 }}
          transition={FADE}
          className="whitespace-nowrap"
        >
          {label}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

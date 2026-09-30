import { cn } from '@/lib/utils';
import { Eye, GitMerge, GitPullRequest, GitPullRequestClosed, type LucideIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { FADE, SPRING_MARKER } from '../motion/tokens';

export type Acceptance = 'unmerged' | 'review' | 'accepted' | 'rejected';

const META: Record<Acceptance, { label: string; icon: LucideIcon; className: string }> = {
  unmerged: { label: 'Unmerged', icon: GitPullRequest, className: 'border-deployed/70 bg-night text-ink-muted' },
  review: { label: 'Review', icon: Eye, className: 'border-ink/60 bg-night text-ink' },
  accepted: { label: 'Accepted', icon: GitMerge, className: 'border-ink bg-ink text-night' },
  rejected: { label: 'Rejected', icon: GitPullRequestClosed, className: 'border-ink-faint/60 bg-night text-ink-muted' },
};

/**
 * Whether people have reviewed and kept the change. It moves on its own clock:
 * full traffic can sit next to `Unmerged`.
 */
export function AcceptanceChip({
  state,
  pulse = 0,
  instant = false,
  className,
}: {
  state: Acceptance;
  /** Bump to draw the eye once (e.g. while exposure is at 100%). */
  pulse?: number;
  instant?: boolean;
  className?: string;
}) {
  const { label, icon: Icon, className: tone } = META[state];

  return (
    <span
      className={cn(
        'relative inline-flex items-center gap-1.5 rounded-full border px-2 py-[0.3125rem] text-[0.6875rem] leading-none font-medium whitespace-nowrap transition-colors duration-300',
        tone,
        className,
      )}
    >
      {pulse > 0 && !instant ? (
        <motion.span
          key={pulse}
          aria-hidden
          className="absolute -inset-1 rounded-full border border-ink/70"
          initial={{ opacity: 0.9, scale: 0.92 }}
          animate={{ opacity: 0, scale: 1.25 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
        />
      ) : null}
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={state}
          className="flex items-center gap-1.5"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={instant ? { duration: 0 } : { ...SPRING_MARKER, opacity: FADE }}
        >
          <Icon className="size-3" strokeWidth={2.2} aria-hidden />
          {label}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

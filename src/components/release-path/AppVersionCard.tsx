import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';
import { APP_LABEL, type AppId } from './model';

/**
 * - `default`: a version inside a set
 * - `candidate`: the piece that changed
 * - `deployed`: live at its own URL, nobody pointed at it yet
 * - `lit`: an interaction is running through it
 * - `fault`: part of a combination that failed
 */
export type VersionTone = 'default' | 'candidate' | 'deployed' | 'lit' | 'fault';

const TONE: Record<VersionTone, string> = {
  default: 'border-line-strong bg-surface',
  candidate: 'border-ink/55 bg-surface-2',
  deployed: 'border-dashed border-deployed/45 bg-surface/60',
  lit: 'border-ink/80 bg-surface-3',
  fault: 'border-fault/80 bg-fault/[0.1]',
};

interface AppVersionCardProps {
  app: AppId;
  n: number;
  tone?: VersionTone;
  /** Green status dot: every build is live at its own URL. */
  live?: boolean;
  /** Status shown before the number, e.g. "build passed". */
  aside?: ReactNode;
  className?: string;
}

/** A numbered version of one app: `Host 120`, `Checkout 54`. */
export function AppVersionCard({ app, n, tone = 'default', live = false, aside, className }: AppVersionCardProps) {
  return (
    <div
      className={cn(
        'flex h-full w-full min-w-0 items-center justify-between gap-2 rounded-lg border px-2.5 transition-[border-color,background-color] duration-300',
        TONE[tone],
        className,
      )}
    >
      <span className="flex min-w-0 items-center gap-1.5">
        {live ? <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-live" /> : null}
        <span className="truncate text-[0.8125rem] leading-none text-ink-muted">{APP_LABEL[app]}</span>
      </span>
      <span className="flex shrink-0 items-center gap-2">
        {aside}
        <span
          className={cn(
            'text-ident text-[0.875rem] leading-none',
            tone === 'fault' ? 'text-fault' : tone === 'deployed' ? 'text-ink-muted' : 'text-ink',
          )}
        >
          {n}
        </span>
      </span>
    </div>
  );
}

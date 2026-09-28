import { cn } from '@/lib/utils';
import { Avatar } from './Avatar';
import { personName, type Version } from './model';

interface VersionCardProps {
  version: Version;
  released: boolean;
  dim?: boolean;
  fault?: boolean;
  onRelease?: () => void;
  environment?: string;
}

export function VersionCard({
  version,
  released,
  dim,
  fault,
  onRelease,
  environment = 'production',
}: VersionCardProps) {
  const interactive = Boolean(onRelease) && !released;
  const Tag = onRelease ? 'button' : 'div';
  const build = `build #${version.n} on ${version.branch} by ${personName(version.author)}`;

  return (
    <Tag
      type={onRelease ? 'button' : undefined}
      onClick={interactive ? onRelease : undefined}
      aria-label={
        onRelease
          ? released
            ? `${build[0].toUpperCase()}${build.slice(1)}, released to ${environment}`
            : `Release ${build} to ${environment}`
          : undefined
      }
      aria-pressed={onRelease ? released : undefined}
      className={cn(
        'group relative flex h-full w-full flex-col justify-between rounded-xl border px-3 py-2.5 text-left transition-[border-color,background-color,box-shadow,opacity] duration-300',
        released
          ? 'border-released/80 bg-released/[0.12] shadow-[0_10px_34px_-16px_rgb(124_58_237/0.9)]'
          : 'border-line-strong bg-surface',
        fault && 'border-fault/80 bg-fault/[0.1] shadow-none',
        interactive && 'cursor-pointer hover:border-deployed/70 hover:bg-surface-2',
        dim && !released && 'opacity-55',
      )}
    >
      <span className="flex items-center justify-between gap-2">
        <span className={cn('text-ident text-[0.9375rem] font-medium', released ? 'text-released-ink' : 'text-ink')}>
          #{version.n}
        </span>
        <span className="relative flex size-2" title="Live at its own URL">
          <span className="absolute inset-0 rounded-full bg-live/40 motion-safe:animate-ping [animation-duration:2.4s]" />
          <span className="relative size-2 rounded-full bg-live" />
        </span>
      </span>
      <span className="flex min-w-0 items-center gap-1.5 text-ident text-[0.6875rem] text-ink-faint">
        <Avatar id={version.author} size={16} />
        <span className={cn('truncate', interactive && 'group-hover:hidden group-focus-visible:hidden')}>
          {version.branch}
        </span>
        {interactive ? (
          <span className="hidden text-released-ink group-hover:inline group-focus-visible:inline">release →</span>
        ) : null}
      </span>
    </Tag>
  );
}

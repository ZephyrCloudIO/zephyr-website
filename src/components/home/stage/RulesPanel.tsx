import { cn } from '@/lib/utils';
import { APP_ID, environmentHost, tagHost } from './model';
import { Panel } from './Panel';

function Pill({ label, variant }: { label: string; variant: 'environment' | 'tag' }) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-ident leading-none',
        variant === 'environment' ? 'bg-released text-white' : 'border border-deployed/60 text-deployed',
      )}
    >
      <span
        aria-hidden
        className={cn('size-1.5 rounded-full', variant === 'environment' ? 'bg-white' : 'bg-deployed')}
      />
      {label}
    </span>
  );
}

/** How tags and environments decide which build they point at, and the URLs they serve. */
export function RulesPanel({
  latest,
  production,
  className,
}: {
  latest: number;
  production: number;
  className?: string;
}) {
  return (
    <Panel title={`${APP_ID} · release rules`} className={className} bodyClassName="flex flex-col px-4 py-4">
      <dl className="m-0 grid gap-3.5">
        <div className="flex items-start gap-3">
          <dt>
            <Pill label="latest" variant="tag" />
          </dt>
          <dd className="m-0 text-sm leading-snug text-ink-muted">
            <span className="text-ink">Tag.</span> Moves to every new build where{' '}
            <span className="text-ident text-ink">branch is main</span>.
          </dd>
        </div>
        <div className="flex items-start gap-3">
          <dt>
            <Pill label="production" variant="environment" />
          </dt>
          <dd className="m-0 text-sm leading-snug text-ink-muted">
            <span className="text-ink">Environment.</span> Moves only when someone releases. Moving it back is a
            rollback.
          </dd>
        </div>
      </dl>
      <div className="mt-auto grid gap-1.5 border-t border-line pt-3 text-ident text-[0.75rem]">
        <p className="m-0 flex min-w-0 gap-2 text-ink-faint">
          <span className="truncate">{tagHost('latest')}</span>
          <span aria-hidden>→</span>
          <span className="shrink-0 text-deployed">#{latest}</span>
        </p>
        <p className="m-0 flex min-w-0 gap-2 text-ink-faint">
          <span className="truncate">{environmentHost('production')}</span>
          <span aria-hidden>→</span>
          <span className="shrink-0 text-released-ink">#{production}</span>
        </p>
      </div>
    </Panel>
  );
}

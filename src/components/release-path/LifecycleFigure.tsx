import { cn } from '@/lib/utils';

export type LifecycleStage = 'deploy' | 'name' | 'qa' | 'exposure' | 'review' | 'accept';

const STAGES: { id: LifecycleStage; label: string; detail?: string }[] = [
  { id: 'deploy', label: 'Deploy candidate' },
  { id: 'name', label: 'Name snapshot' },
  { id: 'qa', label: 'QA in production' },
  { id: 'exposure', label: 'Exposure', detail: '(policy)' },
  { id: 'review', label: 'Review with evidence' },
  { id: 'accept', label: 'Accept' },
];

/**
 * The release path as nodes, not a waterfall of commitments. Violet marks only the stage in focus.
 * Horizontal where there's room; a vertical list on phones.
 */
export function LifecycleFigure({ active = 'exposure' }: { active?: LifecycleStage }) {
  return (
    <figure className="my-10">
      <div className="@container rounded-2xl border border-line bg-[#0a0c11] px-5 py-7 sm:px-6 sm:py-9">
        <ol className="relative m-0 grid list-none gap-6 p-0 @min-[34rem]:grid-cols-6 @min-[34rem]:gap-0">
          <span
            aria-hidden
            className="absolute top-2 bottom-2 left-[7px] w-px bg-line-strong @min-[34rem]:top-[7px] @min-[34rem]:right-[8.333%] @min-[34rem]:bottom-auto @min-[34rem]:left-[8.333%] @min-[34rem]:h-px @min-[34rem]:w-auto"
          />
          {STAGES.map((stage) => {
            const on = stage.id === active;
            return (
              <li
                key={stage.id}
                aria-current={on ? 'step' : undefined}
                className="relative flex gap-4 @min-[34rem]:flex-col @min-[34rem]:items-center @min-[34rem]:gap-3 @min-[34rem]:px-1.5 @min-[34rem]:text-center"
              >
                <span
                  aria-hidden
                  className={cn(
                    'relative mt-px size-[0.9375rem] shrink-0 rounded-full border-2',
                    on
                      ? 'border-released bg-released shadow-[0_0_0_4px_rgb(124_58_237/0.22)]'
                      : 'border-ink-faint/70 bg-[#0a0c11]',
                  )}
                />
                <div className="min-w-0">
                  <p
                    className={cn(
                      'm-0 text-[0.875rem] leading-snug font-medium text-balance',
                      on ? 'text-released-ink' : 'text-ink-muted',
                    )}
                  >
                    {stage.label}
                    {stage.detail ? <span className="font-normal text-ink-faint"> {stage.detail}</span> : null}
                  </p>
                  {stage.id === 'exposure' ? (
                    <div className="mt-3 w-fit @min-[34rem]:mx-auto">
                      <span
                        aria-hidden
                        className="block h-1.5 border-x border-t border-ink-faint/70 @min-[34rem]:w-full"
                      />
                      <p className="m-0 mt-1.5 text-ident text-[0.6875rem] leading-none whitespace-nowrap text-ink-muted">
                        1% … cap … 100%
                      </p>
                      <p className="m-0 mt-2 text-[0.75rem] leading-snug text-ink-faint italic">How far is a policy.</p>
                    </div>
                  ) : null}
                  {stage.id === 'accept' ? (
                    <p className="m-0 mt-3 text-[0.75rem] leading-snug text-balance text-ink-faint">
                      Merge keeps the snapshot as baseline.
                    </p>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
      <figcaption className="mt-3 px-1 text-sm leading-relaxed text-ink-faint">
        <span className="text-ink-muted">A path, not a cliff.</span> Each stage is a decision someone can stop at. How
        far exposure goes is set by policy, and merge comes last.
      </figcaption>
    </figure>
  );
}

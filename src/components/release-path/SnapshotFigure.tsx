import { ScanSearch, Users } from 'lucide-react';
import { AppVersionCard } from './AppVersionCard';
import { CANDIDATE, PREVIOUS, ROWS } from './model';
import { SnapshotFrame } from './SnapshotFrame';

function Arrow({ up = false }: { up?: boolean }) {
  return (
    <svg
      width="10"
      height="22"
      viewBox="0 0 10 22"
      aria-hidden
      className={up ? 'rotate-180' : undefined}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M5 0V20" />
      <path d="M1.5 16.5 5 20l3.5-3.5" />
    </svg>
  );
}

/**
 * "The combination is the unit." Two snapshots, four versions each: ordinary users still on the
 * previous one, a QA user on the candidate. Schematic, a frame from the companion film.
 */
export function SnapshotFigure() {
  return (
    <figure className="my-10">
      <div className="rounded-2xl border border-line bg-[#0a0c11] px-3 py-6 sm:px-8 sm:py-8">
        <div className="mx-auto grid max-w-[38rem] grid-cols-2 gap-x-3 sm:gap-x-12">
          <div aria-hidden className="h-[3.25rem]" />
          <div className="flex flex-col items-start pl-4 text-ink sm:pl-5">
            <span className="flex h-7 items-center gap-1.5 rounded-full border border-ink/60 bg-night pr-2.5 pl-1 text-[0.75rem] leading-none font-medium">
              <span className="flex size-5 items-center justify-center rounded-full bg-surface-3">
                <ScanSearch className="size-3" aria-hidden />
              </span>
              QA user
            </span>
            <span className="ml-1.5">
              <Arrow />
            </span>
          </div>

          <SnapshotFrame name={PREVIOUS.name} state="locked" served={1}>
            {ROWS.map((app) => (
              <div key={app} className="h-9">
                <AppVersionCard app={app} n={PREVIOUS.versions[app]} />
              </div>
            ))}
          </SnapshotFrame>
          <SnapshotFrame name={CANDIDATE.name} state="locked">
            {ROWS.map((app) => (
              <div key={app} className="h-9">
                <AppVersionCard
                  app={app}
                  n={CANDIDATE.versions[app]}
                  tone={app === 'checkout' ? 'candidate' : 'default'}
                />
              </div>
            ))}
          </SnapshotFrame>

          <div className="flex flex-col items-center text-released-ink">
            <Arrow up />
            <span className="flex h-6 items-center gap-1.5 rounded-full bg-released px-2.5 text-[0.75rem] leading-none font-medium text-white shadow-[0_6px_24px_-8px_rgb(124_58_237/0.9)]">
              <Users className="size-3" aria-hidden />
              ordinary users
            </span>
          </div>
          <div aria-hidden />
        </div>
      </div>
      <figcaption className="mt-3 px-1 text-sm leading-relaxed text-ink-faint">
        <span className="text-ink-muted">The combination is the unit.</span> Ordinary users stay on the previous
        snapshot while a QA user runs the candidate in production. Only checkout changed, and the snapshot still holds
        all four versions.
      </figcaption>
    </figure>
  );
}

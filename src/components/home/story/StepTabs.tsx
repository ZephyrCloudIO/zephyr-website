import { cn } from '@/lib/utils';
import { useRef, type KeyboardEvent } from 'react';

interface StepTabsProps {
  /** `id` prefixes the tab and panel ids: `${id}-tab`, `${id}-panel`. */
  steps: { id: string; label: string }[];
  active: number;
  /** How long the active step plays before advancing, in ms; null once the visitor has taken over. */
  dwell: number | null;
  /** False while the figure is off screen or paused; the progress bar holds its place. */
  running: boolean;
  label: string;
  onSelect: (index: number) => void;
  onComplete: () => void;
}

/**
 * A chapter's steps on phones. Each tab carries a progress bar: finished steps stay full, the
 * active one fills while its figure plays, and choosing a tab hands control to the visitor.
 */
export function StepTabs({ steps, active, dwell, running, label, onSelect, onComplete }: StepTabsProps) {
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (event: KeyboardEvent) => {
    const last = steps.length - 1;
    const keys: Record<string, number> = {
      ArrowRight: active === last ? 0 : active + 1,
      ArrowLeft: active === 0 ? last : active - 1,
      Home: 0,
      End: last,
    };
    const next = keys[event.key];
    if (next === undefined) return;
    event.preventDefault();
    onSelect(next);
    tabs.current[next]?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label={label}
      className="story-tabs grid auto-cols-fr grid-flow-col gap-3"
      onKeyDown={onKeyDown}
    >
      {steps.map((step, i) => {
        const selected = i === active;
        const playing = selected && dwell !== null;
        return (
          <button
            key={step.id}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${step.id}-tab`}
            aria-selected={selected}
            aria-controls={`${step.id}-panel`}
            tabIndex={selected ? 0 : -1}
            onClick={() => onSelect(i)}
            className="group flex min-w-0 flex-col gap-2.5 rounded-md pt-2 pb-1.5 text-left outline-none focus-visible:ring-2 focus-visible:ring-released-ink"
          >
            <span aria-hidden className="block h-0.5 w-full overflow-hidden rounded-full bg-line-strong">
              <span
                className="block h-full w-full origin-left bg-ink"
                style={
                  playing
                    ? {
                        animation: `story-progress ${dwell}ms linear both`,
                        animationPlayState: running ? 'running' : 'paused',
                      }
                    : { transform: i <= active ? 'none' : 'scaleX(0)' }
                }
                onAnimationEnd={playing ? onComplete : undefined}
              />
            </span>
            <span
              className={cn(
                'truncate text-sm transition-colors',
                selected ? 'text-ink' : 'text-ink-faint group-hover:text-ink-muted',
              )}
            >
              {step.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

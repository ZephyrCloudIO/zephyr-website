import { cn } from '@/lib/utils';
import { Bot, MousePointer2 } from 'lucide-react';
import { isAgent, PEOPLE, YOU } from './model';

/**
 * Teammates are initials in a circle, agents a bot in a square, the visitor a pointer.
 * Decorative: names are always in the surrounding labels.
 */
export function Avatar({ id, size = 18, className }: { id: string; size?: number; className?: string }) {
  const box = { width: size, height: size };
  const glyph = { width: size * 0.58, height: size * 0.58 };

  if (id === YOU) {
    return (
      <span
        aria-hidden
        className={cn(
          'inline-flex shrink-0 items-center justify-center rounded-full border border-ink/70 bg-night text-ink',
          className,
        )}
        style={box}
      >
        <MousePointer2 style={glyph} />
      </span>
    );
  }

  if (isAgent(id)) {
    return (
      <span
        aria-hidden
        className={cn(
          'inline-flex shrink-0 items-center justify-center rounded-[28%] border border-line-strong bg-surface-3 text-ink-muted',
          className,
        )}
        style={box}
      >
        <Bot style={glyph} />
      </span>
    );
  }

  const person = PEOPLE[id];
  return (
    <span
      aria-hidden
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full font-semibold leading-none text-night',
        className,
      )}
      style={{ ...box, fontSize: Math.round(size * 0.5), background: person?.tint ?? 'var(--ze-deployed)' }}
    >
      {(person?.name ?? id).charAt(0)}
    </span>
  );
}

import { cn } from '@/lib/utils';
import { animate, motion, useMotionValue, useReducedMotion } from 'motion/react';
import { useEffect, useRef, type KeyboardEvent } from 'react';
import { SPRING_MARKER } from '../../motion/tokens';
import { Avatar } from './Avatar';

interface ReleaseMarkerProps {
  label: string;
  /** Who last moved this marker; shown in place of the dot. Tags move on their own, so they have none. */
  actor?: string;
  /** Center x (px) of the version this marker points at, relative to the rail. */
  targetX: number;
  variant?: 'environment' | 'tag';
  /** Drag bounds as center x positions. Omit to disable dragging. */
  dragRange?: { min: number; max: number };
  onDropAt?: (centerX: number) => void;
  onStep?: (direction: -1 | 1 | 'first' | 'last') => void;
  valueText?: string;
  /** Jump to targetX without animating (first layout, reduced motion). */
  instant?: boolean;
  className?: string;
}

/**
 * The signature element: a named pointer that glides between versions.
 * Environments (violet, solid) move on release; tags (steel, outline) follow builds.
 */
export function ReleaseMarker({
  label,
  actor,
  targetX,
  variant = 'environment',
  dragRange,
  onDropAt,
  onStep,
  valueText,
  instant = false,
  className,
}: ReleaseMarkerProps) {
  const reduce = useReducedMotion();
  const x = useMotionValue(targetX);
  const dragging = useRef(false);
  const interactive = Boolean(dragRange && onDropAt);

  useEffect(() => {
    if (dragging.current) return;
    if (reduce || instant) {
      x.set(targetX);
      return;
    }
    const controls = animate(x, targetX, SPRING_MARKER);
    return () => controls.stop();
  }, [targetX, reduce, instant, x]);

  const settle = () => {
    dragging.current = false;
    const dropped = x.get();
    onDropAt?.(dropped);
    // If the drop resolves to the same version, targetX won't change; glide home.
    requestAnimationFrame(() => {
      if (!dragging.current) animate(x, targetX, reduce ? { duration: 0 } : SPRING_MARKER);
    });
  };

  const onKeyDown = (event: KeyboardEvent) => {
    const keys: Record<string, -1 | 1 | 'first' | 'last'> = {
      ArrowLeft: -1,
      ArrowDown: -1,
      ArrowRight: 1,
      ArrowUp: 1,
      Home: 'first',
      End: 'last',
    };
    const step = keys[event.key];
    if (step !== undefined && onStep) {
      event.preventDefault();
      onStep(step);
    }
  };

  const isEnv = variant === 'environment';

  return (
    <motion.div
      className={cn(
        'absolute top-0 left-0 z-10 transition-[top] duration-500 ease-out-soft',
        interactive && 'cursor-grab active:cursor-grabbing',
        className,
      )}
      style={{ x }}
      drag={interactive ? 'x' : false}
      dragMomentum={false}
      dragElastic={0.04}
      dragConstraints={dragRange ? { left: dragRange.min, right: dragRange.max } : undefined}
      onDragStart={() => {
        dragging.current = true;
      }}
      onDragEnd={settle}
    >
      <div
        role={interactive ? 'slider' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={interactive ? `${label} release marker` : undefined}
        aria-valuetext={interactive ? valueText : undefined}
        onKeyDown={interactive ? onKeyDown : undefined}
        className={cn(
          'relative -translate-x-1/2 select-none rounded-full px-2.5 py-1 text-ident whitespace-nowrap outline-none',
          'focus-visible:ring-2 focus-visible:ring-released-ink focus-visible:ring-offset-2 focus-visible:ring-offset-night',
          isEnv
            ? 'bg-released text-white shadow-[0_6px_24px_-8px_rgb(124_58_237/0.9)]'
            : 'border border-deployed/60 bg-night text-deployed',
        )}
      >
        <span className="flex items-center gap-1.5 leading-none">
          {actor ? (
            // Keyed so a new releaser pops in rather than silently swapping.
            <motion.span
              key={actor}
              className="-my-1 -ml-1.5 flex"
              initial={reduce ? false : { scale: 0.4, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={SPRING_MARKER}
            >
              <Avatar id={actor} size={16} className="ring-1 ring-white/80" />
            </motion.span>
          ) : (
            <span aria-hidden className={cn('size-1.5 rounded-full', isEnv ? 'bg-white' : 'bg-deployed')} />
          )}
          {label}
        </span>
        <span
          aria-hidden
          className={cn(
            'absolute top-full left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rotate-45',
            isEnv ? 'bg-released' : 'border-r border-b border-deployed/60 bg-night',
          )}
        />
      </div>
    </motion.div>
  );
}

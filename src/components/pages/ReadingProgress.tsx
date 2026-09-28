import { motion, useScroll, useSpring } from 'motion/react';
import type { RefObject } from 'react';

interface ReadingProgressProps {
  /** The article being read; progress runs from its top reaching the viewport top to its end reaching the bottom. */
  target: RefObject<HTMLElement | null>;
}

/**
 * A 2px bar pinned above the sticky header (z-50) that tracks how far through the article the reader is.
 * Purely decorative, so it ignores pointer events and is hidden under reduced motion (CSS, so SSR matches).
 */
export function ReadingProgress({ target }: ReadingProgressProps) {
  const { scrollYProgress } = useScroll({ target, offset: ['start start', 'end end'] });
  const scaleX = useSpring(scrollYProgress, { stiffness: 320, damping: 40, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-released motion-reduce:hidden"
      style={{ scaleX }}
    />
  );
}

import { useLayoutEffect, useRef, useState } from 'react';

const useIsoLayoutEffect = typeof window === 'undefined' ? () => {} : useLayoutEffect;

/**
 * Live content width of an element. SVGs that animate `pathLength` draw in real pixels
 * from this instead of stretching a viewBox: with `preserveAspectRatio="none"` plus
 * `non-scaling-stroke`, dash lengths are measured in screen space and lines stop short.
 */
export function useElementWidth<T extends Element>(fallback: number) {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(fallback);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Layout width, not getBoundingClientRect(): views mount mid-zoom (scaled up to 2.4x), and a
    // transformed measurement would stick because ResizeObserver doesn't fire for transforms.
    const measure = () => {
      const next = el instanceof HTMLElement ? el.offsetWidth : el.getBoundingClientRect().width;
      if (next > 0) setWidth(next);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, width] as const;
}

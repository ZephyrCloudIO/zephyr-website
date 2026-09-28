import { useEffect, useState } from 'react';

/** `null` during SSR and the first client render, so markup matches before it adapts. */
export function useMediaQuery(query: string): boolean | null {
  const [matches, setMatches] = useState<boolean | null>(null);

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, [query]);

  return matches;
}

/**
 * The beat whose block crosses the middle of the viewport. Beats are tall and
 * contiguous, so the thin center band intersects exactly one at a time.
 */
export function useActiveBeat<T extends string>(ids: readonly T[], initial: T): T {
  const [active, setActive] = useState<T>(initial);
  const key = ids.join('|');

  useEffect(() => {
    const elements = ids
      .map((id) => document.querySelector<HTMLElement>(`[data-beat="${id}"]`))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.getAttribute('data-beat') as T);
        }
      },
      { rootMargin: '-48% 0px -48% 0px', threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [key]);

  return active;
}

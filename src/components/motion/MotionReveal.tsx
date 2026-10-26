import { useEffect } from 'react';

declare global {
  interface Window {
    __zeMotionReady?: boolean;
  }
}

const REVEAL_SELECTOR = '.reveal:not(.is-in)';

/**
 * Adds `.is-in` to `.reveal` elements as they scroll into view. The head script
 * in rspress.config.ts only hides reveal targets once JS runs, and falls back to
 * visible if this component never mounts.
 */
export function MotionReveal() {
  useEffect(() => {
    window.__zeMotionReady = true;

    if (document.documentElement.dataset.motion !== 'on' || !('IntersectionObserver' in window)) {
      document.querySelectorAll(REVEAL_SELECTOR).forEach((el) => el.classList.add('is-in'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            observer.unobserve(entry.target);
          }
        }
      },
      // Any part past the line reveals it, so tall blocks peeking in at load aren't left blank.
      { rootMargin: '0px 0px -8% 0px', threshold: 0 },
    );

    const observeAll = () => document.querySelectorAll(REVEAL_SELECTOR).forEach((el) => observer.observe(el));
    observeAll();

    // Rspress swaps page content on client navigation; pick up new targets.
    const mutations = new MutationObserver(observeAll);
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, []);

  return null;
}

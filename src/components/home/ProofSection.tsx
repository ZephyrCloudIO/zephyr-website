import { LinkedinIcon } from '@/components/ui/linkedin-icon';
import { TwitchIcon } from '@/components/ui/twitch-icon';
import { XIcon } from '@/components/ui/x-icon';
import { YoutubeIcon } from '@/components/ui/youtube-icon';
import { COMPANY_LOGOS } from '@/constants/companyLogos';
import { cn } from '@/lib/utils';
import { Testimonials, type TestimonialSocialPlatform } from '@/testimonials';
import type { LucideIcon } from 'lucide-react';
import { useState, type CSSProperties } from 'react';

const SOCIAL_ICONS: Record<TestimonialSocialPlatform, LucideIcon> = {
  X: XIcon,
  LinkedIn: LinkedinIcon,
  YouTube: YoutubeIcon,
  Twitch: TwitchIcon,
};

/** Phones show this many quotes until asked for the rest; one column of ten reads as a wall. */
const PHONE_QUOTES = 4;

export function ProofSection() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section aria-labelledby="proof-title" className="border-t border-line py-24 lg:py-32">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10">
        <div className="reveal max-w-2xl">
          <p className="mb-3 text-sm text-ink-faint">From people shipping with it</p>
          <h2 id="proof-title" className="text-headline m-0 text-ink">
            Some folks who love Zephyr.
          </h2>
        </div>

        <ul className="reveal m-0 mt-12 flex list-none flex-wrap items-center gap-x-14 gap-y-8 p-0">
          {COMPANY_LOGOS.map((logo) => (
            <li key={logo.alt}>
              <a
                href={logo.url}
                target="_blank"
                rel="noopener"
                className="block opacity-55 grayscale transition-[opacity,filter] duration-300 hover:opacity-100 hover:grayscale-0 focus-visible:opacity-100"
              >
                <img src={logo.src} alt={logo.alt} height={48} className="h-12 w-auto object-contain" loading="lazy" />
              </a>
            </li>
          ))}
        </ul>

        <div
          id="proof-quotes"
          data-expanded={expanded || undefined}
          className="proof-quotes mt-16 columns-1 gap-4 md:columns-2 lg:columns-3"
        >
          {Testimonials.map((t, i) => (
            <figure
              key={t.name}
              className={cn(
                'reveal m-0 mb-4 break-inside-avoid rounded-2xl border border-line bg-surface/70 p-5',
                i >= PHONE_QUOTES && 'proof-extra',
              )}
              style={{ '--reveal-delay': `${(i % 3) * 70}ms` } as CSSProperties}
            >
              <blockquote className="m-0 text-[0.9375rem] leading-relaxed text-ink-muted">{t.content}</blockquote>
              <figcaption className="mt-5 flex items-center justify-between gap-3">
                <span className="flex min-w-0 items-center gap-3">
                  <img
                    src={t.avatar}
                    alt=""
                    width={36}
                    height={36}
                    className="size-9 shrink-0 rounded-full object-cover"
                    loading="lazy"
                  />
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium text-ink">{t.name}</span>
                    <span className="block truncate text-xs text-ink-faint">
                      {t.role}, {t.company}
                    </span>
                  </span>
                </span>
                <span className="flex shrink-0 gap-2">
                  {t.socialLinks.map((social) => {
                    const Icon = SOCIAL_ICONS[social.platform];
                    return (
                      <a
                        key={social.link}
                        href={social.link}
                        target="_blank"
                        rel="noopener"
                        aria-label={`${t.name} on ${social.platform}`}
                        className="text-ink-faint transition-colors hover:text-ink"
                      >
                        <Icon size={15} />
                      </a>
                    );
                  })}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setExpanded((open) => !open)}
          aria-expanded={expanded}
          aria-controls="proof-quotes"
          className="proof-more mt-2 inline-flex h-10 items-center rounded-full border border-line-strong px-4 text-sm text-ink-muted outline-none transition-colors hover:border-deployed/60 hover:text-ink focus-visible:ring-2 focus-visible:ring-released-ink md:hidden"
        >
          {expanded ? 'Show fewer' : `Show all ${Testimonials.length}`}
        </button>
      </div>
    </section>
  );
}

import { getFeaturedEvent } from '@/data/events';
import { ArrowRight, CalendarDays } from 'lucide-react';
import { CommandChip } from './CommandChip';

export const CHAPTER_LINKS = [
  { href: '#solo', label: 'One app' },
  { href: '#ai', label: 'With AI' },
  { href: '#teams', label: 'Teams & agents' },
  { href: '#clouds', label: 'Multi-cloud' },
  { href: '#frameworks', label: 'Any framework' },
] as const;

/** Small violet pointer that lands on "Released", echoing the stage's release markers. */
function HeadlineMarker() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 26 14"
      // Hangs in the margin only where the centered container leaves room for it; inline elsewhere.
      className="hero-marker mr-[0.18em] inline-block h-[0.3em] w-auto -translate-y-[0.12em] align-middle min-[1440px]:absolute min-[1440px]:top-[0.34em] min-[1440px]:right-full min-[1440px]:mr-[0.16em] min-[1440px]:translate-y-0"
    >
      <rect x="0" y="0" width="20" height="14" rx="7" fill="#7c3aed" />
      <path d="M18 2.5 L25.5 7 L18 11.5 Z" fill="#7c3aed" />
      <circle cx="8" cy="7" r="2.2" fill="#fff" />
    </svg>
  );
}

export function HeroCopy() {
  const featuredEvent = getFeaturedEvent();

  return (
    <div>
      {featuredEvent?.link ? (
        // Shown only when an upcoming event in src/data/events.ts is marked `featured`.
        <a
          href={featuredEvent.link}
          target="_blank"
          rel="noopener"
          className="group mb-8 inline-flex max-w-full items-center gap-2 rounded-full border border-line-strong px-3.5 py-1.5 text-sm text-ink-muted transition-colors hover:border-deployed/60 hover:text-ink"
        >
          <CalendarDays className="size-4 shrink-0 text-released-ink" aria-hidden />
          <span className="truncate">
            <span className="text-ink">{featuredEvent.title}</span> · {featuredEvent.date} · {featuredEvent.location}
          </span>
          <ArrowRight className="size-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden />
        </a>
      ) : null}
      <p className="mb-6 text-sm text-ink-faint">
        From the team behind{' '}
        <a
          href="https://module-federation.io/"
          target="_blank"
          rel="noopener"
          className="text-ink-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-ink hover:decoration-ink-muted"
        >
          Module Federation
        </a>
      </p>

      <h1 className="text-display m-0">
        <span className="hero-deployed block text-deployed">Always deployed.</span>
        <span className="hero-released relative block text-ink">
          <HeadlineMarker />
          Released when you’re ready.
        </span>
      </h1>

      <p className="text-lead mt-7 max-w-[34rem] text-ink-muted">
        Add one line to the bundler you already use. Every build deploys to its own live URL. Production only changes
        when you release, with no rebuild and no re-upload.
      </p>

      <div className="mt-9 flex flex-wrap items-center gap-3">
        <CommandChip command="npx create-zephyr-apps@latest" />
        <a
          href="https://app.zephyr-cloud.io/"
          target="_blank"
          rel="noopener"
          className="inline-flex h-12 items-center gap-2 rounded-xl bg-released px-5 text-[0.9375rem] font-medium text-white shadow-[0_12px_32px_-14px_rgb(124_58_237/0.95)] outline-none transition-[background-color,transform] hover:bg-[#8b4df5] focus-visible:ring-2 focus-visible:ring-released-ink focus-visible:ring-offset-2 focus-visible:ring-offset-night active:translate-y-px"
        >
          Get started
          <ArrowRight className="size-4" />
        </a>
      </div>

      <p className="mt-4 flex flex-wrap items-center gap-x-2.5 gap-y-2 text-sm text-ink-faint">
        Already have an app?
        <CommandChip command="npx with-zephyr" size="sm" />
        adds the plugin for you.
      </p>

      <nav aria-label="Jump to a chapter" className="mt-12">
        <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0">
          {CHAPTER_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="inline-flex h-8 items-center rounded-full border border-line px-3 text-sm text-ink-muted outline-none transition-colors hover:border-line-strong hover:text-ink focus-visible:ring-2 focus-visible:ring-released-ink"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

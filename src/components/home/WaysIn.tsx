import { ArrowRight, ArrowUpRight } from 'lucide-react';
import type { CSSProperties } from 'react';
import { CommandChip } from './CommandChip';

// Mirrors the dashboard's onboarding paths, plus the agent route from Zephyr Skills.
const PATHS = [
  {
    title: 'Start a new project',
    body: 'Pick a template for web, server or React Native. It comes with Zephyr already set up.',
    command: 'npx create-zephyr-apps@latest',
    docs: 'https://docs.zephyr-cloud.io/',
  },
  {
    title: 'Add it to an existing app',
    body: 'The codemod finds your bundler, installs the right plugin and adds it to your config.',
    command: 'npx with-zephyr',
    docs: 'https://docs.zephyr-cloud.io/',
  },
  {
    title: 'Hand it to your agent',
    body: 'Zephyr Skills teach Claude Code, Cursor, Codex and OpenCode how versions, tags and environments work.',
    command: 'npx skills add https://github.com/ZephyrCloudIO/skills',
    docs: 'https://github.com/ZephyrCloudIO/skills',
  },
] as const;

export function WaysIn() {
  return (
    <section aria-labelledby="ways-in-title" className="border-t border-line py-24 lg:py-32">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10">
        <div className="reveal flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm text-ink-faint">Three ways in</p>
            <h2 id="ways-in-title" className="text-headline m-0 text-ink">
              Your next build can be your first deploy.
            </h2>
          </div>
          <p className="m-0 max-w-sm text-ink-muted">
            Free for personal projects. Bring your own cloud on every plan, or use ours.
          </p>
        </div>

        <ol className="m-0 mt-14 grid list-none gap-4 p-0 lg:grid-cols-3">
          {PATHS.map((path, i) => (
            <li
              key={path.title}
              className="reveal flex flex-col rounded-2xl border border-line bg-surface/70 p-6"
              style={{ '--reveal-delay': `${i * 90}ms` } as CSSProperties}
            >
              <h3 className="text-title m-0 text-ink">{path.title}</h3>
              <p className="mt-3 mb-6 text-[0.9375rem] leading-relaxed text-ink-muted">{path.body}</p>
              <div className="mt-auto flex flex-col items-start gap-4">
                <CommandChip command={path.command} size="sm" wrap className="max-w-full" />
                <a
                  href={path.docs}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-1 text-sm text-ink-faint transition-colors hover:text-ink"
                >
                  {path.docs.includes('github.com') ? 'See the skills' : 'Read the docs'}
                  <ArrowUpRight className="size-3.5" aria-hidden />
                </a>
              </div>
            </li>
          ))}
        </ol>

        <div className="reveal mt-10 flex flex-wrap items-center gap-3">
          <a
            href="https://app.zephyr-cloud.io/"
            target="_blank"
            rel="noopener"
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-released px-5 text-[0.9375rem] font-medium text-white transition-colors hover:bg-[#8b4df5] focus-visible:ring-2 focus-visible:ring-released-ink focus-visible:ring-offset-2 focus-visible:ring-offset-night"
          >
            Get started free
            <ArrowRight className="size-4" aria-hidden />
          </a>
          <a
            href="mailto:inbound@zephyr-cloud.io?subject=Enterprise"
            className="inline-flex h-11 items-center rounded-xl border border-line-strong px-5 text-[0.9375rem] text-ink-muted transition-colors hover:border-deployed/60 hover:text-ink"
          >
            Talk to us about Enterprise
          </a>
        </div>
      </div>
    </section>
  );
}

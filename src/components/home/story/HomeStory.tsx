import { useInView, useReducedMotion } from 'motion/react';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { CommandChip } from '../CommandChip';
import { HeroCopy } from '../HeroCopy';
import { Stage, type BeatId } from '../stage/Stage';
import { useActiveBeat, useMediaQuery } from './hooks';
import { StepTabs } from './StepTabs';

interface Step {
  beat: BeatId;
  /** Tab label on phones. */
  label: string;
  /** How long the step plays on phones before the next one, in ms. Long enough to read the copy. */
  dwell: number;
  title: ReactNode;
  body: ReactNode;
  extra?: ReactNode;
}

interface Chapter {
  id: string;
  eyebrow: string;
  title: string;
  steps: Step[];
}

function Ident({ children }: { children: ReactNode }) {
  return <code className="text-ident rounded bg-surface-2 px-1.5 py-0.5 text-[0.85em] text-ink">{children}</code>;
}

const CHAPTERS: Chapter[] = [
  {
    id: 'solo',
    eyebrow: 'One app',
    title: 'Every build deploys itself.',
    steps: [
      {
        beat: 'solo-config',
        label: 'Plugin',
        dwell: 11000,
        title: 'Keep your bundler. Add withZephyr().',
        body: (
          <>
            Vite, Rsbuild, Rspack, webpack, Rollup, Parcel, Astro, Nuxt or TanStack Start: the plugin goes into the
            config you already have. Run your normal build and it deploys.
          </>
        ),
      },
      {
        beat: 'solo-files',
        label: 'Uploads',
        dwell: 11000,
        title: 'Only what changed goes up.',
        body: (
          <>
            Every file is fingerprinted. Zephyr asks the edge what it already has and uploads the rest, so a one-line
            fix doesn’t re-send your whole app.
          </>
        ),
      },
      {
        beat: 'solo-urls',
        label: 'Tags',
        dwell: 12000,
        title: 'Tags follow builds. Environments wait for you.',
        body: (
          <>
            Every build from every branch and every teammate (human or agentic) keeps a permanent URL to share and test.
            A tag like <Ident>latest</Ident> follows new builds on <Ident>main</Ident> by itself.{' '}
            <Ident>production</Ident> moves only when someone releases, and moving it back is a rollback.
          </>
        ),
      },
    ],
  },
  {
    id: 'ai',
    eyebrow: 'With AI agents',
    title: 'Agents deploy. People release.',
    steps: [
      {
        beat: 'ai-attempts',
        label: 'Previews',
        dwell: 11000,
        title: 'Every attempt is a live preview.',
        body: (
          <>
            Coding agents build and deploy like anyone else on the team. Each attempt gets its own URL, a tag like{' '}
            <Ident>ai</Ident> follows the newest one, and open previews reload themselves when it moves.
          </>
        ),
      },
      {
        beat: 'ai-release',
        label: 'Review',
        // The review story (release, report, roll back) takes about 15s to play out.
        dwell: 16000,
        title: 'Nothing reaches users until someone releases it.',
        body: (
          <>
            The team reviews what the agent tried and releases the one that works. When a release goes wrong, whoever
            spots it rolls back with the same move in reverse: no rebuild, no re-upload.
          </>
        ),
      },
      {
        beat: 'ai-skills',
        label: 'Skills',
        dwell: 11000,
        title: 'Give your agents the Zephyr playbook.',
        body: (
          <>
            Zephyr Skills teach Claude Code, Cursor, Codex and OpenCode how versions, tags, environments and remotes
            work. The scaffolder returns a JSON receipt an agent can check instead of guessing.
          </>
        ),
        extra: (
          <p className="mt-6 flex flex-wrap items-center gap-2.5 text-sm text-ink-faint">
            <CommandChip command="npx skills add https://github.com/ZephyrCloudIO/skills" size="sm" wrap />
          </p>
        ),
      },
    ],
  },
  {
    id: 'teams',
    eyebrow: 'Teams and agents',
    title: 'Split the app. Keep one product.',
    steps: [
      {
        beat: 'teams-split',
        label: 'Remotes',
        dwell: 11000,
        title: 'Every team ships its own piece.',
        body: (
          <>
            With Module Federation, checkout, catalog and search are separate apps with separate owners, people and
            agents alike. Each deploys on its own schedule, and the shell loads them together as one product.
          </>
        ),
      },
      {
        beat: 'teams-envs',
        label: 'Environments',
        dwell: 12000,
        title: 'Each environment loads its own versions.',
        body: (
          <>
            Remotes resolve by environment, tag or semver range, like <Ident>zephyr:checkout.shop.acme@staging</Ident>.
            Staging runs the newest checkout while production stays on the last release, and releasing one remote
            doesn’t rebuild the shell or anything else.
          </>
        ),
      },
      {
        beat: 'teams-guardrails',
        label: 'Guardrails',
        dwell: 12000,
        title: 'Guardrails for many hands.',
        body: (
          <>
            Protected environments only take builds from their members, so an agent’s build lands in staging until
            someone on the team releases it. Roles decide who can release, and every deploy and release is logged with
            who did it.
          </>
        ),
      },
    ],
  },
  {
    id: 'clouds',
    eyebrow: 'Multi-cloud',
    title: 'Deploy to every cloud. Release per environment.',
    steps: [
      {
        beat: 'clouds-deploy',
        label: 'Deploy',
        dwell: 11000,
        title: 'One build lands on every environment’s edge.',
        body: (
          <>
            Each environment can run on Zephyr Cloud or on your own Cloudflare, AWS, Fastly or Akamai account. A build
            uploads to all of them at once, and each edge only receives the files it doesn’t already have.
          </>
        ),
      },
      {
        beat: 'clouds-release',
        label: 'Release',
        dwell: 11000,
        title: 'Releasing is still a pointer move.',
        body: (
          <>
            The build is already on every edge, so releasing it to production on AWS or production-eu on Akamai is the
            same move as before: no rebuild, no re-upload. Each environment releases on its own schedule.
          </>
        ),
      },
      {
        beat: 'clouds-switch',
        label: 'Switch',
        dwell: 12000,
        title: 'Switching clouds is a setting.',
        body: (
          <>
            Point an environment at a different provider and the next build deploys there. No new pipeline, no migration
            project. Kubernetes and custom edges are available on Enterprise.
          </>
        ),
      },
    ],
  },
  {
    id: 'frameworks',
    eyebrow: 'Any framework',
    title: 'Any stack in. Any edge out.',
    steps: [
      {
        beat: 'stack-web',
        label: 'Web',
        dwell: 11000,
        title: 'The same one line, whatever you build with.',
        body: (
          <>
            Bundler plugins for Vite, Rsbuild, Rspack, webpack, Rollup, Parcel and Rolldown (beta). Integrations for
            Astro, Nuxt, Modern.js, Rspress, TanStack Start and Vinext (beta). Starters for Angular, Svelte, Solid,
            Ember, Nx and Turborepo.
          </>
        ),
      },
      {
        beat: 'stack-ssr',
        label: 'Server',
        dwell: 11000,
        title: 'Server rendering at the edge.',
        body: (
          <>
            TanStack Start, Nuxt, Vinext, Nitro, Hono and Elysia deploy their server code alongside the static files. It
            runs on Cloudflare, Zephyr Cloud included, with every version in its own isolate, so previews and rollbacks
            work for SSR too.
          </>
        ),
      },
      {
        beat: 'stack-native',
        label: 'Mobile',
        dwell: 11000,
        title: 'Mobile, without the app store wait.',
        body: (
          <>
            React Native apps built with Re.Pack or Metro load their mini-apps from the edge. Release a new version and
            installed apps pick it up on their next update check.
          </>
        ),
      },
    ],
  },
];

const BEATS: BeatId[] = ['hero', ...CHAPTERS.flatMap((chapter) => chapter.steps.map((step) => step.beat))];

function ChapterIntro({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <>
      <p className="mb-3 text-sm text-ink-faint">{eyebrow}</p>
      <h2 className="text-headline m-0 mb-7 text-ink lg:mb-10">{title}</h2>
    </>
  );
}

function BeatTitle({ children }: { children: ReactNode }) {
  return <h3 className="text-title m-0 text-ink">{children}</h3>;
}

function BeatBody({ children }: { children: ReactNode }) {
  return <p className="mt-4 text-[1.0625rem] leading-relaxed text-ink-muted text-pretty">{children}</p>;
}

/** Desktop: the story is laid out as `desktop`. Phones and tablets: `mobile`. `null` until known (SSR). */
type Layout = boolean | null;

interface StoryChapterProps {
  chapter: Chapter;
  /** Where this chapter's phone figure starts in the story; see Stage `epoch`. */
  epoch: number;
  isDesktop: Layout;
}

/**
 * On desktop, each step is a tall scroll beat and the pinned stage follows along. Below `lg`, the
 * chapter gets one figure: its steps become tabs that auto-advance while the figure is on screen,
 * and the step copy stacks in one cell so switching never moves the page.
 */
function StoryChapter({ chapter, epoch, isDesktop }: StoryChapterProps) {
  const showMobile = isDesktop !== true;
  const showDesktop = isDesktop !== false;
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [paused, setPaused] = useState(false);
  // Tabs only exist when the head script enabled motion (JS ran in time); otherwise every step shows.
  const [enhanced, setEnhanced] = useState(false);
  useEffect(() => setEnhanced(document.documentElement.dataset.motion === 'on'), []);

  const figureRef = useRef<HTMLDivElement>(null);
  const inView = useInView(figureRef, { amount: 0.35 });

  const { steps } = chapter;
  const autoplay = auto && !reduce && enhanced && isDesktop === false;
  const select = (index: number) => {
    setAuto(false);
    setActive(index);
  };
  const advance = () => {
    if (active < steps.length - 1) setActive(active + 1);
    else setAuto(false);
  };

  return (
    <div id={chapter.id} className="scroll-mt-8 max-lg:pt-20">
      {showMobile ? (
        <div className="lg:hidden">
          <ChapterIntro eyebrow={chapter.eyebrow} title={chapter.title} />
          <StepTabs
            steps={steps.map((step) => ({ id: step.beat, label: step.label }))}
            active={active}
            dwell={autoplay ? steps[active].dwell : null}
            running={inView && !paused}
            label={`${chapter.eyebrow}: steps`}
            onSelect={select}
            onComplete={advance}
          />
        </div>
      ) : null}

      <div className="story-panels max-lg:mt-6">
        {steps.map((step, i) => (
          <div
            key={step.beat}
            data-beat={step.beat}
            data-active={i === active || undefined}
            id={`${step.beat}-panel`}
            role={isDesktop === false ? 'tabpanel' : undefined}
            aria-labelledby={isDesktop === false ? `${step.beat}-tab` : undefined}
            className="lg:flex lg:min-h-[78vh] lg:flex-col lg:justify-center lg:py-24"
          >
            <div className="max-w-[35rem]">
              {i === 0 && showDesktop ? (
                <div className="hidden lg:block">
                  <ChapterIntro eyebrow={chapter.eyebrow} title={chapter.title} />
                </div>
              ) : null}
              <BeatTitle>{step.title}</BeatTitle>
              <BeatBody>{step.body}</BeatBody>
              {step.extra}
            </div>
          </div>
        ))}
      </div>

      {showMobile ? (
        <div ref={figureRef} className="mt-10 lg:hidden">
          <Stage
            beat={steps[active].beat}
            epoch={epoch}
            paused={paused}
            onPausedChange={setPaused}
            onInteract={() => setAuto(false)}
          />
        </div>
      ) : null}
    </div>
  );
}

/**
 * The zoom-out story. Copy scrolls on the left; on desktop a single stage stays
 * pinned on the right and changes with the beat crossing the viewport center.
 */
export function HomeStory() {
  const active = useActiveBeat(BEATS, 'hero');
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  return (
    <section aria-label="How Zephyr works" className="relative">
      <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-x-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,31rem)] lg:px-10 xl:grid-cols-[minmax(0,1fr)_minmax(0,33rem)] xl:gap-x-20">
        <div className="pb-24 lg:pb-0">
          <div
            data-beat="hero"
            className="pt-10 lg:flex lg:min-h-[calc(100svh-4rem)] lg:flex-col lg:justify-center lg:py-16"
          >
            <div className="max-w-[35rem]">
              <HeroCopy />
            </div>
            {isDesktop !== true ? (
              <div className="mt-14 lg:hidden">
                <Stage beat="hero" />
              </div>
            ) : null}
          </div>

          {CHAPTERS.map((chapter, i) => (
            <StoryChapter key={chapter.id} chapter={chapter} epoch={i + 1} isDesktop={isDesktop} />
          ))}

          {/* Keeps the pinned stage in place while the last beat sits at the viewport center. */}
          <div aria-hidden className="hidden h-[28vh] lg:block" />
        </div>

        {isDesktop !== false ? (
          <div className="hidden lg:block">
            <div className="sticky top-0 flex h-svh items-center py-12">
              <Stage beat={active} pinned />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

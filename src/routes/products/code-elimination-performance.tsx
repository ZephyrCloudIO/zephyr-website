import { Panel } from '@/components/home/stage/Panel';
import { cn } from '@/lib/utils';
import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowRight, Flag, FlaskConical, Layers, Package2, type LucideIcon } from 'lucide-react';
import type { CSSProperties, ReactNode } from 'react';

export const Route = createFileRoute('/products/code-elimination-performance')({
  component: CodeEliminationPerformancePage,
});

// None of this ships in a Zephyr product yet: keep the "Research preview" framing and label examples as illustrative.

const CONTAINER = 'mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10';
const BUTTON =
  'inline-flex h-11 items-center justify-center gap-2 rounded-xl px-5 text-[0.9375rem] font-medium transition-colors';

const delay = (ms: number) => ({ '--reveal-delay': `${ms}ms` }) as CSSProperties;

const FLAG_SAMPLE = `/* @common:if [condition="featureFlags.enableNewFeature"] */
export function newFeature() {
  // This function references the utility functions above
  if (!validateFeature()) {
    return null;
  }

  const config = getFeatureConfig();
  const message = formatMessage(\`New feature v\${config.version} is enabled!\`);

  logFeatureUsage("newFeature");

  return {
    message,
    config,
    timestamp: new Date().toISOString()
  };
}
/* @common:endif */`;

const FEDERATION_SAMPLE = `// Shared module configuration
{
  shared: {
    react: {
      singleton: true,
      requiredVersion: '^18.0.0'
    },
    '@company/ui-kit': {
      singleton: true,
      strictVersion: true,
      // Only used components are included
      import: ['Button', 'Modal']
    }
  }
}

// Result: 87% reduction in shared deps`;

const SIZES = [
  { label: 'Original size', value: '2.4 MB', kb: 2400 },
  { label: 'Gzip compressed', value: '780 KB', kb: 780 },
  { label: 'Dictionary compressed', value: '240 KB', kb: 240 },
] as const;

function CodeSample({
  code,
  label,
  mark,
}: {
  code: string;
  label: string;
  /** Lines to call out, like the markers that fence off flagged code. */
  mark?: (line: string) => boolean;
}) {
  return (
    <div translate="no" className="overflow-x-auto">
      <ol aria-label={label} className="m-0 w-max min-w-full list-none p-0 text-ident text-[0.78rem] leading-[1.8]">
        {code.split('\n').map((line, i) => {
          const marked = mark?.(line) ?? false;
          const comment = line.trimStart().startsWith('//');
          return (
            <li
              key={i}
              className={cn(
                'flex gap-3 pr-5',
                marked ? 'bg-surface-3/80 text-ink' : comment ? 'text-ink-faint' : 'text-ink-muted',
              )}
            >
              <span aria-hidden className="w-8 shrink-0 text-right text-ink-faint/60 tabular-nums select-none">
                {i + 1}
              </span>
              <span className="whitespace-pre">{line || ' '}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function CompressionSample() {
  const original = SIZES[0].kb;
  return (
    <div className="grid gap-5 py-1">
      {SIZES.map((row, i) => {
        const result = i === SIZES.length - 1;
        return (
          <div key={row.label}>
            <div className="flex items-baseline justify-between gap-4 text-sm">
              <span className={result ? 'text-ink' : 'text-ink-muted'}>{row.label}</span>
              <span className={cn('tabular-nums', result ? 'font-medium text-ink' : 'text-ink-muted')}>
                {row.value}
              </span>
            </div>
            <div aria-hidden className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-3">
              <div
                className={cn('h-full rounded-full', result ? 'bg-ink' : 'bg-deployed/60')}
                style={{ width: `${(row.kb / original) * 100}%` }}
              />
            </div>
          </div>
        );
      })}
      <div className="flex items-baseline justify-between gap-4 border-t border-line pt-4 text-sm">
        <span className="text-ink-muted">Total reduction</span>
        <span className="font-medium text-ink tabular-nums">90%</span>
      </div>
    </div>
  );
}

interface ResearchArea {
  id: string;
  icon: LucideIcon;
  title: string;
  body: string;
  points: string[];
  visual: ReactNode;
}

const AREAS: ResearchArea[] = [
  {
    id: 'feature-flag-shaking',
    icon: Flag,
    title: 'Feature flag shaking',
    body: 'Automatically eliminate unused feature flag code at build time. Our advanced tree shaking capabilities remove all code paths for disabled features, resulting in smaller bundles and faster load times.',
    points: [
      'Dead code elimination for disabled features',
      'Build-time and fetch-time optimization with zero runtime overhead',
      'Compatible with popular feature flag services',
    ],
    visual: (
      <Panel title="new-feature.js" aside="Illustrative" bodyClassName="px-0 py-3">
        <CodeSample
          code={FLAG_SAMPLE}
          label="Illustrative feature flag markers around a function"
          mark={(line) => line.startsWith('/* @common:')}
        />
      </Panel>
    ),
  },
  {
    id: 'module-federation-tree-shaking',
    icon: Package2,
    title: 'Module Federation tree shaking',
    body: 'Intelligent tree shaking across federated modules ensures only the code you actually use is included in your bundles. Eliminate duplicate dependencies and reduce overall application size across micro-frontends.',
    points: [
      'Cross-application dependency optimization',
      'Automatic shared module detection',
      'Smart chunking strategies for optimal caching',
    ],
    visual: (
      <Panel title="module-federation.config.js" aside="Illustrative" bodyClassName="px-0 py-3">
        <CodeSample
          code={FEDERATION_SAMPLE}
          label="Illustrative shared module configuration"
          mark={(line) => line.includes("import: ['Button', 'Modal']")}
        />
      </Panel>
    ),
  },
  {
    id: 'dictionary-compression',
    icon: Layers,
    title: 'Advanced dictionary compression',
    body: 'Leverage shared dictionaries and advanced compression algorithms to achieve unprecedented reduction in asset sizes. Our compression engine learns from your codebase patterns to create optimal dictionaries.',
    points: [
      'Up to 90% compression ratios for JavaScript',
      'Shared dictionaries across micro-frontends',
      'Automatic dictionary optimization over time',
    ],
    visual: (
      <Panel title="dist/main.js" aside="Illustrative numbers" bodyClassName="px-5 py-5">
        <CompressionSample />
      </Panel>
    ),
  },
];

function Area({ area, index }: { area: ResearchArea; index: number }) {
  const Icon = area.icon;
  const flip = index % 2 === 1;

  return (
    <article
      aria-labelledby={`${area.id}-title`}
      className={cn(
        'grid gap-10 lg:items-center lg:gap-16',
        // The visual gets the wider column so the samples read without scrolling on desktop.
        flip ? 'lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]' : 'lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]',
      )}
    >
      <div className={cn('reveal min-w-0', flip && 'lg:order-2')}>
        <span className="mb-6 flex size-10 items-center justify-center rounded-xl border border-line bg-surface text-ink-muted">
          <Icon className="size-5" aria-hidden />
        </span>
        <h3 id={`${area.id}-title`} className="text-title m-0 text-ink">
          {area.title}
        </h3>
        <p className="mt-4 mb-0 max-w-xl text-[1.0625rem] leading-relaxed text-ink-muted">{area.body}</p>
        <ul className="m-0 mt-6 grid list-none gap-3 p-0">
          {area.points.map((point) => (
            <li key={point} className="flex items-start gap-3 text-[0.9375rem] leading-normal text-ink-muted">
              {/* Hollow markers, not checks: none of these are shipped. */}
              <span aria-hidden className="mt-[0.55em] size-1.5 shrink-0 rounded-full border border-ink-faint" />
              {point}
            </li>
          ))}
        </ul>
      </div>
      <div className={cn('reveal min-w-0', flip && 'lg:order-1')} style={delay(90)}>
        {area.visual}
      </div>
    </article>
  );
}

function CodeEliminationPerformancePage() {
  return (
    <>
      <section aria-labelledby="research-title" className="pt-16 pb-24 lg:pt-24 lg:pb-32">
        <div className={CONTAINER}>
          <p className="m-0 mb-8 inline-flex max-w-full items-center gap-2 rounded-full border border-dashed border-line-strong px-3.5 py-1.5 text-sm text-ink">
            <FlaskConical className="size-4 shrink-0 text-ink-muted" aria-hidden />
            Research preview
            <span aria-hidden className="text-ink-faint">
              ·
            </span>
            <span className="text-ink-muted">Not yet available</span>
          </p>
          <h1 id="research-title" className="text-display m-0 max-w-5xl text-ink">
            Enterprise scale code elimination &amp; performance
          </h1>
          <p className="text-lead mt-7 mb-0 max-w-2xl text-ink-muted">
            Advanced optimization techniques to reduce bundle size, eliminate dead code, and maximize application
            performance at scale.
          </p>
          <p className="mt-8 mb-0 max-w-2xl rounded-xl border border-line-strong bg-surface/70 px-4 py-3 text-[0.9375rem] leading-relaxed text-ink">
            These are things the Zephyr team is researching, not shipped features you can use today.
          </p>
        </div>
      </section>

      <section aria-labelledby="areas-title" className="border-t border-line py-24 lg:py-32">
        <div className={CONTAINER}>
          <div className="reveal max-w-2xl">
            <p className="mb-3 text-sm text-ink-faint">Research areas</p>
            <h2 id="areas-title" className="text-headline m-0 text-ink">
              What we’re exploring.
            </h2>
          </div>
          <div className="mt-16 grid gap-24 lg:mt-20 lg:gap-32">
            {AREAS.map((area, i) => (
              <Area key={area.id} area={area} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="research-cta-title" className="border-t border-line py-24 lg:py-32">
        <div className={cn(CONTAINER, 'reveal flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between')}>
          <div className="max-w-2xl">
            <p className="mb-3 text-sm text-ink-faint">Research preview</p>
            <h2 id="research-cta-title" className="text-headline m-0 text-ink">
              Interested in this research?
            </h2>
            <p className="text-lead mt-5 mb-0 text-ink-muted">
              None of this is available in Zephyr yet. If shipping less code at scale matters to your team, we’d like to
              hear about it.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="mailto:inbound@zephyr-cloud.io?subject=code-performance"
              className={cn(BUTTON, 'bg-released text-white hover:bg-[#8b4df5]')}
            >
              Talk to us about this research
              <ArrowRight className="size-4" aria-hidden />
            </a>
            <Link
              to="/"
              className={cn(BUTTON, 'border border-line-strong text-ink-muted hover:border-deployed/60 hover:text-ink')}
            >
              See what’s available today
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

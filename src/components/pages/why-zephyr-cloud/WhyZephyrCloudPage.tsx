import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  ArrowRight,
  Boxes,
  Check,
  Clipboard,
  Cloud,
  Gauge,
  GitBranch,
  Globe,
  Shield,
  Sparkles,
  Timer,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { BundlerIconsRow, CloudIconsGrid, CoordinationGitGraph } from './diagrams';
import { Background, Callout, EnterpriseRibbon, PersonaCard, PromiseCard, Section } from './parts';

const symptoms = [
  'Deployments blocked by cross-team timing',
  'Risky or slow rollbacks',
  'Growing CI/CD and tooling complexity',
  'More time managing releases than shipping value',
];

const withZephyr = [
  'Teams deploy independently',
  'Releases are incremental, not all-or-nothing',
  'Rollback and roll-forward are instant',
  'Deployment logic is centralized and observable',
  'Scaling teams reduces friction instead of increasing it',
];

export function WhyZephyrCloudPage() {
  const [copied, setCopied] = useState(false);

  const cliCommand = '$ npx create-zephyr-apps@latest';

  const copyCommand = async () => {
    try {
      await navigator.clipboard.writeText(cliCommand);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      // clipboard can be blocked by browser permissions; keep UI calm.
    }
  };

  return (
    <div className="relative overflow-hidden">
      <Background />

      <div className="container mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="relative"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-950/50 px-3 py-1 text-xs text-neutral-300">
            <Cloud className="h-3.5 w-3.5 text-emerald-400" />
            <span>Why Zephyr Cloud</span>
            <span className="text-neutral-600">·</span>
            <span className="text-neutral-400">Ship faster. Reduce risk. Scale cleanly.</span>
          </div>

          <div className="mt-6 grid grid-cols-1 items-end gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <h1 className="text-balance text-5xl font-semibold tracking-tight text-white sm:text-6xl">
                Why choose Zephyr Cloud?
              </h1>
              <div className="mt-4 space-y-1 text-2xl font-semibold tracking-tight sm:text-3xl">
                <p className="text-white">
                  Ship <span className="text-emerald-400">faster</span>.
                </p>
                <p className="text-white">
                  Reduce <span className="text-emerald-400">release risk</span>.
                </p>
                <p className="text-white">Scale without coordination overhead.</p>
              </div>
              <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-neutral-300">
                Engineering teams don’t struggle with building software. They struggle with operational friction:
                release coordination, rollback risk, and complexity that grows as teams scale.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button asChild className="w-full sm:w-auto">
                  <a href="#what-changes">
                    What Zephyr Changes <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
                <Button asChild variant="outline" className="w-full sm:w-auto">
                  <a href="https://app.zephyr-cloud.io/" target="_blank" rel="noreferrer">
                    Get Started
                  </a>
                </Button>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-2xl border border-neutral-800 bg-neutral-950/50 p-5">
                <p className="text-sm font-medium text-white">The promise</p>
                <div className="mt-4 grid gap-3">
                  <PromiseCard
                    icon={<Timer className="h-4 w-4" />}
                    title="Ship faster"
                    detail="Remove cross-team gating."
                  />
                  <PromiseCard
                    icon={<Shield className="h-4 w-4" />}
                    title="Reduce release risk"
                    detail="Roll back by switching traffic."
                  />
                  <PromiseCard
                    icon={<Boxes className="h-4 w-4" />}
                    title="Scale without overhead"
                    detail="Centralize logic, not coordination."
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <Section
          id="what-changes"
          kicker="The Problem Managers Actually Face"
          title="Operational friction"
          icon={Gauge}
        >
          <p className="max-w-3xl text-pretty text-neutral-300">
            Most orgs already have strong engineers. What slows delivery is the system around shipping: coordination,
            brittle pipelines, and recovery that’s too slow when something breaks.
          </p>

          <div className="mt-8 grid gap-4 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-neutral-800 bg-neutral-950/50 p-6">
                <p className="text-sm font-medium text-white">Typical symptoms</p>
                <ul className="mt-4 space-y-3 text-sm text-neutral-300">
                  {symptoms.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-1.5 h-2 w-2 rounded-full bg-amber-400/80" />
                      <span className="text-pretty">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-neutral-800 bg-neutral-950/50 p-6">
                <p className="text-lg font-medium text-white">Velocity isn’t the issue. Dependency is.</p>
                <CoordinationGitGraph className="mt-4" />
                <p className="mt-4 text-sm text-neutral-400">Zephyr Cloud enhances and accelerates the SDLC</p>
                <a href="#platform" className="mt-2 inline-flex text-sm text-violet-300 hover:text-violet-200">
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </Section>

        <Section
          id="platform"
          kicker="What Zephyr Cloud Changes"
          title="A managed deployment and release control platform"
          icon={GitBranch}
        >
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-neutral-800 bg-neutral-950/50 p-6">
                <p className="text-sm font-medium text-white">With Zephyr</p>
                <ul className="mt-4 space-y-3 text-sm text-neutral-300">
                  {withZephyr.map((item) => (
                    <li key={item} className="flex gap-3">
                      <Check className="mt-0.5 h-4 w-4 text-emerald-400" />
                      <span className="text-pretty">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 rounded-xl border border-neutral-800 bg-neutral-950/60 p-4">
                  <p className="text-sm text-neutral-200">
                    Zephyr acts as the <span className="text-white">deployment platform</span> between the client and
                    your CDN.
                    <span className="text-neutral-400"> Not just middleware.</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-neutral-800 bg-neutral-950/50 p-6">
                <p className="text-sm font-medium text-white">Enhances and accelerates the SDLC</p>
                <p className="mt-2 text-sm text-neutral-400">
                  Integrates with popular bundlers (Webpack, Rspack, Vite) to provide global distribution of web
                  applications.
                </p>

                <BundlerIconsRow className="mt-5" />

                <div className="mt-6 rounded-2xl border border-neutral-800 bg-black/40 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <code className="select-text break-all text-sm text-emerald-300">{cliCommand}</code>
                    <button
                      type="button"
                      onClick={copyCommand}
                      className={cn(
                        'inline-flex items-center gap-2 rounded-md border px-3 py-2 text-xs transition-colors',
                        copied
                          ? 'border-emerald-700 bg-emerald-950/40 text-emerald-300'
                          : 'border-neutral-800 bg-neutral-950/60 text-neutral-300 hover:border-neutral-700 hover:text-white',
                      )}
                      aria-label="Copy command"
                    >
                      <Clipboard className="h-4 w-4" />
                      {copied ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <p className="mt-2 text-xs text-neutral-500">
                    Production-ready deployment orchestration out of the box.
                  </p>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Button asChild variant="outline" className="w-full sm:w-auto">
                    <a href="#edge">Learn more</a>
                  </Button>
                  <Button asChild variant="outline" className="w-full sm:w-auto">
                    <a href="https://docs.zephyr-cloud.io/" target="_blank" rel="noreferrer">
                      Read the docs
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Section id="build-vs-buy" kicker="Why Not Build This In-House?" title="Avoid the platform tax" icon={Sparkles}>
          <div className="grid items-stretch gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7 h-full">
              <div className="h-full rounded-2xl border border-neutral-800 bg-neutral-950/50 p-6">
                <p className="text-neutral-300">
                  Internal deployment systems become a permanent tax. They accrete edge cases, demand ownership, and
                  compete with core product priorities.
                </p>
                <ul className="mt-5 space-y-3 text-sm text-neutral-300">
                  {[
                    'Accumulate edge cases over time',
                    'Require ongoing ownership and maintenance',
                    'Compete with core product priorities',
                    'Rarely reach the maturity needed for safe, fast recovery',
                  ].map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-1.5 h-2 w-2 rounded-full bg-neutral-500" />
                      <span className="text-pretty">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-5 h-full">
              <div className="h-full rounded-2xl border border-neutral-800 bg-neutral-950/50 p-6">
                <p className="text-sm font-medium text-white">What you want instead</p>
                <p className="mt-2 text-sm text-neutral-400">
                  A capability that’s owned, hardened, and operationally boring, so your team can stay focused on
                  product.
                </p>
                <div className="mt-5 grid gap-3">
                  <Callout
                    icon={<Shield className="h-4 w-4" />}
                    title="Safe recovery"
                    body="Rollback is a traffic switch, not a rebuild."
                  />
                  <Callout
                    icon={<Globe className="h-4 w-4" />}
                    title="Edge-native"
                    body="Default execution model, not an optimization layer."
                  />
                  <Callout
                    icon={<GitBranch className="h-4 w-4" />}
                    title="Auditability"
                    body="Visibility without direct pipeline access."
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-neutral-800 bg-neutral-950/50 p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-medium text-white">Cloud + CDN support</p>
                <p className="mt-1 text-sm text-neutral-400">Bring your cloud/CDN. Keep control.</p>
              </div>
              <a href="#enterprise" className="text-sm text-violet-300 hover:text-violet-200">
                Learn more <ArrowRight className="ml-1 inline h-4 w-4" />
              </a>
            </div>
            <CloudIconsGrid className="mt-4" />
          </div>
        </Section>

        <Section
          id="edge"
          kicker="Why Edge Deployment Matters"
          title="Latency, performance, and user experience"
          icon={Globe}
        >
          <div className="rounded-2xl border border-neutral-800 bg-neutral-950/50 p-6">
            <p className="text-neutral-300">
              Modern user experiences are sensitive to latency. Every additional network hop adds delay, increases
              failure surface area, and degrades perceived performance.
            </p>
            <p className="mt-3 text-neutral-300">
              Zephyr Cloud deploys applications directly to the edge, serving content and application logic as close to
              users as possible, without forcing teams to redesign how they build.
            </p>

            <ul className="mt-6 grid gap-3 text-sm text-neutral-300 sm:grid-cols-2">
              {[
                'Ultra-low latency by reducing round trips',
                'Faster initial loads and interactions',
                'More consistent performance across geographies',
                'Improved reliability via distributed execution',
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <Check className="mt-0.5 h-4 w-4 text-emerald-400" />
                  <span className="text-pretty">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-xl border border-neutral-800 bg-neutral-950/60 p-4">
              <p className="text-sm text-white">Edge deployment isn’t an optimization layer.</p>
              <p className="mt-1 text-sm text-neutral-400">It’s the default execution model.</p>
            </div>
          </div>
        </Section>

        <Section
          id="risk"
          kicker="Release Management & Risk"
          title="Rollback in seconds, no rebuild needed"
          icon={Shield}
        >
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-neutral-800 bg-neutral-950/50 p-6">
                <p className="text-neutral-300">
                  Zephyr doesn’t replace release governance. It reduces operational load and makes recovery boring.
                </p>
                <ul className="mt-5 space-y-3 text-sm text-neutral-300">
                  {[
                    'Every deployment automatically creates a version',
                    'Deployments can be tagged and promoted across environments',
                    'Rollback and roll-forward are traffic switches, not rebuilds',
                    'Failed releases are isolated instead of cascading',
                  ].map((item) => (
                    <li key={item} className="flex gap-3">
                      <Check className="mt-0.5 h-4 w-4 text-emerald-400" />
                      <span className="text-pretty">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-neutral-800 bg-neutral-950/50 p-6">
                <p className="text-sm font-medium text-white">Traffic switching mental model</p>
                <p className="mt-2 text-sm text-neutral-400">
                  Instant rollback comes from switching traffic to a previously deployed version already live at the
                  edge.
                </p>

                <div className="mt-6 rounded-2xl border border-neutral-800 bg-black/40 p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-800 bg-neutral-950/70">
                      <Clipboard className="h-4 w-4 text-neutral-300" />
                    </div>
                    <div>
                      <p className="text-sm text-white">No new approval chains. No extra release meetings.</p>
                      <p className="text-sm text-neutral-400">Recovery path is always prepared.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Button asChild variant="outline" className="w-full sm:w-auto">
                    <a href="#usage">Learn more</a>
                  </Button>
                  <Button asChild variant="outline" className="w-full sm:w-auto">
                    <a href="https://app.zephyr-cloud.io/" target="_blank" rel="noreferrer">
                      View the dashboard
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Section id="usage" kicker="How Teams Use Zephyr" title="CLI and UI workflows" icon={Clipboard}>
          <div className="grid gap-6 lg:grid-cols-12">
            <PersonaCard
              className="lg:col-span-6"
              title="Engineering teams"
              subtitle="CLI-first workflows"
              items={[
                'Integrates with existing CI/CD pipelines',
                'No framework or bundler lock-in (supports Hono and more)',
                'Incremental releases by default',
              ]}
              icon={<GitBranch className="h-4 w-4" />}
            />
            <PersonaCard
              className="lg:col-span-6"
              title="Managers & IT leaders"
              subtitle="Central visibility"
              items={[
                'UI dashboard for deployments, versions, environments, rollback readiness',
                'Clear auditability without direct pipeline access',
                'Less coordination overhead across teams',
              ]}
              icon={<Gauge className="h-4 w-4" />}
            />
          </div>
        </Section>

        <Section
          id="enterprise"
          kicker="Enterprise-Ready by Design"
          title="Control, compliance, and infrastructure choice"
          icon={Cloud}
        >
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-neutral-800 bg-neutral-950/50 p-6">
                <ul className="grid gap-3 text-sm text-neutral-300 sm:grid-cols-2">
                  {[
                    'Regional hosting strategies (EU, US, APAC) via BYOC + CDN config',
                    'Akamai CDN fully supported and configurable',
                    'Cloud-agnostic architecture',
                    'Poly-cloud deployment across providers',
                    'Roadmap for on-prem and hybrid environments',
                    'Flat org-level pricing above ~20 active deployers/managers',
                  ].map((item) => (
                    <li key={item} className="flex gap-3">
                      <Check className="mt-0.5 h-4 w-4 text-emerald-400" />
                      <span className="text-pretty">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 rounded-xl border border-neutral-800 bg-neutral-950/60 p-4">
                  <p className="text-sm text-neutral-300">
                    Primary savings come from reduced engineering overhead, faster feedback cycles, and lower release
                    risk, not raw CDN cost reduction alone.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-neutral-800 bg-neutral-950/50 p-6">
                <p className="text-sm font-medium text-white">The manager outcome</p>
                <ul className="mt-4 space-y-3 text-sm text-neutral-300">
                  {[
                    'Faster, more predictable releases',
                    'Lower rollback and outage risk',
                    'Less coordination overhead',
                    'Teams that scale without slowing delivery',
                    'Reduced long-term operational cost vs. custom tooling',
                  ].map((item) => (
                    <li key={item} className="flex gap-3">
                      <Check className="mt-0.5 h-4 w-4 text-emerald-400" />
                      <span className="text-pretty">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 rounded-xl border border-neutral-800 bg-neutral-950/60 p-4">
                  <p className="text-sm text-white">Zephyr doesn’t change how teams build.</p>
                  <p className="mt-1 text-sm text-neutral-400">It removes structural friction from how they ship.</p>
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  <Button asChild>
                    <a href="https://app.zephyr-cloud.io/" target="_blank" rel="noreferrer">
                      Get Started <ArrowRight className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button asChild variant="outline">
                    <a
                      href="mailto:inbound@zephyr-cloud.io?subject=Why%20Zephyr%20Cloud"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Talk to sales
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <EnterpriseRibbon />
        </Section>
      </div>
    </div>
  );
}

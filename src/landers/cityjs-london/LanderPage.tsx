import { Check, ChevronDown, X } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useRef, useState } from 'react';
import AicpaSoc2 from './assets/aicpa-soc2.png';
import heroImage from './assets/hero-image.png';
import agoda from './assets/logo-agoda.png';
import bigCommerce from './assets/logo-bigcommerce.png';
import callstack from './assets/logo-callstack.png';
import nx from './assets/logo-nx.png';
import rimac from './assets/logo-rimac.png';
import sgws from './assets/logo-sgws.png';
import ZephyrWordmark from './assets/logo-zephyr-wordmark.svg';
import { HeroShader } from './HeroShader';
import { HubspotInlineForm } from './HubspotInlineForm';

const partners = [
  { name: 'SGWS', logo: sgws },
  { name: 'Callstack', logo: callstack },
  { name: 'Agoda', logo: agoda },
  { name: 'Nx', logo: nx },
  { name: 'Rimac', logo: rimac },
  { name: 'BigCommerce', logo: bigCommerce },
];

const comparisonGroups = [
  {
    label: 'Scale',
    rows: [
      { feature: 'Runtime orchestration', competitorA: false, competitorB: false, zephyr: true },
      { feature: 'Version governance', competitorA: false, competitorB: true, zephyr: true },
      { feature: 'Multi-team release flow', competitorA: false, competitorB: true, zephyr: true },
    ],
  },
  {
    label: 'Feature set',
    rows: [
      { feature: 'Bring your own cloud', competitorA: false, competitorB: false, zephyr: true },
      { feature: 'Instant rollback path', competitorA: false, competitorB: false, zephyr: true },
      { feature: 'AI-ready delivery surface', competitorA: false, competitorB: false, zephyr: true },
    ],
  },
];

const faqs = [
  {
    question: 'How does Zephyr speed up development?',
    answer:
      'Zephyr integrates with bundlers like Webpack, Rspack, and Vite to handle deployment automatically during your build process. Instead of configuring complex deployment pipelines, applications deploy to the edge network as part of standard builds — with instant deployments, automatic version management, and Bring Your Own Cloud support.',
  },
  {
    question: 'Do I need Micro-Frontend applications to use Zephyr?',
    answer:
      'No. Zephyr works with any application architecture: standalone applications without micro-frontends, micro-frontend applications with full Module Federation support, or hybrid architectures mixing standalone and federated modules.',
  },
  {
    question: 'Do the Zephyr plugins affect my build performance?',
    answer:
      'No. Zephyr plugins only act during two phases: before the build starts (authentication and initialization) and after it completes (asset analysis and deployment). The actual build process runs normally without interference.',
  },
  {
    question: 'Can I use my own cloud provider?',
    answer:
      'Yes. Zephyr supports Bring Your Own Cloud deployments with currently supported providers including Cloudflare, AWS, Fastly, and Akamai, with continuous expansion planned.',
  },
  {
    question: 'What is the difference between Module Federation 1.0 and 2.0?',
    answer:
      'Module Federation 1.0 was built into Webpack core. Module Federation 2.0 is framework-agnostic (supporting Webpack, Rspack, Vite, and more) with enhanced capabilities including dynamic import types, a Federation Runtime, runtime plugin systems, improved TypeScript support, and better developer experience overall.',
  },
];

const footerGroups = [
  {
    title: 'Developers',
    links: [
      { label: 'Docs', href: 'https://docs.zephyr-cloud.io/' },
      { label: 'llms.txt', href: 'https://zephyr-cloud.io/llms.txt' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'GitHub', href: 'https://github.com/ZephyrCloudIO' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/company/96615966' },
      { label: 'Discord', href: 'https://discord.gg/zephyrcloud' },
      { label: 'X', href: 'https://x.com/ZephyrCloudIO' },
      { label: 'YouTube', href: 'https://www.youtube.com/@ZephyrCloud' },
      { label: 'Instagram', href: 'https://www.instagram.com/zephyrcloudio' },
    ],
  },
  {
    title: 'Legal',
    links: [{ label: 'Privacy Policy', href: 'https://zephyr-cloud.io/privacy' }],
  },
];

type ComparisonTab = 'zephyr' | 'competitorA' | 'competitorB';

export function CityjsLondonLanderPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [comparisonTab, setComparisonTab] = useState<ComparisonTab>('zephyr');
  const manifesto = 'Microfrontends solved frontend scale. Now systems need orchestration. Zephyr makes it executable.';
  const manifestoRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: manifestoRef,
    offset: ['start 0.85', 'end 0.55'],
  });

  return (
    <main className="lander-shell overflow-hidden bg-[#0a0a0a] text-white [background-image:none]">
      <HeroShader reduceMotion={Boolean(reduceMotion)} />
      <style>{`
        @keyframes cityjs-hero-rise {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes cityjs-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .cityjs-rise {
          animation: cityjs-hero-rise 0.9s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .cityjs-marquee {
          width: max-content;
          animation: cityjs-marquee 34s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .cityjs-rise,
          .cityjs-marquee {
            animation: none !important;
          }
        }
      `}</style>

      <section className="relative z-[1] overflow-hidden">
        <div className="relative mx-auto flex min-h-screen max-w-[1200px] flex-col px-6 pb-20 pt-6">
          <header className="cityjs-rise flex items-center gap-6">
            <img src={ZephyrWordmark} alt="Zephyr Cloud" width={128} />
          </header>

          <div className="cityjs-rise flex flex-1 flex-col items-center justify-center gap-10 pt-20 text-center">
            <div className="max-w-[912px] space-y-8">
              <p className="mx-auto inline-flex rounded-md bg-violet-600 px-2 py-0.5 font-mono text-[12px] font-medium uppercase tracking-[0.12em] text-white">
                CityJS London
              </p>
              <div className="space-y-6">
                <h1 className="text-balance text-5xl font-medium leading-none text-[#fafafa] md:text-7xl">
                  Build federated systems.
                  <br />
                  Deploy instantly.
                </h1>
                <p className="mx-auto max-w-2xl text-base leading-6 text-[#a1a1aa]">
                  From Module Federation to AI orchestration - live in minutes
                </p>
              </div>
              <div className="mx-auto max-w-[620px] space-y-4">
                <div className="rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(13,13,13,0.96)_0%,rgba(10,10,10,0.98)_100%)] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl md:p-5">
                  <HubspotInlineForm mode="hero" />
                </div>
              </div>
            </div>

            <div className="w-full max-w-[1136px]">
              <div className="rounded-[10px] bg-[rgba(255,255,255,0.15)] p-2 shadow-[0_32px_120px_rgba(0,0,0,0.55)]">
                <div className="overflow-hidden rounded-[8px] bg-[#0f0f10]">
                  <img src={heroImage} alt="Zephyr Cloud application interface" className="w-full h-auto block" />
                </div>
              </div>
            </div>
          </div>

          <section className="pt-14">
            <p className="mb-6 text-center text-sm font-normal text-[#8a8a8a]">
              Trusted teams already shipping with Zephyr
            </p>
            <div className="relative overflow-hidden">
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-[#0a0a0a] to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-[#0a0a0a] to-transparent" />
              <div className="cityjs-marquee flex items-center gap-16 pr-16 md:gap-20 md:pr-20">
                {[...partners, ...partners].map((partner, index) => (
                  <div
                    key={`${partner.name}-${index}`}
                    className="flex h-20 shrink-0 items-center justify-center"
                    aria-hidden={index >= partners.length}
                  >
                    <img
                      src={partner.logo}
                      alt={index < partners.length ? partner.name : ''}
                      className="h-16 w-auto md:h-20"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </section>

      <section className="relative z-[1] mx-auto max-w-[1200px] bg-[#0a0a0a] px-8 pb-20 pt-6">
        <div ref={manifestoRef} className="py-40 text-4xl font-medium leading-[1.11]">
          {manifesto
            .split('')
            .map((char, index) =>
              char === ' ' ? (
                <span key={index}> </span>
              ) : (
                <ManifestoChar
                  key={index}
                  char={char}
                  index={index}
                  total={manifesto.length}
                  progress={scrollYProgress}
                  reduceMotion={Boolean(reduceMotion)}
                />
              ),
            )}
        </div>

        <section className="space-y-8 pb-20">
          <h2 className="text-4xl font-normal text-[#faf5ff]">Comparison</h2>

          {/* Mobile: tab-based 2-column view */}
          <div className="lg:hidden">
            <div className="mb-4 flex gap-2">
              {(
                [
                  { key: 'zephyr', label: 'Zephyr Cloud' },
                  { key: 'competitorA', label: 'Traditional CI/CD' },
                  { key: 'competitorB', label: 'Frontend cloud' },
                ] as { key: ComparisonTab; label: string }[]
              ).map(({ key, label }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setComparisonTab(key)}
                  className={`min-h-8 rounded-md px-3 py-1 text-xs font-medium transition ${
                    comparisonTab === key ? 'bg-violet-600 text-white' : 'bg-[#262626] text-[#fafafa]'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0d0d0d]">
              {comparisonGroups.map((group) => (
                <div key={group.label}>
                  <div className="grid grid-cols-2 bg-white/[0.05] text-sm text-neutral-300">
                    <div className="px-4 py-3">{group.label}</div>
                    <div className="px-4 py-3" />
                  </div>
                  {group.rows.map((row) => (
                    <div
                      key={row.feature}
                      className="grid grid-cols-2 border-t border-t-[0.5px] border-white/[0.15] text-sm"
                    >
                      <div className="px-4 py-4 text-neutral-200">{row.feature}</div>
                      <div className="flex min-h-[52px] items-center px-4 py-3">
                        {renderComparisonValue(row[comparisonTab], comparisonTab === 'zephyr')}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-center">
              <a
                href="#cityjs-hubspot-form"
                className="inline-flex h-9 items-center justify-center rounded-md border border-white/20 bg-transparent px-4 text-sm font-medium text-[#fafafa] transition hover:bg-white/10"
              >
                Get started
              </a>
            </div>
          </div>

          {/* Desktop: full 4-column table */}
          <div className="hidden overflow-x-auto rounded-2xl border border-white/10 bg-[#0d0d0d] shadow-[0_20px_60px_rgba(0,0,0,0.28)] lg:block">
            <div className="min-w-[980px]">
              <div className="grid grid-cols-[1.55fr_1fr_1fr_1fr] border-b border-white/10 bg-black text-sm">
                <div className="px-5 py-5" />
                <div className="px-5 py-5 text-neutral-200">Traditional CI/CD</div>
                <div className="px-5 py-5 text-neutral-200">Frontend cloud</div>
                <div className="px-5 py-5 text-[#faf5ff]">
                  <div>Zephyr Cloud</div>
                  <a
                    href="#cityjs-hubspot-form"
                    className="mt-1 inline-flex text-[#8a8a8a] transition hover:text-[#faf5ff]"
                  >
                    Get started -&gt;
                  </a>
                </div>
              </div>

              {comparisonGroups.map((group) => (
                <div key={group.label}>
                  <div className="grid grid-cols-[1.55fr_1fr_1fr_1fr] bg-white/[0.05] text-sm text-neutral-300">
                    <div className="px-5 py-4">{group.label}</div>
                    <div className="px-5 py-4" />
                    <div className="px-5 py-4" />
                    <div className="px-5 py-4" />
                  </div>
                  {group.rows.map((row) => (
                    <div
                      key={row.feature}
                      className="grid grid-cols-[1.55fr_1fr_1fr_1fr] border-t border-t-[0.5px] border-white/[0.15] text-sm text-[#faf5ff]"
                    >
                      <div className="px-5 py-5 text-neutral-200">{row.feature}</div>
                      <div className="flex min-h-[60px] items-center px-5 py-4">
                        {renderComparisonValue(row.competitorA)}
                      </div>
                      <div className="flex min-h-[60px] items-center px-5 py-4">
                        {renderComparisonValue(row.competitorB)}
                      </div>
                      <div className="flex min-h-[60px] items-center px-5 py-4">
                        {renderComparisonValue(row.zephyr, true)}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-8 pb-20 lg:grid-cols-[1fr_1fr]">
          <div>
            <h2 className="max-w-md text-4xl font-normal text-[#faf5ff]">Everything you need to know</h2>
          </div>

          <div className="space-y-2">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div
                  key={faq.question}
                  className="overflow-hidden rounded-[18px] border border-white/10 bg-white/[0.04]"
                >
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 p-4 text-left text-base text-[#fafafa]"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`h-5 w-5 shrink-0 transition duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-4 pb-4 text-[15px] leading-7 text-neutral-400">{faq.answer}</p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        <section id="cityjs-hubspot-form" className="space-y-8 pb-20 pt-4 text-center">
          <div className="mx-auto max-w-[912px] space-y-8">
            <h2 className="text-balance text-4xl font-medium leading-none tracking-[-0.04em] text-[#faf5ff] md:text-6xl">
              Ready to run your system live?
              <br />
              Start now
            </h2>
          </div>

          <div className="mx-auto w-full max-w-[460px] rounded-[24px] bg-[linear-gradient(180deg,rgba(13,13,13,0.96)_0%,rgba(10,10,10,0.98)_100%)] shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
            <HubspotInlineForm />
          </div>
        </section>
      </section>

      <footer className="relative z-[1] mx-auto grid max-w-[1200px] gap-16 bg-[#0a0a0a] px-6 pb-20 pt-4 text-sm md:grid-cols-[1fr_1fr] md:px-8 lg:px-10">
        <div className="space-y-8">
          <div className="space-y-4">
            <img src={ZephyrWordmark} alt="Zephyr Cloud" width={128} />
            <img src={AicpaSoc2} alt="SOC 2" className="h-12 w-12 rounded-full" />
          </div>
          <p className="text-neutral-500">© 2026 Zephyr Cloud, Inc.</p>
        </div>

        <div className="grid gap-10 sm:grid-cols-3">
          {footerGroups.map((group) => (
            <div key={group.title} className="space-y-4">
              <p className="text-sm font-medium text-[#fafafa]">{group.title}</p>
              <div className="space-y-2">
                {group.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="block text-neutral-500 transition hover:text-neutral-300"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </footer>
    </main>
  );
}

function ManifestoChar({
  char,
  index,
  total,
  progress,
  reduceMotion,
}: {
  char: string;
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
  reduceMotion: boolean;
}) {
  const start = (index / total) * 0.82;
  const end = Math.min(start + 0.12, 1);
  const opacity = useTransform(progress, [Math.max(start - 0.05, 0), end], [0.15, 1]);
  const color = useTransform(progress, [Math.max(start - 0.05, 0), end], ['#262626', '#fafafa']);

  return (
    <motion.span
      style={reduceMotion ? undefined : { opacity, color }}
      className={reduceMotion ? 'text-[#faf5ff]' : undefined}
    >
      {char}
    </motion.span>
  );
}

function renderComparisonValue(value: string | boolean, emphasize: boolean = false) {
  if (typeof value === 'string') {
    return <span className={emphasize ? 'text-[#fafafa]' : 'text-[#fafafa]'}>{value}</span>;
  }

  if (value) {
    return <Check className="h-5 w-5 text-[#7c3aed]" />;
  }

  return <X className="h-5 w-5 text-[#a3a3a3]" />;
}

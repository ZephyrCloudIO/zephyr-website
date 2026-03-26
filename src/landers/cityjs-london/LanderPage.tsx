import { Check, ChevronDown, X } from 'lucide-react';
import { useState } from 'react';
import AicpaSoc2 from './assets/aicpa-soc2.png';
import heroImage from './assets/hero-image.png';
import agoda from './assets/logo-agoda.png';
import bigCommerce from './assets/logo-bigcommerce.png';
import callstack from './assets/logo-callstack.png';
import nx from './assets/logo-nx.png';
import rimac from './assets/logo-rimac.png';
import sgws from './assets/logo-sgws.png';
import ZephyrWordmark from './assets/logo-zephyr-wordmark.svg';
import shaderHero from './assets/shader-hero.png';
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
      { feature: 'System boundaries', competitorA: 'Up to 3 apps', competitorB: 'Up to 25 apps', zephyr: 'Unlimited' },
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
    question: 'What should we use Zephyr for at CityJS?',
    answer:
      'Teams dealing with module federation, multi-app release risk, or operational sprawl. The page angle is orchestration, not just hosting.',
  },
  {
    question: 'Does this replace our current CI/CD setup?',
    answer:
      'No. It sits above delivery plumbing and gives teams a deployable system model, instant rollback paths, and controlled release coordination.',
  },
  {
    question: 'Can we bring our own cloud account?',
    answer:
      'Yes. BYOC is one of the strongest differentiators worth calling out for conference traffic that is sensitive to lock-in.',
  },
  {
    question: 'Is this only for microfrontends?',
    answer:
      'No. The framing starts with federated systems, but the value is broader: orchestration, deployment control, and runtime execution for distributed apps.',
  },
  {
    question: 'What should the CTA do?',
    answer:
      'Best fit for this first lander: book time with the team or start a product trial. Both match the design and event intent.',
  },
];

const footerGroups = [
  {
    title: 'Company',
    links: [
      { label: 'Docs', href: 'https://docs.zephyr-cloud.io/' },
      { label: 'llms.txt', href: 'https://zephyr-cloud.io/llms.txt' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'X', href: 'https://x.com/ZephyrCloudIO' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/company/96615966' },
      { label: 'GitHub', href: 'https://github.com/ZephyrCloudIO' },
      { label: 'Discord', href: 'https://discord.gg/zephyrcloud' },
      { label: 'YouTube', href: 'https://www.youtube.com/@ZephyrCloud' },
      { label: 'Instagram', href: 'https://www.instagram.com/zephyrcloudio' },
    ],
  },
  {
    title: 'Legal',
    links: [{ label: 'Privacy Policy', href: 'https://zephyr-cloud.io/privacy' }],
  },
];

export function CityjsLondonLanderPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const manifesto = 'Microfrontends solved frontend scale. Now systems need orchestration. Zephyr makes it executable.';
  const primaryButtonClass =
    'inline-flex h-9 items-center justify-center rounded-md border border-[#e5e5e5] bg-white px-4 text-sm font-medium text-[#0a0a0a] shadow-[0_1px_2px_rgba(0,0,0,0.05)] transition hover:bg-[#f5f5f5]';

  return (
    <main className="lander-shell overflow-hidden bg-[#0a0a0a] text-white [background-image:none]">
      <style>{`
        @keyframes cityjs-manifesto-glow {
          0%, 18%, 100% { color: rgba(255,255,255,0.12); }
          28%, 82% { color: rgba(250,245,255,1); }
        }
        @keyframes cityjs-hero-rise {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .cityjs-rise {
          animation: cityjs-hero-rise 0.9s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .cityjs-manifesto span {
          animation: cityjs-manifesto-glow 7.2s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .cityjs-rise,
          .cityjs-manifesto span {
            animation: none !important;
          }
        }
      `}</style>

      <section className="relative overflow-hidden">
        <img
          src={shaderHero}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[1128px] w-full object-cover object-top"
        />

        <div className="relative mx-auto flex min-h-screen max-w-[1200px] flex-col px-6 pb-20 pt-6 md:px-8 lg:px-10">
          <header className="cityjs-rise flex items-center justify-between gap-6">
            <img src={ZephyrWordmark} alt="Zephyr Cloud" className="h-[31px] w-[175px]" />
            <a href="#cityjs-hubspot-form" className={primaryButtonClass}>
              Start building
            </a>
          </header>

          <div className="cityjs-rise flex flex-1 flex-col items-center justify-center gap-10 pt-20 text-center md:pt-28">
            <div className="max-w-[912px] space-y-8">
              <p className="mx-auto inline-flex rounded-md bg-violet-600 px-2 py-0.5 font-mono text-[12px] font-medium uppercase tracking-[0.12em] text-white">
                CityJS London
              </p>
              <div className="space-y-6">
                <h1 className="text-balance text-5xl font-medium leading-none tracking-[-0.04em] text-[#faf5ff] md:text-7xl">
                  Build federated systems.
                  <br />
                  Deploy instantly.
                </h1>
                <p className="mx-auto max-w-2xl text-base leading-6 text-[#a3a3a3] md:text-lg">
                  From Module Federation to AI orchestration - live in minutes
                </p>
              </div>
              <a href="#cityjs-hubspot-form" className={primaryButtonClass}>
                Start building
              </a>
            </div>

            <div className="w-full max-w-[1136px]">
              <div className="rounded-[10px] bg-[rgba(255,255,255,0.15)] p-2 shadow-[0_32px_120px_rgba(0,0,0,0.55)]">
                <div className="relative aspect-[1126/731] overflow-hidden rounded-[8px] bg-[#0f0f10]">
                  <img
                    src={heroImage}
                    alt="Zephyr Cloud application interface"
                    className="absolute left-0 top-0 h-[171.58%] w-full max-w-none"
                  />
                </div>
              </div>
            </div>
          </div>

          <section className="pt-14">
            <p className="mb-6 text-center text-sm font-normal text-[#737373]">
              Trusted teams already shipping with Zephyr
            </p>
            <div className="relative overflow-hidden">
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-[#0a0a0a] to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-[#0a0a0a] to-transparent" />
              <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-10 md:gap-x-20">
                {partners.map((partner) => (
                  <img key={partner.name} src={partner.logo} alt={partner.name} className="h-16 w-auto md:h-20" />
                ))}
              </div>
            </div>
          </section>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 pb-20 pt-6 md:px-8 lg:px-10">
        <div className="cityjs-manifesto py-28 text-[clamp(2.2rem,5vw,4.6rem)] font-medium leading-[1.02] tracking-[-0.04em] text-[#262626]">
          {manifesto.split(' ').map((word, index) => (
            <span
              key={`${word}-${index}`}
              style={{ animationDelay: `${index * 0.08}s` }}
              className={word.startsWith('Microfrontends') ? 'text-[#faf5ff]' : undefined}
            >
              {word}{' '}
            </span>
          ))}
        </div>

        <section className="space-y-8 pb-20">
          <h2 className="text-4xl font-normal tracking-[-0.03em] text-[#faf5ff]">Comparison</h2>

          <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0d0d0d] shadow-[0_20px_60px_rgba(0,0,0,0.28)]">
            <div className="min-w-[980px]">
              <div className="grid grid-cols-[1.55fr_1fr_1fr_1fr] border-b border-white/10 bg-black text-sm">
                <div className="px-5 py-5" />
                <div className="px-5 py-5 text-neutral-200">Traditional CI/CD</div>
                <div className="px-5 py-5 text-neutral-200">Frontend cloud</div>
                <div className="px-5 py-5 text-[#faf5ff]">
                  <div>Zephyr Cloud</div>
                  <div className="mt-1 text-neutral-400">Get started -&gt;</div>
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
                      className="grid grid-cols-[1.55fr_1fr_1fr_1fr] border-t border-white/10 text-sm text-[#faf5ff]"
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

        <section className="grid gap-12 pb-20 lg:grid-cols-[1fr_1fr]">
          <div>
            <h2 className="max-w-md text-4xl font-normal tracking-[-0.03em] text-[#faf5ff]">
              Everything you need to know
            </h2>
          </div>

          <div className="space-y-2">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div key={faq.question} className="overflow-hidden rounded-md bg-white/[0.05]">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left text-sm text-[#fafafa]"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`h-5 w-5 shrink-0 transition ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen ? <p className="px-4 pb-4 text-sm leading-6 text-neutral-400">{faq.answer}</p> : null}
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

          <div className="mx-auto h-[111px] w-full max-w-[400px] rounded-2xl border border-[#7c3aed] bg-[rgba(124,58,237,0.1)] shadow-[0_0_0_1px_rgba(124,58,237,0.12)]">
            <HubspotInlineForm />
          </div>
        </section>
      </section>

      <footer className="mx-auto grid max-w-[1200px] gap-16 px-6 pb-20 pt-4 text-sm md:grid-cols-[1fr_1fr] md:px-8 lg:px-10">
        <div className="space-y-8">
          <div className="space-y-4">
            <img src={ZephyrWordmark} alt="Zephyr Cloud" className="h-[31px] w-[175px]" />
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

function renderComparisonValue(value: string | boolean, emphasize: boolean = false) {
  if (typeof value === 'string') {
    return <span className={emphasize ? 'text-[#fafafa]' : 'text-[#fafafa]'}>{value}</span>;
  }

  if (value) {
    return <Check className="h-5 w-5 text-[#7c3aed]" />;
  }

  return <X className="h-5 w-5 text-[#a3a3a3]" />;
}

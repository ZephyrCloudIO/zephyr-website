import { formatCapability, formatPartnerType, partners } from '@/data/partners';
import { createFileRoute } from '@tanstack/react-router';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import type { CSSProperties } from 'react';

export const Route = createFileRoute('/partners')({
  component: PartnersPage,
});

const container = 'mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10';

const hostOf = (url: string) => new URL(url).hostname.replace(/^www\./, '');

function PartnersPage() {
  return (
    <>
      <section className="pt-20 pb-24 lg:pt-28 lg:pb-32">
        <div className={container}>
          <div className="max-w-3xl">
            <p className="mb-6 text-sm text-ink-faint">Partners</p>
            <h1 className="text-display m-0 text-ink">Everything is better with friends.</h1>
            <p className="text-lead mt-7 mb-0 max-w-[36rem] text-ink-muted">
              Check out these Zephyr Cloud partners for the best experience when building.
            </p>
          </div>

          <ul className="m-0 mt-16 grid list-none gap-4 p-0 md:grid-cols-2 lg:grid-cols-3">
            {partners.map((partner, i) => (
              <li key={partner.id} className="reveal" style={{ '--reveal-delay': `${i * 80}ms` } as CSSProperties}>
                <a
                  href={partner.url}
                  target="_blank"
                  rel="noopener"
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface/70 transition-colors hover:border-line-strong"
                >
                  {/* Partner logos are drawn for light backgrounds; keep their colors on a plate. */}
                  <span className="flex h-44 items-center justify-center border-b border-line bg-white">
                    <img src={partner.logo} alt="" className="h-full w-auto max-w-full object-contain" loading="lazy" />
                  </span>

                  <span className="flex flex-1 flex-col p-6">
                    <span className="flex items-start justify-between gap-3">
                      <span className="text-title text-ink transition-colors group-hover:text-released-ink">
                        {partner.name}
                      </span>
                      <ArrowUpRight
                        className="mt-1 size-4 shrink-0 text-ink-faint transition-colors group-hover:text-ink"
                        aria-hidden
                      />
                    </span>
                    <span className="text-ident mt-1 text-ink-faint">{hostOf(partner.url)}</span>

                    <span className="mt-6 text-xs text-ink-faint">Type</span>
                    <span className="mt-2 flex flex-wrap gap-1.5">
                      {partner.types.map((type) => (
                        <span
                          key={type}
                          className="rounded-full border border-line-strong px-2.5 py-0.5 text-[0.8125rem] text-ink"
                        >
                          {formatPartnerType(type)}
                        </span>
                      ))}
                    </span>

                    <span className="mt-5 text-xs text-ink-faint">Capabilities</span>
                    <span className="mt-2 flex flex-wrap gap-1.5">
                      {partner.capabilities.map((capability) => (
                        <span
                          key={capability}
                          className="rounded-full bg-surface-2 px-2.5 py-0.5 text-[0.8125rem] text-ink-muted"
                        >
                          {formatCapability(capability)}
                        </span>
                      ))}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="become-partner-title" className="border-t border-line py-24 lg:py-32">
        <div className={container}>
          <div className="reveal flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h2 id="become-partner-title" className="text-headline m-0 text-ink">
                Become a partner
              </h2>
              <p className="text-lead mt-5 mb-0 text-ink-muted">
                Join our partner ecosystem and help organizations build the future on Zephyr Cloud.
              </p>
            </div>
            <a
              href="mailto:inbound@zephyr-cloud.io?subject=partners"
              className="inline-flex h-11 shrink-0 items-center gap-2 self-start rounded-xl bg-released px-5 text-[0.9375rem] font-medium text-white transition-colors hover:bg-[#8b4df5] focus-visible:ring-2 focus-visible:ring-released-ink focus-visible:ring-offset-2 focus-visible:ring-offset-night lg:self-auto"
            >
              Contact us
              <ArrowRight className="size-4" aria-hidden />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

import { createFileRoute } from '@tanstack/react-router';
import { ArrowUpRight, Mail } from 'lucide-react';
import type { CSSProperties } from 'react';

export const Route = createFileRoute('/press')({
  component: PressPage,
});

const container = 'mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10';
const inlineLink =
  'text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-ink-muted';

function PressPage() {
  return (
    <>
      <section className="pt-20 pb-16 lg:pt-28 lg:pb-20">
        <div className={container}>
          <div className="max-w-3xl">
            <p className="mb-6 text-sm text-ink-faint">Newsroom</p>
            <h1 className="text-display m-0 text-ink">Press</h1>
            <p className="text-lead mt-7 mb-0 max-w-[36rem] text-ink-muted">
              Latest news and announcements from Zephyr Cloud
            </p>
            <p className="mt-6 mb-0 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.9375rem] text-ink-muted">
              <Mail className="size-4 shrink-0 text-ink-faint" aria-hidden />
              <span>Press inquiries:</span>
              <a href="mailto:press@zephyr-cloud.io" className={inlineLink}>
                press@zephyr-cloud.io
              </a>
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="press-releases-title" className="border-t border-line py-24 lg:py-32">
        <div className={container}>
          <h2 id="press-releases-title" className="reveal text-headline m-0 text-ink">
            Press releases
          </h2>

          <ul className="m-0 mt-12 grid list-none gap-4 p-0">
            <li className="reveal">
              <article className="group relative grid gap-4 rounded-2xl border border-line bg-surface/70 p-6 transition-colors hover:border-line-strong sm:p-8 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-10">
                <p className="m-0 flex flex-wrap gap-x-3 gap-y-1 text-sm text-ink-faint lg:flex-col">
                  <time dateTime="2024-09-11">September 11, 2024</time>
                  <span>PR Newswire</span>
                </p>
                <div className="max-w-3xl">
                  <h3 className="text-title m-0 text-ink transition-colors group-hover:text-released-ink">
                    Zephyr Cloud Launches New PaaS Enabling Sub-Second Frontend Code Deployment
                  </h3>
                  <p className="mt-3 mb-0 text-[0.9375rem] leading-relaxed text-ink-muted">
                    Zephyr Cloud, a new Platform-as-a-Service (PaaS) solution focused on revolutionizing frontend
                    deployment, officially launches today. The platform addresses critical pain points in modern web
                    development by enabling sub-second code deployments, instant rollbacks, and seamless version
                    management across distributed applications.
                  </p>
                  <a
                    href="https://www.prnewswire.com/news-releases/zephyr-cloud-launches-new-paas-enabling-sub-second-frontend-code-deployment-302242806.html"
                    target="_blank"
                    rel="noopener"
                    className="mt-5 inline-flex items-center gap-1 text-sm text-ink-muted transition-colors after:absolute after:inset-0 after:rounded-2xl hover:text-ink"
                  >
                    Read full article
                    <ArrowUpRight className="size-3.5" aria-hidden />
                  </a>
                </div>
              </article>
            </li>
          </ul>
        </div>
      </section>

      <section aria-labelledby="about-title" className="border-t border-line py-24 lg:py-32">
        <div className={container}>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
            <h2 id="about-title" className="reveal text-headline m-0 text-ink">
              About Zephyr Cloud
            </h2>
            <div className="reveal flex max-w-2xl flex-col gap-5" style={{ '--reveal-delay': '80ms' } as CSSProperties}>
              <p className="text-lead m-0 text-ink-muted">
                Zephyr Cloud is a cutting-edge Platform-as-a-Service (PaaS) solution that revolutionizes frontend
                deployment. Our platform enables development teams to deploy code in sub-seconds, manage versions
                effortlessly, and scale applications without infrastructure complexity.
              </p>
              <p className="text-lead m-0 text-ink-muted">
                Founded by industry veterans with deep expertise in module federation and distributed systems, Zephyr
                Cloud is backed by leading investors and serves enterprise customers across multiple industries.
              </p>
              <p className="m-0 mt-3 border-t border-line pt-6 text-[0.9375rem] leading-relaxed text-ink-faint">
                For press kit, logos, and additional resources, please contact{' '}
                <a href="mailto:press@zephyr-cloud.io" className={inlineLink}>
                  press@zephyr-cloud.io
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

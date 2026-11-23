import { UsedByGrid } from '@/components/home/UsedBySection';
import { USED_BY } from '@/constants/usedBy';
import { getBlogPost } from '@/content/blog-data';
import alanWizemann from '@/images/blog/sgws-case-study/alanwizemann.webp';
import { cn } from '@/lib/utils';
import { Testimonials } from '@/testimonials';
import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import type { CSSProperties } from 'react';

export const Route = createFileRoute('/customers')({
  component: CustomersPage,
});

const container = 'mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10';

type Quote = {
  content: string;
  name: string;
  role: string;
  company: string;
  avatar?: string;
  /** Blog slug of the case study this quote comes from. */
  story?: string;
};

const testimonial = (name: string): Quote => {
  const t = Testimonials.find((entry) => entry.name === name);
  if (!t) throw new Error(`No testimonial from ${name}`);
  return { content: t.content, name: t.name, role: t.role, company: t.company, avatar: t.avatar };
};

/** Lead quote from a case study, then people at companies on the wall saying it in their own words. */
const QUOTES: Quote[] = [
  {
    content:
      'The feedback from our organization was that we tried to implement the changes we attacked for six years to get to instant deployments and rollbacks, and then with the acceleration week and Zephyr Cloud, it took us a week to achieve it.',
    name: 'Alan Wizemann',
    role: 'Chief Digital Officer',
    company: "Southern Glazer's Wine & Spirits",
    avatar: alanWizemann,
    story: 'sgws-case-study',
  },
  testimonial('Mike Grabowski'),
  testimonial('Ron R.'),
  testimonial('Colum Ferry'),
];

const STORIES = USED_BY.flatMap((company) => {
  const post = company.caseStudy ? getBlogPost(company.caseStudy) : null;
  return post ? [{ company: company.name, post }] : [];
});

function CustomersPage() {
  return (
    <>
      <section className="pt-20 pb-24 lg:pt-28 lg:pb-32">
        <div className={container}>
          <div className="max-w-3xl">
            <p className="mb-6 text-sm text-ink-faint">Customers</p>
            <h1 className="text-display m-0 text-ink">Customer stories.</h1>
            <p className="text-lead mt-7 mb-0 max-w-[36rem] text-ink-muted">
              Teams use Zephyr to deploy every build and release when they’re ready. Here’s how some of them ship.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
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

          <h2 className="reveal m-0 mt-20 text-sm font-normal text-ink-faint">Used by people at</h2>
          <UsedByGrid limitOnPhones={false} className="reveal mt-6" />
        </div>
      </section>

      <section aria-labelledby="results-title" className="border-t border-line py-24 lg:py-32">
        <div className={container}>
          <div className="reveal max-w-2xl">
            <p className="mb-3 text-sm text-ink-faint">In their words</p>
            <h2 id="results-title" className="text-headline m-0 text-ink">
              The results speak for themselves.
            </h2>
          </div>

          <ul className="m-0 mt-12 grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-3">
            {QUOTES.map((quote, i) => (
              <li
                key={quote.name}
                className={cn('reveal', i === 0 && 'md:col-span-3')}
                style={{ '--reveal-delay': `${(i % 3) * 70}ms` } as CSSProperties}
              >
                <QuoteCard quote={quote} featured={i === 0} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {STORIES.length > 0 ? (
        <section aria-labelledby="stories-title" className="border-t border-line py-24 lg:py-32">
          <div className={container}>
            <div className="reveal max-w-2xl">
              <p className="mb-3 text-sm text-ink-faint">Case studies</p>
              <h2 id="stories-title" className="text-headline m-0 text-ink">
                How teams ship with Zephyr.
              </h2>
            </div>

            <ul className="m-0 mt-12 grid list-none grid-cols-1 gap-4 p-0">
              {STORIES.map(({ company, post }) => (
                <li key={post.slug} className="reveal">
                  <Link
                    to={`/blog/${post.slug}`}
                    className="group grid overflow-hidden rounded-2xl border border-line bg-surface/70 transition-colors hover:border-line-strong lg:grid-cols-2"
                  >
                    <span className="flex items-center overflow-hidden border-b border-line bg-surface-2 lg:border-r lg:border-b-0">
                      <img
                        src={post.listingImage}
                        alt=""
                        width={640}
                        height={360}
                        className="aspect-[16/9] w-full object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                    </span>
                    <span className="flex flex-col p-6 lg:p-8">
                      <span className="text-sm text-ink-faint">{company}</span>
                      <span className="text-title mt-3 text-ink transition-colors group-hover:text-released-ink">
                        {post.title}
                      </span>
                      <span className="mt-3 text-[0.9375rem] leading-relaxed text-ink-muted">{post.description}</span>
                      <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm text-ink-muted transition-colors group-hover:text-ink">
                        Read the story
                        <ArrowRight className="size-3.5" aria-hidden />
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </>
  );
}

function QuoteCard({ quote, featured }: { quote: Quote; featured: boolean }) {
  return (
    <figure className="m-0 flex h-full flex-col rounded-2xl border border-line bg-surface/70 p-6 lg:p-8">
      <span className="text-xs text-ink-faint">{quote.story ? 'Customer story' : 'Testimonial'}</span>
      <blockquote
        className={cn(
          'm-0 mt-4 leading-relaxed text-ink',
          featured ? 'max-w-4xl text-[1.25rem] lg:text-[1.5rem] lg:leading-snug' : 'text-[0.9375rem] text-ink-muted',
        )}
      >
        “{quote.content}”
      </blockquote>
      <figcaption className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-8">
        <span className="flex min-w-0 items-center gap-3">
          {quote.avatar ? (
            <img
              src={quote.avatar}
              alt=""
              width={36}
              height={36}
              className="size-9 shrink-0 rounded-full object-cover"
              loading="lazy"
            />
          ) : null}
          <span className="min-w-0">
            <span className="block truncate text-sm font-medium text-ink">{quote.name}</span>
            <span className="block truncate text-xs text-ink-faint">
              {quote.role}, {quote.company}
            </span>
          </span>
        </span>
        {quote.story ? (
          <Link
            to={`/blog/${quote.story}`}
            className="inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-ink"
          >
            Read the story
            <ArrowRight className="size-3.5" aria-hidden />
          </Link>
        ) : null}
      </figcaption>
    </figure>
  );
}

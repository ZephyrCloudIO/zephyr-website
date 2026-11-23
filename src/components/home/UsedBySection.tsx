import { USED_BY, type UsedByCompany } from '@/constants/usedBy';
import { getBlogPost } from '@/content/blog-data';
import { cn } from '@/lib/utils';
import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';

/** Ink area each logo gets (px², before `--logo-scale`), so wide and tall marks read the same size. */
const LOGO_AREA = 2100;
const LOGO_MAX_HEIGHT = 34;
/** Phones get two columns; past this many the wall turns into a scroll. */
const PHONE_LOGOS = 12;

function logoWidth({ ratio, scale = 1 }: UsedByCompany) {
  return Math.round(Math.min(Math.sqrt(LOGO_AREA * ratio), LOGO_MAX_HEIGHT * ratio) * scale);
}

function Logo({ company, className }: { company: UsedByCompany; className?: string }) {
  return (
    <span
      role="img"
      aria-label={company.name}
      className={cn(
        'block max-w-[80%] transition-colors duration-300 [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]',
        className,
      )}
      style={{
        width: `calc(${logoWidth(company)}px * var(--logo-scale))`,
        aspectRatio: company.ratio,
        maskImage: `url("${company.logo}")`,
        WebkitMaskImage: `url("${company.logo}")`,
      }}
    />
  );
}

function CaseStudyMarker() {
  return (
    <span
      aria-hidden
      className="absolute top-3 right-3 size-1.5 bg-ink-muted transition-colors group-hover:bg-ink group-focus-visible:bg-ink"
    />
  );
}

/**
 * The logo wall. Cells with a published case study carry a marker and link to the story.
 * Columns are fixed widths in a centered flex row, so a part-filled last row sits in the middle.
 */
export function UsedByGrid({ limitOnPhones = true, className }: { limitOnPhones?: boolean; className?: string }) {
  return (
    <ul
      className={cn(
        'm-0 flex list-none flex-wrap justify-center gap-1 p-0 [--logo-scale:0.8] sm:[--logo-scale:0.9] lg:[--logo-scale:1]',
        className,
      )}
    >
      {USED_BY.map((company, i) => {
        const post = company.caseStudy ? getBlogPost(company.caseStudy) : null;
        const cell = 'relative flex h-20 items-center justify-center rounded-lg bg-surface lg:h-24';

        return (
          <li
            key={company.name}
            className={cn(
              'w-[calc((100%-0.25rem)/2)] sm:w-[calc((100%-0.75rem)/4)] lg:w-[calc((100%-1.5rem)/7)]',
              limitOnPhones && i >= PHONE_LOGOS && 'max-sm:hidden',
            )}
          >
            {post ? (
              <Link
                to={`/blog/${post.slug}`}
                title={`Read the ${company.name} case study`}
                className={cn(cell, 'group transition-colors hover:bg-surface-2 focus-visible:bg-surface-2')}
              >
                <Logo company={company} className="bg-ink-muted group-hover:bg-ink group-focus-visible:bg-ink" />
                <span className="sr-only">, read the case study</span>
                <CaseStudyMarker />
              </Link>
            ) : (
              <div className={cell}>
                <Logo company={company} className="bg-ink-faint" />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export function UsedBySection() {
  return (
    <section aria-labelledby="used-by-title" className="border-t border-line py-24 lg:py-32">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10">
        <div className="reveal flex flex-wrap items-baseline justify-between gap-4">
          <h2 id="used-by-title" className="m-0 text-sm font-normal text-ink-faint">
            Used by people at
          </h2>
          <Link
            to="/customers"
            className="inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-ink"
          >
            See our customers
            <ArrowRight className="size-3.5" aria-hidden />
          </Link>
        </div>

        <UsedByGrid className="reveal mt-6" />
      </div>
    </section>
  );
}

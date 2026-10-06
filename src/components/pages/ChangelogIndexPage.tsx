import { formatMonthDay } from '@/date';
import type { ChangelogEntry } from '@/lib/changelog/types';
import type { CSSProperties } from 'react';
import { ChangelogCategoryLabel } from './ChangelogCategory';

interface MonthGroup {
  key: string;
  year: number;
  month: string;
  entries: ChangelogEntry[];
}

// Dates are parsed as UTC midnight (src/lib/utils.ts), so group and label in UTC to match SSR and hydration.
const monthFormatter = new Intl.DateTimeFormat('en-US', { month: 'long', timeZone: 'UTC' });

function groupByMonth(entries: ChangelogEntry[]): MonthGroup[] {
  const groups = new Map<string, MonthGroup>();

  for (const entry of entries) {
    const year = entry.date.getUTCFullYear();
    const monthIndex = entry.date.getUTCMonth();
    const key = `${year}-${String(monthIndex + 1).padStart(2, '0')}`;

    let group = groups.get(key);
    if (!group) {
      group = { key, year, month: monthFormatter.format(entry.date), entries: [] };
      groups.set(key, group);
    }
    group.entries.push(entry);
  }

  // Keys are YYYY-MM, so a string sort is chronological; newest first.
  return [...groups.values()].sort((a, b) => b.key.localeCompare(a.key));
}

function ChangelogCard({ entry }: { entry: ChangelogEntry }) {
  return (
    <a
      href={`/changelog/${entry.slug}`}
      className="group border-line bg-surface/70 hover:border-line-strong flex flex-col gap-5 overflow-hidden rounded-2xl border p-5 transition-colors sm:p-6 md:flex-row md:items-start md:gap-8"
    >
      <div className="flex min-w-0 flex-1 flex-col">
        <p className="text-ink-faint m-0 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
          <time dateTime={entry.date.toISOString()}>{formatMonthDay(entry.date)}</time>
          <span aria-hidden>·</span>
          <ChangelogCategoryLabel category={entry.category} />
        </p>
        <h3 className="text-title text-ink group-hover:text-released-ink m-0 mt-3 transition-colors">{entry.title}</h3>
        {entry.summary ? (
          <p className="text-ink-muted m-0 mt-2.5 line-clamp-3 max-w-2xl text-[0.9375rem] leading-relaxed text-pretty">
            {entry.summary}
          </p>
        ) : null}
      </div>
      {entry.image ? (
        <span className="border-line bg-surface-2 block aspect-[16/9] w-full shrink-0 overflow-hidden rounded-xl border md:w-60">
          <img
            src={entry.image}
            alt=""
            width={480}
            height={270}
            className="ease-out-soft h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            loading="lazy"
            decoding="async"
          />
        </span>
      ) : null}
    </a>
  );
}

export function ChangelogIndexPage({ entries }: { entries: ChangelogEntry[] }) {
  const groups = groupByMonth(entries);

  return (
    <div className="mx-auto max-w-[1320px] px-5 pt-16 pb-24 sm:px-8 lg:px-10 lg:pt-24 lg:pb-32">
      <header className="max-w-3xl">
        <p className="text-ink-faint m-0 mb-4 text-sm">Changelog</p>
        <h1 className="text-display text-ink m-0">What’s new in Zephyr.</h1>
        <p className="text-lead text-ink-muted m-0 mt-6 max-w-[36rem]">
          Product updates, improvements, and fixes to Zephyr Cloud, newest first.
        </p>
      </header>

      <div className="mt-14 lg:mt-20">
        {groups.map((group, groupIndex) => (
          <section
            key={group.key}
            aria-labelledby={`changelog-${group.key}`}
            className="border-line grid gap-5 border-t py-10 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-10 lg:py-12"
          >
            <h2
              id={`changelog-${group.key}`}
              className="text-ink m-0 text-base font-medium lg:sticky lg:top-24 lg:self-start"
            >
              {group.month} <span className="text-ink-faint">{group.year}</span>
            </h2>
            <ol className="m-0 grid list-none gap-4 p-0">
              {group.entries.map((entry, i) => (
                // The first month is above the fold, so it isn't held back for the reveal.
                <li
                  key={entry.slug}
                  className={groupIndex === 0 ? undefined : 'reveal'}
                  style={groupIndex === 0 ? undefined : ({ '--reveal-delay': `${i * 70}ms` } as CSSProperties)}
                >
                  <ChangelogCard entry={entry} />
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </div>
  );
}

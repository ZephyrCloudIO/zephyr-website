import { getAllChangelogEntries } from '@/lib/changelog/loader';
import type { ChangelogEntry } from '@/lib/changelog/types';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Calendar, Code, Globe, Package, Rocket, Shield, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/changelog/')({
  component: ChangelogPage,
});

function ChangelogPage() {
  const [entries, setEntries] = useState<ChangelogEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllChangelogEntries().then((changelogEntries) => {
      setEntries(changelogEntries);
      setLoading(false);
    });
  }, []);

  // Group entries by year and month
  const groupedEntries = entries.reduce(
    (acc, entry) => {
      const year = entry.date.getFullYear();
      const month = entry.date.toLocaleString('en-US', { month: 'long' });
      const key = `${year}-${month}`;

      if (!acc[key]) {
        acc[key] = {
          year,
          month,
          entries: [],
        };
      }

      acc[key].entries.push(entry);
      return acc;
    },
    {} as Record<string, { year: number; month: string; entries: ChangelogEntry[] }>,
  );

  const sortedGroups = Object.values(groupedEntries).sort((a, b) => {
    // Sort by year desc, then by month desc
    if (a.year !== b.year) return b.year - a.year;
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return months.indexOf(b.month) - months.indexOf(a.month);
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 pb-2 bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
            Changelog
          </h1>
          <p className="text-xl text-neutral-400">Latest updates and improvements to Zephyr Cloud</p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[140px] top-0 bottom-0 w-[1px] bg-neutral-800 hidden lg:block" />

          {sortedGroups.map((group) => (
            <div key={`${group.year}-${group.month}`} className="mb-16">
              {/* Year and Month Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="hidden lg:block w-[120px] text-right">
                  <div className="text-2xl font-bold text-white">{group.year}</div>
                  <div className="text-neutral-400">{group.month}</div>
                </div>
                <div className="hidden lg:block w-4 h-4 bg-emerald-500 rounded-full relative z-10" />
                <div className="lg:hidden">
                  <div className="text-2xl font-bold text-white">
                    {group.month} {group.year}
                  </div>
                </div>
              </div>

              {/* Entries Grid */}
              <div className="lg:ml-[160px] grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {group.entries.map((entry) => (
                  <Link key={entry.slug} to="/changelog/$slug" params={{ slug: entry.slug }} className="group relative">
                    <article className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden hover:border-emerald-600 transition-all duration-200 h-full">
                      {/* Image */}
                      {entry.image && (
                        <div className="aspect-[16/9] overflow-hidden bg-neutral-950">
                          <img
                            src={entry.image}
                            alt={entry.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                          />
                        </div>
                      )}

                      {/* Content */}
                      <div className="p-6">
                        {/* Category Icon */}
                        <div className="flex items-center gap-2 mb-3">
                          {entry.category === 'performance' && <Zap className="w-4 h-4 text-yellow-500" />}
                          {entry.category === 'feature' && <Rocket className="w-4 h-4 text-emerald-500" />}
                          {entry.category === 'integration' && <Package className="w-4 h-4 text-blue-500" />}
                          {entry.category === 'security' && <Shield className="w-4 h-4 text-red-500" />}
                          {entry.category === 'platform' && <Globe className="w-4 h-4 text-purple-500" />}
                          {entry.category === 'dx' && <Code className="w-4 h-4 text-orange-500" />}
                          <span className="text-xs text-neutral-400 uppercase tracking-wider">{entry.category}</span>
                        </div>

                        <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-emerald-400 transition-colors">
                          {entry.title}
                        </h3>

                        <p className="text-sm text-neutral-400 mb-4 line-clamp-2">{entry.summary}</p>

                        {/* Date */}
                        <div className="flex items-center gap-2 text-xs text-neutral-500">
                          <Calendar className="w-3 h-3" />
                          <time dateTime={entry.date.toISOString()}>
                            {entry.date.toLocaleDateString('en-US', {
                              day: 'numeric',
                              month: 'short',
                            })}
                          </time>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

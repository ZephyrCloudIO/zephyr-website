import { BlogCard } from '@/components/BlogCard';
import { Input } from '@/components/ui/input';
import { allBlogPosts } from '@/content/blog-data';
import { tagLabels, type BlogTag } from '@/lib/blog/tags';
import { cn } from '@/lib/utils';
import { Search, X } from 'lucide-react';
import { useMemo, useState, type CSSProperties } from 'react';

/** How many topics show before "more"; the rest are one click away. */
const TOPIC_PREVIEW_COUNT = 9;

/** Topics that have posts, most-used first. */
const TOPICS: { tag: BlogTag; count: number }[] = (() => {
  const counts = new Map<BlogTag, number>();
  for (const post of allBlogPosts) {
    for (const tag of post.tags ?? []) {
      if (tag in tagLabels) counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || tagLabels[a.tag].localeCompare(tagLabels[b.tag]));
})();

const chipClass =
  'inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full border px-3 text-[0.8125rem] whitespace-nowrap transition-colors';

function TopicChip({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count?: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        chipClass,
        active
          ? 'border-released/60 bg-released/15 text-ink'
          : 'border-line text-ink-muted hover:border-line-strong hover:text-ink',
      )}
    >
      {label}
      {count !== undefined ? (
        <span className={cn('tabular-nums', active ? 'text-released-ink' : 'text-ink-faint')}>{count}</span>
      ) : null}
    </button>
  );
}

export function BlogIndexPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<BlogTag | 'all'>('all');
  const [showAllTopics, setShowAllTopics] = useState(false);

  const filteredPosts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return allBlogPosts.filter((post) => {
      const matchesSearch =
        query === '' || post.title?.toLowerCase().includes(query) || post.description?.toLowerCase().includes(query);

      const matchesTag = selectedTag === 'all' || post.tags?.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [searchQuery, selectedTag]);

  // The two most recent posts are always featured; the rest fall through to the general listing.
  const featuredPosts = filteredPosts.slice(0, 2);
  const regularPosts = filteredPosts.slice(2);

  const isFiltered = searchQuery.trim() !== '' || selectedTag !== 'all';
  const hiddenTopicCount = Math.max(TOPICS.length - TOPIC_PREVIEW_COUNT, 0);
  // The selected topic stays visible even when the list is collapsed.
  const visibleTopics = showAllTopics
    ? TOPICS
    : TOPICS.filter((topic, i) => i < TOPIC_PREVIEW_COUNT || topic.tag === selectedTag);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTag('all');
  };

  return (
    <div className="mx-auto max-w-[1320px] px-5 pt-16 pb-24 sm:px-8 lg:px-10 lg:pt-24 lg:pb-32">
      <header className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
        <div className="max-w-3xl">
          <p className="m-0 mb-4 text-sm text-ink-faint">Blog</p>
          <h1 className="text-display m-0 text-ink">Notes from the Zephyr team.</h1>
          <p className="text-lead m-0 mt-6 max-w-[36rem] text-ink-muted">
            Insights, updates, and tutorials on shipping frontends with Zephyr Cloud.
          </p>
        </div>

        <div className="relative w-full lg:max-w-sm">
          <Search
            className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-ink-faint"
            aria-hidden
          />
          <Input
            type="search"
            aria-label="Search posts"
            placeholder="Search posts"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-11 rounded-xl border-line bg-surface/70 pr-10 pl-10 text-ink shadow-none placeholder:text-ink-faint hover:border-line-strong focus-visible:border-line-strong focus-visible:ring-released-ink/25 md:text-[0.9375rem] dark:bg-surface/70 [&::-webkit-search-cancel-button]:appearance-none"
          />
          {searchQuery ? (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
              className="absolute top-1/2 right-2 flex size-7 -translate-y-1/2 items-center justify-center rounded-lg text-ink-faint transition-colors hover:bg-surface-2 hover:text-ink"
            >
              <X className="size-4" aria-hidden />
            </button>
          ) : null}
        </div>
      </header>

      <div className="mt-10 border-t border-line pt-6 lg:mt-12">
        <div
          role="group"
          aria-label="Filter by topic"
          className="-mx-5 -my-1 flex gap-2 overflow-x-auto px-5 py-1 [scrollbar-width:none] sm:m-0 sm:flex-wrap sm:overflow-visible sm:p-0 [&::-webkit-scrollbar]:hidden"
        >
          <TopicChip
            label="All topics"
            count={allBlogPosts.length}
            active={selectedTag === 'all'}
            onClick={() => setSelectedTag('all')}
          />
          {visibleTopics.map(({ tag, count }) => (
            <TopicChip
              key={tag}
              label={tagLabels[tag]}
              count={count}
              active={selectedTag === tag}
              onClick={() => setSelectedTag(selectedTag === tag ? 'all' : tag)}
            />
          ))}
          {hiddenTopicCount > 0 ? (
            <button
              type="button"
              aria-expanded={showAllTopics}
              aria-label={showAllTopics ? 'Show fewer topics' : `Show ${hiddenTopicCount} more topics`}
              onClick={() => setShowAllTopics(!showAllTopics)}
              className={cn(
                chipClass,
                'border-transparent text-ink-faint underline decoration-line-strong underline-offset-4 hover:text-ink',
              )}
            >
              {showAllTopics ? 'Fewer topics' : `${hiddenTopicCount} more`}
            </button>
          ) : null}
        </div>

        {/* Always mounted so screen readers hear the count change; only shown while filtering. */}
        <div className={cn('flex items-center gap-3 text-sm text-ink-faint', isFiltered ? 'mt-5' : 'sr-only')}>
          <p aria-live="polite" className="m-0">
            {isFiltered ? `${filteredPosts.length} of ${allBlogPosts.length} posts` : `${allBlogPosts.length} posts`}
          </p>
          {isFiltered ? (
            <button
              type="button"
              onClick={clearFilters}
              className="text-ink-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-ink"
            >
              Clear filters
            </button>
          ) : null}
        </div>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-line bg-surface/70 px-6 py-16 text-center">
          <p className="text-title m-0 text-ink">No posts match those filters.</p>
          <p className="m-0 mt-3 text-ink-muted">Try a different search or topic.</p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-8 inline-flex h-10 items-center rounded-xl border border-line-strong px-4 text-sm text-ink-muted transition-colors hover:border-deployed/60 hover:text-ink"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <>
          {featuredPosts.length > 0 && (
            <section aria-labelledby="featured-posts" className="mt-10">
              <h2 id="featured-posts" className="m-0 mb-5 text-sm font-medium text-ink-muted">
                Featured
              </h2>
              <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-2">
                {featuredPosts.map((post) => (
                  <li key={post.slug}>
                    <BlogCard post={post} featured />
                  </li>
                ))}
              </ul>
            </section>
          )}

          {regularPosts.length > 0 && (
            <section aria-labelledby="latest-posts" className="mt-16">
              <h2 id="latest-posts" className="m-0 mb-5 text-sm font-medium text-ink-muted">
                {featuredPosts.length > 0 ? 'Latest posts' : 'All posts'}
              </h2>
              <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-2 lg:grid-cols-3">
                {regularPosts.map((post, i) => (
                  <li
                    key={post.slug}
                    className="reveal"
                    style={{ '--reveal-delay': `${(i % 3) * 70}ms` } as CSSProperties}
                  >
                    <BlogCard post={post} />
                  </li>
                ))}
              </ul>
            </section>
          )}
        </>
      )}
    </div>
  );
}

import { BlogCard } from '@/components/BlogCard';
import { Input } from '@/components/ui/input';
import { tagLabels, type BlogTag } from '@/lib/blog/tags';
import type { BlogPost } from '@/lib/blog/types';
import { cn } from '@/lib/utils';
import { Search, X } from 'lucide-react';
import { useMemo, useState, type CSSProperties } from 'react';

/** How many topics show before "more"; the rest are one click away. */
const TOPIC_PREVIEW_COUNT = 9;

/** Topics that have posts, most-used first. */
function topicsForPosts(posts: BlogPost[]): { tag: BlogTag; count: number }[] {
  const counts = new Map<BlogTag, number>();
  for (const post of posts) {
    for (const tag of post.tags ?? []) {
      if (tag in tagLabels) counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || tagLabels[a.tag].localeCompare(tagLabels[b.tag]));
}

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

export function BlogIndexPage({ posts: allBlogPosts }: { posts: BlogPost[] }) {
  const TOPICS = useMemo(() => topicsForPosts(allBlogPosts), [allBlogPosts]);
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
  }, [allBlogPosts, searchQuery, selectedTag]);

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
          <p className="text-ink-faint m-0 mb-4 text-sm">Blog</p>
          <h1 className="text-display text-ink m-0">Notes from the Zephyr team.</h1>
          <p className="text-lead text-ink-muted m-0 mt-6 max-w-[36rem]">
            Insights, updates, and tutorials on shipping frontends with Zephyr Cloud.
          </p>
        </div>

        <div className="relative w-full lg:max-w-sm">
          <Search
            className="text-ink-faint pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2"
            aria-hidden
          />
          <Input
            type="search"
            aria-label="Search posts"
            placeholder="Search posts"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-line bg-surface/70 text-ink placeholder:text-ink-faint hover:border-line-strong focus-visible:border-line-strong focus-visible:ring-released-ink/25 dark:bg-surface/70 h-11 rounded-xl pr-10 pl-10 shadow-none md:text-[0.9375rem] [&::-webkit-search-cancel-button]:appearance-none"
          />
          {searchQuery ? (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
              className="text-ink-faint hover:bg-surface-2 hover:text-ink absolute top-1/2 right-2 flex size-7 -translate-y-1/2 items-center justify-center rounded-lg transition-colors"
            >
              <X className="size-4" aria-hidden />
            </button>
          ) : null}
        </div>
      </header>

      <div className="border-line mt-10 border-t pt-6 lg:mt-12">
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
                'text-ink-faint decoration-line-strong hover:text-ink border-transparent underline underline-offset-4',
              )}
            >
              {showAllTopics ? 'Fewer topics' : `${hiddenTopicCount} more`}
            </button>
          ) : null}
        </div>

        {/* Always mounted so screen readers hear the count change; only shown while filtering. */}
        <div className={cn('text-ink-faint flex items-center gap-3 text-sm', isFiltered ? 'mt-5' : 'sr-only')}>
          <p aria-live="polite" className="m-0">
            {isFiltered ? `${filteredPosts.length} of ${allBlogPosts.length} posts` : `${allBlogPosts.length} posts`}
          </p>
          {isFiltered ? (
            <button
              type="button"
              onClick={clearFilters}
              className="text-ink-muted decoration-line-strong hover:text-ink underline underline-offset-4 transition-colors"
            >
              Clear filters
            </button>
          ) : null}
        </div>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="border-line bg-surface/70 mt-10 rounded-2xl border px-6 py-16 text-center">
          <p className="text-title text-ink m-0">No posts match those filters.</p>
          <p className="text-ink-muted m-0 mt-3">Try a different search or topic.</p>
          <button
            type="button"
            onClick={clearFilters}
            className="border-line-strong text-ink-muted hover:border-deployed/60 hover:text-ink mt-8 inline-flex h-10 items-center rounded-xl border px-4 text-sm transition-colors"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <>
          {featuredPosts.length > 0 && (
            <section aria-labelledby="featured-posts" className="mt-10">
              <h2 id="featured-posts" className="text-ink-muted m-0 mb-5 text-sm font-medium">
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
              <h2 id="latest-posts" className="text-ink-muted m-0 mb-5 text-sm font-medium">
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

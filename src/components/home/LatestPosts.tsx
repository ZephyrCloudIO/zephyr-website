import { allBlogPosts } from '@/content/blog-data';
import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import type { CSSProperties } from 'react';

// Dates are parsed as UTC (see src/lib/utils.ts); format in UTC so SSR and hydration agree.
const formatDate = (date: Date) =>
  date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

export function LatestPosts() {
  const posts = allBlogPosts.slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section aria-labelledby="posts-title" className="border-t border-line py-24 lg:py-32">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10">
        <div className="reveal flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-sm text-ink-faint">From the blog</p>
            <h2 id="posts-title" className="text-headline m-0 text-ink">
              What we’re shipping.
            </h2>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-ink"
          >
            All posts
            <ArrowRight className="size-3.5" aria-hidden />
          </Link>
        </div>

        <ul className="m-0 mt-12 grid list-none gap-4 p-0 md:grid-cols-3">
          {posts.map((post, i) => (
            <li key={post.slug} className="reveal" style={{ '--reveal-delay': `${i * 80}ms` } as CSSProperties}>
              <Link
                to={`/blog/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface/70 transition-colors hover:border-line-strong"
              >
                {post.listingImage ? (
                  <span className="block aspect-[16/9] overflow-hidden border-b border-line bg-surface-2">
                    <img
                      src={post.listingImage}
                      alt=""
                      width={640}
                      height={360}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </span>
                ) : null}
                <span className="flex flex-1 flex-col p-5">
                  <span className="text-title text-[1.125rem] text-ink transition-colors group-hover:text-released-ink">
                    {post.title}
                  </span>
                  <span className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-muted">{post.description}</span>
                  <span className="mt-auto flex items-center gap-2.5 pt-5 text-xs text-ink-faint">
                    {post.authors[0] ? (
                      <img
                        src={post.authors[0].avatar}
                        alt=""
                        width={22}
                        height={22}
                        className="size-5.5 rounded-full object-cover"
                        loading="lazy"
                      />
                    ) : null}
                    <span className="truncate">
                      {post.authors[0]?.displayName}
                      {post.authors[0] ? ' · ' : ''}
                      <time dateTime={post.date.toISOString()}>{formatDate(post.date)}</time>
                    </span>
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

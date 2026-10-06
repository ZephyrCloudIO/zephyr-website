import type { BlogPost } from '@/lib/blog/types';
import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import type { CSSProperties } from 'react';

// Dates are parsed as UTC (see src/lib/utils.ts); format in UTC so SSR and hydration agree.
const formatDate = (date: Date) =>
  date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

export function LatestPosts({ posts: allBlogPosts }: { posts: BlogPost[] }) {
  const posts = allBlogPosts.slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section aria-labelledby="posts-title" className="border-line border-t py-24 lg:py-32">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10">
        <div className="reveal flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-ink-faint mb-3 text-sm">From the blog</p>
            <h2 id="posts-title" className="text-headline text-ink m-0">
              What we’re shipping.
            </h2>
          </div>
          <Link
            to="/blog"
            className="text-ink-muted hover:text-ink inline-flex items-center gap-1.5 text-sm transition-colors"
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
                className="group border-line bg-surface/70 hover:border-line-strong flex h-full flex-col overflow-hidden rounded-2xl border transition-colors"
              >
                {post.listingImage ? (
                  <span className="border-line bg-surface-2 block aspect-[16/9] overflow-hidden border-b">
                    <img
                      src={post.listingImage}
                      alt=""
                      width={640}
                      height={360}
                      className="ease-out-soft h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </span>
                ) : null}
                <span className="flex flex-1 flex-col p-5">
                  <span className="text-title text-ink group-hover:text-released-ink text-[1.125rem] transition-colors">
                    {post.title}
                  </span>
                  <span className="text-ink-muted mt-2 line-clamp-2 text-sm leading-relaxed">{post.description}</span>
                  <span className="text-ink-faint mt-auto flex items-center gap-2.5 pt-5 text-xs">
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

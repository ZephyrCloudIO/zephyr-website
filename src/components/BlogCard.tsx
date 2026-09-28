import { formatDateShort } from '@/date';
import { tagLabels } from '@/lib/blog/tags';
import type { Author, BlogPost } from '@/lib/blog/types';
import { cn } from '@/lib/utils';
import { Link } from '@tanstack/react-router';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export function authorNames(authors: Author[]) {
  if (authors.length === 0) return '';
  if (authors.length === 1) return authors[0].displayName;
  if (authors.length === 2) return `${authors[0].displayName} & ${authors[1].displayName}`;
  return `${authors[0].displayName} +${authors.length - 1}`;
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  if (!post) return null;

  const authors = post.authors ?? [];
  const topics = (post.tags ?? []).slice(0, featured ? 3 : 2).map((tag) => tagLabels[tag] ?? tag);

  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface/70 transition-colors hover:border-line-strong"
    >
      <span className="block aspect-[16/9] overflow-hidden border-b border-line bg-surface-2">
        {post.listingImage ? (
          <img
            src={post.listingImage}
            alt=""
            width={featured ? 1200 : 640}
            height={featured ? 675 : 360}
            className="h-full w-full object-cover transition-transform duration-700 ease-out-soft group-hover:scale-[1.03]"
            loading={featured ? 'eager' : 'lazy'}
            decoding="async"
          />
        ) : null}
      </span>
      <div className={cn('flex flex-1 flex-col', featured ? 'p-5 sm:p-6' : 'p-5')}>
        {topics.length > 0 ? <p className="m-0 mb-3 text-xs text-ink-faint">{topics.join(' · ')}</p> : null}
        {/* Not through cn(): tailwind-merge reads the custom `text-title` utility as a color and drops it. */}
        <h3
          className={`text-title m-0 text-ink transition-colors group-hover:text-released-ink ${featured ? '' : 'text-[1.125rem]'}`}
        >
          {post.title}
        </h3>
        {post.description ? (
          <p
            className={cn(
              'm-0 mt-2 leading-relaxed text-pretty text-ink-muted',
              featured ? 'line-clamp-3 text-[0.9375rem]' : 'line-clamp-2 text-sm',
            )}
          >
            {post.description}
          </p>
        ) : null}
        <div className="mt-auto flex items-center gap-2.5 pt-5 text-xs text-ink-faint">
          {authors.length > 0 ? (
            <span className="flex shrink-0 -space-x-1.5">
              {authors.slice(0, 3).map((author) => (
                <img
                  key={author.displayName}
                  src={author.avatar}
                  alt=""
                  width={22}
                  height={22}
                  className="size-5.5 rounded-full object-cover ring-2 ring-surface"
                  loading="lazy"
                />
              ))}
            </span>
          ) : null}
          <span className="min-w-0 truncate">
            {authors.length > 0 ? `${authorNames(authors)} · ` : ''}
            <time dateTime={post.date.toISOString()}>{formatDateShort(post.date)}</time>
            {post.readingTime ? ` · ${post.readingTime} min read` : ''}
          </span>
        </div>
      </div>
    </Link>
  );
}

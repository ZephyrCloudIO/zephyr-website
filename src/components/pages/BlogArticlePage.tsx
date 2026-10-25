import { authorNames } from '@/components/BlogCard';
import { LinkedinIcon } from '@/components/ui/linkedin-icon';
import { TwitchIcon } from '@/components/ui/twitch-icon';
import { XIcon } from '@/components/ui/x-icon';
import { YoutubeIcon } from '@/components/ui/youtube-icon';
import { formatDateLong } from '@/date';
import { mdxToBlogPost, type MDXBlogPost } from '@/lib/blog/loader';
import { tagLabels } from '@/lib/blog/tags';
import type { Author } from '@/lib/blog/types';
import { cn } from '@/lib/utils';
import { ArrowLeft, Github, type LucideIcon } from 'lucide-react';
import { Fragment, useRef, type ReactNode } from 'react';
import { ARTICLE_COLUMN, ArticleBody, ArticleHeader, ArticleHero, SECONDARY_BUTTON } from './ArticleLayout';
import { ReadingProgress } from './ReadingProgress';

interface BlogArticlePageProps {
  slug: string;
  metadata: MDXBlogPost['metadata'];
  children: ReactNode;
}

type SocialPlatform = NonNullable<Author['socialLinks']>[number]['platform'];

const SOCIAL_ICONS: Record<SocialPlatform, LucideIcon> = {
  X: XIcon,
  LinkedIn: LinkedinIcon,
  Github: Github,
  YouTube: YoutubeIcon,
  Twitch: TwitchIcon,
};

const SOCIAL_LABELS: Record<SocialPlatform, string> = {
  X: 'X',
  LinkedIn: 'LinkedIn',
  Github: 'GitHub',
  YouTube: 'YouTube',
  Twitch: 'Twitch',
};

/** Each topic stays on one line, so a wrap never splits "Module Federation". */
function TopicList({ topics }: { topics: string[] }) {
  return topics.map((topic, i) => (
    <Fragment key={topic}>
      {i > 0 ? <span aria-hidden>{' · '}</span> : null}
      <span className="whitespace-nowrap">{topic}</span>
    </Fragment>
  ));
}

const iconButton =
  'inline-flex size-9 items-center justify-center rounded-lg border border-line text-ink-muted transition-colors hover:border-line-strong hover:text-ink';

export function BlogArticlePage({ slug, metadata, children }: BlogArticlePageProps) {
  const post = mdxToBlogPost(
    {
      metadata,
      default: () => null,
    },
    slug,
  );
  const articleRef = useRef<HTMLElement>(null);

  const pageUrl = `https://zephyr-cloud.io/blog/${slug}`;
  const heroImage = post.heroImage || '/images/og/default-1200x630.png';
  const topics = post.tags.map((tag) => tagLabels[tag] ?? tag);

  return (
    <article ref={articleRef} className="pb-24 lg:pb-32">
      <ReadingProgress target={articleRef} />

      <ArticleHeader
        back={{ href: '/blog', label: 'Blog' }}
        eyebrow={topics.length > 0 ? <TopicList topics={topics} /> : undefined}
        title={post.title}
        lead={post.description || undefined}
      >
        <div className="flex items-center gap-3 border-t border-line pt-6 text-sm">
          {post.authors.length > 0 ? (
            <span className="flex shrink-0 -space-x-2">
              {post.authors.map((author) => (
                <img
                  key={author.displayName}
                  src={author.avatar}
                  alt=""
                  width={40}
                  height={40}
                  className="size-10 rounded-full object-cover ring-2 ring-night"
                />
              ))}
            </span>
          ) : null}
          <div className="min-w-0">
            {post.authors.length > 0 ? (
              <p className="m-0 truncate font-medium text-ink">{authorNames(post.authors)}</p>
            ) : null}
            <p className="m-0 mt-0.5 text-ink-faint">
              <time dateTime={post.date.toISOString()}>{formatDateLong(post.date)}</time>
              {post.readingTime ? ` · ${post.readingTime} min read` : ''}
            </p>
          </div>
        </div>
      </ArticleHeader>

      {metadata.hideHero ? null : <ArticleHero src={heroImage} alt={post.title} />}

      <ArticleBody title={post.title}>{children}</ArticleBody>

      <footer className={cn(ARTICLE_COLUMN, 'mt-16')}>
        {post.authors.length > 0 && (
          <section aria-labelledby="post-authors" className="border-t border-line pt-10">
            <h2 id="post-authors" className="m-0 mb-5 text-sm font-medium text-ink-muted">
              {post.authors.length > 1 ? 'About the authors' : 'About the author'}
            </h2>
            <ul className="m-0 grid list-none gap-3 p-0 sm:grid-cols-2">
              {post.authors.map((author) => (
                <li
                  key={author.displayName}
                  className="flex items-center gap-4 rounded-2xl border border-line bg-surface/70 p-5"
                >
                  <img
                    src={author.avatar}
                    alt=""
                    width={48}
                    height={48}
                    className="size-12 shrink-0 rounded-full object-cover"
                    loading="lazy"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="m-0 truncate font-medium text-ink">{author.displayName}</p>
                    {author.zephyrMember ? <p className="m-0 mt-0.5 text-sm text-ink-faint">Zephyr team</p> : null}
                    {author.socialLinks && author.socialLinks.length > 0 ? (
                      <div className="mt-2.5 flex gap-3">
                        {author.socialLinks.map((social) => {
                          const Icon = SOCIAL_ICONS[social.platform];
                          if (!Icon) return null;
                          return (
                            <a
                              key={social.link}
                              href={social.link}
                              target="_blank"
                              rel="noopener"
                              aria-label={`${author.displayName} on ${SOCIAL_LABELS[social.platform]}`}
                              className="text-ink-faint transition-colors hover:text-ink"
                            >
                              <Icon size={15} />
                            </a>
                          );
                        })}
                      </div>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div
          className={cn(
            'flex flex-wrap items-center justify-between gap-4',
            post.authors.length > 0 ? 'mt-10' : 'border-t border-line pt-10',
          )}
        >
          <a href="/blog" className={SECONDARY_BUTTON}>
            <ArrowLeft className="size-4" aria-hidden />
            All posts
          </a>

          <div className="flex items-center gap-2">
            <span className="mr-1 text-sm text-ink-faint">Share</span>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(pageUrl)}`}
              target="_blank"
              rel="noopener"
              aria-label="Share on X"
              className={iconButton}
            >
              <XIcon size={15} />
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`}
              target="_blank"
              rel="noopener"
              aria-label="Share on LinkedIn"
              className={iconButton}
            >
              <LinkedinIcon size={15} />
            </a>
          </div>
        </div>
      </footer>
    </article>
  );
}

import { Link } from '@modern-js/runtime/router';
import { Author } from '@/routes/blog/authors/author';

export interface BlogPost {
  title: string;
  slug: string;
  listingImage?: any;
  heroImage?: any;
  date: Date;
  time?: string;
  authors?: Array<Author>;
  description: string;
}

export function BlogCard({
  post,
  featured,
}: {
  post: BlogPost;
  featured?: boolean;
}) {
  return (
    <div className="group h-full w-full">
      <article className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-zinc-900/50 backdrop-blur-lg transition-all duration-300 hover:bg-zinc-900/70">
        <Link
          to={`/blog/${post.slug}`}
          className="flex h-full flex-col no-underline"
        >
          {post.listingImage && (
            <div className="relative aspect-[16/9] overflow-hidden">
              <img
                src={post.listingImage}
                alt={post.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </div>
          )}

          <div className="flex flex-col flex-grow p-5">
            <h2
              className={`mb-3 font-semibold tracking-tight text-gray-300 transition-colors duration-300 group-hover:text-white ${
                featured ? 'text-2xl lg:text-3xl' : 'text-xl'
              }`}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: post.title }}
            />

            {/* Authors */}
            {post.authors && post.authors.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-3">
                {post.authors.map((author) => (
                  <div
                    key={author.displayName}
                    className="flex items-center gap-2"
                  >
                    <img
                      src={author.avatar}
                      alt={author.displayName}
                      className="h-6 w-6 rounded-full ring-2 ring-zinc-800"
                      loading="lazy"
                    />
                    <span className="text-sm font-medium text-zinc-200">
                      {author.displayName}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Date */}
            <time
              dateTime={post.date.toISOString()}
              className="mb-3 text-sm text-zinc-400"
            >
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>

            {/* Description */}
            <p className="mb-6 text-base text-zinc-300 line-clamp-3">
              {post.description}
            </p>

            {/* Read More */}
            <div className="mt-auto">
              <span className="inline-flex items-center text-sm font-medium text-blue-400 transition-colors duration-300 group-hover:text-blue-300">
                Read more
                <svg
                  className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
          </div>
        </Link>
      </article>
    </div>
  );
}

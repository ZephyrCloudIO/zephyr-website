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

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <div className="blog-card">
      <article
        key={post.slug}
        className="flex value-card-background flex-col backdrop-blur-lg sm:min-w-[calc((100vw-30vw)/2)] sm:max-w-[calc((100vw-30vw)/2)] sm:h-[calc((136vh-4vh)/3)] p-5 items-left align-top justify-between gap-2 content-center rounded-2xl -[0.4px] -zinc-400/80"
      >
        {' '}
        <Link to={`/blog/${post.slug}`} className="no-underline block h-auto">
          {' '}
          <img
            src={post.listingImage}
            alt={post.title}
            className="rounded-2xl mb-2"
          />
          <div className="relative z-10 h-full">
            {/* eslint-disable react/no-danger */}
            <h2
              className="text-xl font-semibold mb-2 text-white tracking-tight group-hover:text-blue-400 transition-colors duration-300"
              dangerouslySetInnerHTML={{ __html: post.title }}
            ></h2>
            {/* eslint-enable react/no-danger */}
            <div className="text-gray-400 text-sm mb-3">
              <p className="mb-1">
                {post.authors
                  ? post.authors.map(author => (
                      <div
                        key={author.displayName}
                        className="flex items-center gap-2"
                      >
                        <img
                          src={author.avatar}
                          alt={author.displayName}
                          className="w-4 h-4 rounded-full"
                        />
                        <p className="text-gray-200 text-sm">
                          {author.displayName}
                        </p>
                      </div>
                    ))
                  : null}
              </p>

              <p>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
            <p className="text-gray-300 line-clamp-3">{post.description}</p>
          </div>
          <div className="absolute sm:bottom-4 z-10 inline-flex mt-4">
            <span className="text-blue-400 font-medium group-hover:text-blue-300 transition-colors duration-300">
              Read more →
            </span>
          </div>
        </Link>
      </article>
    </div>
  );
}

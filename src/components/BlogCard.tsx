import { tagLabels } from '@/lib/blog/tags';
import type { BlogPost } from '@/lib/blog/types';
import { Link } from '@tanstack/react-router';
import { Calendar } from 'lucide-react';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  if (!post) return null;

  return (
    <Link to={`/blog/${post.slug}`} className="group block">
      <article className="h-full bg-neutral-900/50 backdrop-blur-lg rounded-2xl overflow-hidden transition-all duration-300 hover:bg-neutral-800/50 hover:shadow-xl">
        <div className="aspect-video overflow-hidden">
          <img
            src={post.listingImage}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-6">
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags?.map((tag) => (
              <span key={tag} className="text-xs px-2 py-1 rounded-full bg-emerald-900/30 text-emerald-400">
                {tagLabels[tag] || tag}
              </span>
            ))}
          </div>
          <h3
            className={`font-semibold mb-2 transition-colors group-hover:text-emerald-400 text-balance ${
              featured ? 'text-2xl' : 'text-xl'
            }`}
          >
            {post.title}
          </h3>
          <div className="flex items-center gap-4 text-sm text-neutral-400 mb-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <time dateTime={post.date.toISOString()}>
                {post.date.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
            {post.readingTime && <span>{post.readingTime} min read</span>}
          </div>
          <p className="text-neutral-300 line-clamp-3 mb-4 text-pretty">{post.description}</p>
          <div className="flex items-center justify-between">
            <div className="flex -space-x-2">
              {post.authors?.map((author, index) => (
                <img
                  key={index}
                  src={author.avatar}
                  alt={author.displayName}
                  className="w-8 h-8 rounded-full ring-2 ring-neutral-900"
                />
              ))}
            </div>
            <span className="text-emerald-400 text-sm font-medium group-hover:translate-x-1 transition-transform">
              Read more →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

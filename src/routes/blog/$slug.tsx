import { Button } from '@/components/ui/button';
import { XIcon } from '@/components/ui/x-icon';
import type { MDXBlogPost } from '@/lib/blog/loader';
import { getBlogPostBySlug } from '@/lib/blog/loader';
import { tagLabels } from '@/lib/blog/tags';
import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowLeft, Calendar, Clock, Github, Linkedin } from 'lucide-react';

export const Route = createFileRoute('/blog/$slug')({
  component: BlogPostPage,
  loader: async ({ params }) => {
    const post = await getBlogPostBySlug(params.slug);
    if (!post) {
      throw new Response('Not Found', { status: 404 });
    }
    const mdxModule = (await import(`@/content/blog/${params.slug}.mdx`)) as MDXBlogPost;
    const MDXContent = mdxModule.default;
    return { post, MDXContent };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: 'Blog Post Not Found - Zephyr Cloud' },
          { name: 'description', content: 'The blog post you are looking for does not exist.' },
        ],
      };
    }

    const { post } = loaderData;

    return {
      meta: [
        // Page title and description
        { title: `${post.title} - Zephyr Cloud` },
        { name: 'description', content: post.description },

        // Open Graph - Basic
        { property: 'og:type', content: 'article' },
        { property: 'og:title', content: post.title },
        { property: 'og:description', content: post.description },
        { property: 'og:site_name', content: 'Zephyr Cloud' },

        // Open Graph - Image
        { property: 'og:image', content: post.heroImage },
        { property: 'og:image:alt', content: post.title },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },

        // Article metadata
        { property: 'article:published_time', content: post.date.toISOString() },
        ...post.authors.map((author) => ({
          property: 'article:author',
          content: author.displayName,
        })),
        ...post.tags.map((tag) => ({
          property: 'article:tag',
          content: tag,
        })),

        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: post.title },
        { name: 'twitter:description', content: post.description },
        { name: 'twitter:image', content: post.heroImage },
        { name: 'twitter:site', content: '@ZephyrCloud' },
      ],
    };
  },
});

function BlogPostPage() {
  const { post, MDXContent } = Route.useLoaderData();

  if (!post || !MDXContent) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-neutral-400 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link to="/blog">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="bg-black text-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-emerald-900/20 to-black">
        <div className="relative container mx-auto pt-10 px-4 flex flex-col justify-end max-w-4xl">
          <Link to="/blog" className="inline-flex items-center text-emerald-400 hover:text-emerald-300 mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>

          <img src={post.heroImage} alt={post.title} className="w-full max-w-3xl mx-auto mb-6 rounded-lg" />

          <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>

          <div className="flex flex-wrap items-center gap-6 text-neutral-300">
            <div className="flex items-center gap-3">
              {post.authors.map((author, index) => (
                <div key={index} className="flex items-center gap-2">
                  <img src={author.avatar} alt={author.displayName} className="w-10 h-10 rounded-full" />
                  <span>{author.displayName}</span>
                </div>
              ))}
            </div>

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

            {post.readingTime && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readingTime} min read</span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mb-4 pt-8">
            {post.tags.map((tag) => (
              <span key={tag} className="text-sm px-3 py-1 rounded-full bg-emerald-900/30 text-emerald-400">
                {tagLabels[tag]}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mdx-content">
          <MDXContent />
        </div>

        {post.authors.length > 0 ? (
          <div className="mt-12 pt-8 border-t border-neutral-800">
            <h3 className="text-xl font-semibold mb-6">About the Authors</h3>
            <div className="space-y-6">
              {post.authors.map((author, index) => (
                <div key={index} className="flex items-start gap-4">
                  <img src={author.avatar} alt={author.displayName} className="w-16 h-16 rounded-full" />
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">{author.displayName}</h4>
                    {author.zephyrMember && <p className="text-sm text-emerald-400 mb-2">Zephyr Team</p>}
                    {author.socialLinks && author.socialLinks.length > 0 && (
                      <div className="flex gap-3">
                        {author.socialLinks.map((social, i) => (
                          <a
                            key={i}
                            href={social.link}
                            target="_blank"
                            rel="noopener"
                            className="text-neutral-400 hover:text-white"
                          >
                            {social.platform === 'X' && <XIcon size={20} />}
                            {social.platform === 'LinkedIn' && <Linkedin className="w-5 h-5" />}
                            {social.platform === 'Github' && <Github className="w-5 h-5" />}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          ''
        )}

        {/* Share */}
        <div className="mt-12 flex items-center justify-between">
          <Link to="/blog">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>

          <div className="flex items-center gap-4">
            <span className="text-neutral-400">Share:</span>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
              target="_blank"
              rel="noopener"
              className="text-neutral-400 hover:text-white"
            >
              <XIcon size={20} />
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
              target="_blank"
              rel="noopener"
              className="text-neutral-400 hover:text-white"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

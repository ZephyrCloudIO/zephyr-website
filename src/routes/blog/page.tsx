import type { FC } from 'react';
import JesusBeam from '@/components/sections/pricing/beam.svg';
import { blogPosts } from '@/lib/blog/config';
import { BlogCard } from '@/components/ui/blog-card';

const BlogPage: FC = () => {
  const featuredPosts = blogPosts.slice(0, 2);
  const remainingPosts = blogPosts.slice(2);

  return (
    <div className="min-h-screen">
      <div className="fixed inset-x-0 top-0 h-[600px] overflow-hidden mt-16 -z-10">
        {['-translate-x-[240px]', '', 'translate-x-[240px]'].map(
          (transform) => (
            <div
              key={transform || 'center'}
              className={`absolute w-[800px] opacity-90 ${transform}`}
            >
              <img
                src={JesusBeam}
                className="w-full"
                style={{
                  filter: 'blur(50px) brightness(5)',
                  WebkitFilter: 'blur(50px) brightness(5)',
                }}
                alt=""
                loading="lazy"
              />
            </div>
          ),
        )}
      </div>

      <main className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6 p-4 md:mb-16 bg-gradient-to-r from-white to-[#808080] bg-clip-text text-transparent tracking-wider">
          Blogs
        </h1>

        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {featuredPosts.map((post) => (
            <li key={post.slug} className="flex">
              <BlogCard post={post} featured />
            </li>
          ))}
        </ul>

        <section aria-labelledby="latest-posts">
          <h2 id="latest-posts" className="mb-8 text-xl">
            Latest Posts
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {remainingPosts.map((post) => (
              <li key={post.slug} className="flex">
                <BlogCard post={post} />
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default BlogPage;

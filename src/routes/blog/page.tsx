import { FC } from 'react';
import { Link } from '@modern-js/runtime/router';

interface BlogPost {
  title: string;
  slug: string;
  date: string;
  description: string;
}

const blogPosts: BlogPost[] = [
  {
    title: 'Infrastructureless Future',
    slug: './infrastructureless',
    date: '2024-07-18',
    description: 'Serverless computing has been hailed as a groundbreaking shift in web infrastructure. Yet, the term is somewhat misleading.'
  }
];

const BlogPage: FC = () => {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl sm:text-4xl md:text-5xl p-4 font-bold text-center m-6 md:mb-12 bg-gradient-to-r from-white to-[#808080] bg-clip-text text-transparent tracking-wider">
        Blogs
        </h1>
      <div className="flex flex-row justify-center items-center">
        {blogPosts.map(post => (
          <article
            key={post.slug}
            className="flex value-card-background backdrop-blur-lg md:w-[calc((100vw-19vw)/3)] p-5 flex-col items-center justify-between gap-3 rounded-2xl -[0.4px] -zinc-400/80"
          >
            <Link
              to={`/blog/${post.slug}`}
              className="no-underline block h-full"
            >
              <div className="relative z-10">
                <h2 className="text-xl font-semibold mb-2 text-white group-hover:text-blue-400 transition-colors duration-300">
                  {post.title}
                </h2>
                <div className="text-gray-400 text-sm mb-3">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <p className="text-gray-300 line-clamp-3">
                  {post.description}
                </p>
              </div>
              <div className="relative z-10 mt-4">
                <span className="text-blue-400 font-medium group-hover:text-blue-300 transition-colors duration-300">
                  Read more →
                </span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;

import { FC } from 'react';
import 'highlight.js/styles/github-dark.min.css';

interface MDXFrontmatter {
  title?: string;
  date?: string;
  author?: string;
  description?: string;
}

interface MDXLayoutProps {
  children: React.ReactNode;
  frontmatter?: MDXFrontmatter;
}

export const MDXLayout: FC<MDXLayoutProps> = ({ children, frontmatter }) => {
  return (
    <article className="max-w-4xl md:mx-auto px-4 py-8">
      {frontmatter && (
        <header className="mb-8">
          {frontmatter.title && (
            <h1 className="text-4xl font-bold mb-4 text-gray-200">
              {frontmatter.title}
            </h1>
          )}
          <div className="flex items-center text-gray-400 text-sm space-x-4">
            {frontmatter.date && (
              <time dateTime={frontmatter.date}>
                {new Date(frontmatter.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            )}
            {frontmatter.author && (
              <span className="text-gray-400">By {frontmatter.author}</span>
            )}
          </div>
          {frontmatter.description && (
            <p className="text-gray-300 mt-4">{frontmatter.description}</p>
          )}
        </header>
      )}
      <div
        className="prose prose-invert max-w-none
        [&_pre]:bg-zinc-900/50
        [&_pre]:p-4
        [&_pre]:rounded-lg
        [&_:not(pre)>code]:bg-zinc-900/50
        [&_:not(pre)>code]:px-1.5
        [&_:not(pre)>code]:py-0.5
        [&_:not(pre)>code]:rounded-md"
      >
        {children}
      </div>
    </article>
  );
};

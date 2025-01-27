import { FC } from 'react';

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
    <article className="max-w-4xl mx-auto px-4 py-8">
      {frontmatter && (
        <header className="mb-8">
          {frontmatter.title && (
            <h1 className="text-4xl font-bold mb-4 text-gray-900">
              {frontmatter.title}
            </h1>
          )}
          <div className="flex items-center text-gray-600 text-sm space-x-4">
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
              <span className="text-gray-600">By {frontmatter.author}</span>
            )}
          </div>
          {frontmatter.description && (
            <p className="text-gray-700 mt-4">{frontmatter.description}</p>
          )}
        </header>
      )}
      <div
        className="prose prose-base md:prose-lg
        prose-headings:text-gray-200
        prose-p:text-gray-300
        prose-a:text-gray-200 hover:prose-a:text-gray-100
        prose-strong:text-gray-200
        prose-code:text-gray-200
        prose-code:bg-gray-800
        prose-code:rounded-lg
        prose-code:px-1
        prose-ul:text-gray-300 prose-ul:list-disc prose-ul:ml-6
        prose-ol:text-gray-300 prose-ol:list-decimal prose-ol:ml-6
        prose-pre:text-gray-900
        prose-pre:bg-gray-800
        prose-pre:px-1
        prose-li:marker:text-gray-400
        [&>ul>li]:mb-2 [&>ol>li]:mb-2
        [&>ul]:mt-4 [&>ul]:mb-4
        [&>ol]:mt-4 [&>ol]:mb-4
        [&>h1>code]:text-gray-200"
      >
        {children}
      </div>
    </article>
  );
};

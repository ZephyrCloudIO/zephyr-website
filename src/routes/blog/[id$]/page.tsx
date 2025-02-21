import { useParams } from '@modern-js/runtime/router';
import {
  type FC,
  type PropsWithChildren,
  Suspense,
  lazy,
  useLayoutEffect,
  useMemo,
} from 'react';
import { Helmet } from '@modern-js/runtime/head';
import 'highlight.js/styles/github-dark.css';
import { MDXLayout } from '@/components/mdx-wrapper';
import hljs from 'highlight.js/lib/core';
import bash from 'highlight.js/lib/languages/bash';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import { blogPosts } from '@/lib/blog/config';
import { siteConfig } from '@/lib/site.config';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('bash', bash);

type MDXComponent = {
  default: () => JSX.Element;
};

const Highlighter: FC<PropsWithChildren> = ({ children }) => {
  useLayoutEffect(() => {
    hljs.highlightAll();
  }, []);

  return <>{children}</>;
};

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();

  const blogMetadata = blogPosts.find((post) => post.slug.includes(id!));

  const BlogMDX = useMemo(() => {
    if (!id) {
      return null;
    }

    return lazy(() => import(`./${id}.mdx`) as Promise<MDXComponent>);
  }, [id]);

  const date = new Date();

  return (
    <div>
      <Helmet>
        <title>{blogMetadata?.title}</title>
        <meta name="description" content={blogMetadata?.description} />
        <meta property="og:title" content={blogMetadata?.title} />
        <meta property="og:description" content={blogMetadata?.description} />
        <meta property="og:image" content={blogMetadata?.heroImage} />
        <meta
          property="og:url"
          content={`${siteConfig.url}/blog/${blogMetadata?.slug}`}
        />
        <meta property="og:type" content="article" />
        {/* End Facebook tags */}
        {/* Twitter tags */}
        <meta
          name="twitter:creator"
          content={blogMetadata?.authors[0].displayName}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={blogMetadata?.heroImage} />
        <meta name="twitter:title" content={blogMetadata?.title} />
        <meta name="twitter:description" content={blogMetadata?.description} />
        <meta
          name="twitter:site"
          content={`${siteConfig.url}/blog/${blogMetadata?.slug}`}
        />
        {/* End Twitter tags */}
      </Helmet>
      <article className="flex flex-col gap-2 px-2 py-10 md:px-10">
        <MDXLayout>
          <Suspense fallback={<div>Loading...</div>}>
            {BlogMDX && (
              <Highlighter>
                <BlogMDX />
              </Highlighter>
            )}
          </Suspense>
        </MDXLayout>
        <p className="text-gray-400 text-center text-sm px-4">
          {date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </article>
    </div>
  );
}

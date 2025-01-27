import { useParams } from '@modern-js/runtime/router';
import { Suspense, useMemo, lazy, useLayoutEffect, PropsWithChildren, FC } from 'react';
import 'highlight.js/styles/github-dark.css';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import bash from 'highlight.js/lib/languages/bash';

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

  const BlogMDX = useMemo(() => {
    if (!id) {
      return null;
    }

    return lazy(() => import(`./${id}.mdx`) as Promise<MDXComponent>);
  }, [id]);

  const date = new Date();

  return (
    <div className="flex flex-col gap-2 px-2 py-10 md:px-10">
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
    </div>
  );
}

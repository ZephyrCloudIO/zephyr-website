import { useParams } from '@modern-js/runtime/router';
import { Suspense, useMemo, lazy } from 'react';
import { MDXLayout } from '@/components/mdx-wrapper';

type MDXComponent = {
  default: () => JSX.Element;
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
          {BlogMDX && <BlogMDX />}
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

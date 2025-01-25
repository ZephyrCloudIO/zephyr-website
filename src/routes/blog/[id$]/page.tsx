import { MDXLayout } from "@/components/mdx-wrapper";
import { useParams } from '@modern-js/runtime/router';
import { Suspense, useMemo, lazy } from "react";

type MDXComponent = {
  default: () => JSX.Element;
};

export default function BlogPost() {
    const { id } = useParams<{ id: string }>();

    const BlogMDX = useMemo(() => {
        if (!id) return null;

        return lazy(() =>
            import(`./${id}.mdx`) as Promise<MDXComponent>
        );
    }, [id]);

    return (
        <MDXLayout>
            <Suspense fallback={<div>Loading...</div>}>
                {BlogMDX && <BlogMDX />}
            </Suspense>
        </MDXLayout>
    );
}

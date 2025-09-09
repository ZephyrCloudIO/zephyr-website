declare module '*.mdx' {
  import type { MDXProps } from 'mdx/types';

  export const metadata: {
    title?: string;
    date?: string;
    description?: string;
    authors?: string[];
    tags?: string[];
  };

  export default function MDXContent(props: MDXProps): JSX.Element;
}

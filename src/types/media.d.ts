declare module '*.mp4' {
  const src: string;
  export default src;
}

declare module '*.avif' {
  const src: string;
  export default src;
}

declare module '*.webm' {
  const src: string;
  export default src;
}

declare module "*.md" {
  let MDXComponent: () => JSX.Element;
  export default MDXComponent;
}

declare module "*.mdx" {
  let MDXComponent: () => JSX.Element;
  export default MDXComponent;
}

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

declare module '*.md' {
  const MDXComponent: () => JSX.Element;
  export default MDXComponent;
}

declare module '*.mdx' {
  const MDXComponent: () => JSX.Element;
  export default MDXComponent;
}

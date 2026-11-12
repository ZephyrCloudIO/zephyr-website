/// <reference types="@rsbuild/core/types" />

declare module '*.css?raw' {
  const css: string;
  export default css;
}

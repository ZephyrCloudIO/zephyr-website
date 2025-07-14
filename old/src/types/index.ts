export interface Options {
  /**
   * Defines if the animation should play only once or repeatedly in an endless loop
   * or the number of loops that should be completed before the animation ends
   */
  loop?: boolean | number | undefined;
  /**
   * Defines if the animation should immediately play when the component enters the DOM
   */
  autoplay?: boolean | undefined;
  /**
   * The JSON data exported from Adobe After Effects using the Bodymovin plugin
   */
  animationData: Record<string, unknown>;
  rendererSettings?:
    | {
        preserveAspectRatio?: string | undefined;
        /**
         * The canvas context
         */
        context?: CanvasRenderingContext2D;
        scaleMode?: string;
        clearCanvas?: boolean | undefined;
        /**
         * Loads DOM elements when needed. Might speed up initialization for large number of elements. Only with SVG renderer.
         */
        progressiveLoad?: boolean | undefined;
        /**
         * Hides elements when opacity reaches 0. Only with SVG renderer.
         * @default true
         */
        hideOnTransparent?: boolean | undefined;
        className?: string | undefined;
      }
    | undefined;
}

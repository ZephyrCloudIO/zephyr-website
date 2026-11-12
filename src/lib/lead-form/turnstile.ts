type WidgetHost = { isConnected?: boolean };

export type TurnstileOptions = Record<string, unknown>;

export type TurnstileApi = {
  render(element: WidgetHost, options: TurnstileOptions): string;
  remove(widgetId: string): void;
  reset(widgetId: string): void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

type ObserverConstructor = new (
  callback: (entries: { isIntersecting: boolean }[]) => void,
  options?: { rootMargin?: string },
) => { observe(element: object): void; disconnect(): void };

type PendingScript = {
  src?: string;
  async?: boolean;
  onload?: ((event: any) => unknown) | null;
  onerror?: ((event: any) => unknown) | null;
};

type TurnstileDependencies = {
  document: { createElement(tag: 'script'): PendingScript; head: { append(script: any): void } };
  getApi(): Pick<TurnstileApi, 'render'> | undefined;
};

const scripts = new WeakMap<object, Promise<unknown>>();

/**
 * Resolve when the element is within one viewport of the screen, or when the signal aborts.
 *
 * The lead form sits at the end of each page and verification was the largest download on it,
 * so the widget waits for visitors who actually reach the form. Tokens also expire after five
 * minutes, so one issued at page load is usually stale by the time a reader gets there.
 */
export function whenNearViewport(
  element: object,
  signal?: AbortSignal,
  Observer: ObserverConstructor | undefined = globalThis.IntersectionObserver,
): Promise<void> {
  if (!Observer || signal?.aborted) return Promise.resolve();
  return new Promise((resolve) => {
    const done = () => {
      observer.disconnect();
      signal?.removeEventListener('abort', done);
      resolve();
    };
    const observer = new Observer(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) done();
      },
      { rootMargin: '100% 0px' },
    );
    signal?.addEventListener('abort', done, { once: true });
    observer.observe(element);
  });
}

/** Load one script per document and render the form's verification widget. Resolves with its ID. */
export function loadTurnstile(
  element: WidgetHost,
  options: TurnstileOptions,
  dependencies: TurnstileDependencies = {
    document: globalThis.document,
    getApi: () => globalThis.window.turnstile,
  },
): Promise<string> {
  const render = () => {
    const api = dependencies.getApi();
    if (!api) throw new Error('Verification could not load. Refresh the page and try again.');
    if (element.isConnected === false) throw new Error('The form is no longer open.');
    return api.render(element, options);
  };
  if (dependencies.getApi()?.render) return Promise.resolve().then(render);
  let loaded = scripts.get(dependencies.document);
  if (!loaded) {
    loaded = new Promise((resolve, reject) => {
      const script = dependencies.document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async = true;
      script.onload = resolve;
      script.onerror = () => {
        scripts.delete(dependencies.document);
        reject(new Error('Verification could not load. Refresh the page and try again.'));
      };
      dependencies.document.head.append(script);
    });
    scripts.set(dependencies.document, loaded);
  }
  return loaded.then(render);
}

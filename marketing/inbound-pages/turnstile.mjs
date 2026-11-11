const scripts = new WeakMap();

/** Load one script per document and render each campaign's verification widget. */
export function loadTurnstile(
  element,
  options,
  dependencies = {
    document: globalThis.document,
    getApi: () => globalThis.window.turnstile,
  },
) {
  const render = () => {
    if (element.isConnected === false) throw new Error('The form is no longer open.');
    return dependencies.getApi().render(element, options);
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

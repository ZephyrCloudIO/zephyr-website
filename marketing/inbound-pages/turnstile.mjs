/** An asynchronously loaded Turnstile script can render directly in its load callback. */
export function loadTurnstile(
  element,
  options,
  dependencies = {
    document: globalThis.document,
    getApi: () => globalThis.window.turnstile,
  },
) {
  return new Promise((resolve, reject) => {
    const script = dependencies.document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
    script.async = true;
    script.onload = () => {
      try {
        resolve(dependencies.getApi().render(element, options));
      } catch (error) {
        reject(error);
      }
    };
    script.onerror = () => reject(new Error('Verification could not load. Refresh the page and try again.'));
    dependencies.document.head.append(script);
  });
}

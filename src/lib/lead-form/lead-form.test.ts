import { describe, expect, it } from '@rstest/core';
import { landingAttribution, sendSubmission } from './submission';
import { loadTurnstile, whenNearViewport } from './turnstile';

type ScriptDouble = {
  async?: boolean;
  onload?: ((event: any) => unknown) | null;
  onerror?: ((event: any) => unknown) | null;
};

function scriptHost(inserted: ScriptDouble[]) {
  return {
    createElement: (): ScriptDouble => ({}),
    head: { append: (script: ScriptDouble) => void inserted.push(script) },
  };
}

describe('landing attribution', () => {
  it('records the landing URL, the referrer and the incoming campaign', () => {
    expect(
      landingAttribution(
        'https://pages.example/always-deployed/?utm_campaign=launch&utm_source=email&ref=abc#demo',
        'https://mail.example/inbox',
      ),
    ).toEqual({
      landingUrl: 'https://pages.example/always-deployed/?utm_campaign=launch&utm_source=email&ref=abc#demo',
      referrer: 'https://mail.example/inbox',
      utm: { source: 'email', campaign: 'launch' },
    });
  });
  it('attributes direct visits without inventing a campaign', () => {
    expect(landingAttribution('https://pages.example/ship-the-part/', '')).toEqual({
      landingUrl: 'https://pages.example/ship-the-part/',
      utm: {},
    });
  });
});

describe('asynchronous Turnstile script', () => {
  it('renders on script load without calling ready, which rejects asynchronous scripts', async () => {
    const element = {};
    const options = { sitekey: 'public-site-key' };
    const inserted: ScriptDouble[] = [];
    const calls: unknown[][] = [];
    const api = {
      ready: () => {
        throw new Error('Async scripts cannot call ready');
      },
      render: (...args: unknown[]) => {
        calls.push(args);
        return 'widget-1';
      },
    };
    let apiReady = false;
    const result = loadTurnstile(element, options, {
      document: scriptHost(inserted),
      getApi: () => (apiReady ? api : undefined),
    });
    expect(inserted[0].async).toBe(true);
    expect(calls).toHaveLength(0);
    apiReady = true;
    inserted[0].onload?.({});
    expect(await result).toBe('widget-1');
    expect(calls).toEqual([[element, options]]);
  });
});

describe('deferred verification', () => {
  function observerDouble() {
    const state: {
      observed: object[];
      disconnected: number;
      options?: { rootMargin?: string };
      notify: (entries: { isIntersecting: boolean }[]) => void;
    } = { observed: [], disconnected: 0, notify: () => {} };
    class Observer {
      constructor(callback: (entries: { isIntersecting: boolean }[]) => void, options?: { rootMargin?: string }) {
        state.notify = callback;
        state.options = options;
      }
      observe(element: object) {
        state.observed.push(element);
      }
      disconnect() {
        state.disconnected += 1;
      }
    }
    return { state, Observer };
  }
  const settled = async (promise: Promise<void>) => {
    let done = false;
    promise.then(() => {
      done = true;
    });
    await Promise.resolve();
    await Promise.resolve();
    return done;
  };

  it('waits until the form is within one viewport before verification starts', async () => {
    const { state, Observer } = observerDouble();
    const form = {};
    const waiting = whenNearViewport(form, undefined, Observer);
    expect(state.observed).toEqual([form]);
    expect(state.options).toEqual({ rootMargin: '100% 0px' });
    state.notify([{ isIntersecting: false }]);
    expect(await settled(waiting)).toBe(false);
    state.notify([{ isIntersecting: true }]);
    expect(await settled(waiting)).toBe(true);
    expect(state.disconnected).toBe(1);
  });

  it('stops observing when the page closes first', async () => {
    const { state, Observer } = observerDouble();
    const lifetime = new AbortController();
    const waiting = whenNearViewport({}, lifetime.signal, Observer);
    expect(await settled(waiting)).toBe(false);
    lifetime.abort();
    expect(await settled(waiting)).toBe(true);
    expect(state.disconnected).toBe(1);
  });

  it('starts immediately in browsers without an intersection observer', async () => {
    expect(await settled(whenNearViewport({}, undefined, undefined))).toBe(true);
  });
});

describe('verification across page navigation', () => {
  it('shares a pending script and does not render a departed page', async () => {
    const inserted: ScriptDouble[] = [];
    const rendered: unknown[] = [];
    let api: { render(element: unknown): string } | undefined;
    const dependencies = { document: scriptHost(inserted), getApi: () => api };
    const departed = { isConnected: false };
    const current = { isConnected: true };
    const first = loadTurnstile(departed, {}, dependencies).catch((error: Error) => error.message);
    const second = loadTurnstile(current, {}, dependencies);
    expect(inserted).toHaveLength(1);
    api = {
      render: (element) => {
        rendered.push(element);
        return 'current-widget';
      },
    };
    inserted[0].onload?.({});
    expect(await first).toBe('The form is no longer open.');
    expect(await second).toBe('current-widget');
    expect(rendered).toEqual([current]);
    await loadTurnstile(current, {}, dependencies);
    expect(inserted).toHaveLength(1);
  });

  it('allows a fresh script after a failed script request', async () => {
    const inserted: ScriptDouble[] = [];
    const dependencies = { document: scriptHost(inserted), getApi: () => undefined };
    const first = loadTurnstile({}, {}, dependencies);
    inserted[0].onerror?.({});
    await expect(first).rejects.toThrow('Verification could not load');
    const second = loadTurnstile({}, {}, dependencies);
    expect(inserted).toHaveLength(2);
    inserted[1].onerror?.({});
    await expect(second).rejects.toThrow('Verification could not load');
  });
});

describe('CRM acceptance', () => {
  it('requires a stored submission identifier before recording success', async () => {
    await expect(
      sendSubmission(async () => Response.json({ ok: true }), 'https://crm.example/form', {}),
    ).rejects.toThrow('did not confirm');
  });
  it('retains the caller retry key and attribution when a request is resent', async () => {
    const bodies: unknown[] = [];
    const body = {
      requestId: 'same-request',
      fields: { email: 'test@example.com' },
      landingUrl: 'https://pages.example/always-deployed/',
    };
    const fetcher = async (_url: string, init: RequestInit) => {
      bodies.push(JSON.parse(String(init.body)));
      return Response.json({ ok: true, submissionId: 'stored-submission' });
    };
    expect(await sendSubmission(fetcher, 'https://crm.example/form', body)).toBe('stored-submission');
    await sendSubmission(fetcher, 'https://crm.example/form', body);
    expect(bodies).toEqual([body, body]);
  });
  it('surfaces verification refusals instead of reporting a conversion', async () => {
    await expect(
      sendSubmission(
        async () => Response.json({ error: 'Complete verification.' }, { status: 403 }),
        'https://crm.example/form',
        {},
      ),
    ).rejects.toThrow('Complete verification.');
  });
});

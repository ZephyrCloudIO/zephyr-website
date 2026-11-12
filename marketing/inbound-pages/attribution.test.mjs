import { describe, expect, it } from '@rstest/core';
import { PostHog } from 'posthog-js/lib/src/posthog-core.js';
import { campaignRoutes } from '../../campaigns';
import { pageAttribution, scrubAnalyticsEvent, sendSubmission } from './attribution.mjs';
import { loadTurnstile } from './turnstile.mjs';

describe('landing page attribution', () => {
  it('keeps page identity separate from the incoming campaign and excludes other query values from analytics', () => {
    const result = pageAttribution(
      'https://pages.example/01-always-deployed/?utm_campaign=launch&utm_source=email&email=private@example.com#demo',
      'https://mail.example/inbox?private=value',
      'always-deployed',
    );
    expect(result.submission.utm).toEqual({ source: 'email', campaign: 'launch' });
    expect(result.submission.landingUrl).toContain('/01-always-deployed/');
    expect(result.analytics.page_id).toBe('always-deployed');
    expect(JSON.stringify(result.analytics)).not.toContain('private');
    expect(result.analytics.$referrer).toBe('https://mail.example/inbox');
  });
  it('attributes direct visits without inventing a campaign', () => {
    expect(pageAttribution('https://pages.example/ship-the-part/', '', 'ship-the-part').submission).toEqual({
      landingUrl: 'https://pages.example/ship-the-part/',
      utm: {},
    });
  });
});

describe('complete PostHog event privacy', () => {
  it('preserves the project key required by the installed SDK ingestion guard', () => {
    const client = new PostHog();
    client.config.before_send = (event) =>
      scrubAnalyticsEvent(event, { page_id: 'demo', $current_url: 'https://pages.example/demo/' });
    const result = client._runBeforeSend({
      event: '$pageview',
      properties: {
        token: 'public-project-key',
        distinct_id: 'anonymous-visitor',
        $process_person_profile: false,
        $session_entry_url: 'https://pages.example/?private=value',
      },
    });
    expect(result).not.toBeNull();
    expect(result.properties.token).toBe('public-project-key');
    expect(result.properties.$process_person_profile).toBe(false);
    expect(JSON.stringify(result)).not.toContain('private');
  });
  it('removes SDK session and initial URLs and form answers before transmission', () => {
    const page = pageAttribution(
      'https://pages.example/demo/?utm_campaign=launch&email=private@example.com',
      'https://mail.example/?secret=private',
      'demo',
    ).analytics;
    const result = scrubAnalyticsEvent(
      {
        event: 'marketing_form_submitted',
        $set_once: { $initial_current_url: 'https://pages.example/?private=value' },
        $set: { email: 'private@example.com' },
        properties: {
          $session_entry_url: 'https://pages.example/?email=private@example.com',
          $session_entry_referrer: 'https://mail.example/?secret=private',
          $initial_current_url: 'https://pages.example/?email=private@example.com',
          $set_once: { $initial_referrer: 'https://mail.example/?secret=private' },
          $current_url: 'https://pages.example/?email=private@example.com',
          email: 'private@example.com',
          message: 'private form answer',
          $session_id: 'anonymous-session',
          submission_id: 'crm-accepted',
        },
      },
      page,
    );
    expect(JSON.stringify(result)).not.toContain('private');
    expect(result.properties.$current_url).toBe('https://pages.example/demo/?utm_campaign=launch');
    expect(result.properties.$session_id).toBe('anonymous-session');
    expect(result.properties.submission_id).toBe('crm-accepted');
  });
  it('drops SDK events outside the explicit page and form measurements', () => {
    expect(scrubAnalyticsEvent({ event: '$autocapture', properties: { email: 'private@example.com' } }, {})).toBeNull();
  });
});

describe('asynchronous Turnstile script', () => {
  it('renders on script load without calling ready, which rejects asynchronous scripts', async () => {
    const element = {};
    const options = { sitekey: 'public-site-key' };
    let script;
    const calls = [];
    let apiReady = false;
    const result = loadTurnstile(element, options, {
      document: {
        createElement: () => ({}),
        head: {
          append: (value) => {
            script = value;
          },
        },
      },
      getApi: () =>
        apiReady
          ? {
              ready: () => {
                throw new Error('Async scripts cannot call ready');
              },
              render: (...args) => {
                calls.push(args);
                return 'widget-1';
              },
            }
          : undefined,
    });
    expect(script.async).toBe(true);
    expect(calls).toHaveLength(0);
    apiReady = true;
    script.onload();
    expect(await result).toBe('widget-1');
    expect(calls).toEqual([[element, options]]);
  });
});

describe('campaign navigation verification', () => {
  it('shares a pending script and does not render a departed page', async () => {
    const inserted = [];
    const rendered = [];
    let api;
    const dependencies = {
      document: { createElement: () => ({}), head: { append: (script) => inserted.push(script) } },
      getApi: () => api,
    };
    const departed = { isConnected: false };
    const current = { isConnected: true };
    const first = loadTurnstile(departed, {}, dependencies).catch((error) => error.message);
    const second = loadTurnstile(current, {}, dependencies);
    expect(inserted).toHaveLength(1);
    api = {
      render: (element) => {
        rendered.push(element);
        return 'current-widget';
      },
    };
    inserted[0].onload();
    expect(await first).toBe('The form is no longer open.');
    expect(await second).toBe('current-widget');
    expect(rendered).toEqual([current]);
    await loadTurnstile(current, {}, dependencies);
    expect(inserted).toHaveLength(1);
  });

  it('allows a fresh script after a failed script request', async () => {
    const inserted = [];
    const dependencies = {
      document: { createElement: () => ({}), head: { append: (script) => inserted.push(script) } },
      getApi: () => undefined,
    };
    const first = loadTurnstile({}, {}, dependencies);
    inserted[0].onerror();
    await expect(first).rejects.toThrow('Verification could not load');
    const second = loadTurnstile({}, {}, dependencies);
    expect(inserted).toHaveLength(2);
    inserted[1].onerror();
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
    const bodies = [];
    const body = {
      requestId: 'same-request',
      fields: { email: 'test@example.com' },
      landingUrl: 'https://pages.example/always-deployed/',
    };
    const fetcher = async (_url, init) => {
      bodies.push(JSON.parse(init.body));
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

describe('campaign remote release', () => {
  it('exports eleven independent pages and retains their direct review URLs', async () => {
    const { readFile, readdir } = await import('node:fs/promises');
    const { fileURLToPath } = await import('node:url');
    const { createRsbuild, loadConfig } = await import('@rsbuild/core');
    const root = new URL('./', import.meta.url);
    const previousDeploy = process.env.ZE_DEPLOY;
    process.env.ZE_DEPLOY = 'false';
    try {
      const cwd = fileURLToPath(root);
      const { content } = await loadConfig({ cwd, command: 'build' });
      const rsbuild = await createRsbuild({ cwd, rsbuildConfig: content });
      const result = await rsbuild.build();
      try {
        const compilers = result.stats.stats;
        // Zephyr emits a separate manifest per compiler. Their roots must differ.
        const outputPaths = compilers.map((stats) => stats.compilation.outputOptions.path);
        expect(compilers).toHaveLength(2);
        expect(new Set(outputPaths).size).toBe(compilers.length);
      } finally {
        await result.close();
      }
    } finally {
      if (previousDeploy === undefined) delete process.env.ZE_DEPLOY;
      else process.env.ZE_DEPLOY = previousDeploy;
    }
    const manifest = JSON.parse(await readFile(new URL('./dist/mf-manifest.json', root), 'utf8'));
    expect(manifest.exposes.map((expose) => expose.path).sort()).toEqual(
      campaignRoutes.map(({ id }) => `./${id}`).sort(),
    );
    expect(manifest.metaData.ssrRemoteEntry).toEqual({
      path: 'server/',
      name: 'remoteEntry.js',
      type: 'commonjs-module',
    });
    expect((await readFile(new URL('./dist/server/remoteEntry.js', root))).length).toBeGreaterThan(0);
    const files = await readdir(new URL('./dist/', root), { recursive: true });
    expect(files.filter((file) => file.endsWith('.html')).sort()).toEqual(
      campaignRoutes.map((page, index) => `${String(index + 1).padStart(2, '0')}-${page.slug}/index.html`).sort(),
    );
    const pageChunks = manifest.exposes.map((expose) =>
      expose.assets.js.sync.find((asset) => asset.includes('__federation_expose_')),
    );
    expect(new Set(pageChunks).size).toBe(11);
    for (const [index, page] of campaignRoutes.entries()) {
      const html = await readFile(
        new URL(`./dist/${String(index + 1).padStart(2, '0')}-${page.slug}/index.html`, root),
        'utf8',
      );
      expect(html).toContain(`data-page-id="${page.id}"`);
      expect(html).toContain(`https://zephyr-cloud.io/${page.slug}`);
      expect(html).not.toContain('<%');
      expect(html).not.toContain('noindex');
      const scripts = [...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map((match) => match[1]);
      expect(scripts.length).toBeGreaterThan(0);
      const expose = manifest.exposes.find((item) => item.path === `./${page.id}`);
      // Loading one page must not fetch another page's implementation.
      for (const chunk of pageChunks.filter((chunk) => !expose.assets.js.sync.includes(chunk))) {
        expect([...expose.assets.js.sync, ...expose.assets.js.async]).not.toContain(chunk);
      }
      for (const asset of [...scripts, ...expose.assets.js.sync, ...expose.assets.js.async]) {
        const pathname = new URL(asset, 'https://assets.example/').pathname;
        expect((await readFile(new URL(`./dist${pathname}`, root))).length).toBeGreaterThan(0);
      }
    }
  }, 30_000);
});

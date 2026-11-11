import { describe, expect, it } from '@rstest/core';
import { PostHog } from 'posthog-js/lib/src/posthog-core.js';
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
    const result = loadTurnstile(element, options, {
      document: {
        createElement: () => ({}),
        head: {
          append: (value) => {
            script = value;
          },
        },
      },
      getApi: () => ({
        ready: () => {
          throw new Error('Async scripts cannot call ready');
        },
        render: (...args) => {
          calls.push(args);
          return 'widget-1';
        },
      }),
    });
    expect(script.async).toBe(true);
    expect(calls).toHaveLength(0);
    script.onload();
    expect(await result).toBe('widget-1');
    expect(calls).toEqual([[element, options]]);
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

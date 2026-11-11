import { describe, expect, it } from '@rstest/core';
import { pageAttribution, sendSubmission } from './attribution.mjs';

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

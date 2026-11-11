import posthog from 'posthog-js';
import { pageAttribution, scrubAnalyticsEvent, sendSubmission } from './attribution.mjs';
import { loadTurnstile } from './turnstile.mjs';

const form = document.querySelector('[data-lead-form]');
const pageId = document.body.dataset.pageId;
const attribution = pageAttribution(location.href, document.referrer, pageId);
const analytics = posthog;
if (analytics) {
  try {
    analytics.init('phc_2BnQabLbt7YVrKbGN02UBKA9kBFH17SXme0Cf5G2iob', {
      api_host: 'https://m.zephyr-cloud.io',
      ui_host: 'https://us.posthog.com',
      autocapture: false,
      capture_pageview: false,
      capture_pageleave: false,
      capture_dead_clicks: false,
      capture_performance: false,
      capture_exceptions: false,
      capture_heatmaps: false,
      disable_session_recording: true,
      disable_surveys: true,
      advanced_disable_flags: true,
      person_profiles: 'identified_only',
      persistence: 'sessionStorage',
      respect_dnt: true,
      before_send: (event) => scrubAnalyticsEvent(event, attribution.analytics),
      loaded: (client) => client.capture('$pageview', attribution.analytics),
    });
  } catch {
    /* Lead capture remains available when analytics cannot initialize. */
  }
}
function track(event, properties = {}) {
  try {
    analytics?.capture(event, { ...attribution.analytics, ...properties });
  } catch {
    /* Lead capture does not depend on analytics. */
  }
}

if (form) {
  const endpoint = 'https://api.with-tap.ai/crm/public/forms/default/zephyr-book-a-demo';
  const status = document.querySelector('[data-form-status]');
  const fields = document.querySelector('[data-form-fields]');
  const button = form.querySelector('button[type="submit"]');
  const widget = form.querySelector('[data-turnstile]');
  const requestId = crypto.randomUUID();
  let definition;
  let sending = false;
  let sent = false;
  let token = '';
  let widgetId;
  const message = (text, error = false) => {
    status.textContent = text;
    status.setAttribute('role', error ? 'alert' : 'status');
  };
  const ready = () => {
    button.disabled = !definition || sending || sent || (definition.turnstile && !token);
  };
  form.addEventListener('focusin', () => track('marketing_form_started', { form_slug: 'zephyr-book-a-demo' }), {
    once: true,
  });

  async function load() {
    const response = await fetch(endpoint, { credentials: 'omit', signal: AbortSignal.timeout(15_000) });
    if (!response.ok) throw new Error('The form is unavailable. Refresh the page and try again.');
    definition = await response.json();
    if (!Array.isArray(definition.fields) || !Number.isInteger(definition.version))
      throw new Error('The form is unavailable.');
    for (const field of definition.fields) {
      const label = document.createElement('label');
      const caption = document.createElement('span');
      caption.textContent = field.label + (field.required ? ' *' : '');
      const input = document.createElement(
        field.type === 'textarea' ? 'textarea' : field.type === 'select' ? 'select' : 'input',
      );
      input.name = field.key;
      input.required = Boolean(field.required);
      input.id = `lead-${field.key}`;
      if (input instanceof HTMLInputElement)
        input.type = field.type === 'email' ? 'email' : field.type === 'checkbox' ? 'checkbox' : 'text';
      if (input instanceof HTMLSelectElement) {
        input.add(new Option('Choose one', ''));
        for (const option of field.options ?? []) input.add(new Option(option, option));
      }
      if (input instanceof HTMLTextAreaElement) {
        input.rows = 4;
        label.className = 'wide';
      }
      const autocomplete = {
        email: 'email',
        firstName: 'given-name',
        lastName: 'family-name',
        company: 'organization',
        title: 'organization-title',
      }[field.key];
      if (autocomplete) input.autocomplete = autocomplete;
      label.append(caption, input);
      fields.append(label);
    }
    if (definition.turnstile) {
      message('Complete verification before sending.');
      widgetId = await loadTurnstile(widget, {
        sitekey: '0x4AAAAAAFizSajOXwBAbiFy',
        action: 'turnstile-spin-v1',
        theme: 'dark',
        callback: (value) => {
          token = value;
          message('');
          ready();
        },
        'expired-callback': () => {
          token = '';
          message('Complete verification again.');
          ready();
        },
        'error-callback': () => {
          token = '';
          message('Verification is unavailable. Refresh the page and try again.', true);
          ready();
        },
      });
    } else message('');
    ready();
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (sending || sent || !definition || (definition.turnstile && !token)) return;
    if (!form.reportValidity()) return;
    sending = true;
    ready();
    message('Sending…');
    const data = new FormData(form);
    const answers = Object.fromEntries(
      definition.fields.map((field) => [
        field.key,
        field.type === 'checkbox' ? data.has(field.key) : String(data.get(field.key) ?? ''),
      ]),
    );
    const usedToken = token;
    token = '';
    try {
      const submissionId = await sendSubmission(fetch, endpoint, {
        fields: answers,
        requestId,
        expectedVersion: definition.version,
        ...attribution.submission,
        hp: String(data.get('website') ?? ''),
        ...(definition.turnstile ? { turnstileToken: usedToken } : {}),
      });
      sent = true;
      track('marketing_form_submitted', {
        form_slug: 'zephyr-book-a-demo',
        form_version: definition.version,
        submission_id: submissionId,
      });
      form.querySelectorAll('input,select,textarea').forEach((input) => {
        input.disabled = true;
      });
      widget.hidden = true;
      button.textContent = 'Sent';
      message('Thank you. We received your request and will contact you.');
    } catch (error) {
      message(
        error instanceof Error
          ? error.message
          : 'We could not confirm your submission. Complete verification and try again.',
        true,
      );
      if (definition.turnstile && widgetId !== undefined) {
        try {
          window.turnstile.reset(widgetId);
        } catch {
          message('Refresh the page to restore verification before you try again.', true);
        }
      }
    } finally {
      sending = false;
      ready();
    }
  });
  load().catch(() => message('The form could not load. Refresh this page and try again.', true));
}

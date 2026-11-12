import posthog from 'posthog-js';
import { landingAttribution, sendSubmission } from './submission';
import { loadTurnstile, whenNearViewport } from './turnstile';

const FORM_SLUG = 'zephyr-book-a-demo';
const ENDPOINT = `https://api.with-tap.ai/crm/public/forms/default/${FORM_SLUG}`;
const TURNSTILE_SITE_KEY = '0x4AAAAAAFizSajOXwBAbiFy';
const AUTOCOMPLETE: Record<string, string> = {
  email: 'email',
  firstName: 'given-name',
  lastName: 'family-name',
  company: 'organization',
  title: 'organization-title',
};

type FormField = { key: string; label: string; type: string; required?: boolean; options?: string[] };
type FormDefinition = { version: number; turnstile?: boolean; fields: FormField[] };

/** Form events go to the site's PostHog instance, which the theme starts on every page. */
function track(event: string, properties: Record<string, unknown>) {
  try {
    if (posthog.__loaded) posthog.capture(event, { form_slug: FORM_SLUG, ...properties });
  } catch {
    /* Lead capture does not depend on analytics. */
  }
}

/** Fill the server-rendered form from its CRM definition and submit it. Returns the teardown. */
export function mountLeadForm(form: HTMLFormElement, pageId: string): () => void {
  const status = form.querySelector<HTMLElement>('[data-form-status]');
  const fields = form.querySelector<HTMLElement>('[data-form-fields]');
  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const widget = form.querySelector<HTMLElement>('[data-turnstile]');
  if (!status || !fields || !button || !widget) throw new Error('The lead form markup is incomplete.');

  const lifetime = new AbortController();
  const attribution = landingAttribution(location.href, document.referrer);
  const requestId = crypto.randomUUID();
  let definition: FormDefinition | undefined;
  let sending = false;
  let sent = false;
  let token = '';
  let widgetId: string | undefined;

  const cleanup = () => {
    if (widgetId !== undefined) window.turnstile?.remove(widgetId);
    widgetId = undefined;
  };
  lifetime.signal.addEventListener('abort', cleanup, { once: true });
  const message = (text: string, error = false) => {
    status.textContent = text;
    status.setAttribute('role', error ? 'alert' : 'status');
  };
  const ready = () => {
    button.disabled = !definition || sending || sent || Boolean(definition.turnstile && !token);
  };
  form.addEventListener('focusin', () => track('marketing_form_started', { page_id: pageId }), {
    once: true,
    signal: lifetime.signal,
  });

  const load = async () => {
    const response = await fetch(ENDPOINT, {
      credentials: 'omit',
      signal: AbortSignal.any([lifetime.signal, AbortSignal.timeout(15_000)]),
    });
    if (!response.ok) throw new Error('The form is unavailable. Refresh the page and try again.');
    const loaded: FormDefinition = await response.json();
    if (!Array.isArray(loaded.fields) || !Number.isInteger(loaded.version)) throw new Error('The form is unavailable.');
    definition = loaded;
    // A remount reuses the same server-rendered container, so start from an empty one.
    fields.replaceChildren();
    for (const field of loaded.fields) {
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
      const autocomplete = AUTOCOMPLETE[field.key];
      if (autocomplete) input.setAttribute('autocomplete', autocomplete);
      label.append(caption, input);
      fields.append(label);
    }
    if (!loaded.turnstile) {
      message('');
      ready();
      return;
    }
    message('Complete verification before sending.');
    ready();
    await whenNearViewport(form, lifetime.signal);
    if (lifetime.signal.aborted) return;
    let rendered: string;
    try {
      rendered = await loadTurnstile(widget, {
        sitekey: TURNSTILE_SITE_KEY,
        action: 'turnstile-spin-v1',
        theme: 'dark',
        callback: (value: string) => {
          token = value;
          message('');
          ready();
        },
        // The widget requests a replacement token by itself; the visitor has nothing to redo.
        'expired-callback': () => {
          token = '';
          message('Verification expired. Checking again…');
          ready();
        },
        'error-callback': () => {
          token = '';
          message('Verification is unavailable. Refresh the page and try again.', true);
          ready();
        },
      });
    } catch (error) {
      if (!lifetime.signal.aborted)
        message(
          error instanceof Error ? error.message : 'Verification could not load. Refresh the page and try again.',
          true,
        );
      return;
    }
    widgetId = rendered;
    // The page can close while the script loads. Remove a widget that outlived its form.
    if (lifetime.signal.aborted) cleanup();
  };

  form.addEventListener(
    'submit',
    async (event) => {
      event.preventDefault();
      if (sending || sent || !definition || (definition.turnstile && !token)) return;
      if (!form.reportValidity()) return;
      const current = definition;
      sending = true;
      ready();
      message('Sending…');
      const data = new FormData(form);
      const answers = Object.fromEntries(
        current.fields.map((field) => [
          field.key,
          field.type === 'checkbox' ? data.has(field.key) : String(data.get(field.key) ?? ''),
        ]),
      );
      const usedToken = token;
      token = '';
      try {
        const submissionId = await sendSubmission(fetch, ENDPOINT, {
          fields: answers,
          requestId,
          expectedVersion: current.version,
          ...attribution,
          hp: String(data.get('website') ?? ''),
          ...(current.turnstile ? { turnstileToken: usedToken } : {}),
        });
        sent = true;
        track('marketing_form_submitted', {
          page_id: pageId,
          form_version: current.version,
          submission_id: submissionId,
        });
        form
          .querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('input,select,textarea')
          .forEach((input) => {
            input.disabled = true;
          });
        // A hidden widget would keep requesting a new token every five minutes.
        cleanup();
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
        if (current.turnstile && widgetId !== undefined) {
          try {
            const api = window.turnstile;
            if (!api) throw new Error('Verification is gone.');
            api.reset(widgetId);
          } catch {
            message('Refresh the page to restore verification before you try again.', true);
          }
        }
      } finally {
        sending = false;
        ready();
      }
    },
    { signal: lifetime.signal },
  );
  load().catch(() => {
    if (!lifetime.signal.aborted) message('The form could not load. Refresh this page and try again.', true);
  });

  return () => lifetime.abort();
}

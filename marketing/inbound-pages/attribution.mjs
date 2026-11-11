const UTM_KEYS = ['source', 'medium', 'campaign', 'term', 'content'];

const ANALYTICS_EVENTS = new Set(['$pageview', 'marketing_form_started', 'marketing_form_submitted']);
const ANALYTICS_CONTEXT = new Set([
  'distinct_id',
  '$device_id',
  '$session_id',
  '$window_id',
  '$lib',
  '$lib_version',
  '$insert_id',
  '$time',
  'form_slug',
  'form_version',
  'submission_id',
]);

/** Filter the complete SDK event after it adds session and initial URL properties. */
export function scrubAnalyticsEvent(event, page) {
  if (!ANALYTICS_EVENTS.has(event.event)) return null;
  return {
    ...event,
    properties: {
      ...Object.fromEntries(Object.entries(event.properties ?? {}).filter(([key]) => ANALYTICS_CONTEXT.has(key))),
      ...page,
    },
  };
}

export function pageAttribution(href, referrer, pageId) {
  const url = new URL(href);
  const utm = Object.fromEntries(
    UTM_KEYS.flatMap((key) => {
      const value = url.searchParams.get(`utm_${key}`)?.trim().slice(0, 200);
      return value ? [[key, value]] : [];
    }),
  );
  const analyticsUrl = new URL(url.origin + url.pathname);
  for (const [key, value] of Object.entries(utm)) analyticsUrl.searchParams.set(`utm_${key}`, value);
  let source;
  try {
    const parsed = new URL(referrer);
    if (['https:', 'http:'].includes(parsed.protocol)) source = parsed;
  } catch {}
  return {
    submission: {
      landingUrl: url.href.slice(0, 2000),
      ...(source ? { referrer: source.href.slice(0, 2000) } : {}),
      utm,
    },
    analytics: {
      page_id: pageId,
      page_path: url.pathname,
      $current_url: analyticsUrl.href,
      $referrer: source ? source.origin + source.pathname : '',
      ...Object.fromEntries(Object.entries(utm).map(([key, value]) => [`utm_${key}`, value])),
    },
  };
}

export async function sendSubmission(fetcher, endpoint, body) {
  const response = await fetcher(`${endpoint}/submissions`, {
    method: 'POST',
    credentials: 'omit',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(20_000),
  });
  let result;
  try {
    result = await response.json();
  } catch {
    throw new Error('The CRM response was unavailable. Complete verification and try again.');
  }
  if (!response.ok || result.ok !== true || typeof result.submissionId !== 'string' || !result.submissionId) {
    throw new Error(
      typeof result.error === 'string'
        ? result.error
        : 'The CRM did not confirm your submission. Complete verification and try again.',
    );
  }
  return result.submissionId;
}

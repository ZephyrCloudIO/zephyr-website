const UTM_KEYS = ['source', 'medium', 'campaign', 'term', 'content'] as const;

export type LandingAttribution = {
  landingUrl: string;
  referrer?: string;
  utm: Partial<Record<(typeof UTM_KEYS)[number], string>>;
};

/** What the CRM stores with a lead: where the visitor landed, where they came from, and the campaign. */
export function landingAttribution(href: string, referrer: string): LandingAttribution {
  const url = new URL(href);
  const utm: LandingAttribution['utm'] = {};
  for (const key of UTM_KEYS) {
    const value = url.searchParams.get(`utm_${key}`)?.trim().slice(0, 200);
    if (value) utm[key] = value;
  }
  let source: URL | undefined;
  try {
    const parsed = new URL(referrer);
    if (['https:', 'http:'].includes(parsed.protocol)) source = parsed;
  } catch {
    /* A direct visit has no referrer. */
  }
  return {
    landingUrl: url.href.slice(0, 2000),
    ...(source ? { referrer: source.href.slice(0, 2000) } : {}),
    utm,
  };
}

/** Resolve with the CRM's submission ID. Anything short of a stored submission is an error. */
export async function sendSubmission(
  fetcher: (url: string, init: RequestInit) => Promise<Response>,
  endpoint: string,
  body: unknown,
): Promise<string> {
  const response = await fetcher(`${endpoint}/submissions`, {
    method: 'POST',
    credentials: 'omit',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(20_000),
  });
  let result: { ok?: unknown; submissionId?: unknown; error?: unknown };
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

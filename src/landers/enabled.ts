const ALWAYS_ON_MARKERS = new Set(['*', 'all']);

function parseEnabledLanders(rawValue: string | undefined) {
  if (!rawValue) {
    return new Set<string>();
  }

  return new Set(
    rawValue
      .split(',')
      .map((value) => value.trim().toLowerCase())
      .filter(Boolean),
  );
}

const enabledLanders = parseEnabledLanders(import.meta.env.ZE_PUBLIC_ENABLED_LANDERS);

export function isLanderEnabled(slug: string) {
  const normalizedSlug = slug.trim().toLowerCase();

  return enabledLanders.has(normalizedSlug) || [...ALWAYS_ON_MARKERS].some((marker) => enabledLanders.has(marker));
}

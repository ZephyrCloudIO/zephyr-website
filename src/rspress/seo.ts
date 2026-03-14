const SITE_URL = 'https://zephyr-cloud.io';
const DEFAULT_OG_IMAGE = '/images/og/default-1200x630.png';

export function toAbsoluteUrl(value: string) {
  if (!value) {
    return SITE_URL;
  }

  if (value.startsWith('http://') || value.startsWith('https://')) {
    return value;
  }

  if (value.startsWith('/')) {
    return `${SITE_URL}${value}`;
  }

  return `${SITE_URL}/${value}`;
}

export function canonicalFor(pathname: string) {
  if (!pathname || pathname === '/') {
    return SITE_URL;
  }

  return `${SITE_URL}${pathname.startsWith('/') ? pathname : `/${pathname}`}`;
}

export function normalizeOgImage(value?: string) {
  if (!value) {
    return toAbsoluteUrl(DEFAULT_OG_IMAGE);
  }

  return toAbsoluteUrl(value);
}

export { SITE_URL };

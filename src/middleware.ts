import { defineMiddleware } from 'astro:middleware';
import headersFile from '../docs/public/_headers?raw';

const publicHeaders = headersFile.split('\n').flatMap((line) => {
  const match = line.match(/^\s+([^:]+):\s*(.+)$/);
  return match ? [[match[1], match[2]] as const] : [];
});

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next();
  if (response.status === 101 || context.url.pathname.startsWith('/_emdash/')) return response;
  const headers = new Headers(response.headers);
  for (const [name, value] of publicHeaders) headers.set(name, value);
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
});

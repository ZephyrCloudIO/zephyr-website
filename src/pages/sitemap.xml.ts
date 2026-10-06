import pages from '@/generated/site-pages.json';
import { listArticles } from '@/lib/cms';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const [blog, changelog] = await Promise.all([listArticles('blog'), listArticles('changelog')]);
  const paths = [
    ...Object.keys(pages),
    ...blog.map((entry) => `blog/${encodeURIComponent(entry.id)}`),
    ...changelog.map((entry) => `changelog/${encodeURIComponent(entry.id)}`),
  ];
  const urls = paths.map((page) => `<url><loc>https://zephyr-cloud.io/${page}</loc></url>`).join('');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
};

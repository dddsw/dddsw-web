import { loadProgramme } from '#lib/sessionize.ts';
import { sitemapUrls, sitemapXml } from '#lib/seo.ts';
import type { RequestHandler } from './$types';

/** The indexable pages, for search engines. Built per request so it follows the milestones. */
export const GET: RequestHandler = async ({ fetch }) =>
	new Response(sitemapXml(sitemapUrls(await loadProgramme(fetch))), {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'public, max-age=3600'
		}
	});

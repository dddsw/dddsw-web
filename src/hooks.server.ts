import type { Handle } from '@sveltejs/kit/hooks';
import { event as eventDetails } from '#lib/eventDetails.ts';
import { withPageCaching } from '#lib/server/httpCache.ts';

const publicHost = new URL(eventDetails.siteUrl).hostname;
const localHosts = new Set(['localhost', '127.0.0.1', '[::1]']);

/**
 * Only the public address is indexed: Cloudflare's `*.pages.dev` hosts (production and every
 * preview deployment) serve the same pages, so they tell search engines to stay away, for HTML
 * and non-HTML responses alike. `localhost` is left alone so local runs match production.
 */
function isStagingHost(hostname: string): boolean {
	return hostname !== publicHost && !localHosts.has(hostname);
}

function isPagePath(pathname: string): boolean {
	return !pathname.startsWith('/_app/') && !/\.[^/]+$/.test(pathname);
}

export const handle: Handle = async ({ event, resolve }) => {
	const { pathname, hostname } = event.url;

	// One public spelling per page: an uppercase page URL moves permanently to its lowercase form.
	// Files (anything with an extension, and the build's `/_app/` assets) keep their own case.
	if (pathname !== pathname.toLowerCase() && isPagePath(pathname)) {
		// Collapse leading slashes so `//EXAMPLE.COM` can't become a redirect to another host.
		const location = `/${pathname.toLowerCase().replace(/^\/+/, '')}${event.url.search}`;
		return new Response(null, { status: 301, headers: { Location: location } });
	}

	const response = await resolve(event);
	if (isStagingHost(hostname)) response.headers.set('X-Robots-Tag', 'noindex, nofollow');
	return withPageCaching(event.request, response);
};

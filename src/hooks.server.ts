import type { Handle } from '@sveltejs/kit/hooks';
import { event as eventDetails } from '#lib/eventDetails.ts';

const publicHost = new URL(eventDetails.siteUrl).host;

/**
 * Only the public address is indexed: Cloudflare's `*.pages.dev` hosts (production and every
 * preview deployment) serve the same pages, so they tell search engines to stay away, for HTML
 * and non-HTML responses alike. `localhost` is left alone so local runs match production.
 */
function isStagingHost(host: string): boolean {
	return host !== publicHost && !host.startsWith('localhost') && !host.startsWith('127.0.0.1');
}

function isPagePath(pathname: string): boolean {
	return !pathname.startsWith('/_app/') && !/\.[^/]+$/.test(pathname);
}

export const handle: Handle = async ({ event, resolve }) => {
	const { pathname, host } = event.url;

	// One public spelling per page: an uppercase page URL moves permanently to its lowercase form.
	// Files (anything with an extension, and the build's `/_app/` assets) keep their own case.
	if (pathname !== pathname.toLowerCase() && isPagePath(pathname)) {
		// Collapse leading slashes so `//EXAMPLE.COM` can't become a redirect to another host.
		const location = `/${pathname.toLowerCase().replace(/^\/+/, '')}${event.url.search}`;
		return new Response(null, { status: 301, headers: { Location: location } });
	}

	const response = await resolve(event);
	if (isStagingHost(host)) response.headers.set('X-Robots-Tag', 'noindex, nofollow');
	return response;
};

import type { PageLoad } from './$types';

/**
 * Heading shown in the banner by the (content) layout. The page is unlisted (see `unlistedRoutes`
 * in seo.ts), so it is `noindex`; `nofollow` also keeps crawlers off its sample links.
 */
export const load: PageLoad = () => ({
	nofollow: true,
	title: 'Style guide',
	lead: 'Every building block of the site in one place: for checking light and dark mode, and for reference when building pages.'
});

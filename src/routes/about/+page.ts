import type { PageLoad } from './$types';

/** Heading shown in the banner by the (content) layout. */
export const load: PageLoad = () => ({
	title: 'About us',
	lead: 'A small team of volunteers who love this community.'
});

import type { PageLoad } from './$types';

/** Heading shown in the banner by the (content) layout. */
export const load: PageLoad = () => ({
	title: 'Code of conduct',
	lead: 'Everyone should feel welcome, safe and respected.'
});

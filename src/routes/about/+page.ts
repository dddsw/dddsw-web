import type { PageLoad } from './$types';

/** Heading shown in the banner by the root layout. */
export const load: PageLoad = () => ({
	title: 'About',
	lead: 'Who we are, and how to get involved.'
});

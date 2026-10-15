import type { PageLoad } from './$types';

/** Heading shown in the banner by the (content) layout. */
export const load: PageLoad = () => ({
	title: 'Call for papers',
	lead: 'Share what you know with the South West developer community.'
});

import type { PageLoad } from './$types';

/** Heading shown in the banner by the root layout. */
export const load: PageLoad = () => ({
	title: 'Venue',
	lead: 'Where to find us, how to get there and what to expect when you arrive.'
});

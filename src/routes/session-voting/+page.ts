import type { PageLoad } from './$types';

/** Heading shown in the banner by the root layout. */
export const load: PageLoad = () => ({
	title: 'Session voting',
	lead: 'Help choose the talks for the day.'
});

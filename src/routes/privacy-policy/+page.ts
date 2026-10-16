import type { PageLoad } from './$types';

/** Heading shown in the banner by the (content) layout. */
export const load: PageLoad = () => ({
	title: 'Privacy policy',
	lead: 'What to expect us to do with your personal information.'
});

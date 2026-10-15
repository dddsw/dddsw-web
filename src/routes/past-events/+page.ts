import type { PageLoad } from './$types';

/** Heading shown in the banner by the (content) layout. */
export const load: PageLoad = () => ({
	title: 'Past events',
	lead: 'A look back at previous DDD South West conferences.'
});

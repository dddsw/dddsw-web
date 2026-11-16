import type { PageLoad } from './$types';

/** Heading shown in the banner by the (content) layout. */
export const load: PageLoad = () => ({
	title: 'Speaker directory',
	lead: 'Everyone who has spoken at a previous DDD South West, and the talks they gave.'
});

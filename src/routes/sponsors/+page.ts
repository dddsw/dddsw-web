import { event } from '$lib/eventDetails';
import type { PageLoad } from './$types';

/** Heading shown in the banner by the (content) layout. */
export const load: PageLoad = () => ({
	title: `Sponsor ${event.shortName}`,
	lead: "Our event is entirely funded by sponsorship and wouldn't be possible without our wonderful sponsors."
});

import { event } from './eventDetails.ts';

const where = event.venue.city ? ` in ${event.venue.city}` : '';

/**
 * The image shown when a link to the site is shared (Open Graph / Twitter card). It is rendered at
 * build time from this text (see `src/lib/server/socialCardImage.ts`), so it never goes stale.
 * 1200 × 675 suits every unfurler, including Google Discover.
 */
export const socialCard = {
	path: '/og-image.png',
	width: 1200,
	height: 675,
	headline: ['Developer!', 'Developer!', 'Developer!'],
	headlineLast: 'South West',
	description: `${event.tagline}${where}.`,
	host: new URL(event.siteUrl).host,
	get alt() {
		return `${event.name}: ${this.description.charAt(0).toLowerCase()}${this.description.slice(1)}`;
	}
};

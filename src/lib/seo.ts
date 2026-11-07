import { event, links, social } from './eventDetails.ts';
import { get, Milestone } from './milestones.ts';
import { socialCard } from './socialCard.ts';
import type { Programme } from './sessionize.ts';

/**
 * Pages that are always worth a search result, by path. Every page route must be listed here or in
 * `unlistedRoutes`, which `seo.test.ts` checks, so a new page can't be left out by accident.
 */
const alwaysListed = [
	'/',
	'/about',
	'/become-a-speaker',
	'/call-for-papers',
	'/code-of-conduct',
	'/past-events',
	'/privacy-policy',
	'/session-voting',
	'/sponsorship',
	'/tickets',
	'/venue'
];

/**
 * Listed only once there's something to show: until then they only say "to be announced". Each
 * page goes by the content it renders.
 */
const programmeRoutes: Record<string, (programme: Programme) => boolean> = {
	'/schedule': sessionsAreEmpty,
	'/sessions': sessionsAreEmpty,
	'/speakers': speakersAreEmpty
};

/**
 * Pages kept out of search results (`noindex`) and the sitemap. They are still public: the
 * internal policy is for our volunteers, and the room layout is for a previous venue.
 */
export const unlistedRoutes = ['/code-of-conduct/internal', '/venue-layout'];

/** Every route the sitemap knows about, for the drift check in `seo.test.ts`. */
export const knownRoutes = [...alwaysListed, ...Object.keys(programmeRoutes), ...unlistedRoutes];

/** Whether the schedule and sessions pages only say "to be announced", so aren't worth indexing. */
export function sessionsAreEmpty(programme: Programme): boolean {
	return programme.isPlaceholder || programme.sessions.length === 0;
}

/** Whether the speakers page only says "to be announced", so isn't worth indexing. */
export function speakersAreEmpty(programme: Programme): boolean {
	return programme.isPlaceholder || programme.speakers.length === 0;
}

/** The canonical URLs for the sitemap: indexable pages only. */
export function sitemapUrls(programme: Programme): string[] {
	const shown = Object.entries(programmeRoutes)
		.filter(([, isEmpty]) => !isEmpty(programme))
		.map(([path]) => path);
	const paths = [...alwaysListed, ...shown];
	return paths.map((path) => `${event.siteUrl}${path}`);
}

export function sitemapXml(urls: string[]): string {
	const entries = urls.map((url) => `\t<url><loc>${url}</loc></url>`).join('\n');
	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;
}

/**
 * schema.org data for the home page: who we are, the site, and the next event. It only states what
 * the page itself shows, and leaves out the venue until it's announced.
 */
export function homeStructuredData(): object {
	const organizationId = `${event.siteUrl}/#organization`;
	const date = get(Milestone.TheActualEventDay)?.isoDate;
	const { venue } = event;

	const graph: object[] = [
		{
			'@type': 'Organization',
			'@id': organizationId,
			name: event.name,
			alternateName: event.shortName,
			url: `${event.siteUrl}/`,
			logo: `${event.siteUrl}/icon-512.png`,
			email: event.contactEmail,
			sameAs: Object.values(social)
		},
		{
			'@type': 'WebSite',
			'@id': `${event.siteUrl}/#website`,
			name: event.name,
			alternateName: event.shortName,
			url: `${event.siteUrl}/`,
			inLanguage: 'en-GB',
			publisher: { '@id': organizationId }
		}
	];

	if (date && venue.name) {
		graph.push({
			'@type': 'Event',
			'@id': `${event.siteUrl}/#event-${event.year}`,
			name: `${event.name} ${event.year}`,
			description: `${event.tagline}.`,
			url: `${event.siteUrl}/`,
			image: `${event.siteUrl}${socialCard.path}`,
			startDate: date,
			endDate: date,
			eventStatus: 'https://schema.org/EventScheduled',
			eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
			isAccessibleForFree: true,
			location: {
				'@type': 'Place',
				name: [venue.name, venue.institution].filter(Boolean).join(', '),
				address: venue.address ?? venue.city
			},
			organizer: { '@id': organizationId },
			// Only once tickets are actually available, so we never advertise an offer that isn't there.
			...(links.tickets && {
				offers: {
					'@type': 'Offer',
					price: 0,
					priceCurrency: 'GBP',
					availability: 'https://schema.org/InStock',
					url: `${event.siteUrl}/tickets`
				}
			})
		});
	}

	return { '@context': 'https://schema.org', '@graph': graph };
}

/** JSON for a `<script type="application/ld+json">`, safe to inline in HTML. */
export function jsonLd(data: object): string {
	return JSON.stringify(data).replace(/</g, '\\u003c');
}

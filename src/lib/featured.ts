import {
	callForPapersStatus,
	getTimeline,
	ticketsStatus,
	votingStatus,
	type TimelineItem
} from './timeline';

export type FeaturedId = 'tickets' | 'voting' | 'cfp';

export interface Featured {
	id: FeaturedId;
	label: string;
	href: string;
}

/** The pages that can be featured in the header while their milestone is open. */
export const featured: Record<FeaturedId, Featured> = {
	tickets: { id: 'tickets', label: 'Tickets', href: '/tickets' },
	voting: { id: 'voting', label: 'Vote on sessions', href: '/session-voting' },
	cfp: { id: 'cfp', label: 'Submit a talk', href: '/call-for-papers' }
};

/**
 * The featured header button for the current milestone, or null when none is open.
 * If windows overlap, the later milestone wins: tickets, then voting, then the call for papers.
 */
export function currentFeatured(items: TimelineItem[] = getTimeline()): Featured | null {
	if (ticketsStatus(items) === 'open') return featured.tickets;
	if (votingStatus(items) === 'open') return featured.voting;
	if (callForPapersStatus(items) === 'open') return featured.cfp;
	return null;
}

/**
 * Testing aid. `?preview=tickets|voting|cfp` shows that featured button regardless of the timeline,
 * `?preview=none` shows no button, `?preview=schedule` (or `speakers`) shows the Schedule and Speakers links before they are announced,
 * and `?preview=off` goes back to the real timeline. Combine with commas, e.g. `?preview=voting,schedule`.
 */
export type Preview = FeaturedId | 'none';

export function parsePreview(raw: string | null | undefined): Preview | 'off' | null {
	if (!raw) return null;
	const value = raw.trim().toLowerCase();
	if (value === 'off') return 'off';
	if (value === 'none') return 'none';
	return value in featured ? (value as FeaturedId) : null;
}

/** The button to show: the preview if one is active, otherwise the real current milestone. */
export function resolveFeatured(
	preview: Preview | null,
	items: TimelineItem[] = getTimeline()
): Featured | null {
	if (preview === 'none') return null;
	if (preview) return featured[preview];
	return currentFeatured(items);
}

export interface PreviewState {
	featured: Preview | null;
	/** Show the Schedule and Speakers links even though they have not been announced. */
	schedule: boolean;
}

/** Parses the whole `?preview=` value: 'off' clears everything, null means nothing recognised. */
export function parsePreviewState(raw: string | null | undefined): PreviewState | 'off' | null {
	if (!raw) return null;
	const tokens = raw
		.split(',')
		.map((token) => token.trim().toLowerCase())
		.filter(Boolean);
	if (tokens.includes('off')) return 'off';
	let featuredPreview: Preview | null = null;
	for (const token of tokens) {
		const parsed = parsePreview(token);
		if (parsed && parsed !== 'off' && featuredPreview === null) featuredPreview = parsed;
	}
	const schedule = tokens.includes('schedule') || tokens.includes('speakers');
	return featuredPreview || schedule ? { featured: featuredPreview, schedule } : null;
}

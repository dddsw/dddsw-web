import {
	hasHappened as milestoneHasHappened,
	Milestone,
	windowStatus,
	type HasHappened
} from './milestones';

export type FeaturedId = 'tickets' | 'voting' | 'cfp';

export interface Featured {
	id: FeaturedId;
	label: string;
	href: string;
}

/** The pages that can be featured in the header while their milestone is open. */
export const featured = {
	tickets: { id: 'tickets', label: 'Tickets', href: '/tickets' },
	voting: { id: 'voting', label: 'Vote on sessions', href: '/session-voting' },
	cfp: { id: 'cfp', label: 'Submit a talk', href: '/call-for-papers' }
} satisfies Record<FeaturedId, Featured>;

/** Each featured button is shown from its `opens` milestone until its `closes` milestone. */
interface FeaturedWindow {
	featured: Featured;
	opens: Milestone;
	closes: Milestone;
}

/** In priority order: if windows overlap, the later milestone wins. */
const featuredWindows: readonly FeaturedWindow[] = [
	{
		featured: featured.tickets,
		opens: Milestone.AnnounceScheduleAndOpenTicketRegistration,
		closes: Milestone.TheActualEventDay
	},
	{
		featured: featured.voting,
		opens: Milestone.OpenSessionVoting,
		closes: Milestone.CloseSessionVoting
	},
	{
		featured: featured.cfp,
		opens: Milestone.OpenCallForSpeakers,
		closes: Milestone.CloseCallForSpeakers
	}
];

/**
 * The featured header button for the current milestone, or null when none is open.
 * If windows overlap, the later milestone wins: tickets, then voting, then the call for papers.
 */
export function currentFeatured(hasHappened: HasHappened = milestoneHasHappened): Featured | null {
	const open = featuredWindows.find(
		({ opens, closes }) => windowStatus(opens, closes, hasHappened) === 'open'
	);
	return open?.featured ?? null;
}

/**
 * Testing aid, set with `?preview=` (several values can be combined with commas, e.g.
 * `?preview=voting,schedule`):
 * - `tickets`, `voting` or `cfp` shows that featured button regardless of the timeline.
 * - `none` shows no featured button.
 * - `schedule` (or `speakers`) shows the Schedule and Speakers links before they are announced.
 * - `off` goes back to the real timeline.
 */
export type Preview = FeaturedId | 'none';

export interface PreviewState {
	featured: Preview | null;
	/** Show the Schedule and Speakers links even though they have not been announced. */
	schedule: boolean;
}

const isPreview = (token: string): token is Preview =>
	token === 'none' || Object.hasOwn(featured, token);

const scheduleTokens: ReadonlySet<string> = new Set(['schedule', 'speakers']);

/**
 * Parses a whole `?preview=` value. Returns 'off' if it contains `off` (which beats everything
 * else), null if nothing in it is recognised, and otherwise the state it describes. When several
 * featured buttons are given, the first one wins.
 */
export function parsePreviewState(raw: string | null | undefined): PreviewState | 'off' | null {
	if (!raw) return null;

	const tokens = raw
		.split(',')
		.map((token) => token.trim().toLowerCase())
		.filter(Boolean);
	if (tokens.includes('off')) return 'off';

	const featuredPreview = tokens.find(isPreview) ?? null;
	const schedule = tokens.some((token) => scheduleTokens.has(token));
	return featuredPreview || schedule ? { featured: featuredPreview, schedule } : null;
}

/** The button to show: the preview if one is active, otherwise the real current milestone. */
export function resolveFeatured(
	preview: Preview | null,
	hasHappened: HasHappened = milestoneHasHappened
): Featured | null {
	if (preview === null) return currentFeatured(hasHappened);
	return preview === 'none' ? null : featured[preview];
}

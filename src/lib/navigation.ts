import { get, Milestone } from './milestones';
import { pocketdddUrl } from './eventDetails';
import type { PreviewState } from './featured';
import {
	getTimeline,
	scheduleAnnounced,
	ticketsStatus,
	votingStatus,
	type TimelineItem
} from './timeline';

export interface NavItem {
	href: string;
	label: string;
}

const noPreview: PreviewState = { featured: null, schedule: false };

/**
 * Whether to show links to the schedule and speakers, which are announced together. It appears once the schedule is announced, and always
 * while tickets are open. A testing preview can reveal it early: `?preview=schedule`, and
 * `?preview=tickets` too, because tickets are never open without the schedule being out.
 */
export function scheduleShown(
	preview: PreviewState = noPreview,
	items: TimelineItem[] = getTimeline()
): boolean {
	return (
		scheduleAnnounced(items) ||
		ticketsStatus(items) === 'open' ||
		preview.schedule ||
		preview.featured === 'tickets'
	);
}

/** The main nav. Items appear as the milestones they depend on are reached. */
export function visibleNav(
	preview: PreviewState = noPreview,
	items: TimelineItem[] = getTimeline()
): NavItem[] {
	const sessionsShown = votingStatus(items) === 'open' || scheduleAnnounced(items);
	const eventIsOn =
		get(Milestone.TheActualEventDay)?.hasHappened && get(Milestone.ConkedOut)?.hasNotHappened;

	const nav: (NavItem | false | undefined)[] = [
		scheduleShown(preview, items) && { href: '/schedule', label: 'Schedule' },
		scheduleShown(preview, items) && { href: '/speakers', label: 'Speakers' },
		sessionsShown && { href: '/sessions', label: 'Sessions' },
		{ href: '/about', label: 'About' },
		{ href: '/sponsors', label: 'Sponsors' },
		eventIsOn && { href: pocketdddUrl, label: 'Pocket DDD' }
	];
	return nav.filter((item): item is NavItem => Boolean(item));
}

/** Links shown in the footer in addition to the main nav. */
export const moreLinks: NavItem[] = [
	{ href: '/code-of-conduct', label: 'Code of conduct' },
	{ href: '/privacy-policy', label: 'Privacy policy' },
	{ href: '/call-for-papers', label: 'Call for papers' },
	{ href: '/session-voting', label: 'Session voting' },
	{ href: '/tickets', label: 'Tickets' }
];

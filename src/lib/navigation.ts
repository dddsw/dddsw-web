import {
	hasHappened as milestoneHasHappened,
	Milestone,
	votingStatus,
	type HasHappened
} from './milestones';
import { pocketdddUrl } from './eventDetails';
import type { PreviewState } from './featured';

export interface NavItem {
	href: string;
	label: string;
}

const noPreview: PreviewState = { featured: null, schedule: false };

/**
 * Whether to show links to the schedule and speakers, which are announced together. It appears
 * once the schedule is announced, which is also when tickets open. A testing preview can reveal it
 * early: `?preview=schedule`, and `?preview=tickets` too, because tickets are never open without
 * the schedule being out.
 */
export function scheduleShown(
	preview: PreviewState = noPreview,
	hasHappened: HasHappened = milestoneHasHappened
): boolean {
	return (
		hasHappened(Milestone.AnnounceScheduleAndOpenTicketRegistration) ||
		preview.schedule ||
		preview.featured === 'tickets'
	);
}

/** The main nav. Items appear as the milestones they depend on are reached. */
export function visibleNav(
	preview: PreviewState = noPreview,
	hasHappened: HasHappened = milestoneHasHappened
): NavItem[] {
	const votingOpen = votingStatus(hasHappened) === 'open';
	const sessionsShown =
		votingOpen || hasHappened(Milestone.AnnounceScheduleAndOpenTicketRegistration);
	const scheduleVisible = scheduleShown(preview, hasHappened);
	const eventIsOn = hasHappened(Milestone.TheActualEventDay) && !hasHappened(Milestone.ConkedOut);

	const nav: (NavItem | false)[] = [
		scheduleVisible && { href: '/schedule', label: 'Schedule' },
		scheduleVisible && { href: '/speakers', label: 'Speakers' },
		sessionsShown && { href: '/sessions', label: 'Sessions' },
		{ href: '/venue', label: 'Venue' },
		{ href: '/past-events', label: 'Past events' },
		{ href: '/about', label: 'About' },
		{ href: '/sponsorship', label: 'Sponsorship' },
		eventIsOn && { href: pocketdddUrl, label: 'Pocket DDD' }
	];
	return nav.filter((item): item is NavItem => item !== false);
}

/** Links shown in the footer in addition to the main nav. */
export const moreLinks: NavItem[] = [
	{ href: '/code-of-conduct', label: 'Code of conduct' },
	{ href: '/privacy-policy', label: 'Privacy policy' },
	{ href: '/become-a-speaker', label: 'Become a speaker' },
	{ href: '/call-for-papers', label: 'Call for papers' },
	{ href: '/session-voting', label: 'Session voting' },
	{ href: '/tickets', label: 'Tickets' }
];

import { get, Milestone } from './milestones';
import { pocketdddUrl } from './eventDetails';

export interface NavItem {
	href: string;
	label: string;
}

/** The main nav. Items appear as the milestones they depend on are reached. */
export function visibleNav(): NavItem[] {
	const votingIsOpen =
		get(Milestone.OpenSessionVoting)?.hasHappened &&
		get(Milestone.CloseSessionVoting)?.hasNotHappened;
	const scheduleAnnounced = get(Milestone.AnnounceScheduleAndOpenTicketRegistration)?.hasHappened;
	const eventIsOn =
		get(Milestone.TheActualEventDay)?.hasHappened && get(Milestone.ConkedOut)?.hasNotHappened;

	const items: (NavItem | false | undefined)[] = [
		{ href: '/about', label: 'About' },
		{ href: '/sponsorship', label: 'Sponsorship' },
		(votingIsOpen || scheduleAnnounced) && { href: '/sessions', label: 'Sessions' },
		scheduleAnnounced && { href: '/schedule', label: 'Schedule' },
		eventIsOn && { href: pocketdddUrl, label: 'Pocket DDD' }
	];
	return items.filter((item): item is NavItem => Boolean(item));
}

/** Links shown in the footer in addition to the main nav. */
export const moreLinks: NavItem[] = [
	{ href: '/code-of-conduct', label: 'Code of conduct' },
	{ href: '/privacy-policy', label: 'Privacy policy' }
];

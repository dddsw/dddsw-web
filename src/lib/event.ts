import { event } from './eventDetails';
import { get, Milestone, type MilestoneDetails } from './milestones';

export function countdownLabel(days: number): string {
	if (days > 1) return `${days} days to go`;
	if (days === 1) return 'Tomorrow!';
	if (days === 0) return 'Today!';
	return 'See you next year';
}

export const TBC = 'To be confirmed';

/** The event date, or "To be confirmed" until one is announced. */
export function dateLabel(eventDay: MilestoneDetails = get(Milestone.TheActualEventDay)): string {
	return eventDay.formattedDate ?? TBC;
}

/** The venue (and city), or "To be confirmed" until announced. */
export function venueLabel(
	venue: { name: string | null; city: string | null } = event.venue
): string {
	const parts = [venue.name, venue.city].filter(Boolean);
	return parts.length ? parts.join(', ') : TBC;
}

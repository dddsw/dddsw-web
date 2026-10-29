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
	return eventDay.fullDate ?? TBC;
}

/**
 * The venue, with the institution it belongs to and the city, or "To be confirmed" until announced.
 * The city is left out when a part of the label already names it.
 */
export function venueLabel(
	venue: { name: string | null; city: string | null; institution?: string } = event.venue
): string {
	const parts = [venue.name, venue.institution].filter(Boolean) as string[];
	const cityNamed = venue.city
		? parts.some((part) => part.toLowerCase().includes(venue.city!.toLowerCase()))
		: false;
	if (venue.city && !cityNamed) parts.push(venue.city);
	return parts.length ? parts.join(', ') : TBC;
}

import { event } from './eventDetails';
import { get, Milestone, type IsoDate } from './milestones';

const MS_PER_DAY = 86_400_000;

/** Whole days from `now` until the ISO date (UTC midnight); negative once passed. */
export function daysUntil(isoDate: IsoDate, now: Date = new Date()): number {
	const target = Date.parse(`${isoDate}T00:00:00Z`);
	const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
	return Math.round((target - today) / MS_PER_DAY);
}

export function formatEventDate(isoDate: IsoDate): string {
	return new Intl.DateTimeFormat('en-GB', {
		weekday: 'long',
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		timeZone: 'UTC'
	}).format(new Date(`${isoDate}T00:00:00Z`));
}

export function countdownLabel(days: number): string {
	if (days > 1) return `${days} days to go`;
	if (days === 1) return 'Tomorrow!';
	if (days === 0) return 'Today!';
	return 'See you next year';
}

export const TBC = 'To be confirmed';

/** The date of the event (ISO), once it has been set as a milestone in milestones.ts. */
export function eventDate(): IsoDate | undefined {
	return get(Milestone.TheActualEventDay).isoDate;
}

/** The event date, or "To be confirmed" until one is announced. */
export function dateLabel(isoDate: IsoDate | undefined | null = eventDate()): string {
	return isoDate ? formatEventDate(isoDate) : TBC;
}

/** The venue (and city), or "To be confirmed" until announced. */
export function venueLabel(
	venue: { name: string | null; city: string | null } = event.venue
): string {
	const parts = [venue.name, venue.city].filter(Boolean);
	return parts.length ? parts.join(', ') : TBC;
}

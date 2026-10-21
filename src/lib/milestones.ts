export enum Status {
	Done,
	NotYet,
	JustYouWait
}

export enum Milestone {
	StartPlanning,
	SetADate,
	OpenCallForSpeakers,
	CloseCallForSpeakers,
	OpenSessionVoting,
	CloseSessionVoting,
	AnnounceScheduleAndOpenTicketRegistration,
	SoldOut,
	FoundMoreTickets,
	TheActualEventDay,
	ConkedOut
}

const dateFormatter = new Intl.DateTimeFormat('en-GB', { dateStyle: 'long' });

const weekdayFormatter = new Intl.DateTimeFormat('en-GB', { weekday: 'long', timeZone: 'UTC' });
const monthYearFormatter = new Intl.DateTimeFormat('en-GB', {
	month: 'long',
	year: 'numeric',
	timeZone: 'UTC'
});

function ordinal(day: number): string {
	if (day >= 11 && day <= 13) return `${day}th`;
	return `${day}${({ 1: 'st', 2: 'nd', 3: 'rd' } as Record<number, string>)[day % 10] ?? 'th'}`;
}

const MS_PER_DAY = 86_400_000;

export class MilestoneDetails {
	private status: Status;
	private targetDate?: Date;

	get hasHappened(): boolean {
		if (this.status === Status.JustYouWait)
			return this.targetDate!.getTime() < new Date().getTime();
		return this.status === Status.Done;
	}

	get hasNotHappened(): boolean {
		return !this.hasHappened;
	}

	get formattedDate(): string | undefined {
		if (!this.targetDate) return undefined;
		return dateFormatter.format(this.targetDate);
	}

	/** Weekday, ordinal day, month and year, e.g. "Saturday 24th April 2027". */
	get fullDate(): string | undefined {
		if (!this.targetDate) return undefined;
		const d = this.targetDate;
		return `${weekdayFormatter.format(d)} ${ordinal(d.getUTCDate())} ${monthYearFormatter.format(d)}`;
	}

	constructor(status: Status.Done | Status.NotYet);
	constructor(status: Status, date: string);
	constructor(status: Status, date?: string) {
		this.status = status;
		if (date) {
			this.targetDate = new Date(`${date}T00:00:00Z`);
		}
	}

	/** Whole days from `now` until the date (UTC midnight); negative once passed, undefined with no date. */
	daysUntil(now: Date = new Date()): number | undefined {
		if (!this.targetDate) return undefined;
		const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
		return Math.round((this.targetDate.getTime() - today) / MS_PER_DAY);
	}

	willBeHappeningSoon(): boolean {
		if (!this.targetDate || this.hasHappened) return false;

		const now = new Date();
		const oneMonthFromNowTimestamp = now.setMonth(now.getMonth() + 1);

		return this.targetDate.getTime() < oneMonthFromNowTimestamp;
	}
}

export function get(doneThing: Milestone): MilestoneDetails {
	return milestones[doneThing];
}

/** Whether a milestone has happened. Injectable so logic built on milestones can be tested without real dates. */
export type HasHappened = (milestone: Milestone) => boolean;

export const hasHappened: HasHappened = (milestone) => get(milestone).hasHappened;

/**
 * Whole days from `now` until the milestone's date (UTC midnight); negative once passed, and
 * undefined while the milestone has no date. `lookup` is injectable for tests.
 */
export function daysUntil(
	milestone: Milestone,
	now: Date = new Date(),
	lookup: (milestone: Milestone) => MilestoneDetails = get
): number | undefined {
	return lookup(milestone).daysUntil(now);
}

export type OpenStatus = 'not-open' | 'open' | 'closed';

/** A window is open from its "opens" milestone until its "closes" milestone. */
export function windowStatus(
	opens: Milestone,
	closes: Milestone,
	happened: HasHappened = hasHappened
): OpenStatus {
	if (happened(closes)) return 'closed';
	if (happened(opens)) return 'open';
	return 'not-open';
}

/** Whether people can submit talks right now. */
export const callForPapersStatus = (happened: HasHappened = hasHappened): OpenStatus =>
	windowStatus(Milestone.OpenCallForSpeakers, Milestone.CloseCallForSpeakers, happened);

/** Whether session voting is open. */
export const votingStatus = (happened: HasHappened = hasHappened): OpenStatus =>
	windowStatus(Milestone.OpenSessionVoting, Milestone.CloseSessionVoting, happened);

/** Every milestone must be listed here: the compiler rejects a missing one. */
const milestones: Record<Milestone, MilestoneDetails> = {
	[Milestone.StartPlanning]: new MilestoneDetails(Status.Done),
	[Milestone.SetADate]: new MilestoneDetails(Status.Done),
	[Milestone.OpenCallForSpeakers]: new MilestoneDetails(Status.NotYet),
	[Milestone.CloseCallForSpeakers]: new MilestoneDetails(Status.NotYet),
	[Milestone.OpenSessionVoting]: new MilestoneDetails(Status.NotYet),
	[Milestone.CloseSessionVoting]: new MilestoneDetails(Status.NotYet),
	[Milestone.AnnounceScheduleAndOpenTicketRegistration]: new MilestoneDetails(Status.NotYet),
	[Milestone.SoldOut]: new MilestoneDetails(Status.NotYet),
	[Milestone.FoundMoreTickets]: new MilestoneDetails(Status.NotYet),
	[Milestone.TheActualEventDay]: new MilestoneDetails(Status.JustYouWait, '2027-04-24'),
	[Milestone.ConkedOut]: new MilestoneDetails(Status.JustYouWait, '2027-04-25')
};

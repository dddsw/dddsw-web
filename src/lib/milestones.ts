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

	constructor(status: Status.Done | Status.NotYet);
	constructor(status: Status, date: string);
	constructor(status: Status, date?: string) {
		this.status = status;
		if (date) {
			this.targetDate = new Date(`${date}T00:00:00Z`);
		}
	}

	willBeHappeningSoon(): boolean {
		if (!this.targetDate || this.hasHappened) return false;

		const now = new Date();
		const oneMonthFromNowTimestamp = now.setMonth(now.getMonth() + 1);

		return this.targetDate.getTime() < oneMonthFromNowTimestamp;
	}
}

export function get(doneThing: Milestone): MilestoneDetails | undefined {
	return milestones.get(doneThing);
}

const milestones = new Map([
	[Milestone.StartPlanning, new MilestoneDetails(Status.Done)],
	[Milestone.SetADate, new MilestoneDetails(Status.Done)],
	[Milestone.OpenCallForSpeakers, new MilestoneDetails(Status.Done, '2026-01-31')],
	[Milestone.CloseCallForSpeakers, new MilestoneDetails(Status.Done, '2026-03-07')],
	[Milestone.OpenSessionVoting, new MilestoneDetails(Status.Done, '2026-03-14')],
	[Milestone.CloseSessionVoting, new MilestoneDetails(Status.JustYouWait, '2026-03-28')],
	[
		Milestone.AnnounceScheduleAndOpenTicketRegistration,
		new MilestoneDetails(Status.NotYet, '2026-04-18')
	],
	[Milestone.SoldOut, new MilestoneDetails(Status.NotYet)],
	[Milestone.FoundMoreTickets, new MilestoneDetails(Status.NotYet)],
	[Milestone.TheActualEventDay, new MilestoneDetails(Status.JustYouWait, '2026-05-16')],
	[Milestone.ConkedOut, new MilestoneDetails(Status.JustYouWait, '2026-05-17')]
]);

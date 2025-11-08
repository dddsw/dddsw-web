enum Status {
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

export class MilestoneDetails {
	hasHappened: boolean;
	formattedDate?: string;
	targetDate?: Date;

	constructor(status: Status.Done | Status.NotYet);
	constructor(status: Status, date: string);
	constructor(status: Status, date?: string) {
		if (date) {
			this.targetDate = new Date(date);

			const formatter = new Intl.DateTimeFormat(undefined, { dateStyle: 'long' });
			this.formattedDate = formatter.format(this.targetDate);
		}
		if (status === Status.JustYouWait) this.hasHappened = this.targetDate!.valueOf() < Date.now();
		else this.hasHappened = status === Status.Done;
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
	[Milestone.OpenCallForSpeakers, new MilestoneDetails(Status.NotYet, '2026-01-31')],
	[Milestone.CloseCallForSpeakers, new MilestoneDetails(Status.JustYouWait, '2026-03-07')],
	[Milestone.OpenSessionVoting, new MilestoneDetails(Status.NotYet, '2026-03-14')],
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

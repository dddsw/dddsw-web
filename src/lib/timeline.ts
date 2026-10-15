import { get, Milestone } from './milestones';

export interface TimelineItem {
	/** Stable key for milestones the site reacts to (the status functions below). */
	id?: string;
	label: string;
	/** The date, already formatted for display. Undefined while it is still to be confirmed. */
	date?: string;
	done?: boolean;
}

/** Key milestones for the year, in order. Their dates and whether they are done live in milestones.ts. */
export function getTimeline(): TimelineItem[] {
	const item = (id: string, label: string, milestone: Milestone): TimelineItem => {
		const details = get(milestone);
		return { id, label, date: details?.formattedDate, done: details?.hasHappened };
	};
	return [
		item('planning', 'Planning kicks off', Milestone.StartPlanning),
		item('cfp-opens', 'Call for speakers opens', Milestone.OpenCallForSpeakers),
		item('cfp-closes', 'Call for speakers closes', Milestone.CloseCallForSpeakers),
		item('voting-opens', 'Session voting opens', Milestone.OpenSessionVoting),
		item('voting-closes', 'Session voting closes', Milestone.CloseSessionVoting),
		item(
			'schedule',
			'Schedule announced and ticket registration opens',
			Milestone.AnnounceScheduleAndOpenTicketRegistration
		),
		item('event-day', 'Day of the event!', Milestone.TheActualEventDay)
	];
}

export type OpenStatus = 'not-open' | 'open' | 'closed';

/** A window opens when its "opens" milestone is done and closes when its "closes" milestone is done. */
function windowStatus(items: TimelineItem[], opens: string, closes: string): OpenStatus {
	const done = (id: string) => items.some((item) => item.id === id && item.done);
	if (done(closes)) return 'closed';
	if (done(opens)) return 'open';
	return 'not-open';
}

/** Whether people can submit talks right now: from "Call for speakers opens" to "closes". */
export function callForPapersStatus(items: TimelineItem[] = getTimeline()): OpenStatus {
	return windowStatus(items, 'cfp-opens', 'cfp-closes');
}

/** Whether session voting is open: from "Session voting opens" to "closes". */
export function votingStatus(items: TimelineItem[] = getTimeline()): OpenStatus {
	return windowStatus(items, 'voting-opens', 'voting-closes');
}

/** Whether tickets are available: from "registration opens" until the day of the event. */
export function ticketsStatus(items: TimelineItem[] = getTimeline()): OpenStatus {
	return windowStatus(items, 'schedule', 'event-day');
}

/** Whether the schedule has been announced ("Schedule announced and registration opens" is done). */
export function scheduleAnnounced(items: TimelineItem[] = getTimeline()): boolean {
	return items.some((item) => item.id === 'schedule' && item.done);
}

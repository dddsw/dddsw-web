import { describe, expect, it } from 'vitest';
import { Milestone } from './milestones';
import { currentFeatured, featured, parsePreviewState, resolveFeatured } from './featured';

/** A `hasHappened` where only the given milestones have happened. */
const happened =
	(...done: Milestone[]) =>
	(milestone: Milestone) =>
		done.includes(milestone);

const { OpenCallForSpeakers, CloseCallForSpeakers, OpenSessionVoting, CloseSessionVoting } =
	Milestone;
const { AnnounceScheduleAndOpenTicketRegistration: AnnounceSchedule, TheActualEventDay } =
	Milestone;

describe('currentFeatured', () => {
	it('is null while nothing is open', () => {
		expect(currentFeatured(happened())).toBeNull();
	});
	it('features the call for papers while it is open', () => {
		expect(currentFeatured(happened(OpenCallForSpeakers))).toBe(featured.cfp);
	});
	it('features nothing between the call closing and voting opening', () => {
		expect(currentFeatured(happened(OpenCallForSpeakers, CloseCallForSpeakers))).toBeNull();
	});
	it('features session voting while it is open', () => {
		expect(
			currentFeatured(happened(OpenCallForSpeakers, CloseCallForSpeakers, OpenSessionVoting))
		).toBe(featured.voting);
	});
	it('features tickets once registration opens, and drops them on the day of the event', () => {
		const beforeTheEvent = [
			OpenCallForSpeakers,
			CloseCallForSpeakers,
			OpenSessionVoting,
			CloseSessionVoting,
			AnnounceSchedule
		];
		expect(currentFeatured(happened(...beforeTheEvent))).toBe(featured.tickets);
		expect(currentFeatured(happened(...beforeTheEvent, TheActualEventDay))).toBeNull();
	});
	it('prefers the later milestone when windows overlap', () => {
		expect(currentFeatured(happened(OpenCallForSpeakers, OpenSessionVoting))).toBe(featured.voting);
		expect(
			currentFeatured(happened(OpenCallForSpeakers, OpenSessionVoting, AnnounceSchedule))
		).toBe(featured.tickets);
	});
	it('uses the real milestones by default', () => {
		expect(currentFeatured()).toBeNull();
	});
});

describe('resolveFeatured', () => {
	it('uses the real timeline without a preview', () => {
		expect(resolveFeatured(null, happened(OpenCallForSpeakers))).toBe(featured.cfp);
		expect(resolveFeatured(null, happened())).toBeNull();
	});
	it('shows the previewed button even when its milestone is closed', () => {
		expect(resolveFeatured('tickets', happened())).toBe(featured.tickets);
	});
	it('hides the button for the "none" preview even when something is open', () => {
		expect(resolveFeatured('none', happened(OpenCallForSpeakers))).toBeNull();
	});
});

describe('parsePreviewState', () => {
	it('reads a featured button, the schedule, or both', () => {
		expect(parsePreviewState('tickets')).toEqual({ featured: 'tickets', schedule: false });
		expect(parsePreviewState('schedule')).toEqual({ featured: null, schedule: true });
		expect(parsePreviewState('voting, Schedule')).toEqual({ featured: 'voting', schedule: true });
	});
	it('treats speakers as an alias for schedule', () => {
		expect(parsePreviewState('speakers')).toEqual({ featured: null, schedule: true });
	});
	it('off wins over everything else', () => {
		expect(parsePreviewState('tickets,off')).toBe('off');
	});
	it('returns null when nothing is recognised', () => {
		expect(parsePreviewState('bogus')).toBeNull();
		expect(parsePreviewState('')).toBeNull();
		expect(parsePreviewState(null)).toBeNull();
	});
	it('accepts none, ignoring case and spaces', () => {
		expect(parsePreviewState(' NONE ')).toEqual({ featured: 'none', schedule: false });
	});
	it('ignores names that only exist on Object.prototype', () => {
		expect(parsePreviewState('constructor')).toBeNull();
	});
	it('takes the first featured id when several are given', () => {
		expect(parsePreviewState('cfp,tickets')).toEqual({ featured: 'cfp', schedule: false });
	});
});

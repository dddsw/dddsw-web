import { describe, expect, it } from 'vitest';
import type { PreviewState } from './featured';
import { scheduleShown, visibleNav } from './navigation';
import { Milestone } from './milestones';

/** A `hasHappened` where only the given milestones have happened. */
const happened =
	(...done: Milestone[]) =>
	(milestone: Milestone) =>
		done.includes(milestone);

const { AnnounceScheduleAndOpenTicketRegistration: AnnounceSchedule, TheActualEventDay } =
	Milestone;
const {
	OpenCallForSpeakers,
	CloseCallForSpeakers,
	OpenSessionVoting,
	CloseSessionVoting,
	ConkedOut
} = Milestone;
const preview = (overrides: Partial<PreviewState> = {}): PreviewState => ({
	featured: null,
	schedule: false,
	...overrides
});
const hrefs = (items: readonly { href: string }[]) => items.map((item) => item.href);

describe('visibleNav', () => {
	it('hides the schedule and speakers before they are announced', () => {
		const shown = hrefs(visibleNav(preview(), happened()));
		expect(shown).not.toContain('/schedule');
		expect(shown).not.toContain('/speakers');
	});
	it('shows both once announced, and after the day of the event', () => {
		for (const hasHappened of [
			happened(AnnounceSchedule),
			happened(AnnounceSchedule, TheActualEventDay)
		]) {
			const shown = hrefs(visibleNav(preview(), hasHappened));
			expect(shown).toContain('/schedule');
			expect(shown).toContain('/speakers');
		}
	});
	it('shows both when previewing the schedule, even before they are announced', () => {
		const shown = hrefs(visibleNav(preview({ schedule: true }), happened()));
		expect(shown).toContain('/schedule');
		expect(shown).toContain('/speakers');
	});
	it('shows Sessions while voting is open and once the schedule is announced', () => {
		const sessions = (...done: Milestone[]) =>
			hrefs(visibleNav(preview(), happened(...done))).includes('/sessions');
		expect(sessions()).toBe(false);
		expect(sessions(OpenSessionVoting)).toBe(true);
		expect(sessions(OpenSessionVoting, CloseSessionVoting)).toBe(false);
		expect(sessions(OpenSessionVoting, CloseSessionVoting, AnnounceSchedule)).toBe(true);
	});
	it('shows Pocket DDD on the day of the event until the conference is over', () => {
		const pocket = (...done: Milestone[]) =>
			visibleNav(preview(), happened(...done)).some((item) => item.label === 'Pocket DDD');
		expect(pocket(AnnounceSchedule)).toBe(false);
		expect(pocket(TheActualEventDay)).toBe(true);
		expect(pocket(TheActualEventDay, ConkedOut)).toBe(false);
	});
	it('shows Become a speaker until the call for papers closes', () => {
		const becomeASpeaker = (...done: Milestone[]) =>
			hrefs(visibleNav(preview(), happened(...done))).includes('/become-a-speaker');
		expect(becomeASpeaker()).toBe(true);
		expect(becomeASpeaker(OpenCallForSpeakers)).toBe(true);
		expect(becomeASpeaker(OpenCallForSpeakers, CloseCallForSpeakers)).toBe(false);
	});
	it('always keeps About and Sponsorship', () => {
		expect(hrefs(visibleNav(preview(), happened()))).toEqual(
			expect.arrayContaining(['/about', '/sponsorship'])
		);
	});
});

describe('scheduleShown', () => {
	it('is false before the announcement and true after', () => {
		expect(scheduleShown(preview(), happened())).toBe(false);
		expect(scheduleShown(preview(), happened(AnnounceSchedule))).toBe(true);
	});
	it('is true when previewing tickets, because tickets never open without the schedule', () => {
		expect(scheduleShown(preview({ featured: 'tickets' }), happened())).toBe(true);
	});
	it('is not revealed by previewing voting', () => {
		expect(scheduleShown(preview({ featured: 'voting' }), happened())).toBe(false);
	});
});

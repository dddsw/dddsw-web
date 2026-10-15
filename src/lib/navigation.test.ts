import { describe, expect, it } from 'vitest';
import type { PreviewState } from './featured';
import { scheduleShown, visibleNav } from './navigation';
import type { TimelineItem } from './timeline';

const timelineWith = (announced: boolean, eventDay = false): TimelineItem[] => [
	{ id: 'schedule', label: 'Schedule announced', done: announced },
	{ id: 'event-day', label: 'Day of the event', done: eventDay }
];
const preview = (overrides: Partial<PreviewState> = {}): PreviewState => ({
	featured: null,
	schedule: false,
	...overrides
});
const hrefs = (items: readonly { href: string }[]) => items.map((item) => item.href);

describe('visibleNav', () => {
	it('hides the schedule before it is announced', () => {
		expect(hrefs(visibleNav(preview(), timelineWith(false)))).not.toContain('/schedule');
	});
	it('shows it once announced, and after the day of the event', () => {
		expect(hrefs(visibleNav(preview(), timelineWith(true)))).toContain('/schedule');
		expect(hrefs(visibleNav(preview(), timelineWith(true, true)))).toContain('/schedule');
	});
	it('shows it when previewing the schedule, even before it is announced', () => {
		expect(hrefs(visibleNav(preview({ schedule: true }), timelineWith(false)))).toContain(
			'/schedule'
		);
	});
	it('always keeps About and Sponsorship', () => {
		expect(hrefs(visibleNav(preview(), timelineWith(false)))).toEqual(
			expect.arrayContaining(['/about', '/sponsorship'])
		);
	});
});

describe('scheduleShown', () => {
	it('is false before the announcement and true after', () => {
		expect(scheduleShown(preview(), timelineWith(false))).toBe(false);
		expect(scheduleShown(preview(), timelineWith(true))).toBe(true);
	});
	it('is true when previewing tickets, because tickets never open without the schedule', () => {
		expect(scheduleShown(preview({ featured: 'tickets' }), timelineWith(false))).toBe(true);
	});
	it('is not revealed by previewing voting', () => {
		expect(scheduleShown(preview({ featured: 'voting' }), timelineWith(false))).toBe(false);
	});
});

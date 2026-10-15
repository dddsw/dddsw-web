import { describe, expect, it } from 'vitest';
import type { TimelineItem } from './timeline';
import {
	currentFeatured,
	featured,
	parsePreview,
	parsePreviewState,
	resolveFeatured
} from './featured';

const ids = [
	'cfp-opens',
	'cfp-closes',
	'voting-opens',
	'voting-closes',
	'schedule',
	'event-day'
] as const;
/** A timeline where only the given milestones are done. */
const timelineWith = (...done: (typeof ids)[number][]): TimelineItem[] =>
	ids.map((id) => ({ id, label: id, done: done.includes(id) }));

describe('currentFeatured', () => {
	it('is null while nothing is open', () => {
		expect(currentFeatured(timelineWith())).toBeNull();
	});
	it('features the call for papers while it is open', () => {
		expect(currentFeatured(timelineWith('cfp-opens'))).toBe(featured.cfp);
	});
	it('features nothing between the call closing and voting opening', () => {
		expect(currentFeatured(timelineWith('cfp-opens', 'cfp-closes'))).toBeNull();
	});
	it('features session voting while it is open', () => {
		expect(currentFeatured(timelineWith('cfp-opens', 'cfp-closes', 'voting-opens'))).toBe(
			featured.voting
		);
	});
	it('features tickets once registration opens, and drops them on the day of the event', () => {
		const open = timelineWith(
			'cfp-opens',
			'cfp-closes',
			'voting-opens',
			'voting-closes',
			'schedule'
		);
		expect(currentFeatured(open)).toBe(featured.tickets);
		expect(currentFeatured(timelineWith(...ids))).toBeNull();
	});
	it('prefers the later milestone when windows overlap', () => {
		expect(currentFeatured(timelineWith('cfp-opens', 'voting-opens'))).toBe(featured.voting);
		expect(currentFeatured(timelineWith('cfp-opens', 'voting-opens', 'schedule'))).toBe(
			featured.tickets
		);
	});
});

describe('parsePreview', () => {
	it('accepts the featured ids, none and off, ignoring case and spaces', () => {
		expect(parsePreview('tickets')).toBe('tickets');
		expect(parsePreview(' VOTING ')).toBe('voting');
		expect(parsePreview('cfp')).toBe('cfp');
		expect(parsePreview('none')).toBe('none');
		expect(parsePreview('off')).toBe('off');
	});
	it('ignores anything else', () => {
		expect(parsePreview('bogus')).toBeNull();
		expect(parsePreview('')).toBeNull();
		expect(parsePreview(null)).toBeNull();
		expect(parsePreview(undefined)).toBeNull();
	});
});

describe('resolveFeatured', () => {
	it('uses the real timeline without a preview', () => {
		expect(resolveFeatured(null, timelineWith('cfp-opens'))).toBe(featured.cfp);
		expect(resolveFeatured(null, timelineWith())).toBeNull();
	});
	it('shows the previewed button even when its milestone is closed', () => {
		expect(resolveFeatured('tickets', timelineWith())).toBe(featured.tickets);
	});
	it('hides the button for the "none" preview even when something is open', () => {
		expect(resolveFeatured('none', timelineWith('cfp-opens'))).toBeNull();
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
	it('takes the first featured id when several are given', () => {
		expect(parsePreviewState('cfp,tickets')).toEqual({ featured: 'cfp', schedule: false });
	});
});

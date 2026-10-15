import { describe, expect, it } from 'vitest';
import {
	callForPapersStatus,
	ticketsStatus,
	getTimeline,
	votingStatus,
	type TimelineItem
} from './timeline';

const items = (opens: boolean, closes: boolean): TimelineItem[] => [
	{ id: 'cfp-opens', label: 'opens', done: opens },
	{ id: 'cfp-closes', label: 'closes', done: closes }
];

describe('callForPapersStatus', () => {
	it('is not open before the opening milestone', () => {
		expect(callForPapersStatus(items(false, false))).toBe('not-open');
	});
	it('is open once it has opened and not yet closed', () => {
		expect(callForPapersStatus(items(true, false))).toBe('open');
	});
	it('is closed once the closing milestone is done', () => {
		expect(callForPapersStatus(items(true, true))).toBe('closed');
	});
	it('treats missing milestones as not open', () => {
		expect(callForPapersStatus([])).toBe('not-open');
	});
});

describe('getTimeline', () => {
	it('has the two milestones the call for papers depends on', () => {
		const ids = getTimeline().map((item) => item.id);
		expect(ids).toContain('cfp-opens');
		expect(ids).toContain('cfp-closes');
	});
});

describe('votingStatus and ticketsStatus', () => {
	const done = (...ids: string[]): TimelineItem[] =>
		['voting-opens', 'voting-closes', 'schedule', 'event-day'].map((id) => ({
			id,
			label: id,
			done: ids.includes(id)
		}));

	it('voting follows its own opens and closes milestones', () => {
		expect(votingStatus(done())).toBe('not-open');
		expect(votingStatus(done('voting-opens'))).toBe('open');
		expect(votingStatus(done('voting-opens', 'voting-closes'))).toBe('closed');
	});
	it('tickets open with registration and close on the day of the event', () => {
		expect(ticketsStatus(done())).toBe('not-open');
		expect(ticketsStatus(done('schedule'))).toBe('open');
		expect(ticketsStatus(done('schedule', 'event-day'))).toBe('closed');
	});
	it('the timeline has every milestone these depend on', () => {
		const ids = getTimeline().map((item) => item.id);
		for (const id of ['voting-opens', 'voting-closes', 'schedule', 'event-day'])
			expect(ids).toContain(id);
	});
});

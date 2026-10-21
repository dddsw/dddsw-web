import { describe, expect, it } from 'vitest';
import { countdownLabel, dateLabel, venueLabel } from './event';
import { MilestoneDetails, Status } from './milestones';

describe('countdownLabel', () => {
	it('words each case', () => {
		expect(countdownLabel(10)).toBe('10 days to go');
		expect(countdownLabel(1)).toBe('Tomorrow!');
		expect(countdownLabel(0)).toBe('Today!');
		expect(countdownLabel(-3)).toBe('See you next year');
	});
});

describe('dateLabel', () => {
	it('is "To be confirmed" until a date is set', () => {
		expect(dateLabel(new MilestoneDetails(Status.NotYet))).toBe('To be confirmed');
	});
	it('formats a confirmed date', () => {
		expect(dateLabel(new MilestoneDetails(Status.JustYouWait, '2030-06-15'))).toBe(
			'Saturday 15th June 2030'
		);
	});
});

describe('venueLabel', () => {
	it('is "To be confirmed" when nothing is set', () => {
		expect(venueLabel({ name: null, city: null })).toBe('To be confirmed');
	});
	it('joins whatever is known', () => {
		expect(venueLabel({ name: 'The Hall', city: 'Bristol' })).toBe('The Hall, Bristol');
		expect(venueLabel({ name: null, city: 'Bristol' })).toBe('Bristol');
	});
});

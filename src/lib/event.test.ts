import { describe, expect, it } from 'vitest';
import { countdownLabel, dateLabel, daysUntil, formatEventDate, venueLabel } from './event';

describe('daysUntil', () => {
	it('counts whole days ignoring time of day', () => {
		expect(daysUntil('2030-06-15', new Date('2030-06-05T23:59:00Z'))).toBe(10);
	});
	it('is zero on the day and negative afterwards', () => {
		expect(daysUntil('2030-06-15', new Date('2030-06-15T09:00:00Z'))).toBe(0);
		expect(daysUntil('2030-06-15', new Date('2030-06-17T09:00:00Z'))).toBe(-2);
	});
});

describe('formatEventDate', () => {
	it('formats a UK long date', () => {
		expect(formatEventDate('2030-06-15')).toBe('Saturday, 15 June 2030');
	});
});

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
		expect(dateLabel(null)).toBe('To be confirmed');
	});
	it('formats a confirmed date', () => {
		expect(dateLabel('2030-06-15')).toBe('Saturday, 15 June 2030');
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

import { describe, expect, it } from 'vitest';
import { calendarFile, calendarLinks } from './calendar';

const base = {
	date: '2027-04-24',
	title: 'DDD South West 2027',
	uid: 'dddsw-2027@example.org',
	now: new Date('2026-10-28T09:30:15.123Z')
};

describe('calendarFile', () => {
	it('is an all-day event ending the day after it starts', () => {
		const file = calendarFile(base);
		expect(file).toContain('DTSTART;VALUE=DATE:20270424\r\n');
		expect(file).toContain('DTEND;VALUE=DATE:20270425\r\n');
	});
	it('rolls the end over a month and year boundary', () => {
		expect(calendarFile({ ...base, date: '2027-12-31' })).toContain('DTEND;VALUE=DATE:20280101');
		expect(calendarFile({ ...base, date: '2027-04-30' })).toContain('DTEND;VALUE=DATE:20270501');
	});
	it('is wrapped as a calendar with CRLF line endings', () => {
		const file = calendarFile(base);
		expect(file.startsWith('BEGIN:VCALENDAR\r\n')).toBe(true);
		expect(file.endsWith('END:VCALENDAR\r\n')).toBe(true);
		expect(file).not.toMatch(/[^\r]\n/);
	});
	it('has a stable ID and a timestamp without milliseconds', () => {
		const file = calendarFile(base);
		expect(file).toContain('UID:dddsw-2027@example.org\r\n');
		expect(file).toContain('DTSTAMP:20261028T093015Z\r\n');
	});
	it('escapes commas, semicolons, backslashes and newlines', () => {
		const file = calendarFile({ ...base, location: 'A, B; C\\D', description: 'one\ntwo' });
		expect(file).toContain('LOCATION:A\\, B\\; C\\\\D\r\n');
		expect(file).toContain('DESCRIPTION:one\\ntwo\r\n');
	});
	it('leaves out location, description and URL when not given', () => {
		const file = calendarFile(base);
		expect(file).not.toContain('LOCATION');
		expect(file).not.toContain('DESCRIPTION');
		expect(file).not.toContain('URL:');
	});
	it('folds long lines at 75 bytes, each continued with a space', () => {
		const file = calendarFile({ ...base, description: 'x'.repeat(200) });
		for (const line of file.split('\r\n')) {
			expect(new TextEncoder().encode(line).length).toBeLessThanOrEqual(75);
		}
		const unfolded = file.replace(/\r\n /g, '');
		expect(unfolded).toContain(`DESCRIPTION:${'x'.repeat(200)}`);
	});
	it('does not split a multi-byte character when folding', () => {
		const file = calendarFile({ ...base, description: 'é'.repeat(100) });
		const unfolded = file.replace(/\r\n /g, '');
		expect(unfolded).toContain(`DESCRIPTION:${'é'.repeat(100)}`);
	});
});

describe('calendarLinks', () => {
	const event = { ...base, location: 'Sloane Robinson Building, Bristol', description: 'A day.' };

	it('builds a Google Calendar link with the dates, title and place', () => {
		const url = new URL(calendarLinks(event).google);
		expect(url.origin + url.pathname).toBe('https://calendar.google.com/calendar/render');
		expect(url.searchParams.get('action')).toBe('TEMPLATE');
		expect(url.searchParams.get('dates')).toBe('20270424/20270425');
		expect(url.searchParams.get('text')).toBe('DDD South West 2027');
		expect(url.searchParams.get('location')).toBe('Sloane Robinson Building, Bristol');
		expect(url.searchParams.get('details')).toBe('A day.');
	});
	it('builds an Outlook link as an all-day event', () => {
		const url = new URL(calendarLinks(event).outlook);
		expect(url.hostname).toBe('outlook.live.com');
		expect(url.searchParams.get('startdt')).toBe('2027-04-24');
		expect(url.searchParams.get('enddt')).toBe('2027-04-25');
		expect(url.searchParams.get('allday')).toBe('true');
		expect(url.searchParams.get('subject')).toBe('DDD South West 2027');
		expect(url.searchParams.get('location')).toBe('Sloane Robinson Building, Bristol');
	});
	it('leaves out the place and description when not given', () => {
		const links = calendarLinks(base);
		expect(links.google).not.toContain('location');
		expect(links.google).not.toContain('details');
		expect(links.outlook).not.toContain('location');
		expect(links.outlook).not.toContain('body');
	});
});

export interface CalendarEvent {
	/** The day of the event, as YYYY-MM-DD. */
	date: string;
	title: string;
	location?: string;
	description?: string;
	url?: string;
	/** A stable ID, so calendars update the event rather than adding a copy. */
	uid: string;
	/** When the file was made. */
	now?: Date;
}

/** Escapes text values as iCalendar (RFC 5545) requires. */
function escapeText(text: string): string {
	return text
		.replace(/\\/g, '\\\\')
		.replace(/;/g, '\\;')
		.replace(/,/g, '\\,')
		.replace(/\r?\n/g, '\\n');
}

/** Lines over 75 bytes are continued on the next line, which starts with a space. */
function fold(line: string): string {
	const encoder = new TextEncoder();
	const parts: string[] = [];
	let current = '';
	let bytes = 0;
	for (const char of line) {
		const size = encoder.encode(char).length;
		// Continuation lines lose one byte to the leading space.
		const limit = parts.length === 0 ? 75 : 74;
		if (bytes + size > limit) {
			parts.push(current);
			current = '';
			bytes = 0;
		}
		current += char;
		bytes += size;
	}
	parts.push(current);
	return parts.join('\r\n ');
}

function dateStamp(date: string): string {
	return date.replaceAll('-', '');
}

function nextDay(date: string): string {
	const next = new Date(`${date}T00:00:00Z`);
	next.setUTCDate(next.getUTCDate() + 1);
	return next.toISOString().slice(0, 10);
}

function utcTimestamp(date: Date): string {
	return date
		.toISOString()
		.replace(/[-:]/g, '')
		.replace(/\.\d{3}/, '');
}

/** An iCalendar file with one all-day event. */
export function calendarFile(event: CalendarEvent): string {
	const lines = [
		'BEGIN:VCALENDAR',
		'VERSION:2.0',
		'PRODID:-//DDD South West//Website//EN',
		'CALSCALE:GREGORIAN',
		'METHOD:PUBLISH',
		'BEGIN:VEVENT',
		`UID:${event.uid}`,
		`DTSTAMP:${utcTimestamp(event.now ?? new Date())}`,
		`DTSTART;VALUE=DATE:${dateStamp(event.date)}`,
		// The end of an all-day event is the day after, as the end is not included.
		`DTEND;VALUE=DATE:${dateStamp(nextDay(event.date))}`,
		`SUMMARY:${escapeText(event.title)}`
	];
	if (event.location) lines.push(`LOCATION:${escapeText(event.location)}`);
	if (event.description) lines.push(`DESCRIPTION:${escapeText(event.description)}`);
	if (event.url) lines.push(`URL:${event.url}`);
	lines.push('END:VEVENT', 'END:VCALENDAR');
	return lines.map(fold).join('\r\n') + '\r\n';
}

export interface CalendarLinks {
	google: string;
	outlook: string;
}

/** Links that open an all-day event ready to save in Google Calendar or Outlook on the web. */
export function calendarLinks(event: CalendarEvent): CalendarLinks {
	const start = dateStamp(event.date);
	const end = dateStamp(nextDay(event.date));

	const google = new URLSearchParams({
		action: 'TEMPLATE',
		text: event.title,
		dates: `${start}/${end}`
	});
	const outlook = new URLSearchParams({
		path: '/calendar/action/compose',
		rru: 'addevent',
		subject: event.title,
		startdt: event.date,
		enddt: nextDay(event.date),
		allday: 'true'
	});
	if (event.description) {
		google.set('details', event.description);
		outlook.set('body', event.description);
	}
	if (event.location) {
		google.set('location', event.location);
		outlook.set('location', event.location);
	}

	return {
		google: `https://calendar.google.com/calendar/render?${google}`,
		outlook: `https://outlook.live.com/calendar/0/deeplink/compose?${outlook}`
	};
}

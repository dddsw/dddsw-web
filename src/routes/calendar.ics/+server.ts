import { error } from '@sveltejs/kit';
import { calendarFile } from '#lib/calendar.ts';
import { event } from '#lib/eventDetails.ts';
import { get, Milestone } from '#lib/milestones.ts';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = () => {
	const date = get(Milestone.TheActualEventDay)?.isoDate;
	if (!date) error(404, 'The date has not been announced yet');

	const location = [event.venue.name, event.venue.address].filter(Boolean).join(', ');
	const body = calendarFile({
		date,
		title: `${event.name} ${event.year}`,
		location: location || undefined,
		description: `${event.tagline}.`,
		url: event.siteUrl,
		uid: `dddsw-${event.year}@dddsouthwest.com`
	});

	return new Response(body, {
		headers: {
			'Content-Type': 'text/calendar; charset=utf-8',
			'Content-Disposition': `attachment; filename="dddsw-${event.year}.ics"`
		}
	});
};

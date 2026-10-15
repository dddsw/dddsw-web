import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { sessionizeEmbeddedCodeApiUrl } from '$lib/eventDetails.js';
import { get, Milestone } from '$lib/milestones';
import { eventYear } from '$lib/eventDetails';

export const load: PageServerLoad = async ({ fetch }) => {
	const eventDate = get(Milestone.TheActualEventDay)?.formattedDate;
	const heading = {
		title: `DDD South West ${eventYear}`,
		lead: eventDate ? `${eventDate} @ The Engine Shed, Bristol` : undefined
	};

	if (get(Milestone.AnnounceScheduleAndOpenTicketRegistration)?.hasHappened) {
		const scheduleRsp = await fetch(`${sessionizeEmbeddedCodeApiUrl}/view/SpeakerWall`);
		if (!scheduleRsp.ok) {
			throw error(scheduleRsp.status, 'Failed to load speaker wall');
		}

		const sessionizeSpeakerWallCode = await scheduleRsp.text();

		return { ...heading, sessionizeSpeakerWallCode };
	}
	return { ...heading, sessionizeSpeakerWallCode: null };
};

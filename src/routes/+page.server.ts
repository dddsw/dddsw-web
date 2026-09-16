import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { sessionizeEmbeddedCodeApiUrl } from '$lib/eventDetails.js';
import { get, Milestone } from '$lib/milestones';

export const load: PageServerLoad = async ({ fetch }) => {
	if (get(Milestone.AnnounceScheduleAndOpenTicketRegistration)?.hasHappened) {
		const scheduleRsp = await fetch(`${sessionizeEmbeddedCodeApiUrl}/view/SpeakerWall`);
		if (!scheduleRsp.ok) {
			throw error(scheduleRsp.status, 'Failed to load speaker wall');
		}

		const sessionizeSpeakerWallCode = await scheduleRsp.text();

		return { sessionizeSpeakerWallCode };
	}
	return { sessionizeSpeakerWallCode: null };
};

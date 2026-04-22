import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { sessionizeEmbeddedCodeApiUrl } from '$lib/eventDetails.js';

export const load: PageServerLoad = async ({ fetch }) => {
	const scheduleRsp = await fetch(`${sessionizeEmbeddedCodeApiUrl}/view/GridSmart`);

	if (!scheduleRsp.ok) {
		throw error(scheduleRsp.status, 'Failed to load schedule');
	}

	const sessionizeScheduleCode = await scheduleRsp.text();

	return { sessionizeScheduleCode };
};

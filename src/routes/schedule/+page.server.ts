import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ fetch }) => {
	const scheduleRsp = await fetch('https://sessionize.com/api/v2/rp6vdsbs/view/GridSmart');

	if (!scheduleRsp.ok) {
		throw error(scheduleRsp.status, 'Failed to load schedule');
	}

	const sessionizeScheduleCode = await scheduleRsp.text();

	return { sessionizeScheduleCode };
};

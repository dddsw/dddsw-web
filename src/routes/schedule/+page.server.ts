import { loadProgramme } from '#lib/sessionize.ts';
import { programmeIsEmpty } from '#lib/seo.ts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const programme = await loadProgramme(fetch);
	return {
		title: 'Schedule',
		lead: 'A day of talks, workshops and conversations.',
		programme,
		noindex: programmeIsEmpty(programme)
	};
};

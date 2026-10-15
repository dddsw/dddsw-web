import { loadProgramme } from '#lib/sessionize.ts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => ({
	title: 'Schedule',
	lead: 'A day of talks, workshops and conversations.',
	programme: await loadProgramme(fetch)
});

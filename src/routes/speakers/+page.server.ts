import { loadProgramme } from '$lib/sessionize';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => ({
	title: 'Speakers',
	lead: 'The brilliant people sharing their knowledge.',
	programme: await loadProgramme(fetch)
});

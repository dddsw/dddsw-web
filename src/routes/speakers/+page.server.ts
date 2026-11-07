import { loadProgramme } from '#lib/sessionize.ts';
import { speakersAreEmpty } from '#lib/seo.ts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const programme = await loadProgramme(fetch);
	return {
		title: 'Speakers',
		lead: 'The brilliant people sharing their knowledge.',
		programme,
		noindex: speakersAreEmpty(programme)
	};
};

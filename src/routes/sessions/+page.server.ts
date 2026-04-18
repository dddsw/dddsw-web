import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { sessionizeApiUrl } from '$lib/eventDetails.js';
import { Milestone, get } from '$lib/milestones';
import type { Session } from '../../types/Session.type.js';
import type { Speaker } from '../../types/Speaker.type.js';

export const load: PageServerLoad = async ({ fetch }) => {
	const [sessionsRsp, speakersRsp] = await Promise.all([
		fetch(`${sessionizeApiUrl}/view/Sessions`),
		fetch(`${sessionizeApiUrl}/view/Speakers`)
	]);

	if (!sessionsRsp.ok) {
		throw error(sessionsRsp.status, 'Failed to load sessions');
	}

	if (!speakersRsp.ok) {
		throw error(speakersRsp.status, 'Failed to load speakers');
	}

	const sessionsJson = await sessionsRsp.json();
	const rawSessions = (sessionsJson[0]?.sessions ?? []) as Session[];
	const showAllProposedSessions = get(
		Milestone.AnnounceScheduleAndOpenTicketRegistration
	)?.hasNotHappened;

	const sessions = rawSessions
		.filter(
			(session) =>
				showAllProposedSessions ||
				(session.status === 'Accepted' && session.isInformed && session.isConfirmed)
		)
		.sort((a, b) => a.title.localeCompare(b.title));

	const speakers = (await speakersRsp.json()) as Speaker[];

	return {
		sessions,
		speakers
	};
};

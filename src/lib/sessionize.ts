import { sessionizeJsonApiUrl } from './eventDetails';

export interface Session {
	id: string;
	title: string;
	description: string;
	startsAt: string | null;
	endsAt: string | null;
	room: string | null;
	speakerNames: string[];
	isService: boolean;
}

export interface Speaker {
	id: string;
	name: string;
	tagline: string;
	bio: string;
	photo: string | null;
	sessionTitles: string[];
	links: { title: string; url: string }[];
}

export interface Programme {
	sessions: Session[];
	speakers: Speaker[];
	/** True when no live data is available and we are showing a stand-in. */
	isPlaceholder: boolean;
}

/** Shown until Sessionize is configured, so the pages never break the build. */
export const placeholderProgramme: Programme = {
	isPlaceholder: true,
	sessions: [],
	speakers: []
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export function mapProgramme(raw: any): Programme {
	const roomNames = new Map<string, string>(
		(raw?.rooms ?? []).map((r: any) => [String(r.id), String(r.name)])
	);
	const sessions: Session[] = (raw?.sessions ?? []).map((s: any) => ({
		id: String(s.id),
		title: s.title ?? 'Untitled session',
		description: s.description ?? '',
		startsAt: s.startsAt ?? null,
		endsAt: s.endsAt ?? null,
		room: s.room ?? roomNames.get(String(s.roomId)) ?? null,
		speakerNames: (s.speakers ?? []).map((sp: any) => sp.name),
		isService: Boolean(s.isServiceSession)
	}));
	sessions.sort(
		(a, b) => (a.startsAt ?? '').localeCompare(b.startsAt ?? '') || a.title.localeCompare(b.title)
	);

	const speakers: Speaker[] = (raw?.speakers ?? []).map((sp: any) => ({
		id: String(sp.id),
		name: sp.fullName ?? 'Speaker',
		tagline: sp.tagLine ?? '',
		bio: sp.bio ?? '',
		photo: sp.profilePicture ?? null,
		sessionTitles: (sp.sessions ?? []).map((s: any) => s.name),
		links: (sp.links ?? []).map((l: any) => ({ title: l.title, url: l.url }))
	}));
	speakers.sort((a, b) => a.name.localeCompare(b.name));

	return { sessions, speakers, isPlaceholder: false };
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export async function loadProgramme(
	fetchFn: typeof fetch,
	apiUrl: string = sessionizeJsonApiUrl
): Promise<Programme> {
	if (!apiUrl) return placeholderProgramme;
	try {
		const res = await fetchFn(`${apiUrl}/view/All`);
		if (!res.ok) throw new Error(`Sessionize responded ${res.status}`);
		return mapProgramme(await res.json());
	} catch (err) {
		console.warn('[sessionize] Falling back to placeholder programme:', err);
		return placeholderProgramme;
	}
}

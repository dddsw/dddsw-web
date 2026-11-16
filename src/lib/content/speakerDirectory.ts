import { pastEvents, talkSlug, type PastEvent, type Talk } from './pastEvents.ts';
import { pastSpeakers, type PastSpeaker } from './pastSpeakers.ts';
import aliases from './past/aliases.json';

export interface DirectoryTalk {
	year: number;
	title: string;
	/** Where the talk is on the past events page: its details where we have them, or its year. */
	href: string;
	/** What the speaker did at the time, when it's not what they do now (their `tagline`). */
	taglineThen?: string;
}

export interface DirectorySpeaker {
	/** Also the anchor on the directory page, e.g. /speaker-directory#dylan-beattie. */
	id: string;
	name: string;
	/** What they do now: from the most recent year they spoke. */
	tagline?: string;
	/** Relative to src/lib/assets/images. */
	photo?: string;
	/** Newest first. */
	talks: DirectoryTalk[];
}

/**
 * Other names people have gone by, pointing at the id they're known by, so all their talks are listed
 * together. Shared with the past year importer (see docs/importing-past-years.md).
 */
const sameSpeaker: Record<string, string> = aliases;

/** Talk "speakers" that aren't a person. */
const notPeople = new Set(['Panel']);

/** The id a speaker is known by when a talk only gives their name. */
export function speakerIdFor(name: string): string {
	return sameSpeaker[name] ?? talkSlug(name);
}

/** The people who gave a talk, by id and name. Empty for talks that weren't given by a person. */
export function talkSpeakers(talk: Talk): { id: string; name: string }[] {
	if (talk.speakerIds?.length) {
		return talk.speakerIds.map((id) => ({ id, name: pastSpeakers[id]?.name ?? talk.speaker }));
	}
	if (notPeople.has(talk.speaker)) return [];
	return [{ id: speakerIdFor(talk.speaker), name: talk.speaker }];
}

/**
 * What a speaker said they did when they gave a talk. People change jobs, so this can differ from
 * their profile, which is from the most recent year they spoke.
 */
export function taglineAt(talk: Talk, id: string): string | undefined {
	return talk.speakerTaglines?.[id] ?? pastSpeakers[id]?.tagline;
}

/** Where a speaker is in the directory. */
export const directoryHref = (id: string) => `/speaker-directory#${id}`;

export function initials(name: string): string {
	const words = name.split(/\s+/).filter((w) => /^[\p{L}]/u.test(w));
	return (words[0][0] + (words.length > 1 ? words.at(-1)![0] : '')).toUpperCase();
}

/** Everyone who has spoken at a past event, A–Z, with the talks they gave. */
export function buildDirectory(
	events: PastEvent[] = pastEvents,
	profiles: Record<string, PastSpeaker> = pastSpeakers
): DirectorySpeaker[] {
	const byId = new Map<string, DirectorySpeaker & { names: string[] }>();
	for (const event of events) {
		for (const talk of event.talks ?? []) {
			const slug = talkSlug(talk.title);
			const href = talk.description
				? `/past-events#${event.year}/${slug}`
				: `/past-events#${event.year}`;
			for (const { id, name } of talkSpeakers(talk)) {
				let speaker = byId.get(id);
				if (!speaker) {
					const profile = profiles[id];
					speaker = {
						id,
						name,
						names: [],
						talks: [],
						tagline: profile?.tagline,
						photo: profile?.photo
					};
					byId.set(id, speaker);
				}
				speaker.names.push(name);
				const taglineThen = talk.speakerTaglines?.[id];
				speaker.talks.push({
					year: event.year,
					title: talk.title,
					href,
					...(taglineThen && taglineThen !== speaker.tagline ? { taglineThen } : {})
				});
			}
		}
	}
	return [...byId.values()]
		.map(({ names, ...speaker }) => ({
			...speaker,
			// Their profile's name, or else the one that matches their id (rather than a nickname), or
			// else the one they used most recently.
			name: profiles[speaker.id]?.name ?? names.find((n) => talkSlug(n) === speaker.id) ?? names[0],
			talks: [...speaker.talks].sort((a, b) => b.year - a.year)
		}))
		.sort((a, b) => a.name.localeCompare(b.name, 'en-GB'));
}

export const speakerDirectory = buildDirectory();

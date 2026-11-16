/**
 * The rules for importing a past year's talks and speakers from Sessionize into the data files in
 * this folder. `scripts/import-past-year.ts` reads the source and writes the files; everything it
 * decides is here, so it can be tested. See docs/importing-past-years.md.
 */
import type { Talk } from '../pastEvents.ts';
import type { PastSpeaker } from '../pastSpeakers.ts';
import { talkSlug } from '../talkSlug.ts';

export interface ImportedSpeaker {
	name: string;
	tagline?: string;
	bio?: string;
	photoUrl?: string;
}

export interface ImportedTalk {
	title: string;
	description?: string;
	/** When it was on, as local time (YYYY-MM-DDTHH:MM:SS). Missing if it was never scheduled. */
	startsAt?: string;
	room?: string;
	speakers: ImportedSpeaker[];
}

/** Tidies text from Sessionize: Windows line breaks, trailing spaces, extra blank lines, **bold**. */
export function cleanText(text: string | undefined | null): string {
	return (
		(text ?? '')
			.replace(/\r/g, '')
			.split('\n')
			.map((line) => line.trimEnd())
			.join('\n')
			.replace(/\n{3,}/g, '\n\n')
			// The page shows abstracts as plain text, so Markdown bold would show its asterisks.
			.replace(/\*\*(.+?)\*\*/g, '$1')
			.trim()
	);
}

/** A talk's title, without the sponsor tag some sessions had, e.g. "[Brought to you by Seccl]". */
export function cleanTitle(title: string): string {
	return cleanText(title)
		.replace(/\s*\[brought to you by [^\]]*\]$/i, '')
		.trim();
}

/** An Excel date (days since 1899-12-30) as local time, the way Sessionize exports `Scheduled At`. */
export function excelDateTime(serial: string | undefined): string | undefined {
	const days = Number(serial);
	if (!serial || !Number.isFinite(days)) return undefined;
	const ms = Math.round(((days - 25569) * 86_400_000) / 60_000) * 60_000;
	return new Date(ms).toISOString().slice(0, 19);
}

type Row = Record<string, string | undefined>;

/**
 * Talks from a Sessionize "accepted sessions" export (Sessions > Export > flattened, as .xlsx).
 * There's a row per session, then a row with a blank title for each co-presenter.
 */
export function fromSessionizeExport(rows: Row[]): ImportedTalk[] {
	const talks = new Map<string, ImportedTalk>();
	for (const row of rows) {
		const id = row['Session Id'];
		if (!id) continue;
		let talk = talks.get(id);
		if (!talk) {
			talk = {
				title: cleanTitle(row['Title'] ?? ''),
				description: cleanText(row['Description']) || undefined,
				startsAt: excelDateTime(row['Scheduled At']),
				room: row['Room'] || undefined,
				speakers: []
			};
			talks.set(id, talk);
		}
		const name = [row['FirstName'], row['LastName']]
			.map((n) => n?.trim())
			.filter(Boolean)
			.join(' ');
		if (name) {
			talk.speakers.push({
				name,
				tagline: cleanText(row['TagLine']) || undefined,
				bio: cleanText(row['Bio']) || undefined,
				photoUrl: row['Profile Picture'] || undefined
			});
		}
		// A co-presenter's row can carry the schedule when the first row doesn't.
		talk.startsAt ??= excelDateTime(row['Scheduled At']);
		talk.room ??= row['Room'] || undefined;
	}
	return [...talks.values()].filter((t) => t.title);
}

/* eslint-disable @typescript-eslint/no-explicit-any */
/** Talks from the Sessionize API's "All" view (https://sessionize.com/api/v2/<id>/view/All). */
export function fromSessionizeApi(raw: any): ImportedTalk[] {
	const speakers = new Map<string, any>((raw?.speakers ?? []).map((s: any) => [String(s.id), s]));
	const rooms = new Map<string, string>(
		(raw?.rooms ?? []).map((r: any) => [String(r.id), String(r.name)])
	);
	return (raw?.sessions ?? [])
		.filter((s: any) => !s.isServiceSession)
		.map((s: any) => ({
			title: cleanTitle(s.title ?? ''),
			description: cleanText(s.description) || undefined,
			startsAt: s.startsAt ? String(s.startsAt).slice(0, 19) : undefined,
			room: s.room ?? rooms.get(String(s.roomId)) ?? undefined,
			speakers: (s.speakers ?? [])
				.map((sp: any) => speakers.get(String(sp?.id ?? sp)))
				.filter(Boolean)
				.map((sp: any) => ({
					name: String(sp.fullName ?? `${sp.firstName} ${sp.lastName}`).trim(),
					tagline: cleanText(sp.tagLine) || undefined,
					bio: cleanText(sp.bio) || undefined,
					photoUrl: sp.profilePicture || undefined
				}))
		}))
		.filter((t: ImportedTalk) => t.title);
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export interface ImportInput {
	year: number;
	talks: ImportedTalk[];
	/** Every year's talks as they are now. */
	talksByYear: Record<number, Talk[]>;
	speakers: Record<string, PastSpeaker>;
	/** Other names people have gone by, to the id they're known by (aliases.json). */
	aliases: Record<string, string>;
}

export interface ImportResult {
	/** Only the years whose talks changed. */
	talksByYear: Record<number, Talk[]>;
	speakers: Record<string, PastSpeaker>;
	/** Photos to download, for speakers who have none or whose profile moved to a newer year. */
	photos: { id: string; url: string }[];
	report: ImportReport;
}

export interface ImportReport {
	talks: number;
	added: string[];
	removed: string[];
	/** Sessions with no time or room, when others have one: accepted, but not given. */
	unscheduled: string[];
	newSpeakers: string[];
	jobChanges: { id: string; from: string; to: string }[];
	/** New speakers whose name is close to someone we know: add an alias if they're the same. */
	possibleDuplicates: { name: string; id: string; like: string }[];
}

/** "A", "A and B", "A, B and C". */
function joinNames(names: string[]): string {
	return names.length < 2
		? (names[0] ?? '')
		: `${names.slice(0, -1).join(', ')} and ${names.at(-1)}`;
}

const comparable = (talks: Talk[] | undefined) => JSON.stringify(talks ?? null);

/**
 * Replaces a year's talks with the imported ones, and keeps the speaker profiles in step:
 *
 * - A new speaker gets a profile from this year.
 * - If this is the most recent year someone spoke, their profile takes this year's tagline, bio and
 *   photo. Their earlier talks keep the tagline they had then, in `speakerTaglines`.
 * - If they've spoken since, their profile stays as it is, and this year's talk records their
 *   tagline at the time if it was different.
 *
 * Running it again with the same source changes nothing.
 */
export function importYear({
	year,
	talks,
	talksByYear,
	speakers,
	aliases
}: ImportInput): ImportResult {
	const idFor = (name: string) => aliases[name] ?? talkSlug(name);
	const profiles: Record<string, PastSpeaker> = structuredClone(speakers);
	const allTalks: Record<number, Talk[]> = structuredClone(talksByYear);
	const photos: ImportResult['photos'] = [];
	const known = new Set(Object.keys(speakers));

	const anyScheduled = talks.some((t) => t.startsAt || t.room);
	const unscheduled = anyScheduled ? talks.filter((t) => !t.startsAt && !t.room) : [];
	const given = talks
		.filter((t) => !unscheduled.includes(t))
		// In the order of the day: by time, then track (rooms are named "Track 1: …", "Track 2: …").
		.sort(
			(a, b) =>
				(a.startsAt ?? '').localeCompare(b.startsAt ?? '') ||
				(a.room ?? '').localeCompare(b.room ?? '', 'en', { numeric: true }) ||
				a.title.localeCompare(b.title)
		);

	// This year's details for each speaker (the same on each of their talks).
	const thisYear = new Map<string, ImportedSpeaker>();
	for (const talk of given) for (const s of talk.speakers) thisYear.set(idFor(s.name), s);

	const jobChanges: ImportReport['jobChanges'] = [];
	const newSpeakers: string[] = [];
	for (const [id, s] of thisYear) {
		const profile = profiles[id];
		if (!profile) {
			profiles[id] = {
				name: s.name,
				...(s.tagline && { tagline: s.tagline }),
				...(s.bio && { bio: s.bio }),
				year
			};
			if (s.photoUrl) photos.push({ id, url: s.photoUrl });
			newSpeakers.push(s.name);
			continue;
		}
		if (year >= profile.year) {
			if (year > profile.year && s.tagline && profile.tagline && s.tagline !== profile.tagline) {
				// Their earlier talks keep the tagline they had then.
				for (const [y, list] of Object.entries(allTalks)) {
					if (Number(y) >= year) continue;
					for (const talk of list) {
						if (talk.speakerIds?.includes(id) && !talk.speakerTaglines?.[id]) {
							talk.speakerTaglines = { ...talk.speakerTaglines, [id]: profile.tagline };
						}
					}
				}
				jobChanges.push({ id, from: profile.tagline, to: s.tagline });
			}
			if (s.tagline) profile.tagline = s.tagline;
			if (s.bio) profile.bio = s.bio;
			if (s.photoUrl && (year > profile.year || !profile.photo)) {
				photos.push({ id, url: s.photoUrl });
			}
			profile.year = year;
		} else if (s.photoUrl && !profile.photo) {
			photos.push({ id, url: s.photoUrl });
		}
	}

	allTalks[year] = given.map((t) => {
		const ids = t.speakers.map((s) => idFor(s.name));
		const taglines: Record<string, string> = {};
		for (const id of ids) {
			const tagline = thisYear.get(id)?.tagline;
			if (tagline && tagline !== profiles[id].tagline) taglines[id] = tagline;
		}
		return {
			speaker: joinNames(t.speakers.map((s) => s.name)),
			title: t.title,
			speakerIds: ids,
			...(Object.keys(taglines).length && { speakerTaglines: taglines }),
			...(t.description && { description: t.description })
		};
	});

	// A tagline at the time that's the same as the profile's says nothing.
	for (const list of Object.values(allTalks)) {
		for (const talk of list) {
			if (!talk.speakerTaglines) continue;
			for (const [id, tagline] of Object.entries(talk.speakerTaglines)) {
				if (profiles[id]?.tagline === tagline) delete talk.speakerTaglines[id];
			}
			if (!Object.keys(talk.speakerTaglines).length) delete talk.speakerTaglines;
		}
	}

	const before = new Set((talksByYear[year] ?? []).map((t) => t.title));
	const after = new Set(allTalks[year].map((t) => t.title));
	const changed = Object.fromEntries(
		Object.entries(allTalks).filter(
			([y, list]) => comparable(list) !== comparable(talksByYear[Number(y)])
		)
	);

	return {
		talksByYear: changed,
		speakers: profiles,
		photos,
		report: {
			talks: allTalks[year].length,
			added: [...after].filter((t) => !before.has(t)),
			removed: [...before].filter((t) => !after.has(t)),
			unscheduled: unscheduled.map(
				(t) => `${t.title} (${joinNames(t.speakers.map((s) => s.name))})`
			),
			newSpeakers,
			jobChanges,
			possibleDuplicates: findPossibleDuplicates(
				[...thisYear].filter(([id]) => !known.has(id)),
				speakers,
				talksByYear
			)
		}
	};
}

/**
 * New speakers who might be someone we already know under another name: the same surname and first
 * initial, or one name inside the other ("Stu Lang" and "Stuart Lang", "Andrew Chaa" and "Youngho
 * Andrew Chaa"). Only a hint: the script asks someone to check.
 */
function findPossibleDuplicates(
	newcomers: [string, ImportedSpeaker][],
	speakers: Record<string, PastSpeaker>,
	talksByYear: Record<number, Talk[]>
): ImportReport['possibleDuplicates'] {
	const knownNames = new Map<string, string>();
	for (const [id, p] of Object.entries(speakers)) knownNames.set(id, p.name);
	// Older years have names but no profiles.
	for (const list of Object.values(talksByYear)) {
		for (const t of list) if (!t.speakerIds) knownNames.set(talkSlug(t.speaker), t.speaker);
	}
	const words = (name: string) => talkSlug(name).split('-').filter(Boolean);
	const found: ImportReport['possibleDuplicates'] = [];
	for (const [id, s] of newcomers) {
		const a = words(s.name);
		for (const [otherId, other] of knownNames) {
			if (otherId === id) continue;
			const b = words(other);
			const sameSurname = a.at(-1) === b.at(-1) && a[0][0] === b[0][0];
			const contained = a.every((w) => b.includes(w)) || b.every((w) => a.includes(w));
			if (sameSurname || contained) found.push({ name: s.name, id, like: other });
		}
	}
	return found;
}

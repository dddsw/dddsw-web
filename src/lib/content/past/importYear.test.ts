import { describe, expect, it } from 'vitest';
import type { Talk } from '../pastEvents.ts';
import type { PastSpeaker } from '../pastSpeakers.ts';
import {
	cleanText,
	cleanTitle,
	excelDateTime,
	fromSessionizeApi,
	fromSessionizeExport,
	importYear,
	type ImportedTalk,
	type ImportInput
} from './importYear.ts';

const talk = (title: string, ...speakers: [name: string, tagline?: string][]): ImportedTalk => ({
	title,
	startsAt: '2027-05-15T09:30:00',
	room: 'Track 1',
	speakers: speakers.map(([name, tagline]) => ({ name, tagline, photoUrl: `https://img/${name}` }))
});

const run = (input: Partial<ImportInput> & Pick<ImportInput, 'year' | 'talks'>) =>
	importYear({ talksByYear: {}, speakers: {}, aliases: {}, ...input });

describe('cleaning Sessionize text', () => {
	it('tidies line breaks, trailing spaces, blank lines and bold', () => {
		expect(cleanText('Abstract \r\n\r\n\r\nThe **coupling** problem.  \r\n')).toBe(
			'Abstract\n\nThe coupling problem.'
		);
	});

	it('drops the sponsor tag from titles', () => {
		expect(cleanTitle('Atypical careers in tech [Brought to you by SECCL]')).toBe(
			'Atypical careers in tech'
		);
	});

	it('reads Excel dates as local time', () => {
		expect(excelDateTime('45045.395833333328')).toBe('2023-04-29T09:30:00');
		expect(excelDateTime(undefined)).toBeUndefined();
	});
});

describe('fromSessionizeExport', () => {
	it('adds co-presenters from the rows with a blank title', () => {
		const talks = fromSessionizeExport([
			{
				'Session Id': '1',
				Title: 'Event sourcing',
				FirstName: 'James',
				LastName: 'World',
				Room: 'Track 2',
				'Scheduled At': '45045.5'
			},
			{ 'Session Id': '1', Title: '', FirstName: 'Gareth', LastName: 'James', TagLine: 'Architect' }
		]);
		expect(talks).toHaveLength(1);
		expect(talks[0].speakers.map((s) => s.name)).toEqual(['James World', 'Gareth James']);
		expect(talks[0].speakers[1].tagline).toBe('Architect');
		expect(talks[0].startsAt).toBe('2023-04-29T12:00:00');
	});
});

describe('fromSessionizeApi', () => {
	it('maps sessions and their speakers, leaving out service sessions', () => {
		const talks = fromSessionizeApi({
			sessions: [
				{ title: 'Lunch', isServiceSession: true, speakers: [] },
				{
					title: 'Talk',
					description: 'A\r\nB',
					startsAt: '2027-05-15T09:30:00',
					roomId: 7,
					speakers: ['s1']
				}
			],
			speakers: [
				{ id: 's1', fullName: 'Ada Lovelace', tagLine: 'Analyst', profilePicture: 'https://img' }
			],
			rooms: [{ id: 7, name: 'Track 1' }]
		});
		expect(talks).toEqual([
			{
				title: 'Talk',
				description: 'A\nB',
				startsAt: '2027-05-15T09:30:00',
				room: 'Track 1',
				speakers: [
					{ name: 'Ada Lovelace', tagline: 'Analyst', bio: undefined, photoUrl: 'https://img' }
				]
			}
		]);
	});
});

describe('importYear', () => {
	it('adds a new year, with profiles and photos for new speakers', () => {
		const result = run({ year: 2027, talks: [talk('Engines', ['Ada Lovelace', 'Analyst'])] });
		expect(result.talksByYear[2027]).toEqual([
			{ speaker: 'Ada Lovelace', title: 'Engines', speakerIds: ['ada-lovelace'] }
		]);
		expect(result.speakers['ada-lovelace']).toEqual({
			name: 'Ada Lovelace',
			tagline: 'Analyst',
			year: 2027
		});
		expect(result.photos).toEqual([{ id: 'ada-lovelace', url: 'https://img/Ada Lovelace' }]);
		expect(result.report.newSpeakers).toEqual(['Ada Lovelace']);
	});

	it('orders talks by time, then track', () => {
		const at = (title: string, startsAt: string, room: string) => ({
			...talk(title, ['A B']),
			startsAt,
			room
		});
		const result = run({
			year: 2027,
			talks: [
				at('c', '10:00', 'Track 1'),
				at('b', '09:00', 'Track 10'),
				at('a', '09:00', 'Track 2')
			]
		});
		expect(result.talksByYear[2027].map((t) => t.title)).toEqual(['a', 'b', 'c']);
	});

	it('leaves out sessions that were never scheduled', () => {
		const result = run({
			year: 2027,
			talks: [
				talk('Given', ['A B']),
				{ ...talk('Withdrawn', ['C D']), startsAt: undefined, room: undefined }
			]
		});
		expect(result.talksByYear[2027].map((t) => t.title)).toEqual(['Given']);
		expect(result.report.unscheduled).toEqual(['Withdrawn (C D)']);
	});

	it('names everyone who gave a talk together', () => {
		const result = run({ year: 2027, talks: [talk('Pairing', ['A B'], ['C D'], ['E F'])] });
		expect(result.talksByYear[2027][0].speaker).toBe('A B, C D and E F');
	});

	it('moves a returning speaker to their new job, and keeps the old one on earlier talks', () => {
		const talksByYear: Record<number, Talk[]> = {
			2026: [{ speaker: 'Ada Lovelace', title: 'Notes', speakerIds: ['ada-lovelace'] }]
		};
		const speakers: Record<string, PastSpeaker> = {
			'ada-lovelace': {
				name: 'Ada Lovelace',
				tagline: 'Analyst',
				photo: 'past-speakers/ada-lovelace.jpg',
				year: 2026
			}
		};
		const result = run({
			year: 2027,
			talks: [talk('Engines', ['Ada Lovelace', 'Countess'])],
			talksByYear,
			speakers
		});

		expect(result.speakers['ada-lovelace']).toMatchObject({ tagline: 'Countess', year: 2027 });
		expect(result.talksByYear[2026][0].speakerTaglines).toEqual({ 'ada-lovelace': 'Analyst' });
		expect(result.talksByYear[2027][0].speakerTaglines).toBeUndefined();
		expect(result.photos).toEqual([{ id: 'ada-lovelace', url: 'https://img/Ada Lovelace' }]);
		expect(result.report.jobChanges).toEqual([
			{ id: 'ada-lovelace', from: 'Analyst', to: 'Countess' }
		]);
		// The input is left as it was.
		expect(speakers['ada-lovelace'].tagline).toBe('Analyst');
	});

	it('leaves the profile alone when importing an older year, and records the job then', () => {
		const speakers: Record<string, PastSpeaker> = {
			'ada-lovelace': {
				name: 'Ada Lovelace',
				tagline: 'Countess',
				photo: 'past-speakers/ada-lovelace.jpg',
				year: 2027
			}
		};
		const result = run({
			year: 2024,
			talks: [talk('Notes', ['Ada Lovelace', 'Analyst'])],
			speakers
		});
		expect(result.speakers['ada-lovelace']).toEqual(speakers['ada-lovelace']);
		expect(result.talksByYear[2024][0].speakerTaglines).toEqual({ 'ada-lovelace': 'Analyst' });
		expect(result.photos).toEqual([]);
	});

	it('keeps the old tagline when a newer year has none', () => {
		const speakers: Record<string, PastSpeaker> = {
			'ada-lovelace': { name: 'Ada Lovelace', tagline: 'Analyst', year: 2026 }
		};
		const result = run({ year: 2027, talks: [talk('Engines', ['Ada Lovelace'])], speakers });
		expect(result.speakers['ada-lovelace'].tagline).toBe('Analyst');
	});

	it('uses aliases, so someone who changed their name keeps one profile', () => {
		const speakers: Record<string, PastSpeaker> = {
			'stuart-lang': { name: 'Stuart Lang', tagline: 'Engineer', year: 2024 }
		};
		const result = run({
			year: 2025,
			talks: [talk('Mutants', ['Stu Lang'])],
			speakers,
			aliases: { 'Stu Lang': 'stuart-lang' }
		});
		expect(result.talksByYear[2025][0]).toMatchObject({
			speaker: 'Stu Lang',
			speakerIds: ['stuart-lang']
		});
		expect(result.speakers['stuart-lang'].name).toBe('Stuart Lang');
		expect(result.report.newSpeakers).toEqual([]);
	});

	it('flags new speakers who might be someone we know', () => {
		const result = run({
			year: 2027,
			talks: [talk('Mutants', ['Stu Lang'])],
			speakers: { 'stuart-lang': { name: 'Stuart Lang', year: 2024 } }
		});
		expect(result.report.possibleDuplicates).toEqual([
			{ name: 'Stu Lang', id: 'stu-lang', like: 'Stuart Lang' }
		]);
	});

	it('changes nothing when run again with the same source', () => {
		const talks = [
			talk('Engines', ['Ada Lovelace', 'Countess']),
			talk('Pairing', ['A B'], ['C D'])
		];
		const first = run({ year: 2027, talks });
		// As the script does once it has downloaded them.
		for (const { id } of first.photos) first.speakers[id].photo = `past-speakers/${id}.jpg`;
		const again = importYear({
			year: 2027,
			talks,
			talksByYear: first.talksByYear,
			speakers: first.speakers,
			aliases: {}
		});
		expect(again.talksByYear).toEqual({});
		expect(again.speakers).toEqual(first.speakers);
		expect(again.photos).toEqual([]);
	});
});

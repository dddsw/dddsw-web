import { describe, expect, it } from 'vitest';
import { pastEvents } from './pastEvents.ts';
import {
	buildDirectory,
	initials,
	speakerDirectory,
	taglineAt,
	talkSpeakers
} from './speakerDirectory.ts';

const find = (id: string) => speakerDirectory.find((s) => s.id === id);

describe('speaker directory', () => {
	it('lists every talk given by a person, once', () => {
		const talks = pastEvents.flatMap((e) => (e.talks ?? []).flatMap((t) => talkSpeakers(t)));
		const listed = speakerDirectory.reduce((n, s) => n + s.talks.length, 0);
		expect(listed).toBe(talks.length);
	});

	it('gives every speaker a unique id and is sorted by name', () => {
		const ids = speakerDirectory.map((s) => s.id);
		expect(new Set(ids).size).toBe(ids.length);
		const names = speakerDirectory.map((s) => s.name);
		expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b, 'en-GB')));
	});

	it('includes speakers without a profile photo', () => {
		const speaker = find('dave-mateer')!;
		expect(speaker.name).toBe('Dave Mateer');
		expect(speaker.photo).toBeUndefined();
	});

	it('puts the talks of someone who went by different names together', () => {
		const stuart = find('stuart-lang')!;
		expect(stuart.name).toBe('Stuart Lang');
		expect(find('stu-lang')).toBeUndefined();
		expect(find('richard-wilde')!.name).toBe('Richard Wilde');
		expect(find('richard-wilde')!.talks.length).toBeGreaterThan(1);
		expect(find('anna-wykes')).toBeUndefined();
	});

	it('lists each speaker of a talk given by more than one person', () => {
		expect(find('james-world')).toBeDefined();
		expect(find('gareth-james')).toBeDefined();
	});

	it('leaves out talks that were not given by a person', () => {
		expect(find('panel')).toBeUndefined();
	});

	it('links to the talk details where there are some, else the year', () => {
		const directory = buildDirectory(
			[
				{
					year: 2020,
					title: 'Test',
					summary: '',
					talks: [
						{ speaker: 'Ada Lovelace', title: 'Engines', description: 'About engines' },
						{ speaker: 'Ada Lovelace', title: 'Notes' }
					]
				}
			],
			{}
		);
		expect(directory).toEqual([
			{
				id: 'ada-lovelace',
				name: 'Ada Lovelace',
				tagline: undefined,
				photo: undefined,
				talks: [
					{ year: 2020, title: 'Engines', href: '/past-events#2020/engines' },
					{ year: 2020, title: 'Notes', href: '/past-events#2020' }
				]
			}
		]);
	});
});

describe('initials', () => {
	it('uses the first and last names', () => {
		expect(initials('Chaithali Shashikanth Kundapur')).toBe('CK');
		expect(initials('Kevlin Henney')).toBe('KH');
		expect(initials("Richard 'Rippo' Wilde")).toBe('RW');
	});
});

describe('job titles', () => {
	it('shows what a speaker does now on their card, and what they did then by each talk', () => {
		const andrew = speakerDirectory.find((s) => s.id === 'andrew-poole')!;
		expect(andrew.tagline).toBe('Senior Backend Engineer @ Flagstone');
		const byYear = Object.fromEntries(andrew.talks.map((t) => [t.year, t.taglineThen]));
		expect(byYear[2026]).toBeUndefined();
		expect(byYear[2025]).toBe('Senior Software Engineer @ ClearBank');
		expect(byYear[2024]).toBe('Senior Software Engineer @ ClearBank');
	});

	it('uses the job at the time on the past events page', () => {
		const talksBy = (year: number, id: string) =>
			pastEvents.find((e) => e.year === year)!.talks!.filter((t) => t.speakerIds?.includes(id));
		expect(taglineAt(talksBy(2024, 'andrew-poole')[0], 'andrew-poole')).toBe(
			'Senior Software Engineer @ ClearBank'
		);
		expect(taglineAt(talksBy(2026, 'andrew-poole')[0], 'andrew-poole')).toBe(
			'Senior Backend Engineer @ Flagstone'
		);
	});

	it('only records a job at the time for someone who gave the talk', () => {
		for (const talk of pastEvents.flatMap((e) => e.talks ?? [])) {
			for (const id of Object.keys(talk.speakerTaglines ?? {})) {
				expect(talk.speakerIds).toContain(id);
			}
		}
	});
});

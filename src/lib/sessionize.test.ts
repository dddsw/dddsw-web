import { describe, expect, it, vi } from 'vitest';
import { loadProgramme, mapProgramme, placeholderProgramme } from './sessionize';

const raw = {
	sessions: [
		{
			id: '1',
			title: 'Cows & Code',
			description: 'Moo.',
			startsAt: '2030-06-15T10:00:00',
			endsAt: '2030-06-15T10:45:00',
			room: 'Room A',
			isServiceSession: false,
			speakers: [{ id: 's1', name: 'Ada' }]
		},
		{
			id: '2',
			title: 'Lunch',
			description: null,
			startsAt: '2030-06-15T12:00:00',
			endsAt: '2030-06-15T13:00:00',
			room: null,
			isServiceSession: true,
			speakers: []
		}
	],
	speakers: [
		{
			id: 's1',
			fullName: 'Ada',
			tagLine: 'Engineer',
			bio: 'Writes code.',
			profilePicture: 'https://example.com/a.jpg',
			sessions: [{ id: 1, name: 'Cows & Code' }],
			links: [{ title: 'Website', url: 'https://example.com', linkType: 'Company_Website' }]
		}
	]
};

describe('mapProgramme', () => {
	it('maps sessions and speakers into the site shape, sorted by start time', () => {
		const p = mapProgramme(raw);
		expect(p.isPlaceholder).toBe(false);
		expect(p.sessions.map((s) => s.title)).toEqual(['Cows & Code', 'Lunch']);
		expect(p.sessions[0]).toMatchObject({
			room: 'Room A',
			speakerNames: ['Ada'],
			isService: false
		});
		expect(p.speakers[0]).toMatchObject({
			name: 'Ada',
			tagline: 'Engineer',
			sessionTitles: ['Cows & Code']
		});
	});
	it('tolerates missing fields', () => {
		const p = mapProgramme({});
		expect(p.sessions).toEqual([]);
		expect(p.speakers).toEqual([]);
	});
});

describe('loadProgramme', () => {
	it('returns placeholder data when no id is configured', async () => {
		const fetchFn = vi.fn();
		const p = await loadProgramme(fetchFn as unknown as typeof fetch, '');
		expect(fetchFn).not.toHaveBeenCalled();
		expect(p).toEqual(placeholderProgramme);
		expect(p.isPlaceholder).toBe(true);
	});
	it('falls back to placeholder data (and warns) when the request fails', async () => {
		const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
		const fetchFn = vi.fn().mockRejectedValue(new Error('offline'));
		const p = await loadProgramme(
			fetchFn as unknown as typeof fetch,
			'https://sessionize.com/api/v2/abc'
		);
		expect(p.isPlaceholder).toBe(true);
		expect(warn).toHaveBeenCalled();
		warn.mockRestore();
	});
	it('falls back on a non-OK response', async () => {
		const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
		const fetchFn = vi.fn().mockResolvedValue({ ok: false, status: 404 });
		const p = await loadProgramme(
			fetchFn as unknown as typeof fetch,
			'https://sessionize.com/api/v2/abc'
		);
		expect(p.isPlaceholder).toBe(true);
		warn.mockRestore();
	});
	it('maps a successful response', async () => {
		const fetchFn = vi.fn().mockResolvedValue({ ok: true, json: async () => raw });
		const p = await loadProgramme(
			fetchFn as unknown as typeof fetch,
			'https://sessionize.com/api/v2/abc'
		);
		expect(fetchFn).toHaveBeenCalledWith('https://sessionize.com/api/v2/abc/view/All');
		expect(p.isPlaceholder).toBe(false);
		expect(p.sessions).toHaveLength(2);
	});
});

import { describe, expect, it } from 'vitest';
import { pastEvents, talkSlug } from './pastEvents.ts';
import { pastSpeakers } from './pastSpeakers.ts';

describe('talkSlug', () => {
	it('makes a readable slug from a title', () => {
		expect(talkSlug('Passkeys in ASP.NET Core 10')).toBe('passkeys-in-asp-net-core-10');
		expect(talkSlug("Unf*ck your mind: Don't panic!")).toBe('unf-ck-your-mind-don-t-panic');
	});

	it('cuts long titles at a whole word', () => {
		const slug = talkSlug(
			'Software engineering is dead. Long live Software engineering! Surviving and thriving in the new era'
		);
		expect(slug.length).toBeLessThanOrEqual(60);
		expect(slug).toBe('software-engineering-is-dead-long-live-software-engineering');
	});

	it.each(pastEvents.filter((e) => e.talks).map((e) => [e.year, e.talks!] as const))(
		'gives every %i talk its own link',
		(_year, talks) => {
			const slugs = talks.map((t) => talkSlug(t.title));
			expect(slugs.every(Boolean)).toBe(true);
			expect(new Set(slugs).size).toBe(slugs.length);
		}
	);
});

describe('past speakers', () => {
	it('every speaker a talk refers to exists', () => {
		const ids = pastEvents.flatMap((e) => (e.talks ?? []).flatMap((t) => t.speakerIds ?? []));
		expect(ids.filter((id) => !pastSpeakers[id])).toEqual([]);
	});
});

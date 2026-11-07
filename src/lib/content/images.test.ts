import { existsSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { describe, expect, it } from 'vitest';
import { pastEvents } from './pastEvents.ts';
import { sponsorArchive, sponsors } from './sponsors.ts';
import { team } from './team.ts';

const staticDir = join(import.meta.dirname, '../../../static');

/** The folders of images the site shows. (Others under static/images are old and unlinked.) */
const shownFolders = ['images/venue', 'images/past', 'images/sponsors', 'images/team'];

/** The spec's line for "needs a second look"; every photo we show fits comfortably under it. */
const maxBytes = 200 * 1024;

function filesIn(dir: string): string[] {
	return readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
		entry.isDirectory() ? filesIn(join(dir, entry.name)) : [join(dir, entry.name)]
	);
}

describe('images', () => {
	const files = shownFolders.flatMap((folder) => filesIn(join(staticDir, folder)));

	// To add one: resize it to about twice the size it is shown at and save it as WebP
	// (quality ~80 for photos, ~90 for logos), e.g. with https://squoosh.app.
	it.each(files.map((f) => relative(staticDir, f)))('%s is WebP, AVIF or SVG and small', (file) => {
		expect(file).toMatch(/\.(webp|avif|svg)$/);
		expect(statSync(join(staticDir, file)).size).toBeLessThanOrEqual(maxBytes);
	});

	it('every image the content refers to exists', () => {
		const referenced = [
			...pastEvents.flatMap((e) => [e.logo, ...(e.photos ?? []).map((p) => p.src)]),
			...[...sponsors, ...sponsorArchive].map((s) => `/images/sponsors/${s.logo}`),
			...team.map((m) => `/images/team/${m.photo}`)
		].filter((src): src is string => !!src);
		const missing = referenced.filter((src) => !existsSync(join(staticDir, src)));
		expect(missing).toEqual([]);
	});
});

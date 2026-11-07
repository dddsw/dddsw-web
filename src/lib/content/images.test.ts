import { existsSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
// sharp comes with @sveltejs/enhanced-img, which uses it for the build.
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';
import { pastEvents } from './pastEvents.ts';
import { sponsorArchive, sponsors } from './sponsors.ts';
import { team } from './team.ts';

/** Where `picture()` in #lib/images.ts finds images; the build makes AVIF/WebP sizes of each. */
const imagesDir = join(import.meta.dirname, '../assets/images');

function filesIn(dir: string): string[] {
	return readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
		entry.isDirectory() ? filesIn(join(dir, entry.name)) : [join(dir, entry.name)]
	);
}

describe('images', () => {
	it('every image the content refers to exists', () => {
		const referenced = [
			...pastEvents.flatMap((e) => [e.logo, ...(e.photos ?? []).map((p) => p.src)]),
			...[...sponsors, ...sponsorArchive].map((s) => `sponsors/${s.logo}`),
			...team.map((m) => `team/${m.photo}`)
		].filter((src): src is string => !!src);
		const missing = referenced.filter((src) => !existsSync(join(imagesDir, src)));
		expect(missing).toEqual([]);
	});

	// Logos and avatars are shown at one size, so the build only makes 1x and 2x copies of the file
	// as it is: a 4000px logo would be served at 4000px. Save them at about twice their shown size.
	it.each(
		['sponsors', 'past-logos', 'team'].flatMap((folder) =>
			filesIn(join(imagesDir, folder)).map((f) => relative(imagesDir, f))
		)
	)('%s is at most 600px wide or tall', async (file) => {
		const { width = 0, height = 0 } = await sharp(join(imagesDir, file)).metadata();
		expect(Math.max(width, height)).toBeLessThanOrEqual(600);
	});

	// Photos are resized by the build, but keep the repository sensible.
	it.each(filesIn(imagesDir).map((f) => relative(imagesDir, f)))('%s is under 2 MB', (file) => {
		expect(statSync(join(imagesDir, file)).size).toBeLessThan(2 * 1024 * 1024);
	});
});

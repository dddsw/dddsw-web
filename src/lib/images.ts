import type { Picture } from '@sveltejs/enhanced-img';

/**
 * The images under src/lib/assets/images, processed at build time by `@sveltejs/enhanced-img` into
 * AVIF, WebP and a JPEG/PNG fallback. Put new images there (not in static/) and refer to them by
 * their path in that folder, e.g. `picture('venue/sloane-robinson-cafe.jpg')`. (Vite needs the
 * glob patterns below as plain strings, so a new folder has to be added to one of them.)
 */

/**
 * Photos, shown at different widths on different screens: the build makes a range of widths up
 * to the original's, so add them at full size and give each `<enhanced:img>` a `sizes` attribute.
 * (`imgSizes` is how enhanced-img's own preprocessor asks for that; we can't use it, as the
 * image is chosen at runtime.)
 */
const photos = import.meta.glob<Picture>(
	'./assets/images/{venue,past}/**/*.{avif,gif,jpeg,jpg,png,webp}',
	{
		eager: true,
		query: { enhanced: true, imgSizes: 'responsive' },
		import: 'default'
	}
);

/**
 * Logos and avatars, always shown at about the same size: the build makes the file as it is
 * (for 2x screens) and half of it (for 1x), so save them at twice the size they're shown.
 */
const fixedSize = import.meta.glob<Picture>(
	'./assets/images/{sponsors,past-logos,team}/**/*.{avif,gif,jpeg,jpg,png,webp}',
	{ eager: true, query: { enhanced: true }, import: 'default' }
);

const pictures = { ...photos, ...fixedSize };

export function picture(path: string): Picture {
	const found = pictures[`./assets/images/${path}`];
	if (!found) {
		throw new Error(`No image at src/lib/assets/images/${path} (or its folder isn't listed here)`);
	}
	return found;
}

import { Resvg } from '@resvg/resvg-js';
import { cowPath, cowViewBox } from '../cow.ts';
import {
	assetFile,
	previewFile,
	previewWidth,
	schemes,
	socialAssets,
	type Scheme,
	type SocialAsset
} from '../socialAssets.ts';

// Runs in Node at build time (and in the dev server), never in the deployed site. There is no
// text in these images, so no fonts are needed: they are plain SVG, rendered straight to PNG.

// The theme's primary-500 and surface-950 (src/dddsw-theme.css) as hex.
const orange = '#ff9930';
const ink = '#0d152a';

const [, , cowWidth, cowHeight] = cowViewBox.split(' ').map(Number);

/** The colours for each scheme: the background, the main cow, and the fainter cows behind it. */
const colours: Record<Scheme, { background: string; cow: string; faint: string }> = {
	orange: { background: orange, cow: ink, faint: '#ffb866' },
	ink: { background: ink, cow: orange, faint: '#1d2a4d' }
};

/** A cow `width` wide, with its left edge at `x` and its feet on `baseline`. */
function cow(x: number, baseline: number, width: number, fill: string): string {
	const scale = width / cowWidth;
	const y = baseline - cowHeight * scale;
	return `<path transform="translate(${x} ${y}) scale(${scale})" fill="${fill}" d="${cowPath}"/>`;
}

/** The main cow with a herd of fainter, smaller ones trailing off behind it to the left. */
function herd(scheme: Scheme, right: number, baseline: number, mainWidth: number): string {
	const { cow: main, faint } = colours[scheme];
	const first = mainWidth * 0.62;
	const second = mainWidth * 0.42;
	const mainX = right - mainWidth;
	const firstX = mainX - first * 0.7;
	const secondX = firstX - second * 0.7;
	return (
		cow(secondX, baseline, second, faint) +
		cow(firstX, baseline, first, faint) +
		cow(mainX, baseline, mainWidth, main)
	);
}

/** Each kind of image places its cows differently, so there's room for words on posts. */
function layout({ kind, width, height }: SocialAsset, scheme: Scheme): string {
	if (kind === 'avatar') {
		// Well inside the circle that most sites crop a profile picture to.
		const w = width * 0.74;
		return cow(
			(width - w) / 2,
			height / 2 + (w * cowHeight) / cowWidth / 2,
			w,
			colours[scheme].cow
		);
	}
	if (kind === 'banner') {
		// On the right, because profile pictures cover the left of a banner.
		const w = ((height * 0.72) / cowHeight) * cowWidth;
		return herd(scheme, width - width * 0.06, height * 0.86, w);
	}
	// A post: the herd along the bottom, leaving the top free for words.
	const w = Math.min(width * 0.62, height * 0.95);
	const margin = Math.min(width, height) * 0.06;
	return herd(scheme, width - margin, height - margin, w);
}

export function socialAssetSvg(asset: SocialAsset, scheme: Scheme): string {
	const { width, height } = asset;
	return (
		`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">` +
		`<rect width="${width}" height="${height}" fill="${colours[scheme].background}"/>` +
		layout(asset, scheme) +
		`</svg>`
	);
}

export function renderSocialAsset(asset: SocialAsset, scheme: Scheme, width?: number): Buffer {
	const fitTo = width ? { mode: 'width' as const, value: width } : undefined;
	return new Resvg(socialAssetSvg(asset, scheme), { fitTo }).render().asPng();
}

/**
 * Every image, by the file name it is served under (e.g. `square-post-orange.png`), and a small
 * preview of each for the page (e.g. `square-post-orange-preview.png`): the full-size images are
 * for downloading, not for showing at the size of a thumbnail.
 */
export function renderAllSocialAssets(): Map<string, Buffer> {
	const files = new Map<string, Buffer>();
	for (const asset of socialAssets) {
		for (const { id } of schemes) {
			files.set(assetFile(asset, id), renderSocialAsset(asset, id));
			files.set(previewFile(asset, id), renderSocialAsset(asset, id, previewWidth));
		}
	}
	return files;
}

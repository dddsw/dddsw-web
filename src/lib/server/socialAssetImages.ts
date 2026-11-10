import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { inflateSync } from 'node:zlib';
import { Resvg } from '@resvg/resvg-js';
import { event } from '../eventDetails.ts';
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
// words on the images except the event name and year, set in the header's font.

// The theme's primary-500 and surface-950 (src/dddsw-theme.css) as hex.
const orange = '#ff9930';
const ink = '#0d152a';

// The site header's name and year are set in Fredoka semibold. resvg can't read WOFF, so the
// font is unwrapped to a plain TrueType file in memory.
const fontFamily = 'Fredoka SemiBold';
const fontFile = new URL(
	'../../../node_modules/@fontsource/fredoka/files/fredoka-latin-600-normal.woff',
	import.meta.url
);

/** Unwraps a WOFF 1.0 font into the TrueType/OpenType file it holds. */
function woffToSfnt(woff: Buffer): Buffer {
	const count = woff.readUInt16BE(12);
	const tables = Array.from({ length: count }, (_, i) => {
		const at = 44 + i * 20;
		const offset = woff.readUInt32BE(at + 4);
		const compLength = woff.readUInt32BE(at + 8);
		const origLength = woff.readUInt32BE(at + 12);
		const raw = woff.subarray(offset, offset + compLength);
		return {
			tag: woff.subarray(at, at + 4),
			checksum: woff.readUInt32BE(at + 16),
			data: compLength < origLength ? inflateSync(raw) : raw
		};
	});
	const headerSize = 12 + count * 16;
	const parts = [Buffer.alloc(headerSize)];
	const header = parts[0];
	woff.copy(header, 0, 4, 8); // the font flavour
	header.writeUInt16BE(count, 4);
	let offset = headerSize;
	tables.forEach(({ tag, checksum, data }, i) => {
		const entry = 12 + i * 16;
		tag.copy(header, entry);
		header.writeUInt32BE(checksum, entry + 4);
		header.writeUInt32BE(offset, entry + 8);
		header.writeUInt32BE(data.length, entry + 12);
		const padded = Buffer.alloc((data.length + 3) & ~3);
		data.copy(padded);
		parts.push(padded);
		offset += padded.length;
	});
	return Buffer.concat(parts);
}

const [, , cowWidth, cowHeight] = cowViewBox.split(' ').map(Number);

/** The colours for each scheme: the background, the main cow, and the fainter cows behind it. */
const colours: Record<Scheme, { background: string; cow: string; faint: string; year: string }> = {
	orange: { background: orange, cow: ink, faint: '#ffb866', year: '#003e44' },
	ink: { background: ink, cow: orange, faint: '#1d2a4d', year: '#58c3cf' }
};

/** A cow `width` wide, with its left edge at `x` and its feet on `baseline`. */
function cow(x: number, baseline: number, width: number, fill: string): string {
	const scale = width / cowWidth;
	const y = baseline - cowHeight * scale;
	return `<path transform="translate(${x} ${y}) scale(${scale})" fill="${fill}" d="${cowPath}"/>`;
}

/** The main cow with a herd of fainter, smaller ones trailing off to the left, each in front of the larger one. */
function herd(scheme: Scheme, right: number, baseline: number, mainWidth: number): string {
	const { cow: main, faint } = colours[scheme];
	const first = mainWidth * 0.62;
	const second = mainWidth * 0.42;
	const mainX = right - mainWidth;
	// Each smaller cow overlaps the larger one beside it, standing in front of it.
	const gap = 0.85;
	const firstX = mainX - first * gap;
	const secondX = firstX - second * gap;
	return (
		cow(mainX, baseline, mainWidth, main) +
		cow(firstX, baseline, first, faint) +
		cow(secondX, baseline, second, faint)
	);
}

/** Each kind of image places its cows differently, so there's room for words on posts. */
function layout({ kind, width, height, wordmark }: SocialAsset, scheme: Scheme): string {
	if (kind === 'avatar' && wordmark) {
		// The cow with the name and year under it, as in the site header, the pair centred and well
		// inside the circle crop.
		const w = width * 0.56;
		const fontSize = width * 0.12;
		const capHeight = fontSize * 0.7;
		const gap = width * 0.06;
		const cowHeightPx = (w * cowHeight) / cowWidth;
		const top = (height - (cowHeightPx + gap + capHeight)) / 2;
		const { cow: main, year } = colours[scheme];
		return (
			cow((width - w) / 2, top + cowHeightPx, w, main) +
			`<text x="${width / 2}" y="${top + cowHeightPx + gap + capHeight}" text-anchor="middle" font-family="${fontFamily}" font-weight="600" font-size="${fontSize}" letter-spacing="${-fontSize * 0.025}" fill="${main}">` +
			`${event.shortName} <tspan fill="${year}">${event.year}</tspan></text>`
		);
	}
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

let unwrappedFont: string | undefined;
/** The font as a file on disk: resvg takes fontFiles, but its fontBuffers option breaks `fitTo`. */
function fontPath(): string {
	if (!unwrappedFont) {
		const dir = mkdtempSync(join(tmpdir(), 'social-assets-'));
		unwrappedFont = join(dir, 'fredoka-semibold.ttf');
		writeFileSync(unwrappedFont, woffToSfnt(readFileSync(fontFile)));
	}
	return unwrappedFont;
}

export function renderSocialAsset(asset: SocialAsset, scheme: Scheme, width?: number): Buffer {
	const fitTo = width ? { mode: 'width' as const, value: width } : undefined;
	return new Resvg(socialAssetSvg(asset, scheme), {
		fitTo,
		font: {
			fontFiles: [fontPath()],
			defaultFontFamily: fontFamily,
			loadSystemFonts: false
		}
	})
		.render()
		.asPng();
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

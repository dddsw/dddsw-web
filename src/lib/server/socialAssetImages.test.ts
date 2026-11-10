import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import {
	assetFile,
	previewFile,
	previewHeight,
	previewWidth,
	schemes,
	socialAssets
} from '../socialAssets.ts';
import { renderAllSocialAssets } from './socialAssetImages.ts';

describe('renderAllSocialAssets', () => {
	const files = renderAllSocialAssets();

	it('renders every size in every colour, with a preview of each', () => {
		expect([...files.keys()].sort()).toEqual(
			socialAssets
				.flatMap((a) => schemes.flatMap((s) => [assetFile(a, s.id), previewFile(a, s.id)]))
				.sort()
		);
	});

	it('renders PNGs at the size each one says', () => {
		for (const asset of socialAssets) {
			for (const { id } of schemes) {
				const png = files.get(assetFile(asset, id))!;
				expect(png.subarray(1, 4).toString()).toBe('PNG');
				// The IHDR chunk holds the width and height at bytes 16–23.
				expect(png.readUInt32BE(16)).toBe(asset.width);
				expect(png.readUInt32BE(20)).toBe(asset.height);
			}
		}
	});

	it('have a small preview of each, at the size the page reserves for it', () => {
		for (const asset of socialAssets) {
			for (const { id } of schemes) {
				const png = readFileSync(`static/social-assets/${previewFile(asset, id)}`);
				expect(png.readUInt32BE(16)).toBe(previewWidth);
				expect(png.readUInt32BE(20)).toBe(previewHeight(asset));
				expect(png.length).toBeLessThan(20 * 1024);
			}
		}
	});
});

describe('the saved images in static/social-assets', () => {
	it('are all there at the right size, so `npm run generate:social-assets` has been run', () => {
		for (const asset of socialAssets) {
			for (const { id } of schemes) {
				const png = readFileSync(`static/social-assets/${assetFile(asset, id)}`);
				expect(png.readUInt32BE(16)).toBe(asset.width);
				expect(png.readUInt32BE(20)).toBe(asset.height);
			}
		}
	});

	it('have a small preview of each, at the size the page reserves for it', () => {
		for (const asset of socialAssets) {
			for (const { id } of schemes) {
				const png = readFileSync(`static/social-assets/${previewFile(asset, id)}`);
				expect(png.readUInt32BE(16)).toBe(previewWidth);
				expect(png.readUInt32BE(20)).toBe(previewHeight(asset));
				expect(png.length).toBeLessThan(20 * 1024);
			}
		}
	});
});

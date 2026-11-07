import { describe, expect, it } from 'vitest';
import { socialCard } from '../socialCard.ts';
import { renderSocialCard } from './socialCardImage.ts';

describe('renderSocialCard', () => {
	it('renders a PNG at the size the Open Graph tags declare, small enough for every unfurler', async () => {
		const png = await renderSocialCard();

		expect(png.subarray(1, 4).toString()).toBe('PNG');
		// The IHDR chunk holds the width and height at bytes 16–23.
		expect(png.readUInt32BE(16)).toBe(socialCard.width);
		expect(png.readUInt32BE(20)).toBe(socialCard.height);
		// WhatsApp drops previews over 300 KB.
		expect(png.length).toBeLessThan(300 * 1024);
	});
});

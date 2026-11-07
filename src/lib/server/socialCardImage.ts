import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { cowPath, cowViewBox } from '../cow.ts';
import { socialCard } from '../socialCard.ts';

// Runs in Node at build time (and in the dev server), never in the deployed site.

// The theme's primary-500, surface-950 and surface-50 (src/dddsw-theme.css) as hex.
const orange = '#ff9930';
const ink = '#0d152a';
const paper = '#f9fafd';

const require = createRequire(import.meta.url);
// Satori needs static (not variable) fonts, as WOFF rather than WOFF2.
const font = (file: string) => readFile(require.resolve(file));

type Style = Record<string, string | number>;
type Node = { type: string; props: { style?: Style; children?: Child; [key: string]: unknown } };
type Child = Node | string | (Node | string)[];

const el = (
	type: string,
	style: Style,
	children?: Child,
	attrs: Record<string, unknown> = {}
): Node => ({
	type,
	props: { style, children, ...attrs }
});

function card(): Node {
	const cow = `data:image/svg+xml,${encodeURIComponent(
		`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${cowViewBox}"><path fill="#ffffff" fill-opacity="0.4" d="${cowPath}"/></svg>`
	)}`;
	const [, , boxWidth, boxHeight] = cowViewBox.split(' ').map(Number);
	const cowWidth = 400;

	return el(
		'div',
		{
			display: 'flex',
			width: '100%',
			height: '100%',
			position: 'relative',
			backgroundColor: orange,
			color: ink,
			fontFamily: 'Nunito'
		},
		[
			el('img', { position: 'absolute', right: 40, bottom: 60 }, undefined, {
				src: cow,
				width: cowWidth,
				height: Math.round((cowWidth * boxHeight) / boxWidth)
			}),
			el(
				'div',
				{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					padding: '80px 90px',
					gap: 28
				},
				[
					el(
						'div',
						{
							display: 'flex',
							flexDirection: 'column',
							fontFamily: 'Fredoka',
							fontWeight: 600,
							fontSize: 92,
							lineHeight: 1.02
						},
						[
							...socialCard.headline.map((line) => el('div', {}, line)),
							el(
								'div',
								{
									color: paper,
									WebkitTextStroke: `3px ${ink}`,
									textShadow: `0 5px 0 ${ink}`
								},
								socialCard.headlineLast
							)
						]
					),
					el('div', { fontSize: 34, lineHeight: 1.3, maxWidth: 640 }, socialCard.description),
					el('div', { fontSize: 30, fontWeight: 800 }, socialCard.host)
				]
			)
		]
	);
}

/** Renders the social card as a PNG. */
export async function renderSocialCard(): Promise<Buffer> {
	const [fredoka, nunito, nunitoBold] = await Promise.all([
		font('@fontsource/fredoka/files/fredoka-latin-600-normal.woff'),
		font('@fontsource/nunito/files/nunito-latin-400-normal.woff'),
		font('@fontsource/nunito/files/nunito-latin-800-normal.woff')
	]);
	const svg = await satori(card() as Parameters<typeof satori>[0], {
		width: socialCard.width,
		height: socialCard.height,
		fonts: [
			{ name: 'Fredoka', data: fredoka, weight: 600, style: 'normal' },
			{ name: 'Nunito', data: nunito, weight: 400, style: 'normal' },
			{ name: 'Nunito', data: nunitoBold, weight: 800, style: 'normal' }
		]
	});
	return new Resvg(svg).render().asPng();
}

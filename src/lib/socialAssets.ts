/**
 * The text-free images for social media: profile pictures, banners and post backgrounds in the
 * brand colours with the cow, so a post only needs its words adding. They are rendered by
 * `npm run generate:social-assets` (see `src/lib/server/socialAssetImages.ts`) into
 * `static/social-assets`, and saved in the repo.
 */

export type Scheme = 'orange' | 'ink';
export type AssetKind = 'avatar' | 'banner' | 'post';

export interface SocialAsset {
	/** The file name without its scheme or extension, e.g. `linkedin-banner`. */
	id: string;
	kind: AssetKind;
	label: string;
	/** Where it is used, shown on the page. */
	use: string;
	width: number;
	height: number;
	/** Whether the event name and year, as in the site header, sit under the cow. */
	wordmark?: boolean;
}

export const schemes: { id: Scheme; label: string }[] = [
	{ id: 'orange', label: 'Orange' },
	{ id: 'ink', label: 'Dark' }
];

export const socialAssets: SocialAsset[] = [
	{
		id: 'profile-picture',
		kind: 'avatar',
		label: 'Profile picture',
		use: 'Bluesky, LinkedIn, Facebook and X. The cow stays clear of the circle crop.',
		width: 1080,
		height: 1080
	},
	{
		id: 'profile-picture-name',
		kind: 'avatar',
		label: 'Profile picture with name',
		use: 'The same, with the event name and year under the cow, as in the site header.',
		width: 1080,
		height: 1080,
		wordmark: true
	},
	{
		id: 'linkedin-banner',
		kind: 'banner',
		label: 'LinkedIn banner',
		use: 'LinkedIn company page cover. The cow sits on the right, clear of the profile picture.',
		width: 1584,
		height: 396
	},
	{
		id: 'bluesky-banner',
		kind: 'banner',
		label: 'Bluesky and X banner',
		use: 'Bluesky and X profile headers (3:1).',
		width: 3000,
		height: 1000
	},
	{
		id: 'landscape-post',
		kind: 'post',
		label: 'Landscape post',
		use: 'Link and image posts on Bluesky, LinkedIn and X (16:9).',
		width: 1200,
		height: 675
	},
	{
		id: 'square-post',
		kind: 'post',
		label: 'Square post',
		use: 'Instagram, Facebook and LinkedIn feed posts.',
		width: 1080,
		height: 1080
	},
	{
		id: 'portrait-post',
		kind: 'post',
		label: 'Portrait post',
		use: 'Instagram and LinkedIn feed posts that take more room (4:5).',
		width: 1080,
		height: 1350
	},
	{
		id: 'story',
		kind: 'post',
		label: 'Story',
		use: 'Instagram and Facebook stories, and reels covers (9:16).',
		width: 1080,
		height: 1920
	}
];

/** Where the images are served from, e.g. `/social-assets/square-post-orange.png`. */
export const socialAssetsPath = '/social-assets';

export const assetFile = (asset: SocialAsset, scheme: Scheme) => `${asset.id}-${scheme}.png`;
/** The width of the small previews shown on the page, enough for a 2x screen. */
export const previewWidth = 480;

export const previewFile = (asset: SocialAsset, scheme: Scheme) =>
	`${asset.id}-${scheme}-preview.png`;
export const previewUrl = (asset: SocialAsset, scheme: Scheme) =>
	`${socialAssetsPath}/${previewFile(asset, scheme)}`;
/** The preview's height, so the page can reserve its space. */
export const previewHeight = (asset: SocialAsset) =>
	Math.round((previewWidth * asset.height) / asset.width);

export const assetUrl = (asset: SocialAsset, scheme: Scheme) =>
	`${socialAssetsPath}/${assetFile(asset, scheme)}`;

/** Logos and icons we already have, offered for download as they are. */
export const mediaDownloads = {
	logos: [
		{
			file: '/images/logo-fill.png',
			width: 973,
			height: 469,
			label: 'Logo 2026, on orange',
			note: 'The DDDSW 2026 logo, white on its orange rounded badge.',
			onDark: false
		},
		{
			file: '/images/logo.png',
			width: 857,
			height: 345,
			label: 'Logo 2024, white',
			note: 'The 2024 logo in white with a transparent background: put it on a dark or orange background.',
			onDark: true
		},
		{
			file: '/images/dddsw-logo-2025.png',
			width: 857,
			height: 345,
			label: 'Logo 2025, white',
			note: "Last year's logo in white with a transparent background.",
			onDark: true
		},
		{
			file: '/images/the_mighty_cow_white.svg',
			width: 1080,
			height: 593,
			label: 'The mighty cow, white',
			note: 'The cow on its own as a white vector, with a transparent background.',
			onDark: true
		}
	],
	icons: [
		{
			file: '/icon-512.png',
			width: 512,
			height: 512,
			label: 'App icon (512 px)',
			note: 'The cow icon used when the site is saved to a home screen.',
			onDark: false
		},
		{
			file: '/apple-touch-icon.png',
			width: 180,
			height: 180,
			label: 'Apple touch icon',
			note: 'The same icon at 180 px.',
			onDark: false
		},
		{
			file: '/favicon.svg',
			width: 120,
			height: 120,
			label: 'Favicon (SVG)',
			note: 'The small browser tab icon, as a vector.',
			onDark: false
		}
	]
};

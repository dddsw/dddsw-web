import { sveltekit } from '@sveltejs/kit/vite';
import adapter from '@sveltejs/adapter-cloudflare';
import { enhancedImages } from '@sveltejs/enhanced-img';
import dns from 'dns';
import tailwindcss from '@tailwindcss/vite';
import type { Plugin } from 'vite';
import { defineConfig } from 'vitest/config';
import { socialCard } from './src/lib/socialCard.ts';
import { renderSocialCard } from './src/lib/server/socialCardImage.ts';

dns.setDefaultResultOrder('verbatim');

/**
 * Renders the social card image from the event details: served on request in dev, and written
 * beside the other static files in a build. It runs in Node, so it never reaches the worker.
 */
function socialCardImage(): Plugin {
	return {
		name: 'dddsw:social-card-image',
		configureServer(server) {
			server.middlewares.use(socialCard.path, (req, res, next) => {
				if (req.url !== '/') return next();
				renderSocialCard().then((png) => {
					res.setHeader('Content-Type', 'image/png');
					res.end(png);
				}, next);
			});
		},
		async generateBundle() {
			if (this.environment.config.consumer !== 'client') return;
			this.emitFile({
				type: 'asset',
				fileName: socialCard.path.slice(1),
				source: await renderSocialCard()
			});
		}
	};
}

const config = defineConfig({
	plugins: [tailwindcss(), enhancedImages(), sveltekit({ adapter: adapter() }), socialCardImage()],
	test: {
		include: ['src/**/*.test.ts']
	}
});

export default config;

import { sveltekit } from '@sveltejs/kit/vite';
import adapter from '@sveltejs/adapter-cloudflare';
import dns from 'dns';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vitest/config';

dns.setDefaultResultOrder('verbatim');

const config = defineConfig({
	plugins: [tailwindcss(), sveltekit({ adapter: adapter() })],
	test: {
		include: ['src/**/*.test.ts']
	}
});

export default config;

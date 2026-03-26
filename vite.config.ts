/// <reference types="vitest" />
import { sveltekit } from '@sveltejs/kit/vite';
import dns from 'dns';
import type { UserConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

dns.setDefaultResultOrder('verbatim');

const config: UserConfig = {
	plugins: [tailwindcss(), sveltekit()],
	test: {
		include: ['src/**/*.test.ts']
	}
};

export default config;

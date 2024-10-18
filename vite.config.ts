import { sveltekit } from '@sveltejs/kit/vite';
import dns from 'dns';
import type { UserConfig } from 'vite';

dns.setDefaultResultOrder('verbatim');

const config: UserConfig = {
	plugins: [sveltekit()]
};

export default config;

import daisyui from 'daisyui';
import { Config as TailwindConfig } from 'tailwindcss';

const config: TailwindConfig = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: { daisyui }
	},
	plugins: []
};

export default config;

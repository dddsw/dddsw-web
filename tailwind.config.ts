import daisyui from 'daisyui';
import { Config as TailwindConfig } from 'tailwindcss';

const config: TailwindConfig = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	plugins: [daisyui],

	daisyui: {
		themes: [
			{
				mytheme: {
					primary: '#ff00ff',
					secondary: '#ff00ff',
					accent: '#00ffff',
					neutral: '#ff00ff',
					'base-100': '#ffffff',
					info: '#0000ff',
					success: '#00ff00',
					warning: '#00ff00',
					error: '#ff0000'
				}
			},
			'bumblebee'
		],
		darkTheme: 'dark', // name of one of the included themes for dark mode
		base: true, // applies background color and foreground color for root element by default
		styled: true, // include daisyUI colors and design decisions for all components
		utils: true, // adds responsive and modifier utility classes
		prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
		logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
		themeRoot: ':root' // The element that receives theme color CSS variables
	}
};

export default config;

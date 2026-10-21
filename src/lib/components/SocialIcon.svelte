<script lang="ts">
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import * as bluesky from '@fortawesome/free-brands-svg-icons/faBluesky';
	import * as linkedin from '@fortawesome/free-brands-svg-icons/faLinkedin';
	import * as envelope from '@fortawesome/free-solid-svg-icons/faEnvelope';

	// Font Awesome Free icons (CC BY 4.0), inlined as SVG paths at build time.
	const icons = {
		bluesky: { icon: bluesky, title: 'Bluesky' },
		linkedin: { icon: linkedin, title: 'LinkedIn' },
		email: { icon: envelope, title: 'Email' }
	} as const;

	interface Props extends Omit<HTMLAnchorAttributes, 'href' | 'title'> {
		name: keyof typeof icons;
		href: string;
		/** Accessible name for the link, e.g. "Sara Gowen on LinkedIn". */
		label: string;
		/** Classes for the icon itself (size, etc.). */
		iconClass?: string;
	}

	let { name, href, label, iconClass = 'size-6', class: className, ...rest }: Props = $props();
	const { icon, title } = $derived(icons[name]);
	const external = $derived(/^https?:/.test(href));
</script>

<a
	{href}
	rel={external ? 'noopener' : undefined}
	aria-label={label}
	{title}
	class={[
		'inline-block no-underline transition-colors',
		// Icons always change colour on hover/focus. Callers can override with their own classes.
		'hover:text-primary-600 focus-visible:text-primary-600 dark:hover:text-primary-400 dark:focus-visible:text-primary-400',
		className
	]}
	{...rest}>
	<!-- Decorative: the link's aria-label is its accessible name. -->
	<svg
		viewBox="0 0 {icon.width} {icon.height}"
		fill="currentColor"
		aria-hidden="true"
		focusable="false"
		class={iconClass}
		xmlns="http://www.w3.org/2000/svg">
		<path d={icon.svgPathData} />
	</svg>
</a>

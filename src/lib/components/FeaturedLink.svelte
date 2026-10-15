<script lang="ts">
	import * as microphone from '@fortawesome/free-solid-svg-icons/faMicrophone';
	import * as ticket from '@fortawesome/free-solid-svg-icons/faTicket';
	import * as vote from '@fortawesome/free-solid-svg-icons/faCheckToSlot';
	import type { Featured } from '$lib/featured';

	let {
		featured,
		class: className,
		onclick,
		preview = false
	}: {
		featured: Featured;
		class?: string;
		onclick?: () => void;
		/** True when shown by the testing preview rather than because its milestone is open. */
		preview?: boolean;
	} = $props();

	// Font Awesome Free icons (CC BY 4.0), inlined as SVG paths at build time.
	const icons = { tickets: ticket, voting: vote, cfp: microphone } as const;
	const icon = $derived(icons[featured.id]);
</script>

<!--
	The featured header button for the current milestone (tickets, session voting or the call for
	papers). Navy at rest (white in dark mode) and orange on hover, with an icon that tilts on hover
	unless reduced motion is requested. A dashed outline marks a testing preview.
-->
<a
	href={featured.href}
	class={[
		'group btn preset-filled-surface-950-50 no-underline hover:preset-filled-primary-500 focus-visible:preset-filled-primary-500',
		preview && 'outline-2 outline-offset-2 outline-primary-500 outline-dashed',
		className
	]}
	title={preview ? 'Preview: this is only shown for testing' : undefined}
	{onclick}>
	<svg
		viewBox="0 0 {icon.width} {icon.height}"
		fill="currentColor"
		aria-hidden="true"
		focusable="false"
		class="transition-transform motion-safe:group-hover:-rotate-12 motion-safe:group-focus-visible:-rotate-12"
		xmlns="http://www.w3.org/2000/svg">
		<path d={icon.svgPathData} />
	</svg>
	{featured.label}{#if preview}<span class="sr-only"> (preview)</span>{/if}
</a>

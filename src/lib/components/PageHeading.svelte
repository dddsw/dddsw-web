<script lang="ts">
	import { event } from '$lib/eventDetails';
	import Container from './Container.svelte';
	import Cow from './Cow.svelte';

	let { title, lead }: { title: string; lead?: string } = $props();
</script>

<svelte:head>
	<title>{title} · {event.shortName} {event.year}</title>
</svelte:head>

<section class="relative overflow-hidden bg-primary-500 text-surface-950">
	<!-- Tablet: peeks in from the right edge (nose clipped). Desktop: sits fully visible, aligned with the content's right edge. -->
	<Cow
		class="pointer-events-none absolute bottom-[-1rem] hidden h-40 w-auto text-white/40 md:-right-10 md:block lg:right-[max(1.5rem,calc((100%_-_72rem)/2_+_1.5rem))]" />
	<Container class="relative py-14 md:py-20">
		<h1 class="relative max-w-3xl h1">{title}</h1>
		{#if lead}
			<p class="relative mt-4 max-w-2xl text-xl">{lead}</p>
		{/if}
	</Container>
</section>

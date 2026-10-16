<script lang="ts">
	import { event } from '#lib/eventDetails.ts';
	import { page } from '$app/state';
	import Cow from '#lib/components/Cow.svelte';
</script>

<svelte:head><title>{page.status} · {event.shortName} {event.year}</title></svelte:head>

<div class="mx-auto flex max-w-xl flex-col items-center gap-6 px-4 py-24 text-center">
	<Cow class="h-24 w-auto text-primary-500" />
	<h1 class="h2">{page.status === 404 ? 'This page has wandered off' : 'Something went wrong'}</h1>
	<!-- A fixed, friendly line: the error's own message can be technical, so it is never shown. -->
	<p>
		{page.status === 404
			? "We couldn't find that page: the cow might have eaten it."
			: "That's udderly unexpected, and it's on our side. Please try again in a moment, or head back to the farm."}
	</p>
	<a
		href="/"
		class="btn preset-filled-primary-500 no-underline hover:preset-filled-surface-950-50 focus-visible:preset-filled-surface-950-50"
		>Back to the farm</a>
</div>

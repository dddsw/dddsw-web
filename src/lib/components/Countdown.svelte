<script lang="ts">
	import { onMount } from 'svelte';
	import { countdownLabel, daysUntil, eventDate } from '#lib/event.ts';

	// Rendered at build time with the build date, then refreshed on the client.
	const date = eventDate();
	let days = $state(date ? daysUntil(date) : null);

	onMount(() => {
		if (date) days = daysUntil(date);
	});
</script>

{#if days !== null}
	<p class="font-heading text-3xl font-semibold">{countdownLabel(days)}</p>
{/if}

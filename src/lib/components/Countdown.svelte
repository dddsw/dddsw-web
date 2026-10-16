<script lang="ts">
	import { onMount } from 'svelte';
	import { countdownLabel } from '#lib/event.ts';
	import { daysUntil, Milestone } from '#lib/milestones.ts';

	// Rendered at build time with the build date, then refreshed on the client.
	let days = $state(daysUntil(Milestone.TheActualEventDay) ?? null);

	onMount(() => {
		days = daysUntil(Milestone.TheActualEventDay) ?? null;
	});
</script>

{#if days !== null}
	<p class="font-heading text-3xl font-semibold">{countdownLabel(days)}</p>
{/if}

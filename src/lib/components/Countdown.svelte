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
	<!-- A speech bubble from the cow: the number big when there are days to count, else the message. -->
	<div
		class="relative mb-4 -rotate-2 self-start drop-shadow-[0_5px_0_var(--color-surface-950)] md:ml-2">
		<p class="rounded-3xl bg-surface-50 px-5 py-3 text-center text-surface-950">
			{#if days > 1}
				<span class="font-heading text-4xl leading-none font-semibold md:text-5xl">{days}</span>
				<span class="text-lg font-semibold md:text-xl">days to go!</span>
			{:else}
				<span class="font-heading text-2xl font-semibold md:text-3xl">{countdownLabel(days)}</span>
			{/if}
		</p>
		<!-- The tail, pointing straight down at the cow's nose. -->
		<svg
			viewBox="0 0 24 20"
			aria-hidden="true"
			focusable="false"
			class="absolute top-full left-4 -mt-px h-5 w-6 text-surface-50"
			fill="currentColor">
			<path d="M2 0h20L12 20Z" />
		</svg>
	</div>
{/if}

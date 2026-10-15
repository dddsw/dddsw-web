<script lang="ts">
	import { event } from '$lib/eventDetails';
	import { getTimeline } from '$lib/timeline';

	const timeline = getTimeline();
</script>

<section aria-labelledby="timeline" class="space-y-4">
	<h2 id="timeline" class="h2">The road to {event.shortName} {event.year}</h2>

	<ol>
		{#each timeline as item, index (item.label)}
			<li class="relative flex gap-4 pb-6 last:pb-0">
				<!-- Connector line down to the next milestone -->
				{#if index < timeline.length - 1}
					<span
						aria-hidden="true"
						class="absolute top-7 bottom-0 left-3 w-0.5 -translate-x-1/2 {item.done
							? 'preset-filled-brand'
							: 'bg-surface-200-800'}"></span>
				{/if}
				<span
					aria-hidden="true"
					class="relative mt-0.5 grid size-6 shrink-0 place-content-center rounded-full text-sm font-bold {item.done
						? 'preset-filled-brand'
						: 'preset-outlined-surface-200-800'}">
					{#if item.done}✓{/if}
				</span>
				<div>
					<p class="font-heading text-lg">{item.label}</p>
					<p class="text-sm text-surface-700-300">
						{#if item.done}Done{:else if item.date}{item.date}{:else}Date to be confirmed{/if}
					</p>
				</div>
			</li>
		{/each}
	</ol>

	<p class="text-sm">
		We'll do our best to keep to these dates, but please be patient: DDDSW is entirely volunteer
		driven ❤️
	</p>
</section>

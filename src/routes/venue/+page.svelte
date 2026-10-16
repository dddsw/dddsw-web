<script lang="ts">
	import EventFacts from '#lib/components/EventFacts.svelte';
	import { event } from '#lib/eventDetails.ts';
	import { venueLabel } from '#lib/event.ts';
</script>

<EventFacts />
<section class="space-y-4">
	<h2 class="h3">{event.year} venue</h2>
	{#if event.venue.name}
		<p>
			{event.shortName}
			{event.year} will be held at {venueLabel()}.
		</p>
	{:else}
		<p>
			The venue for {event.shortName}
			{event.year} is still to be confirmed. We'll publish the address, travel and accessibility details
			here once it's settled.
		</p>
	{/if}
</section>

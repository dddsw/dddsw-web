<script lang="ts">
	import { page } from '$app/state';
	import { event } from '#lib/eventDetails.ts';
	import { dateLabel, TBC, venueLabel } from '#lib/event.ts';
	import { get, Milestone } from '#lib/milestones.ts';
	import AddToCalendar from './AddToCalendar.svelte';

	const eventDate = get(Milestone.TheActualEventDay).isoDate;
</script>

<dl class="grid gap-4 sm:grid-cols-2">
	<div
		class="card bg-surface-950 p-5 text-surface-50 dark:border dark:border-surface-700 dark:bg-surface-900">
		<dt class="text-sm font-semibold tracking-wide text-primary-400 uppercase">When</dt>
		<dd class="font-heading text-2xl {dateLabel() === TBC ? 'text-primary-400' : ''}">
			{dateLabel()}
		</dd>
		{#if eventDate}
			<AddToCalendar date={eventDate} class="mt-2" />
		{/if}
	</div>
	<div
		class="card bg-surface-950 p-5 text-surface-50 dark:border dark:border-surface-700 dark:bg-surface-900">
		<dt class="text-sm font-semibold tracking-wide text-primary-400 uppercase">Where</dt>
		<dd
			class="font-heading text-2xl {event.venue.name || event.venue.city
				? ''
				: 'text-primary-400'}">
			{venueLabel()}
		</dd>
		<!-- The venue page already shows these details, so it doesn't link to itself. -->
		{#if page.url.pathname !== '/venue'}
			<a
				href="/venue"
				class="mt-2 inline-block text-surface-50! underline-offset-4 hover:text-primary-400! focus-visible:text-primary-400!"
				>Venue details and how to get here</a>
		{/if}
	</div>
</dl>

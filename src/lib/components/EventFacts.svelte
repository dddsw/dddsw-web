<script lang="ts">
	import { page } from '$app/state';
	import * as locationDot from '@fortawesome/free-solid-svg-icons/faLocationDot';
	import { event } from '#lib/eventDetails.ts';
	import { dateLabel, TBC, venueLabel } from '#lib/event.ts';
	import { get, Milestone } from '#lib/milestones.ts';
	import AddToCalendar from './AddToCalendar.svelte';

	const eventDate = get(Milestone.TheActualEventDay).isoDate;
</script>

<dl class="grid gap-4 sm:grid-cols-2">
	<div
		class="flex flex-col card bg-surface-950 p-5 text-surface-50 dark:border dark:border-surface-700 dark:bg-surface-900">
		<dt class="text-sm font-semibold tracking-wide text-primary-400 uppercase">When</dt>
		<dd class="font-heading text-2xl {dateLabel() === TBC ? 'text-primary-400' : ''}">
			{dateLabel()}
		</dd>
		{#if eventDate}
			<AddToCalendar date={eventDate} class="mt-auto self-start pt-2" />
		{/if}
	</div>
	<div
		class="flex flex-col card bg-surface-950 p-5 text-surface-50 dark:border dark:border-surface-700 dark:bg-surface-900">
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
				class="mt-auto inline-flex items-center gap-2 self-start pt-2 text-surface-50! decoration-1 underline-offset-4 hover:text-primary-400! focus-visible:text-primary-400!">
				<!-- Font Awesome Free icon (CC BY 4.0), inlined as an SVG path at build time. -->
				<svg
					viewBox="0 0 {locationDot.width} {locationDot.height}"
					fill="currentColor"
					aria-hidden="true"
					focusable="false"
					class="size-4"
					xmlns="http://www.w3.org/2000/svg">
					<path d={locationDot.svgPathData} />
				</svg>
				Venue details and how to get here
			</a>
		{/if}
	</div>
</dl>

<script lang="ts">
	import { event } from '#lib/eventDetails.ts';
	import { dateLabel, TBC, venueLabel } from '#lib/event.ts';
</script>

<dl class="grid gap-4 sm:grid-cols-2">
	<div class="card bg-surface-950 p-5 text-surface-50">
		<dt class="text-sm font-semibold tracking-wide text-primary-400 uppercase">When</dt>
		<dd class="font-heading text-2xl {dateLabel() === TBC ? 'text-primary-400' : ''}">
			{dateLabel()}
		</dd>
	</div>
	<div class="card bg-surface-950 p-5 text-surface-50">
		<dt class="text-sm font-semibold tracking-wide text-primary-400 uppercase">Where</dt>
		<dd
			class="font-heading text-2xl {event.venue.name || event.venue.city
				? ''
				: 'text-primary-400'}">
			{venueLabel()}
		</dd>
	</div>
</dl>

<script lang="ts">
	import {
		seatMilestones,
		seatMilestonesReached,
		seatProgressToNext
	} from '#lib/content/sponsors.ts';

	const totalWeight = seatMilestones.reduce((sum, m) => sum + m.weight, 0);

	/** Where each milestone sits along the bar, as a percentage. Wider gaps mean more to raise. */
	const positions = seatMilestones.map(
		(_, index) =>
			(seatMilestones.slice(0, index + 1).reduce((sum, m) => sum + m.weight, 0) / totalWeight) * 100
	);

	/** How far along the bar we are, including part of the way to the next milestone. */
	const securedPosition = (() => {
		const before = seatMilestonesReached > 0 ? positions[seatMilestonesReached - 1] : 0;
		const next = positions[seatMilestonesReached] ?? before;
		return before + ((next - before) * Math.min(100, Math.max(0, seatProgressToNext))) / 100;
	})();

	/** The attendees secured so far, for assistive technology. */
	const securedSeats = (() => {
		const before = seatMilestonesReached > 0 ? seatMilestones[seatMilestonesReached - 1].seats : 0;
		const next = seatMilestones[seatMilestonesReached]?.seats ?? before;
		return before + ((next - before) * Math.min(100, Math.max(0, seatProgressToNext))) / 100;
	})();
</script>

<!--
	One bar from no attendees to a full house. The first 150 are the minimum to hold the event, so that
	part is marked apart from the attendees after it. The bar fills as sponsorship comes in, and the
	milestones are labelled along it.
-->
<div class="space-y-3">
	<!-- Room either side so the first and last labels can centre on their ticks and the bar sits evenly. -->
	<div class="space-y-3 px-5 sm:px-6">
		<div aria-hidden="true" class="relative h-8 text-xs font-semibold sm:h-9 sm:text-sm">
			<p
				class="absolute top-0 left-0 border-t-4 border-primary-500 pt-1"
				style:width="{positions[0]}%">
				Needed to run
			</p>
			<p
				class="absolute top-0 right-0 border-t-4 border-dashed border-surface-400-600 pt-1"
				style:width="{100 - positions[0]}%">
				Room for more people
			</p>
		</div>

		<div
			role="progressbar"
			aria-label="Attendees secured"
			aria-valuemin={0}
			aria-valuemax={seatMilestones[seatMilestones.length - 1].seats}
			aria-valuenow={securedSeats}
			class="relative h-8 rounded-full bg-surface-300-700">
			<div class="h-full rounded-full bg-primary-500" style:width="{securedPosition}%"></div>
			<div
				aria-hidden="true"
				class="absolute inset-y-0 w-1 -translate-x-1/2 bg-surface-50-950"
				style:left="{positions[0]}%">
			</div>
			<!-- Where we are now: a knob on the bar, with a label on whichever side has room. -->
			<span
				aria-hidden="true"
				class="absolute top-0 size-8 -translate-x-1/2 rounded-full border-4 border-surface-950-50 bg-primary-500"
				style:left="clamp(1rem, {securedPosition}%, calc(100% - 1rem))"></span>
			<span
				aria-hidden="true"
				class="absolute top-1/2 -translate-y-1/2 text-xs font-semibold whitespace-nowrap text-surface-950-50 sm:text-sm {securedPosition >
				60
					? 'text-right'
					: ''}"
				style:left={securedPosition > 60
					? undefined
					: `calc(max(${securedPosition}%, 1rem) + 1.5rem)`}
				style:right={securedPosition > 60 ? `calc(${100 - securedPosition}% + 1.5rem)` : undefined}>
				We're here
			</span>
		</div>

		<ol aria-label="Attendee milestones" class="relative h-24 sm:h-28">
			<li aria-hidden="true" class="absolute top-3 left-0 text-sm font-semibold sm:top-4 lg:hidden">
				Attendees:
			</li>
			{#each seatMilestones as milestone, index (milestone.seats)}
				<li
					class="absolute top-0 flex -translate-x-1/2 flex-col items-center text-center leading-tight"
					style:left="{positions[index]}%">
					<span aria-hidden="true" class="mb-1 h-2 w-0.5 bg-surface-950-50"></span>
					<span class="font-heading text-sm font-semibold sm:text-xl">{milestone.seats}</span>
					<span class="text-xs max-lg:sr-only lg:text-sm">attendees</span>
					{#if index < seatMilestonesReached}
						<span class="mt-1 text-xs font-semibold sm:text-sm">{milestone.reached}</span>
					{:else if index === 0}
						<span class="mt-1 w-24 text-xs font-semibold sm:w-32 sm:text-sm"
							>Minimum for the venue</span>
					{/if}
				</li>
			{/each}
		</ol>
	</div>

	<p class="max-w-3xl text-sm sm:text-base">
		Every year our tickets go quickly and we have a large waiting list. This year the
		<a href="/venue">Sloane Robinson building</a> gives us more room than ever, so every bit of sponsorship
		helps us let more people in.
	</p>
</div>

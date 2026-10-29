<script lang="ts">
	import {
		seatMilestones,
		seatMilestonesReached,
		seatProgressToNext
	} from '#lib/content/sponsors.ts';

	/** How full the line leading into a milestone is, as a percentage. */
	function fill(index: number) {
		if (index < seatMilestonesReached) return 100;
		if (index > seatMilestonesReached) return 0;
		return Math.min(100, Math.max(0, seatProgressToNext));
	}

	function status(index: number) {
		if (index < seatMilestonesReached) return seatMilestones[index].reached;
		return index === seatMilestonesReached ? 'Next milestone' : 'Coming up';
	}
</script>

<!--
	A track of steps. It starts with a solid orange blob, then each milestone: done ones are orange
	with a tick, the next one is ringed, the rest are plain. The line fills as milestones are reached.
-->
<ol aria-label="Seat milestones" class="grid grid-cols-7">
	<li class="relative flex flex-col items-center gap-2 text-center">
		<span aria-hidden="true" class="relative size-10 rounded-full bg-primary-500"></span>
		<span class="font-heading text-sm font-semibold sm:text-xl"
			><span class="sm:hidden">Start</span><span class="hidden sm:inline">Starting out</span></span>
		<span class="text-xs sm:text-sm">{seatMilestonesReached === 0 ? "We're here" : 'Done'}</span>
	</li>
	{#each seatMilestones as milestone, index (milestone.seats)}
		<li class="relative flex flex-col items-center gap-2 text-center">
			<span
				aria-hidden="true"
				class="absolute top-5 right-1/2 h-1.5 w-full -translate-y-1/2 overflow-hidden bg-surface-300-700">
				<span class="block h-full bg-primary-500" style:width="{fill(index)}%"></span>
			</span>
			<span
				aria-hidden="true"
				class="relative flex size-10 items-center justify-center rounded-full text-lg font-bold {index <
				seatMilestonesReached
					? 'bg-primary-500 text-surface-950'
					: index === seatMilestonesReached
						? 'border-4 border-primary-500 bg-surface-50-950'
						: 'border-2 border-surface-300-700 bg-surface-50-950'}">
				{#if index < seatMilestonesReached}
					<svg
						viewBox="0 0 20 20"
						class="size-5"
						fill="none"
						stroke="currentColor"
						stroke-width="3">
						<path d="M4 10.5l4 4 8-9" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
				{/if}
			</span>
			<span class="flex flex-col items-center leading-tight">
				<span class="font-heading text-xl font-semibold">{milestone.seats}</span>
				<span class="text-xs sm:text-sm">seats</span>
			</span>
			<span
				class="text-xs sm:text-sm {index === seatMilestonesReached ? 'font-semibold' : ''} {index >
				seatMilestonesReached
					? 'max-sm:sr-only'
					: ''}">{status(index)}</span>
		</li>
	{/each}
</ol>

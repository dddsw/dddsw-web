<script lang="ts">
	import { event } from '#lib/eventDetails.ts';
	import { get, hasHappened, Milestone } from '#lib/milestones.ts';

	/** The key milestones shown on the "road to the event" timeline, in order. */
	const timelineMilestones: readonly { label: string; milestone: Milestone }[] = [
		{ label: 'Planning kicks off', milestone: Milestone.StartPlanning },
		{ label: 'Call for speakers opens', milestone: Milestone.OpenCallForSpeakers },
		{ label: 'Call for speakers closes', milestone: Milestone.CloseCallForSpeakers },
		{ label: 'Session voting opens', milestone: Milestone.OpenSessionVoting },
		{ label: 'Session voting closes', milestone: Milestone.CloseSessionVoting },
		{
			label: 'Schedule announced and ticket registration opens',
			milestone: Milestone.AnnounceScheduleAndOpenTicketRegistration
		},
		{ label: 'Day of the event!', milestone: Milestone.TheActualEventDay }
	];

	const timeline = timelineMilestones.map(({ label, milestone }) => ({
		label,
		date: get(milestone).formattedDate,
		done: hasHappened(milestone)
	}));
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

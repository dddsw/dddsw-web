<script lang="ts">
	import Icon from '@iconify/svelte';
	import { get, Milestone, MilestoneDetails } from './milestones';

	type Item = {
		description: string;
		milestone: MilestoneDetails;
	};

	const timelineItems: Item[] = [
		{ description: 'Call for speakers opens', milestone: get(Milestone.OpenCallForSpeakers)! },
		{ description: 'Call for speakers closes', milestone: get(Milestone.CloseCallForSpeakers)! },
		{ description: 'Session voting opens', milestone: get(Milestone.OpenSessionVoting)! },
		{ description: 'Session voting closes', milestone: get(Milestone.CloseSessionVoting)! },
		{
			description: 'Schedule announced and ticket registration opens',
			milestone: get(Milestone.AnnounceScheduleAndOpenTicketRegistration)!
		},
		{ description: 'Day of the event!', milestone: get(Milestone.TheActualEventDay)! }
	];
</script>

<ul class="not-prose timeline timeline-vertical w-full lg:timeline-horizontal">
	{#each timelineItems as item, index}
		<li>
			{#if index > 0}
				<hr class:bg-primary={item.milestone.hasHappened} />
			{/if}

			<div class="timeline-start">{item.milestone.formattedDate}</div>

			<div class="timeline-middle">
				{#if item.milestone.hasHappened}
					<Icon
						icon="line-md:circle-filled-to-confirm-circle-filled-transition"
						class="h-5 w-5 text-primary" />
				{:else}
					<Icon icon="line-md:circle" class="h-5 w-5" />
				{/if}
			</div>

			<div class="timeline-end timeline-box">
				{item.description}
			</div>

			{#if index < timelineItems.length - 1}
				{@const nextItem = timelineItems[index + 1]}
				<hr class:bg-primary={nextItem?.milestone.hasHappened} />
			{/if}
		</li>
	{/each}
</ul>
<sub class="sub-highlight"
	>We'll try our best to keep to these dates but please be patient - DDDSW is entirely volunteer
	driven ❤️
</sub>

<script lang="ts">
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

<h2>Timeline</h2>
<div class="timeline text-center">
	{#each timelineItems as item}
		<span class="timeline-item">
			<span class="material-symbols-outlined">
				{#if item.milestone.hasHappened}
					check_circle
				{:else}
					circle
				{/if}
			</span>
			<p>{item.milestone.formattedDate}</p>
			<p>{item.description}</p>
		</span>
	{/each}
</div>
<sub class="sub-highlight"
	>We'll try our best to keep to these dates but please be patient - DDDSW is entirely volunteer
	driven ❤️
</sub>

<style>
	.timeline {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.timeline p {
		font-size: 0.75rem;
		margin: 0;
		font-weight: bold;
	}

	.timeline-item p:first-of-type {
		border-bottom: #cdcdcd 2px dotted;
		margin-bottom: 5px;
		font-weight: normal;
	}

	.timeline-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex: 1 1 0;
	}

	.sub-highlight {
		font-style: italic;
	}

	@media (min-width: 576px) {
		.timeline {
			flex-direction: row;
		}
	}
</style>

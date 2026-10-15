<script lang="ts">
	import Timeline from '#lib/components/Timeline.svelte';
	import { links } from '#lib/eventDetails.ts';
	import { votingStatus } from '#lib/milestones.ts';

	const status = votingStatus();
</script>

<section class="max-w-3xl space-y-3" aria-labelledby="how">
	<h2 id="how" class="h2">How it works</h2>
	<p class="text-lg">
		Once the call for speakers closes, the proposed sessions are put to the community. Take a look
		at them and vote for your favourites: the results help shape the programme, so it's made up of
		talks people actually want to see.
	</p>
</section>

<div class="space-y-4 card tint-orange p-8 text-center">
	{#if status === 'open'}
		<h2 class="h3">Vote for your favourite sessions</h2>
		{#if links.voting}
			<a
				href={links.voting}
				class="btn preset-filled-primary-500 no-underline btn-lg hover:preset-filled-surface-950-50 focus-visible:preset-filled-surface-950-50"
				rel="noopener">Go to the voting form</a>
		{:else}
			<p>The voting link hasn't been added yet.</p>
		{/if}
	{:else if status === 'closed'}
		<h2 class="h3">Session voting has closed</h2>
		<p>Thank you to everyone who voted! The schedule comes next: see the timeline below.</p>
	{:else}
		<h2 class="h3">Session voting isn't open yet</h2>
		<p>
			Voting opens after the call for speakers closes. We haven't set a date yet: the timeline below
			shows the plan, and we'll announce dates here once they're confirmed.
		</p>
	{/if}
</div>

<Timeline />

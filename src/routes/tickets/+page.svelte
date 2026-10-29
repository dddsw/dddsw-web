<script lang="ts">
	import ComingSoon from '#lib/components/ComingSoon.svelte';
	import EventFacts from '#lib/components/EventFacts.svelte';
	import { event, links } from '#lib/eventDetails.ts';
</script>

<EventFacts />
{#if links.tickets}
	<div class="space-y-4 card preset-filled-surface-100-900 p-8 text-center">
		<h2 class="h3">Free tickets are available</h2>
		<a
			href={links.tickets}
			class="btn preset-filled-primary-500 no-underline btn-lg hover:preset-filled-surface-950-50 focus-visible:preset-filled-surface-950-50"
			>Get your free ticket</a>
	</div>
{:else}
	<ComingSoon title="Tickets aren't available yet" withTimeline>
		<p>
			We'll release free tickets once the date and venue are confirmed. Want a nudge? Email
			<a href="mailto:{event.contactEmail}">{event.contactEmail}</a>.
		</p>
		<p>
			{event.shortName} is free because sponsors cover the costs, so the more sponsorship we get, the
			more tickets we can make available. Know a company that could help?
			<a href="/sponsorship#convince-your-boss">Here's an email you can send them</a>.
		</p>
	</ComingSoon>
{/if}

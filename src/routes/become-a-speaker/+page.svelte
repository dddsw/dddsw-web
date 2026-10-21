<script lang="ts">
	import Timeline from '#lib/components/Timeline.svelte';
	import { event } from '#lib/eventDetails.ts';
	import { callForPapersStatus } from '#lib/milestones.ts';
</script>

<section class="space-y-4">
	<h2 class="h3">Everyone is welcome</h2>
	<p class="max-w-2xl">
		{event.shortName} is a friendly conference for developers, and we'd love to hear from speakers of
		every level of experience. If you've never spoken before, please don't let that put you off. We'd
		be delighted to hear from you.
	</p>
</section>

<section class="space-y-4">
	<h2 class="h3">How to submit</h2>
	<p class="max-w-2xl">
		You can send us your proposal through Sessionize. We have both long and short talks, so choose
		whichever suits your idea best. The <a href="/call-for-papers">call for papers</a> page shows whether
		submissions are open, and has the link to submit.
	</p>
</section>

<section class="space-y-4">
	<h2 class="h3">What happens next</h2>
	<p class="max-w-2xl">
		Once the call for papers closes, session voting opens so that everyone in the community can help
		choose the programme. After voting, we collate the results and let you know as soon as possible
		whether or not your talk has been selected.
	</p>
	<p class="max-w-2xl">
		We always receive far more submissions than we have space for, so please don't be discouraged if
		your talk isn't selected this time.
	</p>
</section>

<section class="space-y-4">
	<h2 class="h3">The night before</h2>
	<p class="max-w-2xl">
		We hold a speakers dinner the night before, which is a chance to meet your fellow speakers, who
		are all really friendly.
	</p>
</section>

<section class="space-y-4">
	<h2 class="h3">On the day</h2>
	<p class="max-w-2xl">
		There's a quiet area where you can prepare before your talk. Room monitors keep time, so you can
		focus on what you're saying, and they'll tell the committee about any technical problems or
		medical emergencies.
	</p>
</section>

<section class="space-y-4">
	<h2 class="h3">Appreciation</h2>
	<p class="max-w-2xl">
		DDDSW only happens because speakers generously give their time, and we never forget that.
		Attendees come to learn from you, and you'll get lots of appreciation from them and from us
		organisers alike.
	</p>
	<p class="max-w-2xl">
		Whether it's your first talk or your fiftieth, you'll be warmly welcomed and thanked for sharing
		what you know.
	</p>
</section>

<section class="space-y-4">
	<h2 class="h3">Expenses</h2>
	<p class="max-w-2xl">
		DDDSW is a free, non-profit conference run by volunteers, so unfortunately we can't cover
		speakers' expenses. Please bear that in mind when planning your trip.
	</p>
</section>

<section class="space-y-4">
	<h2 class="h3">Support and feedback</h2>
	<p class="max-w-2xl">
		We're happy to help. If you'd like support with your proposal or your talk, email
		<a href="mailto:{event.contactEmail}">{event.contactEmail}</a>, or get in touch with speakers
		from <a href="/past-events">our past events</a>. After the event, every speaker also receives
		anonymised feedback.
	</p>
</section>

{#if callForPapersStatus() === 'open'}
	<section class="space-y-4 card tint-orange p-8 text-center">
		<h2 class="h3">Ready to speak?</h2>
		<p>The call for papers is open, so you can submit your talk now.</p>
		<a
			href="/call-for-papers"
			class="btn preset-filled-primary-500 no-underline btn-lg hover:preset-filled-surface-950-50 focus-visible:preset-filled-surface-950-50"
			>Go to the call for papers</a>
	</section>
{/if}

<Timeline />

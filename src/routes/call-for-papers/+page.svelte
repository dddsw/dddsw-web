<script lang="ts">
	import Timeline from '#lib/components/Timeline.svelte';
	import { links } from '#lib/eventDetails.ts';
	import { callForPapersStatus } from '#lib/timeline.ts';

	const status = callForPapersStatus();

	const tips = [
		{
			title: 'Old hands and first-timers',
			body: "We're a friendly developers conference and welcome talks from speakers both old and new. Bring an established talk, or an idea you'd like help developing."
		},
		{
			title: 'A broad range of topics',
			body: "If it helps developers, it fits. We'd love to include topics such as mental health, neurodiversity and inclusivity in tech. Lightning talks are very welcome too."
		},
		{
			title: 'The community votes',
			body: 'Once the call closes, session voting opens so the whole herd can help choose the programme.'
		}
	];
</script>

<div class="grid gap-6 md:grid-cols-3">
	{#each tips as tip (tip.title)}
		<div class="space-y-2 card preset-filled-surface-100-900 p-6">
			<h2 class="h5">{tip.title}</h2>
			<p>{tip.body}</p>
		</div>
	{/each}
</div>
<div class="space-y-4 card tint-orange p-8 text-center">
	{#if status === 'open'}
		<h2 class="h3">Submit your talk</h2>
		<p>Submissions are handled through Sessionize.</p>
		<a
			href={links.callForPapers}
			class="btn preset-filled-primary-500 no-underline btn-lg hover:preset-filled-surface-950-50 focus-visible:preset-filled-surface-950-50"
			>Go to Sessionize</a>
	{:else if status === 'closed'}
		<h2 class="h3">The call for papers has closed</h2>
		<p>
			Thank you to everyone who submitted a talk! Session voting comes next: see the timeline below.
		</p>
	{:else}
		<h2 class="h3">The call for papers isn't open yet</h2>
		<p>
			We haven't set a date for submissions to open yet. The timeline below shows the plan, and
			we'll announce dates here once they're confirmed.
		</p>
	{/if}
</div>
<Timeline />

<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton-svelte';
	import Principles from '$lib/components/Principles.svelte';
	import SocialIcon from '$lib/components/SocialIcon.svelte';
	import { event } from '$lib/eventDetails';
	import { getInvolved, team } from '$lib/content/team';
	import { pastEvents } from '$lib/content/pastEvents';

	/** Everyone who appears on a past committee, with the years they were listed. */
	const pastCommittee = Object.entries(
		[...pastEvents]
			.reverse()
			.flatMap((e) => (e.committee ?? []).map((m) => ({ name: m.name, year: e.year })))
			.reduce<Record<string, number[]>>(
				(acc, { name, year }) => ({ ...acc, [name]: [...(acc[name] ?? []), year] }),
				{}
			)
	).map(([name, years]) => ({ name, years }));

	const initials = (name: string) =>
		name
			.split(' ')
			.map((part) => part[0])
			.join('');
</script>

<Principles />

<section id="team" aria-labelledby="meet" class="space-y-6">
	<h2 id="meet" class="h2">Meet the farmhands</h2>
	<p class="max-w-2xl">
		{event.shortName} is brought to you by a small team of volunteers. Please feel free to get in touch
		with us if you have any questions or ideas.
	</p>
	<ul class="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
		{#each team as member (member.name)}
			<li
				class="flex flex-col items-center gap-3 card preset-filled-surface-100-900 p-6 text-center">
				<Avatar class="wobble size-28 ring-4 ring-primary-500">
					<Avatar.Image src="/images/team/{member.photo}" alt="" />
					<Avatar.Fallback>{initials(member.name)}</Avatar.Fallback>
				</Avatar>
				<h3 class="h5">{member.name}</h3>
				<ul class="flex flex-wrap justify-center gap-4">
					{#if member.linkedIn}
						<li>
							<SocialIcon
								name="linkedin"
								href="https://www.linkedin.com/in/{member.linkedIn}"
								label="{member.name} on LinkedIn" />
						</li>
					{/if}
					{#if member.bluesky}
						<li>
							<SocialIcon
								name="bluesky"
								href="https://bsky.app/profile/{member.bluesky}"
								label="{member.name} on Bluesky" />
						</li>
					{/if}
					<li>
						<SocialIcon name="email" href="mailto:{member.email}" label="Email {member.name}" />
					</li>
				</ul>
			</li>
		{/each}
	</ul>
</section>

<section aria-labelledby="history" class="space-y-6">
	<h2 id="history" class="h2">Our history</h2>
	<p class="max-w-2xl">
		{event.shortName} has been connecting developers in the South West since 2009. Browse
		<a href="/past-events">our past events</a>
		to find out more.
	</p>
	<h3 class="h4">Past committee members</h3>
	<p class="max-w-2xl">
		Thank you to everyone who has helped organise the conference. Years show when someone was listed
		on the team page we could find in the archive, so the list is not complete.
	</p>
	<ul class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
		{#each pastCommittee as person (person.name)}
			<li class="space-y-2 card preset-filled-surface-100-900 px-4 py-3">
				<span class="block font-semibold">{person.name}</span>
				<!-- Links to that year's tab on the past events page, styled as buttons -->
				<span class="flex flex-wrap gap-2">
					{#each person.years as year (year)}
						<a
							href="/past-events#{year}"
							class="btn preset-outlined-primary-500 hover:preset-filled-surface-950-50 focus-visible:preset-filled-surface-950-50"
							aria-label="{person.name}, {year} event">{year}</a>
					{/each}
				</span>
			</li>
		{/each}
	</ul>
</section>

<section aria-labelledby="involved" class="space-y-6">
	<h2 id="involved" class="h2">Get involved</h2>
	<p class="max-w-2xl">
		{event.shortName} is a community event and there are several ways you can get involved. We're also
		looking for new committee members: email
		<a href="mailto:{event.contactEmail}">{event.contactEmail}</a>.
	</p>
	<ul class="grid gap-6 md:grid-cols-3">
		{#each getInvolved as item (item.title)}
			<li class="space-y-2 card tint-orange p-6">
				<span class="text-4xl" aria-hidden="true">{item.emoji}</span>
				<h3 class="h5">{item.title}</h3>
				<p>{item.body}</p>
			</li>
		{/each}
	</ul>
</section>

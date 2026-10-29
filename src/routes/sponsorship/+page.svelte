<script lang="ts">
	import { giveUrl, event } from '#lib/eventDetails.ts';
	import Cow from '#lib/components/Cow.svelte';
	import SeatMilestones from '#lib/components/SeatMilestones.svelte';
	import SponsorCard from '#lib/components/SponsorCard.svelte';
	import SponsorLogos from '#lib/components/SponsorLogos.svelte';
	import { toaster } from '#lib/toaster.ts';
	import {
		bossEmail,
		sponsorIntro,
		sponsorPath,
		sponsorReasons,
		sponsors,
		sponsorSupporterExtras
	} from '#lib/content/sponsors.ts';

	const email = bossEmail(event.sponsorshipEmail, `${event.siteUrl}/sponsorship`);

	async function copy() {
		try {
			await navigator.clipboard.writeText(`Subject: ${email.subject}\n\n${email.body}`);
			toaster.success({ title: 'Copied', description: 'The email is on your clipboard.' });
		} catch {
			toaster.error({
				title: "Couldn't copy",
				description: 'Please select the text and copy it manually.'
			});
		}
	}
</script>

<section aria-labelledby="why" class="space-y-6">
	<h2 id="why" class="h2">Help us fill the room</h2>
	<p class="max-w-3xl">
		{event.shortName}
		{event.year} is free for everyone, and sponsors are why. If you or your company would like to become
		a sponsor, please <a href="mailto:{event.sponsorshipEmail}">email us</a> and we'll agree a package
		with you. We can also arrange a custom one.
	</p>
	<p>As well as supporting the community, sponsorship offers:</p>
	<ul class="grid gap-6 md:grid-cols-3">
		{#each sponsorReasons as reason (reason.title)}
			<li class="space-y-2 card preset-filled-surface-100-900 p-6">
				<h3 class="h5">{reason.title}</h3>
				<p>{reason.body}</p>
			</li>
		{/each}
	</ul>
</section>

<section aria-labelledby="ways" class="space-y-6">
	<h2 id="ways" class="h2">Ways to sponsor</h2>
	<p class="max-w-3xl">{sponsorIntro}</p>

	<!-- The main path: each step builds on the one before. The arrows are decoration. -->
	<ol
		aria-label="Sponsorship packages, from the smallest step up"
		class="grid gap-12 lg:grid-cols-4 lg:gap-10">
		{#each sponsorPath as option, index (option.title)}
			<SponsorCard
				{option}
				level={Math.min(index, 3) as 0 | 1 | 2 | 3}
				reserveNote
				class="relative">
				{#if index === sponsorPath.length - 1}
					<Cow
						class="wobble absolute right-5 bottom-5 h-10 w-auto text-primary-600 dark:text-primary-600" />
				{/if}
				{#if index < sponsorPath.length - 1}
					<span
						aria-hidden="true"
						class="absolute -bottom-10 left-1/2 -translate-x-1/2 rotate-90 text-surface-950-50 lg:top-1/2 lg:-right-9 lg:bottom-auto lg:left-auto lg:translate-x-0 lg:-translate-y-1/2 lg:rotate-0">
						<svg
							viewBox="0 0 24 24"
							class="size-8"
							fill="none"
							stroke="currentColor"
							stroke-width="3">
							<path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round" />
						</svg>
					</span>
				{/if}
			</SponsorCard>
		{/each}
	</ol>

	<!-- A line down from the Supporter column (second of four) to the branch below. -->
	<div aria-hidden="true" class="hidden lg:grid lg:grid-cols-4 lg:gap-10">
		<div></div>
		<div class="flex flex-col items-center text-surface-950-50">
			<span class="h-6 w-1 bg-current"></span>
			<svg
				viewBox="0 0 24 24"
				class="-mt-2 size-8"
				fill="none"
				stroke="currentColor"
				stroke-width="3">
				<path d="M5 9l7 7 7-7" stroke-linecap="round" stroke-linejoin="round" />
			</svg>
		</div>
	</div>

	<div class="space-y-4 rounded-container border-2 border-dashed border-surface-500 p-4 md:p-6">
		<p class="font-semibold">Or start from Supporter and add one of these:</p>
		<ul class="grid gap-6 md:grid-cols-3">
			{#each sponsorSupporterExtras as option (option.title)}
				<SponsorCard {option} />
			{/each}
		</ul>
	</div>
</section>

<section aria-labelledby="attendees" class="space-y-6">
	<h2 id="attendees" class="h2">The more we raise, the more people can come</h2>
	<SeatMilestones />
</section>

<section aria-labelledby="support" class="space-y-4 card tint-orange p-6">
	<h2 id="support" class="h3">If you'd like to support {event.shortName}</h2>
	<p class="max-w-3xl">
		{event.shortName} is free for everyone, and our sponsors keep it that way. But some of you have asked
		how you can contribute, so here's a way to do it. Thank you!
	</p>
	<p class="max-w-3xl">
		Giving doesn't get you a ticket or priority: tickets are free and open to everyone.
	</p>
	<p class="max-w-3xl text-sm">
		Giving on behalf of a company?
		<a href="mailto:{event.sponsorshipEmail}">Email us about sponsorship</a>.
	</p>
	{#if giveUrl}
		<a
			href={giveUrl}
			class="btn preset-filled-primary-500 hover:preset-filled-surface-950-50 focus-visible:preset-filled-surface-950-50"
			>Support {event.shortName}</a>
	{:else}
		<!-- Shown until the Stripe payment link is set in eventDetails.ts. -->
		<button type="button" class="btn preset-tonal" disabled
			>Support {event.shortName}: coming soon</button>
	{/if}
</section>

<section aria-labelledby="thanks" class="space-y-6">
	<h2 id="thanks" class="h2">
		{sponsors.length ? `With thanks to our ${event.year} sponsors` : `Our ${event.year} sponsors`}
	</h2>
	{#if sponsors.length}
		<SponsorLogos />
	{:else}
		<div class="space-y-3 card tint-orange p-6">
			<p class="max-w-3xl text-lg">
				Sponsors for {event.year} haven't been announced yet. Your logo could be the first one in the
				field.
			</p>
			<a href="mailto:{event.sponsorshipEmail}">{event.sponsorshipEmail}</a>
		</div>
	{/if}
</section>

<section
	id="convince-your-boss"
	aria-labelledby="boss"
	class="scroll-mt-24 space-y-5 card tint-orange p-8">
	<h2 id="boss" class="h2">Convince your boss</h2>
	<p class="max-w-2xl">
		Love {event.shortName} and want your company to get involved? Send this to whoever signs off on budgets.
		Edit it to make it yours.
	</p>
	<div class="space-y-3 card bg-surface-50-950 p-5">
		<p><strong>Subject:</strong> {email.subject}</p>
		<pre class="font-base text-base whitespace-pre-wrap [overflow-wrap:anywhere]">{email.body}</pre>
	</div>
	<div class="flex flex-wrap items-center gap-3">
		<button
			type="button"
			class="btn preset-filled-primary-500 hover:preset-filled-surface-950-50 focus-visible:preset-filled-surface-950-50"
			onclick={copy}>Copy email</button>
	</div>
</section>

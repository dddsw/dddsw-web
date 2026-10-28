<script lang="ts">
	import { chipInUrl, event, showSponsorPrices } from '#lib/eventDetails.ts';
	import SeatMilestones from '#lib/components/SeatMilestones.svelte';
	import SponsorLogos from '#lib/components/SponsorLogos.svelte';
	import { toaster } from '#lib/toaster.ts';
	import { bossEmail, sponsorReasons, sponsorSections, sponsors } from '#lib/content/sponsors.ts';

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
	<SeatMilestones />
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

{#each sponsorSections as section (section.heading)}
	<section aria-labelledby="sec-{section.heading}" class="space-y-6">
		<h2 id="sec-{section.heading}" class="h2">{section.heading}</h2>
		{#if section.intro}<p>{section.intro}</p>{/if}
		<ul class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each section.options as option (option.title)}
				<li
					class="space-y-3 card p-6 {option.featured
						? 'preset-outlined-primary-500'
						: 'preset-filled-surface-100-900'}">
					<h3 class="h4">{option.title}</h3>
					{#if option.preamble}<p>{option.preamble}</p>{/if}
					{#if option.description}<p class="italic">{option.description}</p>{/if}
					{#if option.features}
						<ul class="list-inside list-disc space-y-1">
							{#each option.features as feature (feature)}<li>{feature}</li>{/each}
						</ul>
					{/if}
					{#if option.slots}
						<ul class="space-y-1">
							{#each option.slots as slot (slot.name)}
								<li
									class="flex items-baseline justify-between gap-4 border-t border-surface-300-700 pt-1">
									<span class="font-semibold">{slot.name}</span>
									{#if slot.claimed}
										<span class="font-semibold">Sponsored</span>
									{:else if showSponsorPrices}
										<span class="text-xl font-bold">{slot.price}</span>
									{/if}
								</li>
							{/each}
						</ul>
					{:else if option.claimed}
						<p class="font-semibold">This item has been sponsored</p>
					{:else if showSponsorPrices && option.price}
						<p class="text-2xl font-bold">{option.price}</p>
					{/if}
					{#if option.availability && !option.claimed}
						<p class="text-sm">{option.availability}</p>
					{/if}
				</li>
			{/each}
		</ul>
	</section>
{/each}

<section aria-labelledby="chip-in" class="space-y-4 card tint-orange p-6">
	<h2 id="chip-in" class="h3">Want to chip in?</h2>
	<p class="max-w-3xl">
		We're really grateful for anything you can give, big or small. It helps keep {event.shortName} free
		for everyone.
	</p>
	<p class="max-w-3xl">
		It's a thank-you to the community rather than a ticket: tickets are always free, and chipping in
		doesn't get you one.
	</p>
	{#if chipInUrl}
		<a
			href={chipInUrl}
			class="btn preset-filled-primary-500 hover:preset-filled-surface-950-50 focus-visible:preset-filled-surface-950-50"
			>Chip in</a>
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

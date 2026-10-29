<script lang="ts">
	import Container from '#lib/components/Container.svelte';
	import Cow from '#lib/components/Cow.svelte';
	import Countdown from '#lib/components/Countdown.svelte';
	import EventFacts from '#lib/components/EventFacts.svelte';
	import Timeline from '#lib/components/Timeline.svelte';
	import SponsorLogos from '#lib/components/SponsorLogos.svelte';
	import { sponsors } from '#lib/content/sponsors.ts';
	import { event, showSponsors } from '#lib/eventDetails.ts';
	import { preview } from '#lib/featured.svelte.ts';
	import { resolveFeatured } from '#lib/featured.ts';
	import { currentUpdate } from '#lib/latestUpdate.ts';
	import { scheduleShown } from '#lib/navigation.ts';

	const allCards = [
		{
			href: '/schedule',
			gate: 'schedule',
			title: 'See the schedule',
			body: 'A day of talks from developers like you.',
			emoji: '🗓️'
		},
		{
			href: '/speakers',
			gate: 'schedule',
			title: 'Meet the speakers',
			body: 'The brilliant people sharing their knowledge.',
			emoji: '🧑‍💻'
		},
		{
			href: '/become-a-speaker',
			title: 'Speak at DDDSW',
			body: 'First-timers and old hands welcome. Find out how to speak.',
			emoji: '🎤'
		},
		{
			href: '/sponsorship',
			title: 'Sponsor us',
			body: 'DDDSW is entirely funded by sponsorship. Put your company in front of the South West dev community.',
			emoji: '🤝'
		}
	];

	// The schedule and speakers cards wait for the announcement, like the nav links.
	const cards = $derived(
		allCards.filter((card) => {
			if (card.gate === 'schedule') return scheduleShown(preview);
			return true;
		})
	);

	// The ticket button waits for tickets to open, like the Tickets button in the header.
	const ticketsOpen = $derived(resolveFeatured(preview.featured)?.id === 'tickets');
</script>

<svelte:head>
	<title>{event.name} · {event.shortName} {event.year}</title>
</svelte:head>

<section class="bg-primary-500 text-surface-950">
	<Container class="grid items-center gap-8 py-14 md:grid-cols-[1.3fr_1fr] md:py-24">
		<div class="space-y-6">
			<h1 class="h1 leading-[1.05] md:text-7xl">
				Developer!<br />Developer!<br />Developer!
				<span
					class="block text-surface-50 [-webkit-text-stroke:0.03em_var(--color-surface-950)] [paint-order:stroke_fill] [text-shadow:0_3px_0_var(--color-surface-950)]"
					>South West</span>
			</h1>
			<p class="max-w-xl text-xl">
				{event.tagline}. Talks, hallway chats and a day out with your herd.
			</p>
			<div class="flex flex-wrap gap-3">
				{#if ticketsOpen}
					<a
						href="/tickets"
						class="btn preset-filled-surface-950-50 no-underline btn-lg hover:preset-filled-surface-50-950 focus-visible:preset-filled-surface-50-950"
						>Get your free ticket</a>
				{/if}
				<!-- Solid when it is the only button; outlined beside the ticket button, so the two never look alike. -->
				<a
					href="/sponsorship#convince-your-boss"
					class={[
						'btn no-underline btn-lg hover:preset-filled-surface-50-950 focus-visible:preset-filled-surface-50-950',
						ticketsOpen ? 'preset-outlined-surface-950-50' : 'preset-filled-surface-950-50'
					]}>Convince your boss to sponsor us</a>
			</div>
		</div>
		<div class="mx-auto flex w-full max-w-md flex-col">
			<Countdown />
			<!-- Mirrored so the cow faces the headline. The flip is on this wrapper because the wobble animation sets the cow's own transform. -->
			<div class="-scale-x-100">
				<Cow
					title="The DDDSW cow"
					class="wobble w-full text-white drop-shadow-[0_8px_0_var(--color-surface-950)]" />
			</div>
		</div>
	</Container>
</section>

<Container class="space-y-16 pt-12">
	<section class="space-y-6">
		<EventFacts />
	</section>

	{#if currentUpdate}
		<section class="card tint-orange p-6" aria-label="Latest update">
			<p class="max-w-3xl text-lg">{@html currentUpdate}</p>
		</section>
	{/if}

	<section class="space-y-3" aria-labelledby="expect">
		<h2 id="expect" class="h2">What to expect</h2>
		<p class="max-w-3xl text-lg">
			{event.shortName} is an annual, free, one-day technical conference organised by developers for developers.
			It's a day of learning, discussing, contributing and being part of the developer community in the
			South West. Our goal is to provide free technical education, the chance to mix with peers, and the
			opportunity to make and develop relationships in the community.
		</p>
	</section>

	<section
		class="grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-6"
		aria-labelledby="get-involved">
		<h2 id="get-involved" class="col-span-full h2">Join the herd</h2>
		{#each cards as card (card.href)}
			<div
				class="group relative flex cursor-pointer flex-col gap-2 card border border-transparent preset-filled-surface-100-900 p-6 transition hover:tint-orange has-focus-visible:tint-orange has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-secondary-700-300">
				<span class="text-4xl" aria-hidden="true">{card.emoji}</span>
				<h3 class="h4">
					<!-- Stretched link: the whole card is the link, with the title as its accessible name. -->
					<a href={card.href} class="no-underline after:absolute after:inset-0">{card.title}</a>
				</h3>
				<p>{card.body}</p>
				<!-- Decorative cue that the card is a link; it nudges along on hover unless reduced motion is on. -->
				<p
					aria-hidden="true"
					class="mt-auto pt-2 text-2xl text-secondary-700-300 transition-transform motion-safe:group-hover:translate-x-1 motion-safe:group-has-focus-visible:translate-x-1">
					→
				</p>
			</div>
		{/each}
	</section>

	{#if showSponsors && sponsors.length}
		<section class="space-y-6" aria-labelledby="thanks">
			<h2 id="thanks" class="h2">With thanks to our {event.year} sponsors</h2>
			<SponsorLogos />
		</section>
	{/if}

	<Timeline />

	<section class="space-y-2" aria-label="Our community">
		<p class="max-w-3xl">
			{event.shortName} is an inclusive, non-profit, volunteer-driven developer conference organised by
			the community, for the community. We are dedicated to providing a safe and welcoming conference
			experience for everyone. Please read our
			<a href="/code-of-conduct">code of conduct</a> for more information.
		</p>
	</section>
</Container>

<script lang="ts">
	import Container from '$lib/components/Container.svelte';
	import Cow from '$lib/components/Cow.svelte';
	import Countdown from '$lib/components/Countdown.svelte';
	import EventFacts from '$lib/components/EventFacts.svelte';
	import Timeline from '$lib/components/Timeline.svelte';
	import SponsorLogos from '$lib/components/SponsorLogos.svelte';
	import { sponsors } from '$lib/content/sponsors';
	import { event, showSponsors } from '$lib/eventDetails';
	import { preview } from '$lib/featured.svelte';
	import { currentUpdate } from '$lib/latestUpdate';
	import { scheduleShown } from '$lib/navigation';

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
			href: '/call-for-papers',
			title: 'Speak at DDDSW',
			body: 'First-timers and old hands welcome. Find out how to speak.',
			emoji: '🎤'
		},
		{
			href: '/sponsors',
			title: 'Sponsor us',
			body: 'DDDSW is entirely funded by sponsorship. Put your company in front of the South West dev community.',
			emoji: '🤝'
		}
	];

	// The schedule and speakers cards wait for the announcement, like the nav links.
	const cards = $derived(
		allCards.filter((card) => card.gate !== 'schedule' || scheduleShown(preview))
	);

	const planningAsks = [
		{
			emoji: '📍',
			title: 'Venue',
			body: `We're looking for a new venue to host ${event.shortName} ${event.year}. If you know of a space that could work, email us at`,
			email: event.contactEmail
		},
		{
			emoji: '👥',
			title: 'Committee',
			body: `We're looking for new committee members and volunteers to help organise the event. If you'd like to get involved, email us at`,
			email: event.contactEmail
		}
	];
</script>

<svelte:head>
	<title>{event.name} · {event.shortName} {event.year}</title>
</svelte:head>

<section class="bg-primary-500 text-surface-950">
	<Container class="grid items-center gap-8 py-14 md:grid-cols-[1.3fr_1fr] md:py-24">
		<div class="space-y-6">
			<h1 class="h1 leading-[1.05] md:text-7xl">
				Developer!<br />Developer!<br />Developer!
				<span class="block text-surface-50 [text-shadow:0_3px_0_var(--color-surface-950)]"
					>South West</span>
			</h1>
			<p class="max-w-xl text-xl">
				{event.tagline}. Talks, hallway chats and a day out with your herd.
			</p>
			<div class="flex flex-wrap gap-3">
				<a
					href="/tickets"
					class="btn preset-filled-surface-950-50 no-underline btn-lg hover:preset-filled-surface-50-950 focus-visible:preset-filled-surface-50-950"
					>Get your free ticket</a>
				<a
					href="/sponsors"
					class="btn preset-outlined-surface-950-50 no-underline btn-lg hover:preset-filled-surface-50-950 focus-visible:preset-filled-surface-50-950"
					>Convince your boss to sponsor us</a>
			</div>
		</div>
		<div class="flex justify-center">
			<Cow
				title="The DDDSW cow"
				class="wobble w-full max-w-md text-white drop-shadow-[0_8px_0_var(--color-surface-950)]" />
		</div>
	</Container>
</section>

<Container class="space-y-16 pt-12">
	<section class="space-y-6">
		<EventFacts />
		<Countdown />
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
				class="relative space-y-2 card preset-filled-surface-100-900 p-6 transition focus-within:tint-orange hover:tint-orange">
				<span class="text-4xl" aria-hidden="true">{card.emoji}</span>
				<h3 class="h4">
					<!-- Stretched link: the title is the visible, underlined link and the whole card is clickable. -->
					<a href={card.href} class="after:absolute after:inset-0">{card.title}</a>
				</h3>
				<p>{card.body}</p>
			</div>
		{/each}
	</section>

	<section class="space-y-6" aria-labelledby="help-plan">
		<div class="space-y-2">
			<h2 id="help-plan" class="h2">Help us plan {event.shortName} {event.year}</h2>
			<p class="max-w-3xl text-lg">
				We're in the early stages of planning our next event and need your help!
			</p>
		</div>
		<div class="grid gap-6 md:grid-cols-2">
			{#each planningAsks as ask (ask.title)}
				<div class="space-y-2 card preset-filled-surface-100-900 p-6">
					<span class="text-4xl" aria-hidden="true">{ask.emoji}</span>
					<h3 class="h4">{ask.title}</h3>
					<p>{ask.body} <a href="mailto:{ask.email}">{ask.email}</a>.</p>
				</div>
			{/each}
		</div>
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

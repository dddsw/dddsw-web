<script lang="ts">
	import CallToActions from '$lib/CallToActions.svelte';
	import Sponsors from '$lib/Sponsors.svelte';
	import type { KeyPoint } from '../types/KeyPoint.type';
	import { pageTitle } from '../stores.js';
	import Timeline from '$lib/Timeline.svelte';
	import { eventYear, showSponsors } from '$lib/eventDetails';
	import type { PageProps } from './$types';
	import { get, Milestone } from '$lib/milestones';

	let { data }: PageProps = $props();

	pageTitle.set('DDD South West');

	const planningAsks = [
		{
			icon: 'location_on',
			title: 'Venue',
			paragraph: `We're looking for a new venue to host DDD South West 2027. If you know of a space
				that could work, email us at
				<a href="mailto:management@dddsouthwest.com" class="emphasis">management@dddsouthwest.com</a>.`
		},
		{
			icon: 'group_add',
			title: 'Committee',
			paragraph: `We're looking for new committee members and volunteers to help organise the event. If you'd like
				to get involved, email us at
				<a href="mailto:management@dddsouthwest.com" class="emphasis">management@dddsouthwest.com</a>.`
		},
		{
			icon: 'storefront',
			title: 'Sponsorship',
			paragraph: `DDD South West is entirely funded by sponsorship. If you or your company would
				like to support the 2027 event, get in touch at
				<a href="mailto:sponsorship@dddsouthwest.com" class="emphasis">sponsorship@dddsouthwest.com</a>.`
		}
	];

	let keyPoints: KeyPoint[] = [
		{
			title: 'For developers',
			icon: 'code',
			paragraph: `Developers are at the heart of DDD South West.
		We love to learn and share their ideas with others. You'll meet like minded peers,
		make new friends and connections, and feel part of our friendly community where everyone is welcome.`
		},
		{
			title: 'For speakers',
			icon: 'diversity_1',
			paragraph: `Our events are a fantastic place to get your name out there as a speaker. Whether you're a
				professional or a first-timer, you will be made to feel welcome and supported.`
		},
		{
			title: 'For sponsors',
			icon: 'storefront',
			paragraph: `DDD South West would not be possible without the help from our generous sponsors. If you're
				interested in supporting the tech community and getting access to exactly the people you
				need for your technical roles please <a href="/sponsorship">consider sponsoring us.</a>`
		}
	];
</script>

<div class="secondary-bg">
	<div class="section">
		<h2 class="text-center text-3xl md:text-4xl">Help us plan DDD South West 2027</h2>
		<p class="text-center text-lg">
			We're in the early stages of planning our next event and need your help!
		</p>
		<div
			class="flex divide-y lg:divide-y-0 lg:divide-x divide-gray-200 flex-col self-center lg:flex-row">
			{#each planningAsks as ask}
				<div class="flex flex-col p-2">
					<span
						class="place-self-center material-symbols-outlined text-[2.5rem] text-(--primary-color)">
						{ask.icon}
					</span>
					<h3 class="place-self-center m-0">{ask.title}</h3>
					<p class="m-0 leading-relaxed">{@html ask.paragraph}</p>
				</div>
			{/each}
		</div>
	</div>

	{#if false}
		<CallToActions {keyPoints} />
	{/if}

	{#if get(Milestone.AnnounceScheduleAndOpenTicketRegistration)?.hasHappened}
		<div class="tertiary-bg">
			<div class="section">
				<h2>Our {eventYear} Speakers</h2>
				<div>{@html data.sessionizeSpeakerWallCode}</div>
			</div>
		</div>
	{/if}
	{#if showSponsors}
		<Sponsors />
	{/if}

	<div class="tertiary-bg">
		<div class="section">
			<p>
				DDD South West is an inclusive, non-profit, volunteer driven developer conference organised
				by the community, for the community. We are dedicated to providing a safe and welcoming
				conference experience for everyone.
			</p>
			<p>
				Please refer to our <a href="/code-of-conduct">Code of Conduct</a> for more information.
			</p>
		</div>
	</div>
	{#if get(Milestone.SetADate)?.hasHappened}
		<div class="section">
			<Timeline />
		</div>
	{/if}
</div>

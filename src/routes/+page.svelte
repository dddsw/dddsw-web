<script lang="ts">
	import CallToActions from '$lib/CallToActions.svelte';
	import Carousel from '$lib/Carousel.svelte';
	import Navbar from '$lib/Navbar.svelte';
	import Sponsors from '$lib/Sponsors.svelte';
	import type { KeyPoint } from '../types/KeyPoint.type';

	let showSponsors = false;

	let keyPoints: KeyPoint[] = [
		{
			title: 'For developers',
			icon: 'code',
			paragraph: `Developers are at the heart of DDD South West. 
		We love to learn and share their ideas with others. You'll meet likeminded peers, 
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
			paragraph: `Our events would not be possible without the help from our generous sponsors. If you're
				interested in supporting the tech community and getting access to exactly the people you
				need for your technical roles please <a href="mailto:sponsorship@dddsouthwest.com">get in touch.</a>`
		}
	];
</script>

<Carousel>
	<Navbar shadow={true} />
</Carousel>

<div class="introduction primary-bg">
	<div class="section">
		<p class="text-center">
			DDD South West is an inclusive, non-profit developer conference organised by the community,
			for the community.
		</p>
	</div>
</div>

{#if showSponsors}
	<Sponsors />
{/if}

<div class={showSponsors ? 'tertiary-bg' : 'secondary-bg'}>
	<CallToActions {keyPoints} />
</div>

<div class="tertiary-bg">
	<p class="text-center">More information coming soon...</p>
</div>

<style>
	@media (min-width: 768px) {
		.introduction p {
			font-size: 1.75rem;
		}
	}
</style>

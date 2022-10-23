<script lang="ts">
	import CallToActions from '$lib/CallToActions.svelte';
	import Carousel from '$lib/Carousel.svelte';
	import Footer from '$lib/Footer.svelte';
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

<div class="container">
	<Carousel>
		<Navbar shadow={true} />
	</Carousel>

	<div class="introduction primary-bg">
		<p>
			DDD South West is an inclusive, non-profit developer conference organised by the community,
			for the community.
		</p>
	</div>

	{#if showSponsors}
		<Sponsors />
	{/if}

	<div class={showSponsors ? 'tertiary-bg' : 'secondary-bg'}>
		<CallToActions {keyPoints} />
	</div>

	<div class="tertiary-bg holding-message">More information coming soon...</div>

	<Footer />
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
	}

	.introduction p {
		padding: 20px;
		margin: 0;
		text-align: center;
	}

	@media (min-width: 400px) {
		.introduction p {
			padding: 30px 70px;
		}
	}

	@media (min-width: 768px) {
		.introduction p {
			font-size: 1.75rem;
			padding: 50px 90px;
		}
	}

	@media (min-width: 1800px) {
		.introduction p {
			padding: 50px 25%;
		}
	}

	.holding-message {
		padding: 50px;
		text-align: center;
	}

	@media (min-width: 1400px) {
		.holding-message {
			font-size: 1.5rem;
		}
	}
</style>

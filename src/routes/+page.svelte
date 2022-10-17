<script>
	import CallToActions from '$lib/CallToActions.svelte';
	import Carousel from '$lib/Carousel.svelte';
	import Footer from '$lib/Footer.svelte';
	import Navbar from '$lib/Navbar.svelte';
	import Sponsors from '$lib/Sponsors.svelte';

	let showSponsors = false;
</script>

<div class="container">
	<Carousel>
		<Navbar />
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
		<CallToActions />
	</div>

	<div class="tertiary-bg holding-message">
		More information coming soon...
	</div>

	<Footer/>
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

	.holding-message {
		padding: 50px;
		text-align: center;
	}
</style>

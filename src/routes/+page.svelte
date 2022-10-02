<script>
	import CallToActions from '$lib/CallToActions.svelte';
	import Carousel from '$lib/Carousel.svelte';
	import Navbar from '$lib/Navbar.svelte';
	import Sponsors from '$lib/Sponsors.svelte';

	let showSponsors = false;
</script>

<div class="home-container">
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

	<div class="footer primary-bg">
		<a href="https://twitter.com/dddsouthwest"
			><i class="fa-brands fa-twitter fa-3x" style="color: black;" /></a
		>
		<a href="https://www.linkedin.com/company/ddd-south-west/"
			><i class="fa-brands fa-linkedin fa-3x" style="color: black;" /></a
		>
	</div>
</div>

<style>
	.home-container {
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

	.primary-bg {
		background-color: #ff9930;
	}

	.secondary-bg {
		background-color: white;
	}

	.tertiary-bg {
		background-color: #eaeaea;
	}

	.holding-message {
		padding: 50px;
		text-align: center;
	}

	.footer {
		padding: 30px;
		display: flex;
		justify-content: flex-end;
		gap: 30px;
	}
</style>

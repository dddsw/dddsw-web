<script>
	import Carousel from '$lib/Carousel.svelte';
	import Navbar from '$lib/Navbar.svelte';
	import Sponsors from '$lib/Sponsors.svelte';

	let showSponsors = true;
</script>

<div class="home-container">
	<Carousel>
		<Navbar/>
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
		<div class="key-points-container">
			<div class="key-point">
				<div>
					<h1>For developers</h1>
					<p>
						Developers are at the heart of DDD South West. We love to learn and share their ideas
						with others. You'll meet likeminded peers, make new friends and connections, and feel
						part of our friendly community where everyone is welcome. (Link to about?)
					</p>
				</div>
				<span class="material-symbols-outlined icon">code</span>
			</div>
			<div class="key-point">
				<span class="material-symbols-outlined icon">diversity_1</span>
				<div class="key-point-right">
					<h1>For speakers</h1>
					<p>
						Our events are a fantastic place to get your name out there as a speaker. Whether you're
						a professional or a first-timer, you will be made to feel welcome and supported. (Link
						to submit talk)
					</p>
				</div>
			</div>
			<div class="key-point">
				<div>
					<h1>For sponsors</h1>
					<p>
						Our events would not be possible without the help from our generous sponsors. If you're
						interested in supporting the tech community and getting access to exactly the people you
						need for your technical roles please consider sponsoring our event (link to sponsors
						page).
					</p>
				</div>
				<span class="material-symbols-outlined icon">storefront</span>
			</div>
		</div>
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

	.introduction {
		font-size: 1.75em;
	}

	.introduction p {
		padding: 50px;
		margin: 0;
		text-align: center;
	}

	.icon {
		font-size: 125px;
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

	.key-points-container {
		width: 80%;
		margin: auto;
	}

	.key-point {
		display: flex;
		align-items: center;
		padding: 30px 100px;
		justify-content: space-between;
		gap: 200px;
	}

	.key-point-right {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}

	.key-point-right p {
		text-align: right;
	}

	.footer {
		padding: 30px;
		display: flex;
		justify-content: flex-end;
		gap: 30px;
	}
</style>

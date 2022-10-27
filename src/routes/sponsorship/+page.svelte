<script lang="ts">
	import Footer from '$lib/Footer.svelte';
	import Navbar from '$lib/Navbar.svelte';
</script>

<div class="container">
	<div class="primary-bg">
		<div class="section header">
			<a href="/"><img src="../images/logo.png" alt="The DDD South West logo" class="logo" /></a>
			<h1>Sponsorship</h1>
			<Navbar currentRoute={'/sponsorship'} />
		</div>
	</div>
	<div class="secondary-bg">
		<div class="section">
			<h1>Sponsorship opportunities</h1>
			<p>
				We are looking for sponsors for DDD South West 2023. If you or your company would like to
				become a sponsor please <a href="mailto:sponsorship@dddsouthwest.com">email us.</a>
				We have various options available, or we can arrange a custom package for you. Our event is entirely
				funded by sponsorship and would not be possible without our wonderful sponsors.
			</p>
		</div>
	</div>
	<div class="tertiary-bg">
		<div class="section">
			<h1>Packages</h1>
			<div class="options-container">
				<div class="primary-bg option">
					<h2>Bronze</h2>
					<ul>
						<li>Your logo on our website</li>
						<li>Your logo on the opening & closing slides</li>
					</ul>
					<span class="price">£600</span>
				</div>
				<span class="material-symbols-outlined icon"> arrow_forward_ios </span>
				<div class="primary-bg option">
					<h2>Silver</h2>
					Everything in Bronze, plus:
					<ul>
						<li>A sponsor stand</li>
						<li>Promotional tweets from our account</li>
					</ul>
					<span class="price">£1000</span>
				</div>
				<span class="material-symbols-outlined icon"> arrow_forward_ios </span>
				<div class="primary-bg option">
					<h2>Gold</h2>
					Everything in Bronzer and Silver, plus:
					<ul>
						<li>Opportunity to make a short announcement at the beginning or end of the day.</li>
						<li>We can create a tailored package to you</li>
					</ul>
					<span class="price">£1500+</span>
				</div>
			</div>

			<h1>Refreshments</h1>
			<p>With your company name and logo displayed alongside.</p>
			<div class="options-container options-container-small">
				<div class="primary-bg option-small claimed">
					Breakfast and morning snacks <span class="price">£300</span>
					<!-- (This item has been sponsored) -->
				</div>
				<div class="primary-bg option-small">
					Lunch <span class="price">£2000</span>
				</div>
				<div class="primary-bg option-small">
					Afternoon snacks <span class="price">£300</span>
				</div>
				<div class="primary-bg option-small">
					Hot and cold beverages <span class="price">£1000</span>
				</div>
			</div>

			All of the above include:
			<ul>
				<li>The opportunity to talk to the exact people you want to recruit or sell to.</li>
				<li>
					Love from the attendees! Everyone appreciates that without sponsors, these events can't
					happen.
				</li>
				<li>
					Love from the team! We will go out of our way to priase you before, on, and after the day.
				</li>
			</ul>
		</div>
	</div>

	<div class="quaternary-bg">
		<div class="section tagline">
			<h2>By the community, for the community</h2>
		</div>
	</div>
	<Footer />
</div>

<style>
	/* repeating  with about*/
	.header {
		display: flex;
		align-items: center;
		flex-direction: column;
		text-align: center;
	}

	@media (min-width: 576px) {
		.header {
			justify-content: space-between;
			flex-direction: row;
			text-align: left;
		}
	}

	.logo {
		max-width: 300px;
	}
	/* repeating */

	.options-container {
		display: flex;
		align-items: stretch;
		flex-direction: column;
		justify-content: space-evenly;
		margin: 50px 0;
	}

	@media (min-width: 992px) {
		.options-container {
			flex-direction: row;
		}
	}

	.options-container-small {
		justify-content: space-evenly;
		gap: 10px;
	}

	.option {
		padding: 20px;
		min-height: 250px;
		max-width: 300px;
		border-radius: 30px;
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.option-small {
		padding: 20px;
		max-width: 300px;
		border-radius: 50px;
		text-align: center;
		display: flex;
		flex-direction: column;
	}

	.option ul {
		flex-grow: 1;
	}

	.option li {
		text-align: left;
	}

	h2 {
		text-align: center;
	}

	.icon {
		font-size: 50px;
		align-self: center;
	}

	.price {
		font-size: 1.5rem;
	}

	.claimed {
		background-color: lightgrey;
	}
</style>

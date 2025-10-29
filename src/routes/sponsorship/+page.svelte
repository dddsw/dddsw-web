<script lang="ts">
	import Sponsors from '$lib/Sponsors.svelte';
	import { pageTitle } from '../../stores.js';

	let refreshmentPackages = [
		{ title: 'Breakfast', price: 'TBC', claimed: false },
		{ title: 'Morning break', price: 'TBC', claimed: false },
		{ title: 'Afternoon break', price: 'TBC', claimed: false }
	];

	let extraOptions = [
		{
			title: 'T-shirts',
			price: 'TBC',
			claimed: false,
			description: `We'll print your company name/logo on our t-shirts, worn by the staff and speakers.`
		}
	];

	let showSponsors = false;

	pageTitle.set('Sponsorship');
</script>

<div class="secondary-bg">
	<div class="section">
		<h1>Sponsorship opportunities</h1>
		<p>
			We are looking for sponsors for DDD South West 2026. If you or your company would like to
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
			<div class="primary-bg option boop-effect">
				<h2>Supporter</h2>
				<ul>
					<li>Your logo on our website</li>
					<li>Your logo on the opening & closing slides</li>
					<li>We'll thank you on our social media</li>
				</ul>
				<span class="price">TBC</span>
			</div>
			<div class="primary-bg option boop-effect">
				<h2>Exhibitor</h2>
				Everything in Supporter tier, plus:
				<ul>
					<li>A sponsor stand on the day</li>
					<li>Custom promotional posts from our social media accounts</li>
					<li>Anything else we can do.. chat to us!</li>
				</ul>
				<span class="price">TBC</span>
			</div>
		</div>

		<h1>Refreshments</h1>
		<p>With your company name and logo displayed alongside.</p>
		<div class="options-container options-container-small">
			{#each refreshmentPackages as refreshmentPackage}
				<div class="primary-bg option-small boop-effect" class:claimed={refreshmentPackage.claimed}>
					{refreshmentPackage.title} <span class="price">{refreshmentPackage.price}</span>
					{#if refreshmentPackage.claimed}
						<sub>This item has been sponsored</sub>
					{/if}
				</div>
			{/each}
		</div>

		<h1>Extras</h1>
		<div class="options-container extra-options">
			{#each extraOptions as extraOption}
				<div class="primary-bg option-small boop-effect" class:claimed={extraOption.claimed}>
					{extraOption.title}
					<sub>{extraOption.description} </sub>
					<span class="price">{extraOption.price}</span>
					{#if extraOption.claimed}
						<sub>This item has been sponsored</sub>
					{/if}
				</div>
			{/each}
		</div>

		<p>As well as supporting the community, sponsorship offers:</p>
		<ul>
			<li>The opportunity to talk to the exact people you want to recruit or sell to.</li>
			<li>
				Love from the attendees! Everyone appreciates that without sponsors, these events can't
				happen.
			</li>
			<li>
				Love from the team! We will go out of our way to praise you before, on, and after the day.
			</li>
		</ul>
	</div>
</div>
{#if showSponsors}
	<Sponsors />
{/if}

<style>
	.options-container {
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		align-items: center;
		margin: 50px 0;
		gap: 20px;
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
		background-color: var(--quinary-color);
	}

	.option-small {
		padding: 20px;
		min-width: 150px;
		max-width: 300px;
		border-radius: 50px;
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.option ul {
		flex-grow: 1;
	}

	.option li {
		text-align: left;
	}

	.price {
		font-size: 1.5rem;
		font-weight: bold;
	}

	.claimed {
		background-color: lightgrey;
	}

	sub {
		font-style: italic;
	}

	@media (min-width: 992px) {
		.options-container {
			flex-direction: row;
			align-items: stretch;
		}
	}

	.extra-options {
		justify-content: flex-start;
	}
</style>

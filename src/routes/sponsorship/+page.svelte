<script lang="ts">
	import { eventYear } from '$lib/eventDetails.js';
	import Sponsors from '$lib/Sponsors.svelte';
	import { pageTitle } from '../../stores.js';

	interface Item {
		title: string;
		price: string;
		claimed: boolean;
		description?: string;
	}

	let refreshmentPackages: Item[] = [
		{ title: 'Breakfast', price: '£250', claimed: true },
		{ title: 'Morning break', price: '£250', claimed: false },
		{ title: 'Afternoon break', price: '£250', claimed: true }
	];

	let extraOptions: Item[] = [
		{
			title: 'Dedicated speaker slot',
			price: '£300',
			claimed: false,
			description: `We'll allocate a dedicated slot for your speaker to present a relevant topic`
		},
		{
			title: 'T-shirts',
			price: '£400',
			claimed: true,
			description: `We'll print your company name/logo on our t-shirts, worn by the staff and speakers.`
		}
	];

	let showSponsors = false;

	pageTitle.set('Sponsorship');
</script>

{#snippet displayItems(items: Item[])}
	{#each items as item}
		<div class="primary-bg option-small boop-effect" class:claimed={item.claimed}>
			<h3>{item.title}</h3>
			{#if item.description}
				<span class="item-description">{item.description}</span>
			{/if}
			{#if item.claimed}
				<strong>This item has been sponsored</strong>
			{:else}
				<span class="price">{item.price}</span>
			{/if}
		</div>
	{/each}
{/snippet}

<div class="secondary-bg">
	<div class="section">
		<h2>Sponsorship opportunities</h2>
		<p>
			Our event is entirely funded by sponsorship and would not be possible without our wonderful
			sponsors.
		</p>
		<p>
			We are looking for sponsors for DDD South West {eventYear}. If you or your company would like
			to become a sponsor please <a href="mailto:sponsorship@dddsouthwest.com">email us.</a>
			We have various options available, or we can arrange a custom package for you.
		</p>
	</div>
</div>
<div class="tertiary-bg">
	<div class="section">
		<h2>Packages</h2>
		<div class="options-container">
			<div class="primary-bg option boop-effect">
				<h3>Supporter</h3>
				<ul>
					<li>Your logo on our website</li>
					<li>Your logo on the opening & closing slides</li>
					<li>We'll thank you on our social media</li>
				</ul>
				<span class="price">£600</span>
			</div>
			<div class="primary-bg option boop-effect">
				<h3>Exhibitor</h3>
				Everything in Supporter tier, plus:
				<ul>
					<li>A sponsor stand on the day</li>
					<li>Custom promotional posts from our social media accounts</li>
					<li>Anything else we can do.. chat to us!</li>
				</ul>
				<span class="price">£1700</span>
			</div>
		</div>

		<h2>Refreshments</h2>
		<p>With your company name and logo displayed alongside.</p>
		<div class="options-container options-container-small">
			{@render displayItems(refreshmentPackages)}
		</div>

		<h2>Extras</h2>
		<div class="options-container extra-options">
			{@render displayItems(extraOptions)}
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

	.option-small h3 {
		margin: 5px;
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
		margin: 5px;
	}

	.claimed {
		background-color: lightgrey;
	}

	.item-description {
		font-style: italic;
	}

	strong {
		font-weight: bold;
		margin: 5px;
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

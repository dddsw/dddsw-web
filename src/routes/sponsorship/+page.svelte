<script lang="ts">
	import { eventYear } from '$lib/eventDetails.js';
	import { pageTitle } from '../../stores.js';

	interface SponsorOption {
		title: string;
		price: string;
		claimed?: boolean;
		description?: string;
		preamble?: string;
		features?: string[];
	}

	interface SponsorSection {
		heading: string;
		intro?: string;
		options: SponsorOption[];
	}

	const sections: SponsorSection[] = [
		{
			heading: 'Packages',
			options: [
				{
					title: 'Supporter',
					price: '£600',
					features: [
						'Your logo on our website',
						'Your logo on the opening & closing slides',
						"We'll thank you on our social media"
					]
				},
				{
					title: 'Exhibitor',
					price: '£1700',
					preamble: 'Everything in Supporter tier, plus:',
					features: [
						'A sponsor stand on the day',
						'Custom promotional posts from our social media accounts',
						'Anything else we can do.. chat to us!'
					]
				}
			]
		},
		{
			heading: 'Refreshments',
			intro: 'With your company name and logo displayed alongside.',
			options: [
				{ title: 'Breakfast', price: '£250', claimed: true },
				{ title: 'Morning break', price: '£250', claimed: true },
				{ title: 'Afternoon break', price: '£250', claimed: true }
			]
		},
		{
			heading: 'Extras',
			options: [
				{
					title: 'Dedicated speaker slot',
					price: '£300',
					description:
						"We'll allocate a dedicated slot for your speaker to present a relevant topic"
				},
				{
					title: 'T-shirts',
					price: '£400',
					claimed: true,
					description:
						"We'll print your company name/logo on our t-shirts, worn by the staff and speakers."
				}
			]
		}
	];

	pageTitle.set('Sponsorship');
</script>

{#snippet displayOption(option: SponsorOption)}
	<div
		class="flex flex-1 flex-col p-5 rounded-4xl text-center
			{option.features ? 'bg-(--quinary-color)' : option.claimed ? 'bg-gray-300' : 'primary-bg'}
			{option.features ? '' : 'justify-center'}">
		<h3>{option.title}</h3>
		{#if option.preamble}<p>{option.preamble}</p>{/if}
		{#if option.description}<span class="italic">{option.description}</span>{/if}
		{#if option.features}
			<ul class="grow list-disc pl-5 text-left">
				{#each option.features as feature}
					<li>{feature}</li>
				{/each}
			</ul>
		{/if}
		{#if option.claimed}
			<strong>This item has been sponsored</strong>
		{:else}
			<span class="text-2xl font-bold">{option.price}</span>
		{/if}
	</div>
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
		{#each sections as section}
			<h2>{section.heading}</h2>
			{#if section.intro}<p>{section.intro}</p>{/if}
			<div class="flex flex-col gap-5 lg:flex-row lg:items-stretch">
				{#each section.options as option}
					{@render displayOption(option)}
				{/each}
			</div>
		{/each}

		<p>As well as supporting the community, sponsorship offers:</p>
		<ul class="list-disc pl-5">
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

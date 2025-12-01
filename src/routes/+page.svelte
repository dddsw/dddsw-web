<script lang="ts">
	import CallToActions from '$lib/CallToActions.svelte';
	import Sponsors from '$lib/Sponsors.svelte';
	import type { KeyPoint } from '../types/KeyPoint.type';
	import { pageTitle } from '../stores.js';
	import Timeline from '$lib/Timeline.svelte';

	pageTitle.set('DDD South West');

	let showSponsors = true;

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
			paragraph: `DDD South West would not be possible without the help from our generous sponsors. If you're
				interested in supporting the tech community and getting access to exactly the people you
				need for your technical roles please <a href="/sponsorship">consider sponsoring us.</a>`
		}
	];
</script>

{#if showSponsors}
	<Sponsors />
{/if}

<div class={showSponsors ? 'tertiary-bg' : 'secondary-bg'}>
	<CallToActions {keyPoints} />
</div>

<div class="quaternary-bg">
	<div class="section">
		<p>
			DDD South West is an inclusive, non-profit, volunteer driven developer conference organised by
			the community, for the community. We are dedicated to providing a safe and welcoming
			conference experience for everyone.
		</p>
		<p>Please refer to our <a href="/code-of-conduct">Code of Conduct</a> for more information.</p>
	</div>
</div>

<div class="secondary-bg">
	<div class="section">
		<Timeline />
	</div>
</div>

<script lang="ts">
	import CallToActions from '$lib/CallToActions.svelte';
	import Sponsors from '$lib/Sponsors.svelte';
	import type { KeyPoint } from '../types/KeyPoint.type';

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

<div class="introduction primary-bg">
	<div class="section">
		<h1>Latest update</h1>
		<p>
			<a href="/schedule">Schedule is announced!!</a> Time for last second tweaks to your talks, test
			your demos and get ready for the big day!!
		</p>
	</div>
</div>

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
		<h2>Timeline</h2>
		<div class="timeline text-center">
			<span class="timeline-item">
				<span class="material-symbols-outlined"> check_circle </span>
				<p>5th February</p>
				<p>Call for speakers opens</p>
			</span>
			<span class="timeline-item">
				<span class="material-symbols-outlined"> check_circle </span>
				<p>2nd March</p>
				<p>Call for speakers closes</p>
			</span>
			<span class="timeline-item">
				<span class="material-symbols-outlined"> check_circle </span>
				<p>9th March</p>
				<p>Session voting opens</p>
			</span>
			<span class="timeline-item">
				<span class="material-symbols-outlined"> check_circle </span>
				<p>23rd March</p>
				<p>Session voting closes</p>
			</span>
			<span class="timeline-item">
				<span class="material-symbols-outlined"> check_circle </span>
				<p>6th April</p>
				<p>Schedule announced</p>
			</span>
			<span class="timeline-item">
				<span class="material-symbols-outlined"> circle </span>
				<p>10th April</p>
				<p>Ticket registration opens</p>
			</span>
			<span class="timeline-item">
				<span class="material-symbols-outlined"> circle </span>
				<p>27th April</p>
				<p>Day of the event!</p>
			</span>
		</div>
		<sub class="sub-highlight">
			We'll try our best to keep to these dates but please be patient - DDDSW is entirely volunteer
			driven ❤️
		</sub>
	</div>
</div>

<style>
	.timeline {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.timeline p {
		font-size: 0.75rem;
		margin: 0;
		font-weight: bold;
	}

	.timeline-item p:first-of-type {
		border-bottom: #cdcdcd 2px dotted;
		margin-bottom: 5px;
		font-weight: normal;
	}

	.timeline-item {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.sub-highlight {
		font-style: italic;
	}

	@media (min-width: 576px) {
		.timeline {
			flex-direction: row;
		}
	}

	@media (min-width: 768px) {
		.introduction p {
			font-size: 1.75rem;
		}
	}
</style>

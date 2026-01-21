<script lang="ts">
	import Navbar from '$lib/Navbar.svelte';
	import { pageTitle, navExpanded } from '../stores.js';
	import { currentUpdate } from './latestUpdate.js';
	import { Milestone, get } from '$lib/milestones';
	import { eventYear, eventYearTwoDigit } from '$lib/eventDetails';

	function toggleNav() {
		if ($navExpanded === true) {
			$navExpanded = !$navExpanded;
		}
	}

	interface Props {
		isHomepage: boolean;
	}

	let { isHomepage }: Props = $props();

	const eventDate = get(Milestone.TheActualEventDay)?.formattedDate;
</script>

<header>
	<div class="bg header">
		<a href="/" class="logo-link" onclick={toggleNav}>
			<!-- For a11y purposes, the alt text on the image is the destination of the link - see https://www.w3.org/WAI/tutorials/images/functional/-->
			<img src="images/the_mighty_cow_white.svg" alt="DDD South West home" class="logo" />
		</a>
		{#if isHomepage}
			<div>
				<h1 class="long-name">DDD South West {eventYear}</h1>
				<h1 class="short-name">DDD SW '{eventYearTwoDigit}</h1>
				{#if eventDate}
					<h2 class="event-date">{eventDate} @ The Engine Shed, Bristol</h2>
				{/if}
				{#if currentUpdate}
					<p>
						{@html currentUpdate}
					</p>
				{/if}
			</div>
		{:else}
			<h1>{$pageTitle}</h1>
		{/if}
		<Navbar />
	</div>
</header>

<style>
	.bg {
		background: rgb(255, 153, 48);
		background: linear-gradient(90deg, rgba(255, 153, 48, 1) 50%, var(--quinary-color) 100%);
	}

	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: white;
	}

	.header h1 {
		font-family: 'Roboto';
	}

	.long-name {
		display: none;
	}

	.logo-link {
		display: none;
	}

	h1,
	h2,
	p {
		padding-left: 30px;
	}

	.event-date {
		margin: 0;
		font-family: 'Roboto';
		font-size: 1.25rem;
	}

	@media (min-width: 576px) {
		.header {
			justify-content: space-between;
			flex-direction: row;
			text-align: center;
		}

		.short-name {
			display: none;
		}

		.long-name {
			display: inline;
		}
	}

	@media (min-width: 768px) {
		.logo {
			max-width: 150px;
			padding: 20px;
		}

		.logo-link {
			display: inline;
			margin: 10px;
		}
	}

	@media (min-width: 992px) {
		.logo {
			max-width: 300px;
		}

		h1 {
			font-size: 2.5rem;
		}

		.event-date {
			font-size: 1.5rem;
		}
	}
</style>

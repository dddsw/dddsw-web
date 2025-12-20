<script lang="ts">
	import Navbar from '$lib/Navbar.svelte';
	// import Carousel from '$lib/Carousel.svelte';
	import { pageTitle, navExpanded } from '../stores.js';
	import { currentUpdate } from './latestUpdate.js';

	function toggleNav() {
		if ($navExpanded === true) {
			$navExpanded = !$navExpanded;
		}
	}

	interface Props {
		isHomepage: boolean;
	}

	let { isHomepage }: Props = $props();
</script>

<header>
	<div class="bg">
		<div class="header">
			<a href="/" class="logo-link" onclick={toggleNav}>
				<img src="images/the_mighty_cow_white.svg" alt="The DDD South West cow" class="logo" />
			</a>
			{#if isHomepage}
				<div>
					<h1 class="long-name">DDD South West 2026</h1>
					<h1 class="short-name">DDD SW '26</h1>
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
	p {
		padding-left: 30px;
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
	}
</style>

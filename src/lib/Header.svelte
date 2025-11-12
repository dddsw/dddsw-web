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
	{#if isHomepage}
		<!-- <div class="nav-absolute-container">
			<Carousel />
			<Navbar isAbsolute />
		</div> -->
		<div class="not-carousel">
			<div class="header">
				<a href="/" class="logo-link" onclick={toggleNav}>
					<img src="images/the_mighty_cow_white.svg" alt="The DDD South West cow" class="logo" />
				</a>
				<div>
					<h1>DDD South West 2026</h1>
					{#if currentUpdate}
						<p>
							{@html currentUpdate}
						</p>
					{/if}
				</div>
				<Navbar />
			</div>
		</div>
	{:else}
		<div class="bg">
			<div class="header">
				<a href="/" class="logo-link" onclick={toggleNav}>
					<img src="images/the_mighty_cow_white.svg" alt="The DDD South West cow" class="logo" />
				</a>
				<h1>{$pageTitle}</h1>
				<Navbar />
			</div>
		</div>
	{/if}
</header>

<style>
	.not-carousel {
		background: rgb(255, 153, 48);
	}

	.nav-absolute-container {
		position: relative;
	}

	.bg {
		background: rgb(255, 153, 48);
		background: linear-gradient(90deg, rgba(255, 153, 48, 1) 50%, var(--quinary-color) 100%);
	}

	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
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
			text-align: left;
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

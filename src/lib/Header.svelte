<script lang="ts">
	import Navbar from '$lib/Navbar.svelte';
	import Carousel from '$lib/Carousel.svelte';
	import { pageTitle, navExpanded } from '../stores.js';

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
		<div class="nav-absolute-container">
			<Carousel />
			<Navbar isAbsolute />
		</div>
	{:else}
		<div class="gradient-bg">
			<div class="header">
				<a href="/" class="logo-link" onclick={toggleNav}>
					<img src="../images/dddsw-logo-2025.png" alt="The DDD South West logo" class="logo" />
				</a>
				<h1>{$pageTitle}</h1>
				<Navbar />
			</div>
		</div>
	{/if}
</header>

<style>
	.nav-absolute-container {
		position: relative;
	}

	.gradient-bg {
		background: rgb(255, 153, 48);
		background: linear-gradient(
			90deg,
			rgba(255, 153, 48, 1) 0%,
			rgba(255, 193, 48, 1) 50%,
			rgba(150, 198, 202, 1) 100%
		);
	}

	.header {
		display: flex;
		align-items: center;
	}

	.logo-link {
		display: none;
	}

	h1 {
		padding-left: 20px;
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

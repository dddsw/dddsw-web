<script lang="ts">
	import Footer from '$lib/Footer.svelte';
	import Navbar from '$lib/Navbar.svelte';
	import { page } from '$app/stores';
	import { pageTitle, navExpanded } from '../stores.js';

	function toggleNav() {
		if ($navExpanded === true) {
			$navExpanded = !$navExpanded;
		}
	}

	$: homepage = $page.url.pathname === '/';
</script>

<svelte:head>
	<title>{$pageTitle}</title>
</svelte:head>

<div class="container">
	{#if !homepage}
		<div class="gradient-bg">
			<div class="header">
				<a href="/" class="logo-link" on:click={toggleNav}>
					<img src="../images/logo.png" alt="The DDD South West logo" class="logo" />
				</a>
				<h1>{$pageTitle}</h1>
				<Navbar />
			</div>
		</div>
	{/if}

	<slot />

	{#if !homepage}
		<div class="quaternary-bg">
			<div class="text-center">
				<h2>By the community, for the community</h2>
			</div>
		</div>
	{/if}

	<Footer />
</div>

<style>
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

	.logo {
		padding: 10px;
	}

	.logo-link {
		display: none;
	}

	h1 {
		padding-left: 20px;
	}

	h2 {
		padding: 0 10px;
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
			padding: 30px;
		}

		.logo-link {
			display: inline;
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

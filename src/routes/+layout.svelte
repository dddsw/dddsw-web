<script>
	import Footer from '$lib/Footer.svelte';
	import Navbar from '$lib/Navbar.svelte';
	import { page } from '$app/stores';
	import { pageTitle } from '../stores.js';

	$: homepage = $page.url.pathname === '/';
</script>

<div class="container">
	{#if !homepage}
		<div class="primary-bg">
			<div class="header">
				<a href="/"><img src="../images/logo.png" alt="The DDD South West logo" class="logo" /></a>
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
	.header {
		display: flex;
		align-items: center;
	}

	@media (min-width: 576px) {
		.header {
			justify-content: space-between;
			flex-direction: row;
			text-align: left;
		}
	}

	.logo {
		display: none;
	}

	@media (min-width: 768px) {
		.logo {
			display: inline;
			max-width: 150px;
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

	h1 {
		padding-left: 20px;
	}

	h2 {
		padding: 0 10px;
	}
</style>

<script>
	import Footer from '$lib/Footer.svelte';
	import Navbar from '$lib/Navbar.svelte';
	import { page } from '$app/stores';

	$: homepage = $page.url.pathname === '/';
</script>

<div class="container">
	{#if !homepage}
		<div class="primary-bg">
			<div class="section header">
				<a href="/"><img src="../images/logo.png" alt="The DDD South West logo" class="logo" /></a>
				<h1>About DDD South West</h1>
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
		flex-direction: column;
		text-align: center;
		width: 100%;
	}

	@media (min-width: 576px) {
		.header {
			justify-content: space-between;
			flex-direction: row;
			text-align: left;
		}
	}

	.logo {
		max-width: 150px;
	}

	@media (min-width: 768px) {
		.logo {
			max-width: 300px;
		}
	}
</style>

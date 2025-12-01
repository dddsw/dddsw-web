<script lang="ts">
	import '../app.css';
	import { currentUpdate } from '$lib/latestUpdate.js';
	import Navbar from '$lib/Navbar.svelte';
	import { pageTitle } from '../stores.js';
	import ThemeSwitcher from '$lib/ThemeSwitcher.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<title>{$pageTitle}</title>
</svelte:head>

<div class="prose flex w-screen max-w-full flex-col items-center">
	<div class="flex flex-row items-center space-y-4 p-4">
		<a href="/" class="lg:w-1/4">
			<img src="images/the_mighty_cow_white.svg" alt="The DDD South West cow" class="logo" />
		</a>
		<div class="mx-2 flex-1 px-2">DDD South West</div>
		<ThemeSwitcher />
	</div>
	<Navbar />
	<header class="hero lg:w-2/3">
		<h1>{$pageTitle}</h1>
	</header>
	<main class="space-y-4 p-4 lg:w-2/3">
		{#if currentUpdate}
			<p>
				{@html currentUpdate}
			</p>
		{/if}
		{@render children?.()}
	</main>

	<footer class="flex flex-col">
		<div>
			<p>&copy; 2026 DDD South West | <a href="/privacy-policy">Privacy Policy</a></p>
		</div>
		<div>
			<a href="https://bsky.app/profile/dddsouthwest.com" target="_blank">
				<i class="fa-brands fa-bluesky fa-3x" title="DDD South West BlueSky"></i>
			</a>
			<a href="mailto:management@dddsouthwest.com">
				<i class="fa-solid fa-envelope fa-3x icon" title="DDD South West Email"></i>
			</a>
			<a href="https://www.linkedin.com/company/ddd-south-west/" target="_blank">
				<i class="fa-brands fa-linkedin fa-3x" title="DDD South West LinkedIn"></i>
			</a>
		</div>
	</footer>
</div>

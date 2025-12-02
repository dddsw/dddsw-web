<script lang="ts">
	import '../app.css';
	import { currentUpdate } from '$lib/latestUpdate.js';
	import IconifyIcon from '@iconify/svelte';
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

	<footer class="footer gap-0 bg-base-200">
		<div class="footer sm:footer-horizontal">
			<nav class="not-prose p-5 sm:justify-self-start">
				<ul>
					<li><a class="link link-hover" href="/code-of-conduct">Code of Conduct</a></li>
					<li><a class="link link-hover" href="/privacy-policy">Privacy Policy</a></li>
				</ul>
			</nav>
			<nav class="sm:justify-self-end">
				<ul class="menu menu-horizontal menu-lg rounded-box">
					<li>
						<a href="https://bsky.app/profile/dddsouthwest.com" target="_blank">
							<IconifyIcon icon="fa7-brands:bluesky" class="h-5 w-5"
								>DDD South West BlueSky</IconifyIcon>
						</a>
					</li>
					<li>
						<a href="mailto:management@dddsouthwest.com">
							<IconifyIcon icon="fa7-solid:envelope" class="h-5 w-5"
								>DDD South West Email</IconifyIcon>
						</a>
					</li>
					<li>
						<a href="https://www.linkedin.com/company/ddd-south-west/" target="_blank">
							<IconifyIcon icon="fa7-brands:linkedin" class="h-5 w-5"
								>DDD South West LinkedIn</IconifyIcon>
						</a>
					</li>
				</ul>
			</nav>
		</div>
		<span class="pb-5 pl-5">&copy; 2026 DDD South West</span>
	</footer>
</div>

<script lang="ts">
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
	import { page } from '$app/stores';
	import { pageTitle } from '../stores.js';

	$: isHomepage = $page.url.pathname === '/';
</script>

<svelte:head>
	<title>{$pageTitle}</title>
</svelte:head>

<Header {isHomepage} />

<main class="container">
	<slot />
</main>

<Footer {isHomepage} />

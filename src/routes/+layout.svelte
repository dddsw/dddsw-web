<script lang="ts">
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
	import { pageTitle } from '../stores.js';
</script>

<svelte:head>
	<title>{$pageTitle}</title>
</svelte:head>

<Header />

<main>
	<slot />
</main>

<Footer />

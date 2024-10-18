<script lang="ts">
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';

	import { page } from '$app/stores';
	import '../app.css';
</script>

<svelte:head>
	<title>{$page.data.title}</title>
</svelte:head>

<Header />

<main>
	<slot />
</main>

<Footer />

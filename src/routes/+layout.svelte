<script>
	import '../app.css';
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';

	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>{$page.data.title}</title>
</svelte:head>

<div class="grid h-screen grid-rows-[auto_1fr_auto] gap-10">
	<Header />

	<main>
		<slot />
	</main>

	<Footer />
</div>

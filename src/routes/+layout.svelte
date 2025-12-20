<script lang="ts">
	import '../app.css';
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
	import { page } from '$app/stores';
	import { pageTitle } from '../stores.js';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	let isHomepage = $derived($page.url.pathname === '/');
</script>

<svelte:head>
	<title>{$pageTitle}</title>
</svelte:head>

<Header {isHomepage} />
<main class="container">
	{@render children?.()}
</main>
<Footer {isHomepage} />

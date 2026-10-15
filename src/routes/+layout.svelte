<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import type { LayoutProps } from './$types';
	import Container from '#lib/components/Container.svelte';
	import Header from '#lib/components/Header.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import PageHeading from '#lib/components/PageHeading.svelte';
	import { event } from '#lib/eventDetails.ts';
	import { toaster } from '#lib/toaster.ts';
	import { Toast } from '@skeletonlabs/skeleton-svelte';

	let { children }: LayoutProps = $props();

	// Pages with their own full-width design (the home page, error pages) opt out of the
	// standard layout: the home page by returning `bare: true` from its `load` function.
	const bare = $derived(page.data.bare === true || page.error !== null);
</script>

<svelte:head>
	<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
	<meta name="description" content="{event.name} ({event.shortName}) — {event.tagline}." />
	<meta name="theme-color" content="#ff9930" />
</svelte:head>

<a
	href="#main"
	class="sr-only btn preset-filled-primary-500 focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50">
	Skip to content
</a>
<Header />
<main id="main">
	{#if bare}
		{@render children()}
	{:else}
		<!--
			The default layout for every page: the orange heading banner, then the page's content in
			the standard container with standard spacing. Pages only supply their content, plus a
			`title` and `lead` from their `load` function; they never deal with widths or positioning.
		-->
		<PageHeading title={page.data.title ?? event.shortName} lead={page.data.lead} />
		<Container class="space-y-12 pt-12">
			{@render children()}
		</Container>
	{/if}
</main>
<Footer />

<Toast.Group {toaster}>
	{#snippet children(toast)}
		<Toast {toast}>
			<Toast.Message>
				<Toast.Title>{toast.title}</Toast.Title>
				<Toast.Description>{toast.description}</Toast.Description>
			</Toast.Message>
			<Toast.CloseTrigger
				class="hover:preset-filled-surface-950-50 focus-visible:preset-filled-surface-950-50" />
		</Toast>
	{/snippet}
</Toast.Group>

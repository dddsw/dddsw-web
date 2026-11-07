<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import type { LayoutProps } from './$types';
	import Container from '#lib/components/Container.svelte';
	import Header from '#lib/components/Header.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import PageHeading from '#lib/components/PageHeading.svelte';
	import { event } from '#lib/eventDetails.ts';
	import { socialCard } from '#lib/socialCard.ts';
	import { toaster } from '#lib/toaster.ts';
	import { Toast } from '@skeletonlabs/skeleton-svelte';

	let { children }: LayoutProps = $props();

	// Pages with their own full-width design (the home page, error pages) opt out of the
	// standard layout: the home page by returning `bare: true` from its `load` function.
	const bare = $derived(page.data.bare === true || page.error !== null);

	// Each page's own `lead` is the best summary of it for search results. Pages without one (and
	// the home and error pages) use the general description of the event.
	const defaultDescription = `${event.name} (${event.shortName}) — ${event.tagline}.`;
	const description = $derived(
		page.error === null ? (page.data.lead ?? defaultDescription) : defaultDescription
	);

	// The page's own name first, then the site's. The home page has no `title` and uses the full name.
	const suffix = `${event.shortName} ${event.year}`;
	const title = $derived(
		page.error !== null
			? `${page.status} · ${suffix}`
			: `${page.data.title ?? event.name} · ${suffix}`
	);

	// The one public address of each page: the apex host, no trailing slash, no query string.
	// Error pages have none, so they never claim to be the page that failed.
	const canonical = $derived(page.error === null ? `${event.siteUrl}${page.url.pathname}` : null);
	const socialImage = `${event.siteUrl}${socialCard.path}`;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	{#if canonical}
		<link rel="canonical" href={canonical} />
		<meta property="og:url" content={canonical} />
	{/if}
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={event.name} />
	<meta property="og:locale" content="en_GB" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={socialImage} />
	<meta property="og:image:type" content="image/png" />
	<meta property="og:image:width" content={String(socialCard.width)} />
	<meta property="og:image:height" content={String(socialCard.height)} />
	<meta property="og:image:alt" content={socialCard.alt} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={socialImage} />
	<meta name="robots" content="max-image-preview:large" />

	<link rel="icon" href="/favicon.ico" sizes="32x32" />
	<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
	<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
	<link rel="manifest" href="/site.webmanifest" />
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

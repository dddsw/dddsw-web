<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { event } from '$lib/eventDetails';
	import { initPreview, preview } from '$lib/featured.svelte';
	import { resolveFeatured } from '$lib/featured';
	import { visibleNav } from '$lib/navigation';
	import { Popover, Portal } from '@skeletonlabs/skeleton-svelte';
	import Container from './Container.svelte';
	import Cow from './Cow.svelte';
	import ThemeToggle from './ThemeToggle.svelte';
	import FeaturedLink from './FeaturedLink.svelte';

	// Nav highlights: the current page is a solid orange pill (like the selected year tab); hovering
	// any other link flips it to the standard contrasting navy (white in dark mode).
	const CURRENT = 'preset-filled-primary-500';
	const HOVER = 'hover:preset-filled-surface-950-50 focus-visible:preset-filled-surface-950-50';

	let menuOpen = $state(false);

	// The featured button follows the current milestone (tickets, session voting or the call for
	// papers) and is absent when none is open. `?preview=tickets|voting|cfp|none|off` overrides it
	// for testing.
	onMount(initPreview);
	const featured = $derived(resolveFeatured(preview.featured));
	const navItems = $derived(visibleNav(preview));
	const isPreview = $derived(preview.featured !== null);

	function isCurrent(href: string) {
		return page.url.pathname === href || page.url.pathname.startsWith(`${href}/`);
	}

	function closeMenu() {
		menuOpen = false;
	}
</script>

<header
	class="sticky top-0 z-30 border-b border-surface-200-800 bg-surface-50-950/90 backdrop-blur">
	<Container class="flex items-center justify-between gap-4 py-3">
		<a
			href="/"
			class="group -mx-2 flex shrink-0 items-center gap-3 rounded-base px-2 py-1 no-underline hover:preset-filled-surface-950-50 focus-visible:preset-filled-surface-950-50"
			aria-label="{event.shortName} home">
			<Cow class="wobble h-10 w-auto text-primary-500" />
			<span
				class="font-heading text-2xl font-semibold tracking-tight text-surface-950-50 group-hover:text-surface-50-950 group-focus-visible:text-surface-50-950">
				{event.shortName}<span
					class="text-secondary-700-300 group-hover:text-inherit group-focus-visible:text-inherit">
					{event.year}</span>
			</span>
		</a>

		<nav aria-label="Main" class="hidden flex-wrap items-center justify-center gap-1 md:flex">
			{#each navItems as item (item.href)}
				<a
					href={item.href}
					class={[
						'rounded-base px-3 py-2 font-semibold whitespace-nowrap no-underline',
						isCurrent(item.href) ? CURRENT : HOVER
					]}
					aria-current={isCurrent(item.href) ? 'page' : undefined}>
					{item.label}
				</a>
			{/each}
			{#if featured}
				<FeaturedLink {featured} preview={isPreview} class="ml-2 px-6 py-3" />
			{/if}
		</nav>

		<div class="flex shrink-0 items-center gap-2">
			<ThemeToggle />
			<div class="md:hidden">
				<Popover
					open={menuOpen}
					onOpenChange={(details) => (menuOpen = details.open)}
					positioning={{ placement: 'bottom-end' }}>
					<Popover.Trigger
						class="btn cursor-pointer preset-tonal hover:preset-filled-surface-950-50 focus-visible:preset-filled-surface-950-50"
						>Menu</Popover.Trigger>
					<Portal>
						<Popover.Positioner class="z-50!">
							<Popover.Content
								class="w-56 rounded-container border border-surface-200-800 bg-surface-50-950 p-3 shadow-xl">
								<nav aria-label="Mobile" class="flex flex-col gap-1">
									{#each navItems as item (item.href)}
										<a
											href={item.href}
											class={[
												'rounded-base px-3 py-2 font-semibold no-underline',
												isCurrent(item.href) ? CURRENT : `text-inherit ${HOVER}`
											]}
											aria-current={isCurrent(item.href) ? 'page' : undefined}
											onclick={closeMenu}>
											{item.label}
										</a>
									{/each}
									{#if featured}
										<FeaturedLink
											{featured}
											preview={isPreview}
											class="mt-1 px-6 py-3"
											onclick={closeMenu} />
									{/if}
								</nav>
							</Popover.Content>
						</Popover.Positioner>
					</Portal>
				</Popover>
			</div>
		</div>
	</Container>
</header>

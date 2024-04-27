<script lang="ts">
	import { page } from '$app/stores';
	import { navExpanded } from '../stores.js';

	export let isAbsolute = false;

	let navItems = [
		{ text: 'Home', href: '/', hidden: false },
		{ text: 'About', href: '/about', hidden: false },
		{ text: 'Sponsorship', href: '/sponsorship', hidden: false },
		{ text: 'Event Venue', href: '/venue', hidden: false },
		{ text: 'Room map', href: '/venue-layout', hidden: false },
		{ text: 'New Speakers Workshop', href: '/new-speakers-workshop', hidden: true },
		{ text: 'Sessions', href: '/sessions', hidden: true },
		{ text: 'Schedule', href: '/schedule', hidden: false },
		{ text: 'Pocket DDD', href: 'https://pocket2024.dddsouthwest.com/', hidden: false },
		{ text: 'Code of Conduct', href: '/code-of-conduct', hidden: false }
	];

	$: currentPage = $page.url.pathname;
	$: homepage = currentPage === '/';

	let navClass = isAbsolute ? 'nav-absolute' : '';
	let navLinkContainerClass = isAbsolute ? '' : 'nav-link-container';

	function toggleNav() {
		$navExpanded = !$navExpanded;
	}
</script>

<nav class={navClass}>
	<button
		class="unset main-nav-button"
		class:shadow={homepage}
		class:inverted-colours={homepage}
		on:click={toggleNav}
	>
		<span class="nav-button-text">Find out more</span>

		<span class="material-symbols-outlined icon">
			{#if $navExpanded}
				expand_less
			{:else}
				expand_more
			{/if}
		</span>
	</button>
	{#if $navExpanded}
		<div>
			<div class={navLinkContainerClass}>
				{#each navItems as navItem}
					{#if navItem.href !== currentPage && !navItem.hidden}
						<a href={navItem.href} on:click={toggleNav} class="nav-link">{navItem.text}</a>
					{/if}
				{/each}
			</div>
		</div>
	{/if}
</nav>

<style>
	nav {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		margin: 20px;
	}
	.nav-absolute {
		position: absolute;
		right: 0px;
		top: 0px;
	}

	nav a {
		color: black;
		text-decoration: none;
	}

	nav a,
	.main-nav-button {
		font-size: 1.5rem;
	}

	.main-nav-button {
		padding: 10px;
		display: flex;
		align-items: center;
	}

	.main-nav-button:hover {
		cursor: pointer;
	}

	.nav-link-container {
		position: absolute;
		right: 20px;
		z-index: 5000;
	}

	.nav-link {
		padding: 10px;
		border: 1px solid lightgrey;
		display: block;
	}

	.nav-link,
	.main-nav-button,
	.inverted-colours:hover {
		background-color: white;
		color: black;
	}

	.nav-link:hover,
	.main-nav-button:hover,
	.inverted-colours {
		background-color: var(--primary-color);
		color: black;
	}

	.nav-button-text {
		display: none;
	}

	.icon {
		font-size: 3rem;
	}

	.shadow {
		box-shadow: 0px 0px 20px 5px rgb(0 0 0 / 70%);
	}

	@media (min-width: 400px) {
		nav {
			justify-content: flex-end;
			margin: 50px;
		}

		.nav-link-container {
			right: 50px;
		}
	}

	@media (min-width: 768px) {
		.nav-button-text {
			display: inline;
		}

		.icon {
			font-size: 2rem;
		}
	}
</style>

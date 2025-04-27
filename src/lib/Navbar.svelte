<script lang="ts">
	import { page } from '$app/stores';
	import { navExpanded } from '../stores.js';

	interface Props {
		isAbsolute?: boolean;
	}

	let { isAbsolute = false }: Props = $props();

	let navItems = [
		{ text: 'Home', href: '/', hidden: false },
		{ text: 'About', href: '/about', hidden: false },
		{ text: 'Sponsorship', href: '/sponsorship', hidden: false },
		{ text: 'Event Venue', href: '/venue', hidden: false },
		{ text: 'Room map', href: '/venue-layout', hidden: false },
		{ text: 'New Speakers Workshop', href: '/new-speakers-workshop', hidden: true },
		{ text: 'Sessions', href: '/sessions', hidden: false },
		{ text: 'Schedule', href: '/schedule', hidden: false },
		{ text: 'Pocket DDD', href: 'https://pocket2025.dddsouthwest.com/', hidden: true },
		{ text: 'Privacy Policy', href: '/privacy-policy', hidden: false },
		{ text: 'Code of Conduct', href: '/code-of-conduct', hidden: false }
	];

	let currentPage = $derived($page.url.pathname);
	let homepage = $derived(currentPage === '/');

	function toggleNav() {
		$navExpanded = !$navExpanded;
	}
</script>

<nav class:nav-absolute={isAbsolute}>
	<button
		class="unset main-nav-button"
		class:shadow={homepage}
		class:inverted-colours={homepage}
		onclick={toggleNav}>
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
			<div class="nav-link-container" class:nav-link-container-absolute={!isAbsolute}>
				{#each navItems as navItem}
					{#if !navItem.hidden}
						<a
							href={navItem.href}
							onclick={toggleNav}
							class="nav-link"
							class:isActivePage={navItem.href === currentPage}>
							{navItem.text}
						</a>
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
		margin: 30px;
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
		background-color: white;
	}

	.nav-link-container-absolute {
		position: absolute;
		right: 30px;
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

	.isActivePage {
		background-color: rgba(255, 153, 48, 0.8);
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

	@media (min-width: 768px) {
		nav {
			margin: 67px 50px;
		}

		.nav-link-container {
			right: 49px;
		}

		.nav-button-text {
			display: inline;
		}

		.icon {
			font-size: 2rem;
		}
	}
</style>

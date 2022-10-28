<script>
	import { page } from '$app/stores';

	let navItems = [
		{ text: 'Home', href: '/', hidden: false },
		{ text: 'About', href: '/about', hidden: false },
		{ text: 'Sponsorship', href: '/sponsorship', hidden: false }
	];

	$: expanded = false;
	$: currentPage = $page.url.pathname;
	$: homepage = currentPage === '/';

	function toggleExpanded() {
		expanded = !expanded;
	}
</script>

<nav>
	<div class="main-nav-button" class:shadow={homepage} on:click={toggleExpanded}>
		<span class="nav-button-text">Find out more</span>

		<span class="material-symbols-outlined icon">
			{#if expanded} expand_less {:else} expand_more {/if}</span
		>
	</div>
	{#if expanded}
		<div>
			<div class="nav-link-container">
				{#each navItems as navItem}
					{#if navItem.href !== currentPage}
						<a href={navItem.href}><div class="nav-link">{navItem.text}</div></a>
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

	@media (min-width: 400px) {
		nav {
			justify-content: flex-end;
			margin: 50px;
		}
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
	}
	@media (min-width: 400px) {
		.nav-link-container {
			right: 50px;
		}
	}

	.nav-link {
		padding: 10px;
	}

	.nav-link,
	.main-nav-button {
		background-color: #ff9930;
		color: black;
	}

	.nav-link:hover,
	.main-nav-button:hover {
		background-color: white;
		color: black;
	}

	.nav-button-text {
		display: none;
	}

	.icon {
		font-size: 3rem;
	}

	@media (min-width: 768px) {
		.nav-button-text {
			display: inline;
		}

		.icon {
			font-size: 2rem;
		}
	}

	.shadow {
		box-shadow: 0px 0px 20px 5px rgb(0 0 0 / 70%);
	}
</style>

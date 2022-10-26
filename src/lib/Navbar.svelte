<script>
	export let shadow = false;
	export let currentRoute = '';

	let navItems = [
		{ text: 'About', href: '/about' },
		{ text: 'Sponsorship', href: '/sponsorship' }
		// { text: 'DDDSW 2023', href: '/todo' }
	];
</script>

<nav>
	{#each navItems as navItem}
		{#if currentRoute !== navItem.href}
			<div class="nav-button" class:shadow={shadow === true}>
				<a href={navItem.href}>{navItem.text}</a>
			</div>
		{/if}
	{/each}
</nav>

<style>
	nav {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 5px;
		margin: 20px;
	}

	@media (min-width: 400px) {
		nav {
			flex-direction: row;
			justify-content: flex-end;
			gap: 20px;
			margin: 50px;
		}
	}

	nav a {
		color: black;
		text-decoration: none;
	}

	@media (min-width: 768px) {
		nav a {
			font-size: 1.5rem;
		}
	}

	.nav-button {
		border-radius: 20px;
		padding: 5px 10px;
	}

	.nav-button:hover {
		background-color: unset;
	}

	.nav-button:hover a {
		color: white;
	}

	.shadow {
		box-shadow: 0px 0px 20px 5px rgb(0 0 0 / 70%);
		background-color: rgb(0 0 0 / 70%);
	}

	.shadow a {
		color: white;
	}

	.shadow:hover {
		background-color: white;
	}

	.shadow:hover a {
		color: black;
	}
</style>

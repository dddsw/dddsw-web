<script lang="ts">
	import { page } from '$app/stores';

	let navItems = [
		{ text: 'Home', href: '/', hidden: false },
		{ text: 'About', href: '/about', hidden: false },
		{ text: 'Code of Conduct', href: '/code-of-conduct', hidden: false }
	];

	$: currentPage = $page.url.pathname;
</script>

<nav>
	<div>
		<div>
			{#each navItems as navItem}
				{#if navItem.href !== currentPage && !navItem.hidden}
					<a href={navItem.href}>{navItem.text}</a>
				{/if}
			{/each}
		</div>
	</div>
</nav>

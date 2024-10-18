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
	<ul class="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box">
		{#each navItems as navItem}
			{#if !navItem.hidden}
				<li>
					<a class:active={navItem.href == currentPage} href={navItem.href}>{navItem.text}</a>
				</li>
			{/if}
		{/each}
	</ul>
</nav>

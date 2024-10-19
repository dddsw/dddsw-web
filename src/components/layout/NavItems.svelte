<script lang="ts">
	import { page } from '$app/stores';

	type NavItem = {
		hidden: boolean;
		href: string;
		text: string;
	};

	const navItems: NavItem[] = [
		{ text: 'Home', href: '/', hidden: false },
		{ text: 'About', href: '/about', hidden: false },
		{ text: 'Code of Conduct', href: '/code-of-conduct', hidden: false }
	];
</script>

{#each navItems as navItem}
	{#if !navItem.hidden}
		<li>
			<a class:active={navItem.href === $page.url.pathname} href={navItem.href}>{navItem.text}</a>
		</li>
	{/if}
{/each}

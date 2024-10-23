<script lang="ts">
	import { page } from '$app/stores';

	type NavItem = {
		href: string | null;
		id: string;
		show: boolean;
		submenuItems: NavItem[] | null;
		expanded: boolean;
		text: string;
	};

	const navItems: NavItem[] = [
		{ text: 'Home', id: 'home', href: '/', show: true, expanded: false, submenuItems: null },
		{
			text: 'About',
			id: 'about',
			href: null,
			show: true,
			expanded: false,
			submenuItems: [
				{
					text: 'Meet the team',
					id: 'team',
					href: '/about/team',
					show: true,
					expanded: false,
					submenuItems: null
				},
				{
					text: 'History',
					id: 'history',
					href: '/about/history',
					show: true,
					expanded: false,
					submenuItems: null
				},
				{
					text: 'Other DDD conferences',
					id: 'other-ddd',
					href: '/about/other-ddd-conferences',
					show: false,
					expanded: false,
					submenuItems: null
				}
			]
		},
		{
			text: 'Code of Conduct',
			id: 'code-of-conduct',
			href: '/code-of-conduct',
			show: false,
			expanded: false,
			submenuItems: null
		}
	];

	const toggle = (e: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) => {
		e.currentTarget.classList.toggle('menu-dropdown-show');
		document
			.getElementById(e.currentTarget.getAttribute('aria-controls')!)
			?.classList.toggle('menu-dropdown-show');
	};
</script>

{#each navItems.filter((navItem) => navItem.show) as navItem}
	<li>
		{#if navItem.href}
			<a class:active={navItem.href === $page.url.pathname} href={navItem.href}>{navItem.text}</a>
		{:else}
			<!-- <div> -->
			<button
				class="menu-dropdown-toggle"
				on:click={toggle}
				aria-controls="{navItem.id}-submenu"
				type="button">{navItem.text}</button>
			<ul class="menu-dropdown" id="{navItem.id}-submenu">
				{#each (navItem.submenuItems ?? []).filter((submenuItem) => submenuItem.show) as submenuItem}
					<li><a href={submenuItem.href}>{submenuItem.text}</a></li>
				{/each}
			</ul>
			<!-- </div> -->
		{/if}
	</li>
{/each}

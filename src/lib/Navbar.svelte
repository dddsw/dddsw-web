<script lang="ts">
	import { Milestone, get } from '$lib/milestones';
	import { pocketdddUrl } from '$lib/eventDetails';

	let navItems = [
		{ text: 'Home', href: '/', show: true },
		{ text: 'About', href: '/about', show: true },
		{ text: 'Sponsorship', href: '/sponsorship', show: true },
		{ text: 'Event Venue', href: '/venue', show: true },
		{ text: 'Room map', href: '/venue-layout', show: true },
		{ text: 'New Speakers Workshop', href: '/new-speakers-workshop', show: false },
		{
			text: 'Sessions',
			href: '/sessions',
			show:
				(get(Milestone.OpenSessionVoting)?.hasHappened &&
					get(Milestone.CloseSessionVoting)?.hasNotHappened) ||
				get(Milestone.AnnounceScheduleAndOpenTicketRegistration)?.hasHappened
		},
		{
			text: 'Schedule',
			href: '/schedule',
			show: get(Milestone.AnnounceScheduleAndOpenTicketRegistration)?.hasHappened
		},
		{ text: 'Pocket DDD', href: pocketdddUrl, show: get(Milestone.TheActualEventDay)?.hasHappened },
		{ text: 'Privacy Policy', href: '/privacy-policy', show: true },
		{ text: 'Code of Conduct', href: '/code-of-conduct', show: true }
	];
</script>

{#snippet menuitems()}
	{#each navItems as navItem}
		{#if navItem.show}
			<li><a href={navItem.href} class="not-prose">{navItem.text}</a></li>
		{/if}
	{/each}
{/snippet}

<div class="daisyui drawer sticky top-0">
	<input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content flex flex-col">
		<!-- Navbar -->
		<div class="navbar w-full bg-base-300">
			<div class="flex-none lg:hidden">
				<label for="my-drawer-2" aria-label="open sidebar" class="btn btn-square btn-ghost">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						class="inline-block h-6 w-6 stroke-current">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"></path>
					</svg>
				</label>
			</div>
			<div class="hidden flex-none lg:block">
				<ul class="menu menu-horizontal">
					{@render menuitems()}
				</ul>
			</div>
		</div>
	</div>
	<div class="drawer-side">
		<label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
		<ul class="menu min-h-full w-80 bg-base-200 p-4">
			{@render menuitems()}
		</ul>
	</div>
</div>

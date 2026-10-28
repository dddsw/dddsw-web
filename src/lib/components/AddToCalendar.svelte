<script lang="ts">
	import { Popover, Portal } from '@skeletonlabs/skeleton-svelte';
	import * as calendarPlus from '@fortawesome/free-solid-svg-icons/faCalendarPlus';
	import * as google from '@fortawesome/free-brands-svg-icons/faGoogle';
	import * as calendarDays from '@fortawesome/free-solid-svg-icons/faCalendarDays';
	import * as microsoft from '@fortawesome/free-brands-svg-icons/faMicrosoft';
	import { calendarLinks } from '#lib/calendar.ts';
	import { event } from '#lib/eventDetails.ts';

	let { date, class: className }: { date: string; class?: string } = $props();

	const location = $derived([event.venue.name, event.venue.address].filter(Boolean).join(', '));
	const links = $derived(
		calendarLinks({
			date,
			title: `${event.name} ${event.year}`,
			location: location || undefined,
			description: `${event.tagline}.`,
			uid: `dddsw-${event.year}@dddsouthwest.com`
		})
	);

	// Font Awesome Free icons (CC BY 4.0), inlined as SVG paths at build time.
	const options = $derived([
		{ label: 'Google Calendar', href: links.google, icon: google, external: true },
		{ label: 'iCal', href: '/calendar.ics', icon: calendarDays, external: false },
		{ label: 'Outlook', href: links.outlook, icon: microsoft, external: true }
	]);

	let open = $state(false);
</script>

{#snippet glyph(icon: { width: number; height: number; svgPathData: string }, size = 'size-4')}
	<svg
		viewBox="0 0 {icon.width} {icon.height}"
		fill="currentColor"
		aria-hidden="true"
		focusable="false"
		class={size}
		xmlns="http://www.w3.org/2000/svg">
		<path d={icon.svgPathData} />
	</svg>
{/snippet}

<Popover
	{open}
	onOpenChange={(details) => (open = details.open)}
	positioning={{ placement: 'bottom-start' }}>
	<Popover.Trigger
		class="inline-flex cursor-pointer items-center gap-2 underline decoration-1 underline-offset-4 hover:text-primary-400 focus-visible:text-primary-400 {className ??
			''}">
		{@render glyph(calendarPlus)}
		Add to your calendar
	</Popover.Trigger>
	<Portal>
		<Popover.Positioner class="z-50!">
			<Popover.Content
				class="w-60 rounded-container border border-surface-200-800 bg-surface-50-950 p-2 text-surface-950-50 shadow-xl">
				<ul class="flex flex-col gap-1">
					{#each options as option (option.label)}
						<li>
							<a
								href={option.href}
								target={option.external ? '_blank' : undefined}
								rel={option.external ? 'noopener' : undefined}
								class="flex items-center gap-3 rounded-base px-3 py-2 font-semibold text-inherit no-underline hover:preset-filled-surface-950-50 focus-visible:preset-filled-surface-950-50"
								onclick={() => (open = false)}>
								{@render glyph(option.icon, 'size-5')}
								{option.label}
							</a>
						</li>
					{/each}
				</ul>
			</Popover.Content>
		</Popover.Positioner>
	</Portal>
</Popover>

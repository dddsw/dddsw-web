<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import { Avatar, Dialog, Portal, Tabs } from '@skeletonlabs/skeleton-svelte';
	import * as chevronLeft from '@fortawesome/free-solid-svg-icons/faChevronLeft';
	import * as chevronRight from '@fortawesome/free-solid-svg-icons/faChevronRight';
	import AddToCalendar from '#lib/components/AddToCalendar.svelte';
	import ComingSoon from '#lib/components/ComingSoon.svelte';
	import Countdown from '#lib/components/Countdown.svelte';
	import Cow from '#lib/components/Cow.svelte';
	import EventFacts from '#lib/components/EventFacts.svelte';
	import FeaturedLink from '#lib/components/FeaturedLink.svelte';
	import SeatMilestones from '#lib/components/SeatMilestones.svelte';
	import SocialIcon from '#lib/components/SocialIcon.svelte';
	import SponsorCard from '#lib/components/SponsorCard.svelte';
	import Timeline from '#lib/components/Timeline.svelte';
	import { sponsorPath, sponsorSupporterExtras } from '#lib/content/sponsors.ts';
	import { team } from '#lib/content/team.ts';
	import { event } from '#lib/eventDetails.ts';
	import { featured } from '#lib/featured.ts';
	import { picture } from '#lib/images.ts';
	import { toaster } from '#lib/toaster.ts';

	/*
	 * A reference page, kept out of search results and the nav (see `unlistedRoutes` in seo.ts).
	 * Every sample uses the same classes and components as the real pages, so when a pattern
	 * changes there, change it here too. The class strings shown under each sample are the ones
	 * to copy.
	 */

	// The hover/focus pairs every control uses: the fill flips to the contrasting colour.
	const flipToNavy =
		'hover:preset-filled-surface-950-50 focus-visible:preset-filled-surface-950-50';
	const flipToOrange = 'hover:preset-filled-primary-500 focus-visible:preset-filled-primary-500';
	const flipToWhite =
		'hover:preset-filled-surface-50-950 focus-visible:preset-filled-surface-50-950';

	const buttons = {
		primary: `btn cursor-pointer preset-filled-primary-500 ${flipToNavy}`,
		secondary: `btn cursor-pointer preset-filled-surface-950-50 ${flipToOrange}`,
		outline: `btn cursor-pointer preset-outlined-primary-500 ${flipToNavy}`,
		tonal: `btn cursor-pointer preset-tonal ${flipToNavy}`,
		onBrand: `btn preset-filled-surface-950-50 ${flipToWhite}`
	};

	const cards = {
		default: 'card preset-filled-surface-100-900 p-6',
		callout: 'card tint-orange p-6',
		inverse:
			'card bg-surface-950 p-6 text-surface-50 dark:border dark:border-surface-700 dark:bg-surface-900',
		inset: 'card bg-surface-50-950 p-5',
		stripe: 'card border-l-4 border-primary-500 preset-filled-surface-100-900 p-5'
	};

	const palettes = ['primary', 'secondary', 'tertiary', 'success', 'warning', 'error', 'surface'];
	const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

	/** The light/dark pairs the site is built from, and what each one is for. */
	const roles = [
		{ token: 'surface-50-950', use: 'Page background' },
		{ token: 'surface-950-50', use: 'Body text, navy buttons and hover fills' },
		{ token: 'surface-100-900', use: 'Card background' },
		{ token: 'surface-200-800', use: 'Lines and borders' },
		{ token: 'surface-700-300', use: 'Muted text' },
		{ token: 'secondary-700-300', use: 'Links: only things you can click' },
		{ token: 'primary-500', use: 'Brand, current page, selected tab, main button' }
	];

	/**
	 * The colour mode the page is showing. The header's switch toggles a `dark` class on <html>
	 * (see ThemeToggle), so watch that class and follow it live. The server render is light; the
	 * real mode is picked up as soon as the page loads.
	 */
	let dark = $state(false);
	const mode = $derived(dark ? 'dark' : 'light');

	onMount(() => {
		const html = document.documentElement;
		const update = () => (dark = html.classList.contains('dark'));
		update();
		const observer = new MutationObserver(update);
		observer.observe(html, { attributes: true, attributeFilter: ['class'] });
		return () => observer.disconnect();
	});

	/** The shade a light/dark pair like `surface-50-950` uses in the current mode. */
	function resolved(token: string): string {
		const pair = token.match(/^([a-z]+)-(\d+)-(\d+)$/);
		if (!pair) return token;
		const [, palette, light, darkShade] = pair;
		return `${palette}-${dark ? darkShade : light}`;
	}

	const years = ['2026', '2025', '2024'];
	let selectedYear = $state(years[0]);
	let dialogOpen = $state(false);

	const member = team[0];
	const photo = picture(`team/${member.photo}`);
</script>

<!-- The classes to copy, shown under a sample. -->
{#snippet classes(value: string)}
	<code
		class="block font-mono text-xs whitespace-normal [overflow-wrap:anywhere] text-surface-700-300"
		>{value}</code>
{/snippet}

<!-- One sample with its name and classes. -->
{#snippet sample(name: string, value: string | undefined, children: Snippet)}
	<div class="space-y-2">
		<p class="text-sm font-semibold">{name}</p>
		<div class="flex flex-wrap items-center gap-3">{@render children()}</div>
		{#if value}{@render classes(value)}{/if}
	</div>
{/snippet}

{#snippet chevron(icon: { width: number; height: number; svgPathData: string })}
	<svg
		viewBox="0 0 {icon.width} {icon.height}"
		fill="currentColor"
		aria-hidden="true"
		focusable="false"
		class="size-4"
		xmlns="http://www.w3.org/2000/svg">
		<path d={icon.svgPathData} />
	</svg>
{/snippet}

<!--
	Which mode the samples are in, kept in view while scrolling. It follows the header's switch,
	and is announced when it changes.
-->
<p
	class="sticky top-[calc(var(--header-height,4.5rem)+0.75rem)] z-20 ml-auto flex w-fit items-center gap-2 rounded-full border border-surface-200-800 bg-surface-50-950 px-4 py-2 text-sm font-semibold shadow-md"
	aria-live="polite">
	<span aria-hidden="true">{dark ? '🌙' : '☀️'}</span>
	<span>Showing <span data-testid="style-guide-mode">{mode}</span> mode</span>
</p>

<section aria-labelledby="about-guide" class="max-w-3xl space-y-3">
	<h2 id="about-guide" class="h2">How to use this page</h2>
	<p>
		You're looking at <strong>{mode} mode</strong>. Use the switch in the header to flip to {dark
			? 'light'
			: 'dark'} mode (the badge at the top right follows it), hover over things, and press
		<kbd class="kbd">Tab</kbd> to check the focus ring. Every sample uses the same classes and components
		as the real pages, and the classes to copy are shown underneath.
	</p>
	<p class="text-sm text-surface-700-300">
		This page isn't in the nav or the sitemap, and search engines are asked not to index it.
	</p>
</section>

<section aria-labelledby="colour" class="space-y-6">
	<h2 id="colour" class="h2">Colour</h2>
	<div class="space-y-3">
		<h3 class="h4">What each colour is for</h3>
		<p class="max-w-3xl text-sm text-surface-700-300">
			Most colours are light/dark pairs: <code class="font-mono">surface-50-950</code> is shade 50
			in light mode and 950 in dark. Each one shows the shade it is using in {mode} mode now.
		</p>
		<ul class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
			{#each roles as role (role.token)}
				<li class="flex items-center gap-3">
					<span
						aria-hidden="true"
						class="size-10 shrink-0 rounded-base border border-surface-200-800"
						style:background-color="var(--color-{role.token})"></span>
					<span>
						<span class="block font-semibold">{role.use}</span>
						<code class="font-mono text-xs text-surface-700-300">{role.token}</code>
						<span class="block text-xs text-surface-700-300">
							In {mode} mode: <code class="font-mono">{resolved(role.token)}</code>
						</span>
					</span>
				</li>
			{/each}
		</ul>
	</div>
	<div class="space-y-3">
		<h3 class="h4">Palettes</h3>
		<p class="max-w-3xl text-sm text-surface-700-300">
			From <code class="font-mono">src/dddsw-theme.css</code>.
		</p>
		<div class="space-y-4">
			{#each palettes as palette (palette)}
				<div class="space-y-1">
					<p class="text-sm font-semibold capitalize">{palette}</p>
					<ul class="grid grid-cols-11 gap-1">
						{#each shades as shade (shade)}
							<li class="space-y-1 text-center">
								<span
									aria-hidden="true"
									class="block h-10 rounded-base border border-surface-200-800"
									style:background-color="var(--color-{palette}-{shade})"></span>
								<span class="block text-[0.625rem] sm:text-xs">{shade}</span>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</div>
</section>

<section aria-labelledby="type" class="space-y-6">
	<h2 id="type" class="h2">Text</h2>
	<div class="grid gap-8 lg:grid-cols-2">
		<div class="space-y-3">
			<p class="h1">Heading 1</p>
			<p class="h2">Heading 2</p>
			<p class="h3">Heading 3</p>
			<p class="h4">Heading 4</p>
			<p class="h5">Heading 5</p>
			<p class="h6">Heading 6</p>
			{@render classes('h1 … h6: Fredoka. Page title h1, sections h2, grid card titles h5')}
		</div>
		<div class="max-w-3xl space-y-4">
			<p class="text-xl">A lead paragraph, as used under page titles and section intros.</p>
			<p>
				Body text in Nunito. {event.shortName} is an annual, free, one-day technical conference organised
				by developers for developers. It has <strong>bold text</strong>,
				<em>italic text</em> and <a href="#type">a link</a>.
			</p>
			<p class="text-sm">Small text, for notes and captions.</p>
			<p class="text-sm text-surface-700-300">Muted text, for supporting details.</p>
			<p class="text-sm font-semibold tracking-wide text-surface-700-300 uppercase">
				Eyebrow label (orange-400 on dark cards, never orange on light)
			</p>
			<ul class="list-disc space-y-1 pl-6">
				<li>A bulleted list item</li>
				<li>Another, with <a href="#type">a link</a></li>
			</ul>
			<ol class="list-decimal space-y-1 pl-6">
				<li>A numbered list item</li>
				<li>Another numbered item</li>
			</ol>
			<address class="space-y-1 card preset-filled-surface-100-900 p-5 not-italic">
				Sloane Robinson Building<br />University of Bristol<br />Bristol
			</address>
		</div>
	</div>
</section>

<section aria-labelledby="links" class="space-y-6">
	<h2 id="links" class="h2">Links</h2>
	<div class="grid gap-6 lg:grid-cols-2">
		<div class="space-y-6">
			{#snippet inText()}
				<p>
					Read our <a href="/code-of-conduct">code of conduct</a>, see
					<a href="https://www.bristol.ac.uk/maps/how-to-get-here/">an external page</a>, or
					<a href="mailto:{event.contactEmail}">{event.contactEmail}</a>.
				</p>
			{/snippet}
			{@render sample(
				'In text: applied to every <a> automatically',
				'(no classes): teal, underlined, thicker underline on hover',
				inText
			)}
			{#snippet socials()}
				<SocialIcon name="bluesky" href="https://bsky.app" label="Bluesky" />
				<SocialIcon name="linkedin" href="https://www.linkedin.com" label="LinkedIn" />
				<SocialIcon name="email" href="mailto:{event.contactEmail}" label="Email us" />
			{/snippet}
			{@render sample('Social icons', '<SocialIcon name href label />', socials)}
			{#snippet calendar()}
				<AddToCalendar date="2027-05-15" />
			{/snippet}
			{@render sample('A button that looks like a link (popover)', '<AddToCalendar />', calendar)}
		</div>
		<div class="space-y-2">
			<p class="text-sm font-semibold">On a dark card</p>
			<EventFacts />
			{@render classes('<EventFacts />: white link, orange on hover')}
		</div>
	</div>
</section>

<section aria-labelledby="buttons" class="space-y-6">
	<h2 id="buttons" class="h2">Buttons</h2>
	<p class="max-w-3xl">
		On hover and focus, every button flips to the contrasting fill: orange and tonal buttons go navy
		(white in dark mode), navy buttons go orange, and on the orange banner navy goes white. The same
		classes work on <code class="font-mono text-sm">&lt;a&gt;</code> and
		<code class="font-mono text-sm">&lt;button&gt;</code>.
	</p>
	<div class="grid gap-8 lg:grid-cols-2">
		{#snippet primary()}
			<a href="#buttons" class="{buttons.primary} btn-sm">Small</a>
			<a href="#buttons" class={buttons.primary}>Default</a>
			<a href="#buttons" class="{buttons.primary} btn-lg">Large</a>
		{/snippet}
		{@render sample('Primary: the main action in a section', buttons.primary, primary)}

		{#snippet secondary()}
			<a href="#buttons" class="{buttons.secondary} btn-sm">Small</a>
			<a href="#buttons" class={buttons.secondary}>Sponsor this</a>
			<FeaturedLink featured={featured.tickets} />
		{/snippet}
		{@render sample(
			'Secondary: on orange cards, beside a primary, the header’s featured link',
			buttons.secondary,
			secondary
		)}

		{#snippet outline()}
			<a href="#buttons" class="{buttons.outline} btn-sm"
				>Download <span aria-hidden="true">↓</span></a>
			<a href="#buttons" class={buttons.outline}>2019</a>
		{/snippet}
		{@render sample('Outline: repeated small actions and year links', buttons.outline, outline)}

		{#snippet tonal()}
			<button type="button" class={buttons.tonal}>Menu</button>
			<button type="button" class="btn preset-tonal" disabled>Coming soon</button>
		{/snippet}
		{@render sample('Tonal: menus and quiet actions, and the disabled state', buttons.tonal, tonal)}

		{#snippet icons()}
			<button
				type="button"
				class="btn-icon cursor-pointer preset-filled-surface-950-50 {flipToOrange}">
				{@render chevron(chevronLeft)}<span class="sr-only">Previous</span>
			</button>
			<button
				type="button"
				class="btn-icon cursor-pointer preset-filled-surface-950-50 {flipToOrange}">
				{@render chevron(chevronRight)}<span class="sr-only">Next</span>
			</button>
			<button type="button" class="btn-icon btn-icon-sm cursor-pointer {flipToNavy}">
				<span aria-hidden="true" class="text-lg leading-none">×</span><span class="sr-only"
					>Close</span>
			</button>
		{/snippet}
		{@render sample(
			'Icon buttons: always with a hidden text label',
			`btn-icon cursor-pointer preset-filled-surface-950-50 ${flipToOrange}`,
			icons
		)}

		{#snippet chips()}
			<span class="chip preset-outlined-surface-400-600">Acme Ltd</span>
			<span class="chip preset-filled-surface-100-900">Not a link</span>
		{/snippet}
		{@render sample('Chips: labels you can’t click', 'chip preset-outlined-surface-400-600', chips)}
	</div>

	<div class="space-y-3 bg-primary-500 p-6 text-surface-950 rounded-container">
		<p class="text-sm font-semibold">On the orange banner</p>
		<div class="flex flex-wrap gap-3">
			<a href="#buttons" class="{buttons.onBrand} btn-lg">Get your free ticket</a>
			<a href="#buttons" class="btn preset-outlined-surface-950-50 btn-lg {flipToWhite}"
				>Outlined beside it</a>
		</div>
		<code
			class="block font-mono text-xs whitespace-normal [overflow-wrap:anywhere] text-surface-950"
			>{buttons.onBrand}</code>
	</div>
</section>

<section aria-labelledby="tabs" class="space-y-6">
	<h2 id="tabs" class="h2">Tabs</h2>
	<div class="grid gap-8 lg:grid-cols-2">
		<div class="space-y-3">
			<p class="text-sm font-semibold">Pill tabs (past events)</p>
			<Tabs value={selectedYear} onValueChange={(d) => (selectedYear = d.value)}>
				<Tabs.List class="flex flex-wrap gap-2 border-0">
					{#each years as y (y)}
						<Tabs.Trigger
							value={y}
							class="btn cursor-pointer preset-tonal hover:preset-filled-surface-950-50 data-[selected]:cursor-default data-[selected]:preset-filled-primary-500 data-[selected]:hover:preset-filled-primary-500"
							>{y}</Tabs.Trigger>
					{/each}
				</Tabs.List>
				{#each years as y (y)}
					<Tabs.Content value={y} class="mt-4">
						<p>The {y} panel.</p>
					</Tabs.Content>
				{/each}
			</Tabs>
		</div>
		<div class="space-y-3">
			<p class="text-sm font-semibold">Underline tabs in a card (venue travel)</p>
			<Tabs
				defaultValue="Train"
				class="rounded-container border border-surface-200-800 bg-surface-100-900 p-4 md:p-6">
				<Tabs.List class="overflow-x-auto">
					<Tabs.Trigger value="Train" class="shrink-0 cursor-pointer whitespace-nowrap"
						><span aria-hidden="true">🚆</span> Train</Tabs.Trigger>
					<Tabs.Trigger value="Bus" class="shrink-0 cursor-pointer whitespace-nowrap"
						><span aria-hidden="true">🚌</span> Bus</Tabs.Trigger>
					<Tabs.Indicator />
				</Tabs.List>
				<Tabs.Content value="Train" class="mt-4"><p>The train panel.</p></Tabs.Content>
				<Tabs.Content value="Bus" class="mt-4"><p>The bus panel.</p></Tabs.Content>
			</Tabs>
		</div>
	</div>
</section>

<section aria-labelledby="cards" class="space-y-6">
	<h2 id="cards" class="h2">Cards</h2>
	<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
		<div class="space-y-2">
			<div class="space-y-2 {cards.default}">
				<h3 class="h5">Default</h3>
				<p>Content: feature grids, people, sessions, downloads.</p>
			</div>
			{@render classes(cards.default)}
		</div>
		<div class="space-y-2">
			<div class="space-y-2 {cards.callout}">
				<h3 class="h5">Callout</h3>
				<p>Calls to action and time-sensitive notices.</p>
				<a href="#cards" class={buttons.secondary}>Sponsor this</a>
			</div>
			{@render classes(cards.callout)}
		</div>
		<div class="space-y-2">
			<div class="space-y-2 {cards.inverse}">
				<p class="text-sm font-semibold tracking-wide text-primary-400 uppercase">When</p>
				<p class="font-heading text-2xl">Key facts</p>
			</div>
			{@render classes(cards.inverse)}
		</div>
		<div class="space-y-2">
			<div class="space-y-3 {cards.callout}">
				<h3 class="h5">Inset, inside a callout</h3>
				<div class={cards.inset}>
					<p><strong>Subject:</strong> A card inside another card</p>
				</div>
			</div>
			{@render classes(cards.inset)}
		</div>
		<div class="space-y-2">
			<div class="space-y-1 {cards.stripe}">
				<span class="font-semibold">A talk title</span>
				<p class="text-sm text-surface-700-300">A speaker</p>
			</div>
			{@render classes(cards.stripe)}
		</div>
		<div class="space-y-2">
			<div
				class="group relative flex cursor-pointer flex-col gap-2 card border border-transparent preset-filled-surface-100-900 p-6 transition hover:tint-orange has-focus-visible:tint-orange">
				<h3 class="flex items-center gap-2 h4">
					<span class="text-2xl" aria-hidden="true">🤝</span>
					<a href="#cards" class="no-underline after:absolute after:inset-0">Link card</a>
				</h3>
				<p>The whole card is the link.</p>
				<p
					aria-hidden="true"
					class="pointer-events-none mt-auto pt-2 text-2xl text-secondary-700-300 transition-transform motion-safe:group-hover:translate-x-1 motion-safe:group-has-focus-visible:translate-x-1">
					→
				</p>
			</div>
			{@render classes('Home page “Join the herd”: tints orange on hover, arrow nudges')}
		</div>
	</div>

	<div class="space-y-3">
		<h3 class="h4">People</h3>
		<ul class="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
			<li
				class="flex flex-col items-center gap-3 card preset-filled-surface-100-900 p-6 text-center">
				<Avatar class="wobble size-28 ring-4 ring-primary-500">
					<Avatar.Image src={photo.img.src} srcset={photo.sources.webp} alt="" />
					<Avatar.Fallback>LP</Avatar.Fallback>
				</Avatar>
				<p class="h5">{member.name}</p>
			</li>
			<li
				class="flex flex-col items-center gap-3 card preset-filled-surface-100-900 p-6 text-center">
				<Avatar class="size-28 ring-4 ring-primary-500">
					<Avatar.Fallback><Cow class="h-10 w-auto text-primary-500" /></Avatar.Fallback>
				</Avatar>
				<p class="h5">No photo</p>
			</li>
		</ul>
	</div>

	<div class="space-y-3">
		<h3 class="h4">Sponsor tiers</h3>
		<ol class="grid gap-6 lg:grid-cols-3">
			{#each sponsorPath as option, index (option.title)}
				<SponsorCard {option} level={(index + 1) as 1 | 2 | 3} reserveNote />
			{/each}
		</ol>
		{#if sponsorSupporterExtras[0]}
			<ul class="grid gap-6 md:grid-cols-3">
				<SponsorCard option={sponsorSupporterExtras[0]} />
			</ul>
		{/if}
		{@render classes('<SponsorCard option level={0 | 1 | 2 | 3} />')}
	</div>

	<ComingSoon title="An empty state">
		<p>
			What a page shows before its content is ready. <a href="#cards">Links still work here</a>.
		</p>
	</ComingSoon>
	{@render classes('<ComingSoon title withTimeline?>')}
</section>

<section aria-labelledby="feedback" class="space-y-6">
	<h2 id="feedback" class="h2">Dialogs and toasts</h2>
	<div class="flex flex-wrap gap-3">
		<button type="button" class={buttons.primary} onclick={() => (dialogOpen = true)}
			>Open a dialog</button>
		<button
			type="button"
			class={buttons.outline}
			onclick={() =>
				toaster.success({ title: 'Copied', description: 'The URL is on your clipboard.' })}
			>Success toast</button>
		<button
			type="button"
			class={buttons.outline}
			onclick={() =>
				toaster.error({
					title: "Couldn't copy",
					description: 'Please right-click the image and copy its address instead.'
				})}>Error toast</button>
	</div>
	<Dialog open={dialogOpen} onOpenChange={(details) => (dialogOpen = details.open)}>
		<Portal>
			<Dialog.Backdrop class="fixed inset-0 z-40 bg-surface-950/60" />
			<Dialog.Positioner class="fixed inset-0 z-50 flex items-center justify-center p-4">
				<Dialog.Content
					class="max-h-full w-full max-w-2xl space-y-4 overflow-y-auto card bg-surface-50-950 p-6 shadow-xl">
					<Dialog.Title class="h3">A dialog</Dialog.Title>
					<Dialog.Description>
						As used for speaker details on the sessions page. Press Escape or the button to close
						it.
					</Dialog.Description>
					<Dialog.CloseTrigger class={buttons.primary}>Close</Dialog.CloseTrigger>
				</Dialog.Content>
			</Dialog.Positioner>
		</Portal>
	</Dialog>
</section>

<section aria-labelledby="brand" class="space-y-6">
	<h2 id="brand" class="h2">Brand pieces</h2>
	<div
		class="grid items-center gap-8 rounded-container bg-primary-500 p-6 text-surface-950 md:grid-cols-2">
		<div class="space-y-3">
			<p class="h2">The orange banner</p>
			<p class="text-lg">With the countdown bubble and the cow, as on the home page.</p>
		</div>
		<div class="mx-auto flex w-full max-w-xs flex-col">
			<Countdown />
			<div class="-scale-x-100">
				<Cow class="wobble w-full text-white drop-shadow-[0_8px_0_var(--color-surface-950)]" />
			</div>
		</div>
	</div>
</section>

<section aria-labelledby="progress" class="space-y-6">
	<h2 id="progress" class="h2">Progress</h2>
	<SeatMilestones />
</section>

<Timeline />

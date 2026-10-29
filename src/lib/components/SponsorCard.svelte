<script lang="ts">
	import type { Snippet } from 'svelte';
	import { event, showSponsorPrices } from '#lib/eventDetails.ts';
	import type { SponsorOption } from '#lib/content/sponsors.ts';

	let {
		option,
		level = 0,
		reserveNote = false,
		class: className,
		children
	}: {
		option: SponsorOption;
		level?: 0 | 1 | 2 | 3;
		/** Leave a line under the price, so prices line up with cards that have a note there. */
		reserveNote?: boolean;
		class?: string;
		children?: Snippet;
	} = $props();

	// Each step up the main path looks richer than the one before.
	const levelStyles = [
		'border-2 border-transparent preset-filled-surface-100-900',
		'border-2 border-transparent border-t-4 border-t-primary-300 preset-filled-surface-100-900 dark:border-t-primary-600',
		'tint-orange border-2! border-primary-500! shadow-[0_5px_0_var(--color-primary-500)] dark:border-primary-600! dark:bg-surface-900! dark:shadow-[0_5px_0_var(--color-primary-800)]',
		'border-2 border-primary-400 bg-primary-200 shadow-[0_7px_0_var(--color-primary-600)] dark:border-primary-500 dark:bg-surface-800 dark:shadow-[0_7px_0_var(--color-primary-600)]'
	];
</script>

<li class={['flex flex-col gap-3 card p-6', levelStyles[level], className]}>
	<h3 class="h4">
		{#if option.emoji}<span aria-hidden="true">{option.emoji}</span>{/if}
		{option.title}
	</h3>
	{#if option.preamble}
		<p
			class="w-fit rounded-base bg-surface-950/10 px-2 py-1 text-sm font-semibold dark:bg-surface-50/15">
			{option.preamble}
		</p>
	{/if}
	{#if option.description}<p class="italic">{option.description}</p>{/if}
	{#if option.features}
		<ul class="list-inside list-disc space-y-1">
			{#each option.features as feature (feature)}<li>{feature}</li>{/each}
		</ul>
	{/if}
	<!-- Pushed to the bottom so prices line up across cards of different heights. -->
	<div class="mt-auto pt-3">
		{#if option.slots}
			<ul class="space-y-1">
				{#each option.slots as slot (slot.name)}
					<li
						class="flex items-baseline justify-between gap-4 border-t border-surface-300-700 pt-1">
						<span class="font-semibold">{slot.name}</span>
						{#if slot.claimed}
							<span class="font-semibold">Sponsored</span>
						{:else if showSponsorPrices}
							<span class="text-xl font-bold">{slot.price}</span>
						{/if}
					</li>
				{/each}
			</ul>
		{:else if option.claimed}
			<p class="font-semibold">This item has been sponsored</p>
		{:else if showSponsorPrices && option.price}
			<p class="text-2xl font-bold">{option.price}</p>
			{#if option.availability || reserveNote}
				<p class="min-h-5 text-sm">{option.availability}</p>
			{/if}
		{/if}
		{#if !option.claimed}
			<a
				href="mailto:{event.sponsorshipEmail}?subject=Sponsoring {event.shortName} {event.year}: {option.title}"
				aria-label="Sponsor as {option.title}"
				class="btn mt-4 preset-filled-surface-950-50 hover:preset-filled-primary-500 focus-visible:preset-filled-primary-500"
				>Sponsor this</a>
		{/if}
	</div>
	{@render children?.()}
</li>

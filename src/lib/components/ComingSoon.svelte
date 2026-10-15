<script lang="ts">
	import type { Snippet } from 'svelte';
	import Cow from './Cow.svelte';
	import Timeline from './Timeline.svelte';

	let {
		title,
		withTimeline = false,
		children
	}: {
		title: string;
		/** Show the road-to-the-event timeline under the card, so people can see what happens when. */
		withTimeline?: boolean;
		children?: Snippet;
	} = $props();
</script>

<div class="flex flex-col items-center gap-4 card tint-orange p-10 text-center">
	<Cow class="h-16 w-auto text-primary-500" />
	<h2 class="h3">{title}</h2>
	{#if children}
		<div class="max-w-xl space-y-3">{@render children()}</div>
	{/if}
</div>

{#if withTimeline}
	<Timeline />
{/if}

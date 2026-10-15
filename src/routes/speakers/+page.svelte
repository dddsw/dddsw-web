<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton-svelte';
	import ComingSoon from '$lib/components/ComingSoon.svelte';
	import Cow from '$lib/components/Cow.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const speakers = $derived(data.programme.speakers);
	const isPlaceholder = $derived(data.programme.isPlaceholder);
</script>

{#if isPlaceholder || speakers.length === 0}
	<ComingSoon title="Speakers to be announced" withTimeline>
		<p>
			Our line-up will be revealed here. Fancy a moo-ment in the spotlight? <a
				href="/call-for-papers">Find out about speaking</a
			>.
		</p>
	</ComingSoon>
{:else}
	<ul class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
		{#each speakers as sp (sp.id)}
			<li class="space-y-3 card preset-filled-surface-100-900 p-6">
				<Avatar class="size-24">
					{#if sp.photo}<Avatar.Image src={sp.photo} alt="" />{/if}
					<Avatar.Fallback><Cow class="h-10 w-auto text-primary-500" /></Avatar.Fallback>
				</Avatar>
				<h2 class="h5">{sp.name}</h2>
				{#if sp.tagline}<p class="font-semibold text-secondary-700-300">{sp.tagline}</p>{/if}
				{#if sp.sessionTitles.length}<p class="italic">{sp.sessionTitles.join(', ')}</p>{/if}
			</li>
		{/each}
	</ul>
{/if}

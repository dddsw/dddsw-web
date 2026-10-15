<script lang="ts">
	import { event } from '$lib/eventDetails';
	import { sponsors, sponsorUrl } from '$lib/content/sponsors';
</script>

<ul class="grid grid-cols-2 items-center gap-4 sm:grid-cols-3 lg:grid-cols-5">
	{#each sponsors as sponsor (sponsor.name)}
		<li class="flex h-28 items-center justify-center card bg-white p-4">
			<a
				href={sponsorUrl(sponsor.href, event.year)}
				rel="noopener"
				aria-label="Visit {sponsor.name} website"
				class="flex h-full w-full items-center justify-center">
				<img
					src="/images/sponsors/{sponsor.logo}"
					alt="{sponsor.name} logo"
					loading="lazy"
					class="max-h-full max-w-full object-contain" />
			</a>
		</li>
	{/each}
</ul>

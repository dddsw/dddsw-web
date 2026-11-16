<script lang="ts">
	import { initials, speakerDirectory } from '#lib/content/speakerDirectory.ts';
	import { picture } from '#lib/images.ts';

	let query = $state('');

	const normalise = (text: string) => text.normalize('NFKD').replace(/\p{M}/gu, '').toLowerCase();

	// Matches a speaker by their name, or by the title of any of their talks.
	const shown = $derived.by(() => {
		const q = normalise(query.trim());
		if (!q) return speakerDirectory;
		return speakerDirectory.filter(
			(s) => normalise(s.name).includes(q) || s.talks.some((t) => normalise(t.title).includes(q))
		);
	});

	const talkCount = speakerDirectory.reduce((n, s) => n + s.talks.length, 0);
</script>

<section aria-labelledby="directory" class="space-y-8">
	<h2 id="directory" class="sr-only">Past speakers</h2>
	<div class="flex flex-wrap items-end justify-between gap-4">
		<label class="label w-full max-w-md">
			<span class="label-text">Search by speaker or talk</span>
			<input
				class="input"
				type="search"
				placeholder="e.g. Dylan Beattie, or testing"
				autocomplete="off"
				bind:value={query} />
		</label>
		<p class="text-surface-700-300" aria-live="polite">
			{#if query.trim()}
				{shown.length} of {speakerDirectory.length} speakers
			{:else}
				{speakerDirectory.length} speakers, {talkCount} talks
			{/if}
		</p>
	</div>

	{#if shown.length}
		<ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{#each shown as speaker (speaker.id)}
				<li
					id={speaker.id}
					class="scroll-mt-24 space-y-4 card border-l-4 border-primary-500 preset-filled-surface-100-900 p-5 target:ring-4 target:ring-primary-500">
					<div class="flex items-center gap-4">
						{#if speaker.photo}
							<div class="size-16 shrink-0 overflow-hidden rounded-full">
								<enhanced:img
									src={picture(speaker.photo)}
									alt=""
									loading="lazy"
									class="size-full object-cover" />
							</div>
						{:else}
							<span
								class="flex size-16 shrink-0 items-center justify-center rounded-full preset-tonal-primary font-semibold"
								aria-hidden="true">{initials(speaker.name)}</span>
						{/if}
						<div class="min-w-0">
							<h3 class="h5">{speaker.name}</h3>
							{#if speaker.tagline}
								<p class="line-clamp-2 text-sm text-secondary-700-300" title={speaker.tagline}>
									{speaker.tagline}
								</p>
							{/if}
						</div>
					</div>
					<ul class="space-y-2" aria-label="Talks by {speaker.name}">
						{#each speaker.talks as talk (talk.year + talk.title)}
							<li class="flex gap-3">
								<span class="shrink-0 font-semibold text-surface-700-300 tabular-nums">
									{talk.year}
								</span>
								<div class="min-w-0">
									<a href={talk.href} class="anchor">{talk.title}</a>
									{#if talk.taglineThen}
										<p class="text-xs text-surface-700-300">
											<span class="sr-only">Then:</span>
											{talk.taglineThen}
										</p>
									{/if}
								</div>
							</li>
						{/each}
					</ul>
				</li>
			{/each}
		</ul>
	{:else}
		<p>No past speakers or talks match “{query.trim()}”.</p>
	{/if}
</section>

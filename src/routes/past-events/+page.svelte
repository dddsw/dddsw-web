<script lang="ts">
	import { onMount } from 'svelte';
	import { replaceState } from '$app/navigation';
	import { Tabs } from '@skeletonlabs/skeleton-svelte';
	import Cow from '#lib/components/Cow.svelte';
	import { pastEvents } from '#lib/content/pastEvents.ts';

	let year = $state(String(pastEvents[0].year));

	// Deep links like /past-events#2011 open that year's tab. The hash is kept in sync as people
	// switch tabs, so the address bar can always be shared.
	const knownYears = new Set(pastEvents.map((e) => String(e.year)));

	function selectFromHash() {
		const fromHash = window.location.hash.slice(1);
		if (knownYears.has(fromHash)) year = fromHash;
	}

	function onTabChange(value: string) {
		year = value;
		replaceState(`#${value}`, {});
	}

	onMount(() => {
		selectFromHash();
		window.addEventListener('hashchange', selectFromHash);
		return () => window.removeEventListener('hashchange', selectFromHash);
	});

	function formatDate(iso: string): string {
		const [y, m, d] = iso.split('-').map(Number);
		const date = new Date(Date.UTC(y, m - 1, d ?? 1));
		return date.toLocaleDateString('en-GB', {
			timeZone: 'UTC',
			month: 'long',
			year: 'numeric',
			...(d ? { day: 'numeric' } : {})
		});
	}
</script>

<section aria-labelledby="events">
	<h2 id="events" class="sr-only">Previous conferences</h2>
	<Tabs value={year} onValueChange={(d) => onTabChange(d.value)}>
		<Tabs.List class="flex flex-wrap gap-2 border-0">
			{#each pastEvents as e (e.year)}
				<Tabs.Trigger
					value={String(e.year)}
					class="btn cursor-pointer preset-tonal hover:preset-filled-surface-950-50 data-[selected]:cursor-default data-[selected]:preset-filled-primary-500 data-[selected]:hover:preset-filled-primary-500">
					<span id={String(e.year)}>{e.year}</span>
				</Tabs.Trigger>
			{/each}
		</Tabs.List>
		{#each pastEvents as e (e.year)}
			<Tabs.Content value={String(e.year)} class="mt-8 space-y-10">
				<header class="space-y-6 card bg-surface-950 p-6 text-surface-50 md:p-10">
					<div class="flex flex-wrap items-center justify-between gap-6">
						<div class="space-y-2">
							<p class="font-heading text-6xl leading-none text-primary-400 md:text-8xl">
								{e.year}
							</p>
							<h3 class="h3">{e.title}</h3>
						</div>
						{#if e.logo}
							<!-- Wide banners fill a fixed-width box; other logos get a box that hugs them, so the padding is even all round. -->
							<div
								class={[
									'flex h-28 items-center justify-center overflow-hidden rounded-container bg-white p-2',
									e.logoIsWideBanner ? 'w-56' : 'w-fit max-w-56'
								]}>
								<img
									src={e.logo}
									alt="{e.title} logo"
									class={e.logoIsWideBanner
										? 'h-full w-full object-cover object-center'
										: 'h-full w-auto max-w-full object-contain'} />
							</div>
						{:else}
							<Cow class="h-24 w-auto text-primary-500" title="{e.title} logo" />
						{/if}
					</div>
					<dl class="grid gap-6 sm:grid-cols-2">
						{#if e.date}
							<div>
								<dt class="text-sm font-semibold tracking-wide text-primary-400 uppercase">When</dt>
								<dd class="text-lg">{formatDate(e.date)}</dd>
							</div>
						{/if}
						{#if e.venue}
							<div>
								<dt class="text-sm font-semibold tracking-wide text-primary-400 uppercase">
									Where
								</dt>
								<dd class="text-lg">{e.venue}</dd>
							</div>
						{/if}
					</dl>
					<p class="max-w-3xl text-lg">{e.summary}</p>
					{#if e.note}
						<p class="max-w-3xl border-l-4 border-primary-400 pl-4 text-sm text-surface-300 italic">
							{e.note}
						</p>
					{/if}
					{#if e.archiveUrl}
						<a href={e.archiveUrl} rel="noopener" class="underline"
							>See the {e.year} website in the Internet Archive</a>
					{/if}
					{#if e.url}<a href={e.url} rel="noopener">Find out more</a>{/if}
				</header>

				{#if e.sponsors || e.committee}
					<div class="grid gap-6 md:grid-cols-2">
						{#if e.sponsors}
							<section
								class="space-y-3 card preset-filled-surface-100-900 p-6"
								aria-label="Sponsors">
								<h4 class="h5">Sponsors</h4>
								<ul class="flex flex-wrap gap-2">
									{#each e.sponsors as sponsor (sponsor.name)}
										<li>
											{#if sponsor.url}
												<a
													class="btn preset-filled-primary-500 transition btn-sm hover:preset-filled-surface-950-50 focus-visible:preset-filled-surface-950-50"
													href={sponsor.url}
													rel="noopener">{sponsor.name}</a>
											{:else}
												<span class="chip preset-outlined-surface-400-600">{sponsor.name}</span>
											{/if}
										</li>
									{/each}
								</ul>
							</section>
						{/if}
						{#if e.committee}
							<section
								class="space-y-3 card preset-filled-surface-100-900 p-6"
								aria-label="Committee">
								<h4 class="h5">Committee</h4>
								<ul class="space-y-1">
									{#each e.committee as member (member.name)}
										<li>
											<span class="font-semibold">{member.name}</span>
											{#if member.role}<span class="text-surface-600-400">
													· {member.role}</span
												>{/if}
										</li>
									{/each}
								</ul>
							</section>
						{/if}
					</div>
				{/if}

				{#if e.speakers}
					<section class="space-y-4" aria-label="Speakers">
						<h4 class="h4">
							Speakers <span class="text-surface-500">({e.speakers.length})</span>
						</h4>
						<ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
							{#each e.speakers as speaker (speaker.name)}
								<li
									class="space-y-1 card border-l-4 border-primary-500 preset-filled-surface-100-900 p-5">
									<span class="font-semibold">{speaker.name}</span>
									<p class="text-sm text-secondary-700-300">{speaker.tagline}</p>
								</li>
							{/each}
						</ul>
					</section>
				{/if}

				{#if e.talks}
					<section class="space-y-4" aria-label="Talks and speakers">
						<h4 class="h4">
							Talks and speakers <span class="text-surface-500">({e.talks.length})</span>
						</h4>
						<ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
							{#each e.talks as talk (talk.speaker + talk.title)}
								<li
									class="flex flex-col justify-between gap-3 card border-l-4 border-primary-500 preset-filled-surface-100-900 p-5">
									<span class="font-semibold">{talk.title}</span>
									<span class="text-sm font-semibold text-secondary-700-300">{talk.speaker}</span>
								</li>
							{/each}
						</ul>
					</section>
				{/if}

				{#if e.photos?.length}
					<section class="space-y-4" aria-label="Photos from {e.year}">
						<h4 class="h4">Photos</h4>
						<ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
							{#each e.photos as photo, i (photo.src)}
								<li class={i === 0 ? 'sm:col-span-2' : ''}>
									<img
										src={photo.src}
										alt={photo.alt}
										loading="lazy"
										class="h-full w-full rounded-container object-cover" />
								</li>
							{/each}
						</ul>
					</section>
				{/if}
			</Tabs.Content>
		{/each}
	</Tabs>
</section>

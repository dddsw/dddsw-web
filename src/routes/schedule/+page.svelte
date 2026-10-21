<script lang="ts">
	import ComingSoon from '#lib/components/ComingSoon.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const sessions = $derived(data.programme.sessions);
	const isPlaceholder = $derived(data.programme.isPlaceholder);

	const time = (iso: string | null) =>
		iso
			? new Intl.DateTimeFormat('en-GB', {
					hour: '2-digit',
					minute: '2-digit',
					timeZone: 'UTC'
				}).format(new Date(`${iso}Z`))
			: '';
</script>

{#if isPlaceholder || sessions.length === 0}
	<ComingSoon title="Programme to be announced" withTimeline>
		<p>
			The schedule will appear here once talks are selected. Want to see your name here? <a
				href="/become-a-speaker">Find out about speaking</a
			>.
		</p>
	</ComingSoon>
{:else}
	<ol class="space-y-4">
		{#each sessions as s (s.id)}
			<li
				class="card {s.isService
					? 'preset-tonal-surface'
					: 'preset-filled-surface-100-900'} space-y-1 p-5">
				<p class="font-semibold text-secondary-700-300">
					{time(s.startsAt)}{s.endsAt ? ` – ${time(s.endsAt)}` : ''}{s.room ? ` · ${s.room}` : ''}
				</p>
				<h2 class="h5">{s.title}</h2>
				{#if s.speakerNames.length}<p>{s.speakerNames.join(', ')}</p>{/if}
			</li>
		{/each}
	</ol>
	<p class="text-center">Please note the schedule is subject to change.</p>
{/if}

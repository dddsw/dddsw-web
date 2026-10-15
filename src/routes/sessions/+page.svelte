<script lang="ts">
	import type { Session } from '../../types/Session.type.js';
	import type { Speaker } from '../../types/Speaker.type.js';
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { Dialog, Portal } from '@skeletonlabs/skeleton-svelte';
	import { Milestone, get } from '$lib/milestones';
	import { eventYear, votingUrl } from '$lib/eventDetails.js';

	let sessions: Session[] = page.data.sessions;
	let speakers: Speaker[] = page.data.speakers;

	let showModal = $state(false);
	let modalSpeaker: Speaker | undefined = $state();

	const showAllProposedSessions = get(
		Milestone.AnnounceScheduleAndOpenTicketRegistration
	)?.hasNotHappened; //true = these are the submissions to be voted upon, false = these are definitely the speakers for this year

	onMount(() => {
		const hasId = page.url.searchParams.has('id');
		if (hasId) {
			const sessionId = page.url.searchParams.get('id');
			if (sessionId != undefined && sessionId != '') {
				const sessionExists = sessions.find((x) => x.id === sessionId);
				if (sessionExists) {
					scrollIntoView(sessionId);
				}
			}
		}
	});

	function showSpeakerInfo(id: string) {
		modalSpeaker = speakers.find((x) => x.id === id);
		if (modalSpeaker) {
			showModal = true;
		}
	}

	function scrollIntoView(id: string) {
		const el = document.getElementById(id);
		if (!el) return;
		el.scrollIntoView({
			behavior: 'auto'
		});
	}
</script>

<section class="space-y-6" aria-labelledby="sessions-heading">
	<h2 id="sessions-heading" class="h2">
		{showAllProposedSessions ? 'Proposed' : ''}
		{eventYear} sessions
	</h2>
	{#if sessions}
		{#if showAllProposedSessions && get(Milestone.OpenSessionVoting)?.hasHappened && get(Milestone.CloseSessionVoting)?.hasNotHappened}
			<p class="card tint-orange p-4">
				Voting is open now, take a look and <a href={votingUrl} target="_blank" rel="noopener"
					>vote for your favourites here</a
				>. Voting will close on {get(Milestone.CloseSessionVoting)!.formattedDate}.
			</p>
		{/if}
		<p>The sessions below are presented in alphabetical order of the session title.</p>
		<ul class="space-y-4">
			{#each sessions as session (session.id)}
				<li class="space-y-2 card preset-filled-surface-100-900 p-5" id={session.id}>
					<p class="flex flex-wrap gap-2">
						{#each session.speakers as speaker (speaker.id)}
							<button
								type="button"
								class="btn cursor-pointer preset-tonal-primary hover:preset-filled-surface-950-50 focus-visible:preset-filled-surface-950-50"
								onclick={() => showSpeakerInfo(speaker.id)}>{speaker.name}</button>
						{/each}
					</p>
					<h3 class="h4">{session.title}</h3>
					<p class="whitespace-pre-wrap">{session.description}</p>
				</li>
			{/each}
		</ul>
	{:else}
		<p>There are no sessions available at this time.</p>
	{/if}
</section>

<Dialog open={showModal} onOpenChange={(details) => (showModal = details.open)}>
	<Portal>
		<Dialog.Backdrop class="fixed inset-0 z-40 bg-surface-950/60" />
		<Dialog.Positioner class="fixed inset-0 z-50 flex items-center justify-center p-4">
			<Dialog.Content
				class="max-h-full w-full max-w-2xl space-y-4 overflow-y-auto card bg-surface-50-950 p-6 shadow-xl">
				{#if modalSpeaker?.profilePicture}
					<img
						src={modalSpeaker.profilePicture}
						alt=""
						class="size-40 rounded-container object-cover" />
				{/if}
				<Dialog.Title class="h3">{modalSpeaker?.fullName}</Dialog.Title>
				{#if modalSpeaker?.tagLine}
					<p class="font-semibold text-secondary-700-300">{modalSpeaker.tagLine}</p>
				{/if}
				{#if modalSpeaker?.bio}
					<Dialog.Description class="whitespace-pre-wrap">{modalSpeaker.bio}</Dialog.Description>
				{/if}
				<Dialog.CloseTrigger
					class="btn cursor-pointer preset-filled-primary-500 hover:preset-filled-surface-950-50 focus-visible:preset-filled-surface-950-50"
					>Close</Dialog.CloseTrigger>
			</Dialog.Content>
		</Dialog.Positioner>
	</Portal>
</Dialog>

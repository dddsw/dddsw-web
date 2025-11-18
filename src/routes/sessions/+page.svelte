<script lang="ts">
	import SpeakerModal from '$lib/SpeakerModal.svelte';
	import type { Session } from '../../types/Session.type.js';
	import type { Speaker } from '../../types/Speaker.type.js';
	import { onMount } from 'svelte';
	import { pageTitle } from '../../stores.js';
	import { page } from '$app/stores';

	pageTitle.set('Sessions');

	let sessions: Session[] = $state([]);
	let speakers: Speaker[] = [];

	let showModal = $state(false);
	let modalSpeaker: Speaker | undefined = $state();

	onMount(async () => {
		const sessionsRsp = await fetch('https://sessionize.com/api/v2/wss7pwai/view/Sessions');
		let sessionsJson = await sessionsRsp.json();
		sessions = sessionsJson[0].sessions.sort((a: Session, b: Session) =>
			a.title.localeCompare(b.title)
		);

		const speakersRsp = await fetch('https://sessionize.com/api/v2/wss7pwai/view/Speakers');
		speakers = await speakersRsp.json();

		const hasId = $page.url.searchParams.has('id');
		if (hasId) {
			const sessionId = $page.url.searchParams.get('id');
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
			document.body.scrollIntoView();
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

<div class="secondary-bg">
	<div class="section">
		<h2>2025 Sessions</h2>
		{#if sessions}
			<p>The sessions below are presented in alphabetical order of the session title.</p>
			{#each sessions as session}
				<div class="session-container" id={session.id}>
					<p>
						{#each session.speakers as speaker}
							<span class="speaker-name" onclick={() => showSpeakerInfo(speaker.id)}
								>{speaker.name}</span>
						{/each}
					</p>
					<h3>{session.title}</h3>
					<p>{session.description}</p>
				</div>
			{/each}
		{:else}
			<p>There are no sessions available at this time.</p>
		{/if}
	</div>
</div>

{#if showModal}
	<SpeakerModal on:close={() => (showModal = false)}>
		<div>
			{#if modalSpeaker?.profilePicture}
				<img
					src={modalSpeaker?.profilePicture}
					alt={modalSpeaker?.fullName}
					class="speaker-image" />
			{/if}
			<h2>{modalSpeaker?.fullName}</h2>

			{#if modalSpeaker?.tagLine}
				<p>{modalSpeaker?.tagLine}</p>
			{/if}
			{#if modalSpeaker?.bio}
				<hr />
				<p>{modalSpeaker?.bio}</p>
			{/if}
		</div>
	</SpeakerModal>
{/if}

<style>
	.session-container {
		border: 1px solid lightgrey;
		border-radius: 10px;
		padding: 15px;
		margin-bottom: 10px;
	}

	.speaker-name {
		padding: 5px;
		margin-right: 5px;
		color: black;
		background-color: var(--primary-color);
	}

	.speaker-name:hover {
		color: white;
		cursor: pointer;
	}

	.speaker-image {
		max-width: 200px;
	}

	.session-container p {
		white-space: pre-wrap;
	}
</style>

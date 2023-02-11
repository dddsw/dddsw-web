<script lang="ts">
	import SpeakerModal from '$lib/SpeakerModal.svelte';
	import type { Session } from 'src/types/Session.type.js';
	import type { Speaker } from 'src/types/Speaker.type.js';
	import { onMount } from 'svelte';
	import { pageTitle } from '../../stores.js';

	pageTitle.set('Sessions');

	let sessions: Session[] = [];
	let speakers: Speaker[] = [];

	let showModal = false;
	let modalSpeaker: Speaker | undefined;

	onMount(async () => {
		const sessionsRsp = await fetch('https://sessionize.com/api/v2/h3krav8h/view/Sessions');
		let sessionsJson = await sessionsRsp.json();
		sessions = sessionsJson[0].sessions;

		const speakersRsp = await fetch('https://sessionize.com/api/v2/h3krav8h/view/Speakers');
		speakers = await speakersRsp.json();
	});

	function showSpeakerInfo(id: string) {
		modalSpeaker = speakers.find((x) => x.id === id);
		if (modalSpeaker) {
			showModal = true;
		}
	}
</script>

<div class="secondary-bg">
	<div class="section">
		<h1>All submitted sessions</h1>
		{#if sessions}
			{#each sessions as session}
				<div class="session-container">
					<p>
						{#each session.speakers as speaker}
							<span class="speaker-name" on:click={() => showSpeakerInfo(speaker.id)}
								>{speaker.name}</span
							>
						{/each}
					</p>
					<h2>{session.title}</h2>
					<p>{session.description}</p>
				</div>
			{/each}
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
					class="speaker-image"
				/>
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
</style>

<svelte:options runes={true} />

<script lang="ts">
	import EngineShed from './EngineShed.svelte';
	import { pageTitle } from '../../stores.js';
	import * as Panzoom from '@panzoom/panzoom';
	import { onMount } from 'svelte';

	pageTitle.set('Engine Shed room layout');

	type Room = {
		name: string;
		track: number;
		elementIds: {
			fill: string;
			label: string;
			pathToRoom: string;
			buttonForRoom: string;
		};
		isSelected: boolean;
	};

	const rooms: Room[] = [
		{
			name: 'The Junction',
			track: 1,
			elementIds: {
				fill: 'track1-fill',
				label: 'track1-label',
				pathToRoom: 'track1-path',
				buttonForRoom: 'track-1-button'
			},
			isSelected: false
		},
		{
			name: "Brunel's Boardroom",
			track: 2,
			elementIds: {
				fill: 'track2-fill',
				label: 'track2-label',
				pathToRoom: 'track2-path',
				buttonForRoom: 'track-2-button'
			},
			isSelected: false
		},
		{
			name: "Brunel's Breakout room",
			track: 3,
			elementIds: {
				fill: 'track3-fill',
				label: 'track3-label',
				pathToRoom: 'track3-path',
				buttonForRoom: 'track-3-button'
			},
			isSelected: false
		},
		{
			name: 'The Clock tower',
			track: 4,
			elementIds: {
				fill: 'track4-fill',
				label: 'track4-label',
				pathToRoom: 'track4-path',
				buttonForRoom: 'track-4-button'
			},
			isSelected: false
		}
	];

	onMount(() => {
		// Make map zoomable
		const svg = document.getElementById('floorplan')!;
		const view = svg.parentElement!;
		const panzoom = Panzoom.default(svg, { overflow: 'visible', maxScale: 10 });
		view.addEventListener('wheel', panzoom.zoomWithWheel);

		//Hook up the zoom buttons
		document.getElementById('zoom-in')!.addEventListener('click', panzoom.zoomIn);
		document.getElementById('zoom-out')!.addEventListener('click', panzoom.zoomOut);

		//Make rooms clickable
		rooms.forEach((room) => {
			document
				.getElementById(room.elementIds.label)!
				.addEventListener('click', () => toggleRoom(room));
			document
				.getElementById(room.elementIds.fill)!
				.addEventListener('click', () => toggleRoom(room));
		});
	});

	function toggleRoomByName(roomName: string): void {
		toggleRoom(rooms.find((room) => room.name == roomName)!);
	}

	function toggleRoom(room: Room): void {
		if (!room.isSelected) {
			//We're about to select the room so ensure all other rooms are toggled off
			rooms.filter((r) => r.isSelected).forEach((r) => toggleRoom(r));
		}

		document.getElementById(room.elementIds.fill)!.classList.toggle('selected-room');
		document.getElementById(room.elementIds.pathToRoom)!.classList.toggle('display-path');
		document
			.getElementById(room.elementIds.buttonForRoom)!
			.classList.toggle('track-button-selected');

		room.isSelected = !room.isSelected;
	}
</script>

<div class="section">
	<div class="map-wrapper">
		<div class="zoom-button-container">
			<button id="zoom-in" class="zoom-button">+</button>
			<button id="zoom-out" class="zoom-button">-</button>
		</div>
		<div class="map">
			<EngineShed />
		</div>
		<div class="track-button-container">
			<button
				id="track-1-button"
				class="track-button"
				onclick={() => toggleRoomByName('The Junction')}>Track 1</button>
			<button
				id="track-2-button"
				class="track-button"
				onclick={() => toggleRoomByName("Brunel's Boardroom")}>Track 2</button>
			<button
				id="track-3-button"
				class="track-button"
				onclick={() => toggleRoomByName("Brunel's Breakout room")}>Track 3</button>
			<button
				id="track-4-button"
				class="track-button"
				onclick={() => toggleRoomByName('The Clock tower')}>Track 4</button>
		</div>
	</div>
</div>

<style>
	.zoom-button-container {
		align-items: center;
		display: flex;
		justify-content: end;
		width: 100%;
		z-index: 100;
	}
	.zoom-button {
		background-color: white;
		border-color: var(--contrast-color);
		border-radius: 25px;
		border-style: solid;
		border-width: 3px;
		display: flex;
		font-family: 'Poppins', serif;
		font-size: 50px;
		height: 40px;
		justify-content: center;
		line-height: 35px;
		margin: 5px;
		width: 40px;
	}

	.track-button-container {
		align-items: center;
		display: flex;
		justify-content: space-evenly;
		width: 100%;
		z-index: 100;
	}
	.track-button {
		background-color: white;
		border-color: var(--primary-color);
		border-radius: 25px;
		border-style: solid;
		border-width: 5px;
		flex: 1;
		font-family: 'Poppins', serif;
		height: 50px;
		line-height: 25px;
		margin: 5px;
		padding: 5px;
	}

	.map-wrapper {
		align-items: center;
		border-color: black;
		border-radius: 25px;
		border-style: solid;
		border-width: 1px;
		display: flex;
		flex-direction: column;
		height: 70vh;
		justify-content: space-between;
		margin: 20px 0px;
		overflow: hidden;
	}
	.map {
		align-items: center;
		display: flex;
		justify-content: center;
		overflow: hidden;
		width: 100%;
	}

	/* Using global because these classes are applied via JS and don't 
	 * want these styles to be marked as unused and stripped out */
	:global .display-path {
		display: inline !important;
	}
	:global .selected-room {
		fill: #fbffbe !important;
	}
	:global .track-button-selected {
		background-color: #fbffbe !important;
	}
</style>

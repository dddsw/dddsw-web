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
		const onMobile = navigator.maxTouchPoints > 1;

		// Make map zoomable
		const svg = document.getElementById('floorplan')!;
		const view = svg.parentElement!;
		const panzoom = Panzoom.default(svg, {
			overflow: 'visible',
			minScale: 1,
			maxScale: 10,
			step: onMobile ? 1 : 0.3
		});
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
		document.getElementById(room.elementIds.buttonForRoom)!.toggle();

		room.isSelected = !room.isSelected;
	}
</script>

<div class="section" data-theme="light">
	<div class="card h-[70vh] overflow-hidden rounded-3xl border border-black/10 shadow-sm">
		<!-- Zoom controls -->
		<div class="flex flex-none justify-end gap-1 px-3 pt-3">
			<button id="zoom-out" class="btn btn-circle btn-sm btn-soft text-2xl">−</button>
			<button id="zoom-in" class="btn btn-circle btn-sm btn-soft text-2xl">+</button>
		</div>
		<!-- Map (flex-1 + min-h-0 lets it shrink within the 70vh card) -->
		<div class="flex min-h-0 flex-1 items-center justify-center overflow-hidden">
			<EngineShed />
		</div>
		<div class="track-button-container">
			<button id="track-1-button" class="btn" onclick={() => toggleRoomByName('The Junction')}
				>Track 1</button>
			<button id="track-2-button" class="btn" onclick={() => toggleRoomByName("Brunel's Boardroom")}
				>Track 2</button>
			<button
				id="track-3-button"
				class="btn"
				onclick={() => toggleRoomByName("Brunel's Breakout room")}>Track 3</button>
			<button id="track-4-button" class="btn" onclick={() => toggleRoomByName('The Clock tower')}
				>Track 4</button>
		</div>
	</div>
</div>

<style>
	/* Using global because these classes are applied via JS and don't
	 * want these styles to be marked as unused and stripped out */
	:global .display-path {
		display: inline !important;
	}
	:global .selected-room {
		fill: var(--color-primary) !important;
	}
	:global .track-button-selected {
		background-color: var(--color-primary) !important;
	}
</style>

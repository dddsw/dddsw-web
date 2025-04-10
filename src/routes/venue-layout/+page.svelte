<svelte:options runes={true} />

<script lang="ts">
	import EngineShed from './EngineShed.svelte';
	import { pageTitle } from '../../stores.js';
	import * as Panzoom from '@panzoom/panzoom';
	import { onMount } from 'svelte';

	pageTitle.set('Engine Shed room layout');

	onMount(() => {
		// Make map zoomable
		const svg = document.getElementById('floorplan')!;
		const view = svg.parentElement!;
		const panzoom = Panzoom.default(svg);
		view.addEventListener('wheel', panzoom.zoomWithWheel);

		//Make rooms clickable
		var rooms = Array.from(document.getElementsByClassName('room'));
		rooms.forEach((room) => {
			room.addEventListener('click', () => toggleSelectedRoom(room));
		});

		var text = Array.from(document.getElementsByTagName('text'));
		text.forEach((t) => {
			t.addEventListener('click', () => {
				var roomsAssociatedWithText = Array.from(t.parentElement!.getElementsByClassName('room'));
				roomsAssociatedWithText.forEach((room) => toggleSelectedRoom(room));
			});
		});
	});

	function toggleSelectedRoom(room: Element): void {
		room.classList.toggle('selected-room');
	}
</script>

<div class="section">
	<div class="map">
		<EngineShed />
	</div>
</div>

<style>
	.map {
		width: 100%;
		height: 70vh;
		border-color: black;
		border-width: 1px;
		border-style: solid;
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 20px 0px;
		border-radius: 25px;
	}

	/* Using global because this class is applied via JS and don't 
	 * want these styles to be marked as unused and stripped out */
	:global .selected-room {
		fill: rgba(0, 255, 0, 0.5) !important;
	}
</style>

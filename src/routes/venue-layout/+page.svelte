<svelte:options runes={true} />

<script lang="ts">
	import EngineShed from './EngineShed.svelte';
	import { pageTitle } from '../../stores.js';
	import * as Panzoom from '@panzoom/panzoom';
	import { onMount } from 'svelte';

	pageTitle.set('Engine Shed room layout');

	onMount(() => {
		const svg = document.getElementById('svg1')!;
		const view = svg.parentElement!;

		const panzoom = Panzoom.default(svg, {
			contain: 'outside'
		});

		view.addEventListener('wheel', panzoom.zoomWithWheel);
	});
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
		border-width: 2px;
		border-style: solid;
		overflow: hidden;
		margin: 20px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>

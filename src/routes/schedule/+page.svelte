<script lang="ts">
	import { pageTitle } from '../../stores.js';
	import { onMount } from 'svelte';

	pageTitle.set('Schedule');

	onMount(async () => {
		const scheduleRsp = await fetch('https://sessionize.com/api/v2/vphtt01b/view/GridSmart');
		let pageContent = await scheduleRsp.text();
		let targetDiv = document.getElementById('schedule');
		if (targetDiv) {
			targetDiv.innerHTML = pageContent;
		}
	});
</script>

<div id="schedule" />

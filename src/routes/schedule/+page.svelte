<script lang="ts">
	import { goto } from '$app/navigation';
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

		let sessions = document.querySelectorAll('div[data-sessionid]:not(.sz-session--plenum)');
		for (let session of sessions) {
			let sessionID = session.getAttribute('data-sessionid');
			session.addEventListener('click', (e: any) => {
				goto(`/sessions?id=${sessionID}`);
			});
		}
	});
</script>

<p class="text-center">Please note the schedule is subject to change.</p>
<div class="section">
	<h3>Lightning talks</h3>
	<p>During lunch we also have some fantastic lightning talks in The Junction:</p>
	<ul>
		<li>Ben Madley: How To Get Nothing Done</li>
		<li>Carl Sargunar: TBC</li>
		<li>John Kilmister: The Benefits of Load Testing Your Application</li>
	</ul>
</div>

<div id="schedule" />

<style>
	#schedule {
		width: 80%;
		margin: auto;
	}

	@media (min-width: 768px) {
		#schedule {
			width: 75%;
		}
	}
</style>

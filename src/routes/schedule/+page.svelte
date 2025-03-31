<script lang="ts">
	import { goto } from '$app/navigation';
	import { pageTitle } from '../../stores.js';
	import { onMount } from 'svelte';

	pageTitle.set('Schedule');

	onMount(async () => {
		// Will need to be published!
		const scheduleRsp = await fetch('https://sessionize.com/api/v2/s3662dhm/view/GridSmart');
		let pageContent = await scheduleRsp.text();
		let targetDiv = document.getElementById('schedule');
		if (targetDiv) {
			targetDiv.innerHTML = pageContent;
		}

		let sessions = document.querySelectorAll('div[data-sessionid]:not(.sz-session--plenum)');
		for (let session of sessions) {
			let sessionID = session.getAttribute('data-sessionid');
			session.addEventListener('click', () => {
				goto(`/sessions?id=${sessionID}`);
			});
		}
	});
</script>

<div class="tertiary-bg">
	<div class="section">
		<!-- <p>
			To bookmark sessions, submit feedback and enter the prize draw,
			<a href="https://pocket2025.dddsouthwest.com/" class="emphasis">check out Pocket DDD</a>.
		</p> -->
		<p>
			Can't find a room? <a href="/venue-layout" class="emphasis"
				>See a room map of the Engine shed here</a
			>.
		</p>
	</div>
</div>
<div class="secondary-bg">
	<div id="schedule"></div>
	<p class="text-center">Please note the schedule is subject to change.</p>
</div>

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

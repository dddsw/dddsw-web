<script lang="ts">
	import { pageTitle } from '../../stores.js';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	pageTitle.set('Schedule');
	const showBanner = false;
</script>

{#if showBanner}
	<div class="tertiary-bg">
		<div class="section">
			<p>
				To bookmark sessions, submit feedback and enter the prize draw,
				<a href="https://pocket2026.dddsouthwest.com/" class="emphasis">check out Pocket DDD</a>.
			</p>
			<p>
				Can't find a room? <a href="/venue-layout" class="emphasis"
					>See a room map of the Engine shed here
				</a>.
			</p>
		</div>
	</div>
{/if}

<div class="secondary-bg">
	<div id="schedule">{@html data.sessionizeScheduleCode}</div>
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

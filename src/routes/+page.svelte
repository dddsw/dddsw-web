<script lang="ts">
	import CallToActions from '$lib/CallToActions.svelte';
	import Sponsors from '$lib/Sponsors.svelte';
	import { pageTitle } from '../stores.js';
	import Timeline from '$lib/Timeline.svelte';
	import MaterialIcon from '$lib/MaterialIcon.svelte';
	import KeyPoint from '$lib/KeyPoint.svelte';

	pageTitle.set('DDD South West');

	let showSponsors = true;
</script>

{#if showSponsors}
	<Sponsors />
{/if}

<CallToActions>
	<KeyPoint title="For developers">
		{#snippet icon()}
			<MaterialIcon iconName="code"></MaterialIcon>
		{/snippet}
		{#snippet paragraph()}
			Developers are at the heart of DDD South West. We love to learn and share their ideas with
			others. You'll meet like minded peers, make new friends and connections, and feel part of our
			friendly community where everyone is welcome.
		{/snippet}
	</KeyPoint>
	<KeyPoint title="For speakers" iconOnRight="true">
		{#snippet icon()}
			<MaterialIcon iconName="diversity_1"></MaterialIcon>
		{/snippet}
		{#snippet paragraph()}
			Our events are a fantastic place to get your name out there as a speaker. Whether you're a
			professional or a first-timer, you will be made to feel welcome and supported.
		{/snippet}
	</KeyPoint>
	<KeyPoint title="For sponsors">
		{#snippet icon()}
			<MaterialIcon iconName="storefront"></MaterialIcon>
		{/snippet}
		{#snippet paragraph()}
			DDD South West would not be possible without the help from our generous sponsors. If you're
			interested in supporting the tech community and getting access to exactly the people you need
			for your technical roles please <a class="link" href="/sponsorship"
				>consider sponsoring us.</a>
		{/snippet}
	</KeyPoint>
</CallToActions>

<div>
	<div class="section">
		<p>
			DDD South West is an inclusive, non-profit, volunteer driven developer conference organised by
			the community, for the community. We are dedicated to providing a safe and welcoming
			conference experience for everyone.
		</p>
		<p>
			Please refer to our <a class="link" href="/code-of-conduct">Code of Conduct</a> for more information.
		</p>
	</div>
</div>

<div>
	<div class="section">
		<Timeline />
	</div>
</div>

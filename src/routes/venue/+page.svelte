<script lang="ts">
	import EventFacts from '#lib/components/EventFacts.svelte';
	import { event } from '#lib/eventDetails.ts';
	import { venueLabel } from '#lib/event.ts';
</script>

<EventFacts />
<section class="space-y-4">
	<h2 class="h3">{event.year} venue</h2>
	{#if event.venue.name}
		<p>
			{event.shortName}
			{event.year} will be held at {venueLabel()}. Travel and accessibility details are below.
		</p>
	{:else}
		<p>
			The venue for {event.shortName}
			{event.year} is still to be confirmed. We'll publish the address, travel and accessibility details
			here once it's settled.
		</p>
	{/if}
	<p>
		Know a barn-sized space that could work? We'd love to hear from you at
		<a href="mailto:{event.contactEmail}">{event.contactEmail}</a>.
	</p>
</section>

<section class="space-y-4" aria-labelledby="last-year">
	<h2 id="last-year" class="h2">Where we were in 2026</h2>
	<p>
		These are the details for last year's venue, for reference. DDD South West 2026 was held at
		<a href="https://engine-shed.co.uk/" target="_blank" rel="noopener">Engine Shed</a>.
	</p>

	<div class="grid gap-6 md:grid-cols-2">
		<div class="space-y-2 card preset-filled-surface-100-900 p-6">
			<h3 class="h4">Address</h3>
			<address class="not-italic">
				Engine Shed<br />
				Station Approach<br />
				Temple Meads<br />
				Bristol<br />
				BS1 6QH
			</address>
		</div>
		<div class="space-y-2 card preset-filled-surface-100-900 p-6">
			<h3 class="h4">Accessibility</h3>
			<p>Engine Shed is wheelchair accessible and has an accessible toilet.</p>
			<p>
				All conference areas are on the first floor. Walk in the main entrance by Bristol Temple
				Meads railway station and go upstairs by the stairs or the lift. There will be a banner
				outside and volunteer crew members to greet you as you enter the first floor.
				<a href="https://engine-shed.co.uk/engine-shed-virtual-tour/" target="_blank" rel="noopener"
					>Take a virtual tour of the Engine Shed</a>
				or <a href="/venue-layout">see the room layout</a>.
			</p>
			<p>
				During sessions the communal areas (<a
					href="https://engine-shed.co.uk/spaces/the-lounge/"
					target="_blank"
					rel="noopener">Members Lounge</a>
				and
				<a href="https://engine-shed.co.uk/spaces/platform-14/" target="_blank" rel="noopener"
					>Platform 14</a
				>) have some places to sit and relax, though they can be noisy as sound carries from the
				sessions. During breaks and lunch these areas get busy, but the session rooms stay open if
				you need a quieter place to sit.
			</p>
		</div>
	</div>

	<iframe
		title="Google Maps"
		src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2486.505708479013!2d-2.5857436836869034!3d51.44887092280099!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48718e7cb133a5e9%3A0xad45f23e4147453c!2sEngine%20Shed!5e0!3m2!1sen!2suk!4v1667485180686!5m2!1sen!2suk"
		class="h-80 w-full rounded-container border-0 md:h-[28rem]"
		loading="lazy"
		referrerpolicy="no-referrer-when-downgrade"></iframe>
</section>

<section class="space-y-4" aria-labelledby="travel">
	<h2 id="travel" class="h2">Travel</h2>
	<h3 class="h4">By train</h3>
	<p>
		Engine Shed is right next to Temple Meads train station. Follow Approach Road to the end and
		Engine Shed is on the corner.
	</p>
	<h3 class="h4">By car</h3>
	<p>
		The nearest car park is Bristol Temple Meads station. Other car parks can be found
		<a
			href="https://www.Bristol.gov.uk/parking/where-to-park-in-bristol"
			target="_blank"
			rel="noopener">here</a
		>.
	</p>
	<h3 class="h4">Hotels</h3>
	<p>The nearest hotels are:</p>
	<ul class="list-inside list-disc space-y-1">
		<li>Holiday Inn Express: Bristol City Centre South End, Temple Gate, Redcliffe, BS1 6PL</li>
		<li>
			DoubleTree by Hilton Hotel: Bristol City Centre Redcliffe Way, Redcliffe, Bristol, BS1 6NJ
		</li>
		<li>Novotel Bristol Centre: Victoria St, Redcliffe, Bristol, BS1 6HY</li>
	</ul>
	<p class="text-sm">
		Disclaimer: These instructions are provided for your convenience. We have tried to ensure that
		they are accurate but can take no responsibility for errors. This is not an exhaustive list of
		how to get to the venue, other routes (and hotels) are available.
	</p>
</section>

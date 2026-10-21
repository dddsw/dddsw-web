<script lang="ts">
	import EventFacts from '#lib/components/EventFacts.svelte';
	import { event } from '#lib/eventDetails.ts';
	import { Carousel } from '@skeletonlabs/skeleton-svelte';
	import * as chevronLeft from '@fortawesome/free-solid-svg-icons/faChevronLeft';
	import * as chevronRight from '@fortawesome/free-solid-svg-icons/faChevronRight';

	const addressLines = $derived(
		[event.venue.name, ...(event.venue.address?.split(', ') ?? [])].filter(Boolean) as string[]
	);

	let copied = $state(false);

	async function copyAddress() {
		try {
			await navigator.clipboard.writeText(addressLines.join('\n'));
			copied = true;
			setTimeout(() => (copied = false), 2000);
		} catch {
			// Clipboard unavailable: the address is still click-to-select.
		}
	}

	const photos = [
		{
			file: 'exterior',
			alt: 'The Sloane Robinson Building from above',
			title: 'Your first view',
			text: 'The Sloane Robinson Building, right next to Temple Meads.'
		},
		{
			file: 'stairs',
			alt: 'The staircase inside the Sloane Robinson Building',
			title: 'Take the scenic route',
			text: "A big, bright atrium with a staircase you can't miss."
		},
		{
			file: 'cafe',
			alt: 'The entrance foyer of the Sloane Robinson Building, where attendees will be met, with seating and the café and bar beyond',
			title: 'Come on in',
			text: "This is the entrance where we'll meet you when you arrive."
		},
		{
			file: 'round-lecture-theatre',
			alt: 'The Bill Brown Forum in the Sloane Robinson Building',
			title: 'The Bill Brown Forum',
			text: 'One of our four talk rooms: a 300-seat lecture theatre in the round.'
		},
		{
			file: 'meeting-room',
			alt: 'A meeting room with a display screen, tables and chairs, and large windows',
			title: 'Room to talk',
			text: 'Light, airy meeting rooms with views out over Bristol.'
		},
		{
			file: 'terrace-studio',
			alt: 'The Terrace Studio, a bright space with soft seating, tables and floor-to-ceiling windows looking out onto the outdoor terrace',
			title: 'The Terrace Studio',
			text: 'Soft seating and big windows for catching your breath between talks, plus a huge private outdoor space.'
		}
	];
</script>

<EventFacts />
<section class="space-y-4">
	{#if event.venue.name}
		<p>
			{event.shortName}
			{event.year} is at the {event.venue.name}. It's a brand-new venue for us: the building is part
			of the University of Bristol's new campus, which opened in September 2026.
		</p>
		{#if event.venue.address}
			<div
				class="card flex flex-wrap items-center justify-between gap-4 border-l-4 border-secondary-700-300 preset-tonal-surface p-4">
				<address class="text-lg/relaxed not-italic select-all">
					{#each addressLines as line (line)}
						{line}<br />
					{/each}
				</address>
				<button type="button" class="btn preset-filled-surface-950-50" onclick={copyAddress}>
					{copied ? 'Copied!' : 'Copy address'}
				</button>
				<span class="sr-only" role="status">{copied ? 'Address copied to clipboard' : ''}</span>
			</div>
		{/if}
		<p>
			<a
				href="https://www.google.com/maps/search/?api=1&query={encodeURIComponent(
					`${event.venue.name}, ${event.venue.address}`
				)}">Find it on Google Maps</a>
		</p>
		{#if event.venue.venuesUrl}
			<p>
				<a href={event.venue.venuesUrl}
					>More about the building on the University of Bristol site</a>
			</p>
		{/if}
		<Carousel
			slideCount={photos.length}
			allowMouseDrag
			class="space-y-3"
			translations={{
				nextTrigger: 'Next photo',
				prevTrigger: 'Previous photo',
				indicator: (index) => `Go to photo ${index + 1}`,
				item: (index, count) => `Photo ${index + 1} of ${count}`,
				autoplayStart: 'Start slideshow',
				autoplayStop: 'Stop slideshow'
			}}>
			<Carousel.Control class="relative">
				<Carousel.ItemGroup>
					{#each photos as photo, index (photo.file)}
						<Carousel.Item {index}>
							<figure class="space-y-2">
								<img
									src="/images/venue/sloane-robinson-{photo.file}.jpg"
									alt={photo.alt}
									width="1081"
									height="607"
									loading={index === 0 ? 'eager' : 'lazy'}
									class="aspect-video w-full rounded-container object-cover" />
								<figcaption class="space-y-1 px-1">
									<span class="block font-heading text-xl text-secondary-700-300"
										>{photo.title}</span>
									<span class="block">{photo.text}</span>
								</figcaption>
							</figure>
						</Carousel.Item>
					{/each}
				</Carousel.ItemGroup>
				<Carousel.PrevTrigger
					class="absolute top-1/3 left-2 btn-icon -translate-y-1/2 preset-filled-surface-950-50">
					<svg
						viewBox="0 0 {chevronLeft.width} {chevronLeft.height}"
						fill="currentColor"
						aria-hidden="true"
						focusable="false"
						class="size-4"
						xmlns="http://www.w3.org/2000/svg">
						<path d={chevronLeft.svgPathData} />
					</svg>
				</Carousel.PrevTrigger>
				<Carousel.NextTrigger
					class="absolute top-1/3 right-2 btn-icon -translate-y-1/2 preset-filled-surface-950-50">
					<svg
						viewBox="0 0 {chevronRight.width} {chevronRight.height}"
						fill="currentColor"
						aria-hidden="true"
						focusable="false"
						class="size-4"
						xmlns="http://www.w3.org/2000/svg">
						<path d={chevronRight.svgPathData} />
					</svg>
				</Carousel.NextTrigger>
			</Carousel.Control>
			<Carousel.IndicatorGroup class="flex justify-center gap-2">
				{#each photos as photo, index (photo.file)}
					<Carousel.Indicator
						{index}
						class="size-3 rounded-full bg-surface-600-400 data-current:w-6 data-current:bg-secondary-700-300" />
				{/each}
			</Carousel.IndicatorGroup>
		</Carousel>
		<h3 class="h4">Getting here</h3>
		<p>
			The campus is pedestrianised and sits right next to Bristol Temple Meads, so we recommend
			arriving by public transport, bike or on foot.
		</p>
		<figure class="space-y-2">
			<img
				src="/images/venue/temple-meads-new-exit.jpg"
				alt="Ticket gates at the new exit from Bristol Temple Meads, with 'Way out' signs pointing to the University of Bristol and the campus visible through the glass doors"
				width="1600"
				height="1200"
				loading="lazy"
				class="w-full max-w-xl rounded-container" />
			<figcaption class="text-sm">
				The Sloane Robinson Building, seen through the new exit from Bristol Temple Meads
			</figcaption>
		</figure>
		<ul class="list-disc space-y-1 pl-6">
			<li>
				<strong>Train:</strong> leave Bristol Temple Meads by the
				<strong class="text-secondary-700-300">new exit in the subway</strong>. The Sloane Robinson
				Building is
				<strong class="text-secondary-700-300">directly outside the exit</strong>, on University
				Square, and the route is step-free. You need a ticket to go through the station.
			</li>
			<li>
				<strong>Bus:</strong> the First Bus number 8 stops beside the campus.
			</li>
			<li>
				<strong>Park and ride:</strong> the 9 (from Brislington and Portway) stops at T1 on Temple Gate,
				about 5 minutes' walk. The m2 (from Long Ashton) stops at T2, about 10 minutes' walk.
			</li>
			<li>
				<strong>Ferry and bike:</strong> the campus is connected to the Temple Quay ferry landing by the
				floating harbour foot and cycleway.
			</li>
			<li>
				<strong>Car:</strong> there is no general parking at the campus, only a drop-off and pick-up
				area outside the main building (10 minute limit). Bristol has a
				<a
					href="https://www.bristol.gov.uk/residents/streets-travel/bristols-caz/charges-and-vehicle-checker"
					>Clean Air Zone</a
				>, so check whether your vehicle will be charged. There are public car parks nearby:
				<ul class="list-[circle] space-y-1 pl-6">
					<li>
						<a href="https://www.bristol.gov.uk/parking/temple-gate-long-stay-car-park"
							>Temple Gate</a> (Bristol City Council), about 7 minutes' walk
					</li>
					<li>
						<a href="https://apcoa.co.uk/parking-in/bristol/bristol-temple-meads/">Temple Meads</a> (station
						car park), about 8 minutes' walk
					</li>
					<li>
						<a
							href="https://www.bristol.gov.uk/residents/parking/where-to-park-in-bristol/portwall-lane-long-stay-car-park"
							>Portwall Lane</a> (Bristol City Council), about 12 minutes' walk
					</li>
				</ul>
			</li>
		</ul>
		<p class="text-sm">
			Travel details are from the University of Bristol's <a
				href="https://www.bristol.ac.uk/maps/how-to-get-here/">how to get here</a>
			and
			<a
				href="https://www.bristol.ac.uk/maps/car-parking/temple-quarter-enterprise-campus/visitor-parking/"
				>visitor parking</a> pages. Check them for timetables, prices and updates.
		</p>
		<h3 class="h4">Accessibility</h3>
		<p>The Sloane Robinson Building has been designed to be accessible and inclusive. It has:</p>
		<ul class="list-disc space-y-1 pl-6">
			<li>a step-free entrance at ground level, and a step-free route from the station</li>
			<li>9 passenger lifts and wide corridors for wheelchair users to pass and turn</li>
			<li>hearing enhancement systems</li>
			<li>
				an accessible and ambulant toilet at every toilet location, plus a Changing Places facility
				and a family room
			</li>
			<li>gender-neutral toilets on every floor above the ground floor</li>
			<li>
				Blue Badge parking, which can be arranged in advance: please let us know when you book your
				ticket
			</li>
		</ul>
		<p class="text-sm">
			Building details are from the University of Bristol's <a
				href="https://www.bristol.ac.uk/study/temple-quarter-enterprise-campus/about-the-building"
				>about the building</a> page.
		</p>
	{:else}
		<p>
			The venue for {event.shortName}
			{event.year} is still to be confirmed. We'll publish the address, travel and accessibility details
			here once it's settled.
		</p>
	{/if}
</section>

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
	{:else}
		<p>
			The venue for {event.shortName}
			{event.year} is still to be confirmed. We'll publish the address, travel and accessibility details
			here once it's settled.
		</p>
	{/if}
</section>

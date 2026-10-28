<script lang="ts">
	import { onMount } from 'svelte';
	import EventFacts from '#lib/components/EventFacts.svelte';
	import { event } from '#lib/eventDetails.ts';
	import { Carousel, Tabs } from '@skeletonlabs/skeleton-svelte';
	import * as chevronLeft from '@fortawesome/free-solid-svg-icons/faChevronLeft';
	import * as chevronRight from '@fortawesome/free-solid-svg-icons/faChevronRight';

	const addressLines = $derived(
		[event.venue.name, ...(event.venue.address?.split(', ') ?? [])].filter(Boolean) as string[]
	);

	const travelModes = [
		{ name: 'Train', emoji: '🚆' },
		{ name: 'Car', emoji: '🚗' },
		{ name: 'Bus', emoji: '🚌' },
		{ name: 'Ferry and bike', emoji: '⛴️' }
	];

	// The travel tabs scroll sideways on narrow screens. Fade whichever edge has more tabs beyond it
	// so it is clear there is more to scroll to.
	let tabsWrap = $state<HTMLElement>();
	let fade = $state({ left: false, right: false });
	const tabsMask = $derived(
		`linear-gradient(to right, ${fade.left ? 'transparent' : 'black'}, black 2rem, black calc(100% - 2rem), ${fade.right ? 'transparent' : 'black'})`
	);

	function updateFade() {
		const list = tabsWrap?.querySelector('[role="tablist"]');
		if (!list) return;
		fade = {
			left: list.scrollLeft > 1,
			right: list.scrollLeft + list.clientWidth < list.scrollWidth - 1
		};
	}

	onMount(() => {
		updateFade();
		const observer = new ResizeObserver(updateFade);
		if (tabsWrap) observer.observe(tabsWrap);
		return () => observer.disconnect();
	});

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

	const hotels = [
		{
			name: 'ibis Bristol Temple Meads Quay',
			where: 'Avon Street',
			href: 'https://all.accor.com/hotel/6593/index.en.shtml'
		},
		{
			name: 'Holiday Inn Express Bristol City Centre',
			where: 'opposite Temple Meads station',
			href: 'https://www.ihg.com/holidayinnexpress/hotels/gb/en/bristol/brsct/hoteldetail'
		},
		{
			name: 'Leonardo Hotel Bristol City',
			where: 'Temple Way',
			href: 'https://www.leonardo-hotels.com/bristol/leonardo-hotel-bristol-city'
		},
		{
			name: 'Novotel Bristol Centre',
			where: 'Victoria Street',
			href: 'https://all.accor.com/hotel/5622/index.en.shtml'
		},
		{
			name: 'Hilton Garden Inn Bristol City Centre',
			where: 'Temple Way',
			href: 'https://www.hilton.com/en/hotels/brsccgi-hilton-garden-inn-bristol-city-centre/'
		},
		{
			name: 'DoubleTree by Hilton Bristol City Centre',
			where: 'Redcliffe Way',
			href: 'https://www.hilton.com/en/hotels/brsrwdi-doubletree-bristol-city-centre/'
		}
	];

	const photos = [
		{
			file: 'exterior',
			alt: 'The Sloane Robinson Building from above',
			title: 'The outside',
			text: 'The Sloane Robinson Building, right next to Temple Meads.'
		},
		{
			file: 'cafe',
			alt: 'The entrance foyer of the Sloane Robinson Building, where attendees will be met, with seating and the café and bar beyond',
			title: 'Come on in',
			text: "This is the entrance where we'll meet you when you arrive."
		},
		{
			file: 'stairs',
			alt: 'The staircase inside the Sloane Robinson Building',
			title: 'The atrium',
			text: 'A big, bright atrium with a striking yellow staircase. There are lifts too.'
		},
		{
			file: 'round-lecture-theatre',
			alt: 'The Bill Brown Forum in the Sloane Robinson Building',
			title: 'The Bill Brown Forum',
			text: 'One of our four session rooms: a 300-seat lecture theatre in the round.'
		},
		{
			file: 'meeting-room',
			alt: 'A meeting room with a display screen, tables and chairs, and large windows',
			title: 'Another room',
			text: 'A light, airy room with views out over Bristol, where more sessions will take place.'
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
				<Carousel.ItemGroup
					tabindex={0}
					class="rounded-container focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-700-300">
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
		<Tabs
			defaultValue={travelModes[0].name}
			class="rounded-container border border-surface-200-800 bg-surface-100-900 p-4 md:p-6">
			<div bind:this={tabsWrap} onscrollcapture={updateFade} style:mask-image={tabsMask}>
				<Tabs.List class="overflow-x-auto">
					{#each travelModes as mode (mode.name)}
						<Tabs.Trigger value={mode.name} class="shrink-0 whitespace-nowrap">
							<span aria-hidden="true">{mode.emoji}</span>
							{mode.name}
						</Tabs.Trigger>
					{/each}
					<Tabs.Indicator />
				</Tabs.List>
			</div>
			<Tabs.Content value="Train" class="mt-4 flex flex-col gap-3 md:flow-root">
				<figure class="order-last space-y-2 md:float-right md:order-none md:mb-1 md:ml-4 md:w-64">
					<img
						src="/images/venue/temple-meads-new-exit.webp"
						alt="Ticket gates at the new exit from Bristol Temple Meads, with 'Way out' signs pointing to the University of Bristol and the campus visible through the glass doors"
						width="2000"
						height="1500"
						loading="lazy"
						class="aspect-video w-full rounded-container object-cover" />
					<figcaption class="text-sm">
						The Sloane Robinson Building, seen through the new exit from Bristol Temple Meads
					</figcaption>
				</figure>
				<p>
					Leave Bristol Temple Meads by the
					<strong class="text-secondary-700-300">new exit in the subway</strong>. The Sloane
					Robinson Building is
					<strong class="text-secondary-700-300">directly outside the exit</strong>, on University
					Square, and the route is step-free. You need a ticket to go through the station.
				</p>
			</Tabs.Content>
			<Tabs.Content value="Car" class="mt-4 space-y-2">
				<p>
					The campus has no general parking, but Blue Badge parking can be arranged in advance if
					you tell us when you book your ticket. There is also a drop-off and pick-up area outside
					the main building, with a 10 minute limit.
				</p>
				<p>
					<strong>Park and ride:</strong> the 9 (from Brislington and Portway) stops at T1 on Temple Gate,
					about 5 minutes' walk away. The m2 (from Long Ashton) stops at T2, about 10 minutes' walk away.
				</p>
				<p><strong>Public car parks nearby:</strong></p>
				<ul class="list-disc space-y-1 pl-6">
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
				<p>
					Bristol has a
					<a
						href="https://www.bristol.gov.uk/residents/streets-travel/bristols-caz/charges-and-vehicle-checker"
						>Clean Air Zone</a
					>, so check whether your vehicle will be charged.
				</p>
			</Tabs.Content>
			<Tabs.Content value="Bus" class="mt-4">
				<p>
					The First Bus number 8 stops beside the campus. See the
					<a
						href="https://www.firstbus.co.uk/bristol-bath-and-west/plan-journey/timetables?service=8-BS&day=sa"
						>number 8 Saturday timetable</a> on the First Bus website.
				</p>
			</Tabs.Content>
			<Tabs.Content value="Ferry and bike" class="mt-4">
				<p>
					The campus is connected to the Temple Quay ferry landing by the floating harbour foot and
					cycleway.
				</p>
			</Tabs.Content>
		</Tabs>
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
		<h3 class="h4">Food and drink</h3>
		<p>
			We'll provide breakfast, lunch and two tea breaks, all included with your free ticket. Please
			tell us about any dietary requirements when you book your ticket.
		</p>
		<p>
			The building also has a canteen and vending machines if you want something extra. These aren't
			included, so you'll need to pay for anything you buy there.
		</p>
		<h3 class="h4">Quiet spaces and cosy nooks</h3>
		<p>
			As well as the main rooms, there is plenty of quiet space and there are cosy nooks dotted
			around the building if you need a break.
		</p>
		<h3 class="h4">After the conference</h3>
		<p>
			Some of us usually head to the pub afterwards, normally the
			<a href="https://www.lefthandedgiant.com/">Left Handed Giant Brewpub</a>
			in the Compressor Building at Finzels Reach (Hawkins Lane, BS1 6EU). It's about a 15 minute walk
			from the venue, along the river. You're very welcome to join us, and we'll share more details on
			the day.
		</p>
		<h3 class="h4">Where to stay</h3>
		<p>
			These hotels are all about 10 to 15 minutes' walk from the venue. They're suggestions only, so
			check prices, availability and exact distances with the hotel or on a map.
		</p>
		<ul class="list-disc space-y-1 pl-6">
			{#each hotels as hotel (hotel.name)}
				<li><a href={hotel.href}>{hotel.name}</a>, {hotel.where}</li>
			{/each}
		</ul>
	{:else}
		<p>
			The venue for {event.shortName}
			{event.year} is still to be confirmed. We'll publish the address, travel and accessibility details
			here once it's settled.
		</p>
	{/if}
</section>

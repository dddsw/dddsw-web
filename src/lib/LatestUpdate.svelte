<script lang="ts">
	type Update = {
		dateFrom: Date;
		content: string;
	};

	let linkedInIcon = `<a href="https://www.linkedin.com/company/ddd-south-west/" target="_blank">
							<i class="fa-brands fa-linkedin fa-lg" title="DDD South West LinkedIn" aria-hidden="true"></i>
							<span class="fa-sr-only">DDD South West LinkedIn</span>
						</a>`;

	let allUpdates: Update[] = [
		{
			dateFrom: new Date('2024-12-20'),
			content: `DDD South West is coming... save the date! See you on the
			<strong class="emphasis">26th April 2025</strong> at Engine Shed, Bristol`
		},
		{
			dateFrom: new Date('2024-12-25'),
			content: `Watch this space.... call for speakers is opening on 1st January 2025.`
		},
		{
			dateFrom: new Date('2025-01-01'),
			content: `Call for speakers is <strong class="emphasis">open until 31st January 2025</strong>. 
            We are a friendly developers conference and welcome papers from speakers both old and new. 
            So whether you have an established talk you'd like to bring to Bristol or an idea you'd like help developing,
            <a href="https://sessionize.com/ddd-south-west-2025/">submit your talk now</a>.`
		},
		{
			dateFrom: new Date('2025-02-01'),
			content: `Call for speakers is now closed. Session voting will be opening soon, watch this space or follow us on ${linkedInIcon}`
		},
		{
			dateFrom: new Date('2025-02-12'),
			content: `Session voting is now open! Take a look and <a href="https://buff.ly/4hzncRk">vote for your favourites here</a>.<br>Voting will close on 21st February.`
		},
		{
			dateFrom: new Date('2025-02-22'),
			content: `Session voting has closed, hold tight - ticket registration will be opening at the end of March`
		},
		{
			dateFrom: new Date('2025-03-31'),
			content: `Speakers have been announced and the schedule is live! <a href="/schedule">Check full schedule details here</a>. Get your tickets from <a href="https://app.tickettailor.com/events/dddsouthwest/1643112/r/website">Ticket Tailor</a>.`
		},
		{
			dateFrom: new Date('2025-04-22'),
			content: `The day is fast approaching, we're fully sold out but you can still join the waitlist on <a href="https://app.tickettailor.com/events/dddsouthwest/1643112/r/website">Ticket Tailor</a>.`
		},
		{
			dateFrom: new Date('2025-04-26'),
			content: `Today is the day! See you at Engine Shed and be sure to use <a href="https://pocket2025.dddsouthwest.com">Pocket DDD</a> to give feedback to our wonderful speakers`
		},
		{
			dateFrom: new Date('2025-04-27'),
			content: `Thank you to everyone for another great DDD South West. See you in 2026 😉`
		}
	];

	// The current update is the most recent one - take the latest one whose "dateFrom" is in the past
	let currentUpdate = allUpdates
		.filter((u) => u.dateFrom.valueOf() < Date.now())
		.sort((a, b) => a.dateFrom.valueOf() - b.dateFrom.valueOf())
		.pop();
</script>

{#if currentUpdate}
	<div class="latest-update primary-bg">
		<div class="section">
			<h2>Latest update</h2>
			<p>
				{@html currentUpdate.content}
			</p>
		</div>
	</div>
{/if}

<style>
	@media (min-width: 768px) {
		.latest-update h2 {
			font-size: 2rem;
		}

		.latest-update p {
			font-size: 1.25rem;
		}
	}

	/* Ensure any links are accessibly coloured.
	 * Using global because we are rendering html via a string and don't 
	 * want these styles to be marked as unused and stripped out */
	:global .latest-update {
		& a:link,
		& a:visited {
			/* This isn't a normal link colour because the colour is inaccessible against the 
			 * primary orange background. We have to use an underline to indicate that this
			 * is a link because the contrast between the link text and the standard black text is poor
			 * https://webaim.org/resources/linkcontrastchecker/?fcolor=FF9930&bcolor=8AE8FF */
			color: #0000e3;
			text-decoration: underline;
		}

		& .fa-brands {
			color: black;
		}

		& .fa-brands:hover {
			color: white;
		}
	}
</style>

<script lang="ts">
	type Update = {
		dateFrom: Date;
		content: string;
	};

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
		}
	];

	// The current update is the most recent one - take the latest one whose "dateFrom" is in the past
	let currentUpdate = allUpdates
		.filter((u) => u.dateFrom.valueOf() < Date.now())
		.toSorted((a, b) => a.dateFrom.valueOf() - b.dateFrom.valueOf())
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
</style>

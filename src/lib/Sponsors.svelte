<script lang="ts">
	let ref_source = 'ddd-south-west'; // Change this to your actual site name
	let utm_medium = 'sponsorship';
	let utm_campaign = '2025';

	type Sponsor = {
		name: string;
		href: string;
		src: string;
		confirmed: boolean;
		tier: 'gold' | 'silver' | 'bronze';
		order: number;
	};

	let sponsors: Sponsor[] = [
		{
			name: 'SECCL',
			href: 'https://seccl.tech/',
			src: '../images/sponsors/seccl.png',
			confirmed: false,
			tier: 'gold',
			order: 1
		},
		{
			name: 'UK Hydrographics Office',
			href: 'https://www.gov.uk/government/organisations/uk-hydrographic-office',
			src: '../images/sponsors/UKHO.png',
			confirmed: true,
			tier: 'gold',
			order: 2
		},
		{
			name: 'Umbraco CMS',
			href: 'https://umbraco.com/',
			src: '../images/sponsors/umbraco.png',
			confirmed: true,
			tier: 'gold',
			order: 1
		},
		{
			name: 'Rock Solid Knowledge',
			href: 'https://www.rocksolidknowledge.com/',
			src: '../images/sponsors/rocksolid.png',
			confirmed: false,
			tier: 'silver',
			order: 1
		},
		{
			name: 'iO Associates',
			href: 'https://www.ioassociates.co.uk/',
			src: '../images/sponsors/io.png',
			confirmed: true,
			tier: 'gold',
			order: 3
		},
		{
			name: 'Howdens',
			href: 'https://www.howdengroup.com/uk-en',
			src: '../images/sponsors/howden.png',
			confirmed: true,
			tier: 'gold',
			order: 4
		},
		{
			name: 'Jetbrains',
			href: 'https://www.jetbrains.com/',
			src: '../images/sponsors/jetbrains.png',
			confirmed: true,
			tier: 'silver',
			order: 2
		},
		{
			name: 'NDC Conferences',
			href: 'https://ndcconferences.com/',
			src: '../images/sponsors/ndc.png',
			confirmed: true,
			tier: 'silver',
			order: 1
		}
		// Add more sponsors here
	];

	function addTrackingParams(url: string) {
		const params = new URLSearchParams({
			ref: ref_source,
			utm_source: ref_source,
			utm_medium: utm_medium,
			utm_campaign: utm_campaign
		}).toString();

		return url.includes('?') ? `${url}&${params}` : `${url}?${params}`;
	}

	const sponsorsByTier = (tier: string) =>
		sponsors.filter((s) => s.confirmed && s.tier === tier).sort((a, b) => a.order - b.order);
</script>

<div class="section">
	<h2>With thanks to our confirmed 2025 Gold Sponsors:</h2>
	<div class="sponsor-logos gold">
		{#each sponsorsByTier('gold') as sponsor}
			<a href={addTrackingParams(sponsor.href)} target="_blank">
				<img src={sponsor.src} alt={sponsor.name} />
			</a>
		{/each}
	</div>

	<h2>And our Silver Sponsors:</h2>
	<div class="sponsor-logos silver">
		{#each sponsorsByTier('silver') as sponsor}
			<a href={addTrackingParams(sponsor.href)} target="_blank">
				<img src={sponsor.src} alt={sponsor.name} />
			</a>
		{/each}
	</div>

	<!-- Uncomment when you have bronze sponsors -->
	<!--
	<h2>With thanks to our confirmed 2025 Bronze Sponsors:</h2>
	<div class="sponsor-logos bronze">
		{#each sponsorsByTier('bronze') as sponsor}
			<a href={addTrackingParams(sponsor.href)} target="_blank">
				<img src={sponsor.src} alt={sponsor.name} />
			</a>
		{/each}
	</div>
	-->
</div>

<style>
	.sponsor-logos {
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		flex-wrap: wrap;
		gap: 20px;
	}

	.sponsor-logos.gold img {
		max-height: 160px;
		max-width: 160px;
	}

	.sponsor-logos.silver img {
		max-height: 120px;
		max-width: 120px;
	}

	.sponsor-logos.bronze img {
		max-height: 90px;
		max-width: 90px;
	}
</style>

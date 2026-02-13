<script lang="ts">
	let ref_source = 'ddd-south-west';
	let utm_medium = 'sponsorship';
	let utm_campaign = '2026';

	type Sponsor = {
		name: string;
		href: string;
		src: string;
		confirmed: boolean;
		tier: 'exhibitor' | 'supporter' | 'food';
		order: number;
	};

	let sponsors: Sponsor[] = [
		{
			name: 'SECCL',
			href: 'https://seccl.tech/',
			src: '../images/sponsors/seccl.png',
			confirmed: true,
			tier: 'exhibitor',
			order: 1
		},
		{
			name: 'UK Hydrographic Office',
			href: 'https://www.gov.uk/government/organisations/uk-hydrographic-office',
			src: '../images/sponsors/UKHO.png',
			confirmed: true,
			tier: 'exhibitor',
			order: 2
		},
		{
			name: 'Umbraco CMS',
			href: 'https://umbraco.com/',
			src: '../images/sponsors/umbraco.png',
			confirmed: true,
			tier: 'exhibitor',
			order: 1
		},
		{
			name: 'Rock Solid Knowledge',
			href: 'https://www.rocksolidknowledge.com/',
			src: '../images/sponsors/rocksolid.png',
			confirmed: false,
			tier: 'supporter',
			order: 1
		},
		{
			name: 'iO Associates',
			href: 'https://www.ioassociates.co.uk/',
			src: '../images/sponsors/io.png',
			confirmed: false,
			tier: 'exhibitor',
			order: 3
		},
		{
			name: 'Howdens',
			href: 'https://www.howdengroup.com/uk-en',
			src: '../images/sponsors/howden.png',
			confirmed: false,
			tier: 'exhibitor',
			order: 4
		},
		{
			name: 'Flagstone',
			href: 'https://www.flagstoneim.com/',
			src: '../images/sponsors/flagstone.png',
			confirmed: true,
			tier: 'supporter',
			order: 1
		},
		{
			name: 'JetBrains',
			href: 'https://www.jetbrains.com/',
			src: '../images/sponsors/jetbrains.png',
			confirmed: false,
			tier: 'supporter',
			order: 3
		},
		{
			name: 'NDC Conferences',
			href: 'https://ndcconferences.com/',
			src: '../images/sponsors/ndc.png',
			confirmed: false,
			tier: 'supporter',
			order: 1
		},
		// ➕ Added from old array
		{
			name: 'Avanade',
			href: 'https://www.avanade.com/en-gb',
			src: '../images/sponsors/avanade.png',
			confirmed: false,
			tier: 'food',
			order: 99
		},
		{
			name: 'ALD Automotive',
			href: 'https://www.aldautomotive.com/',
			src: '../images/sponsors/ald.png',
			confirmed: false,
			tier: 'food',
			order: 99
		},
		{
			name: 'Elastic Mint',
			href: 'https://www.elasticmint.com/',
			src: '../images/sponsors/elasticmint.png',
			confirmed: false,
			tier: 'food',
			order: 99
		},
		{
			name: 'BJSS',
			href: 'https://www.bjss.com/',
			src: '../images/sponsors/bjss.jpg',
			confirmed: false,
			tier: 'food',
			order: 99
		},
		{
			name: 'Just Eat Takeaway.com',
			href: 'https://careers.justeattakeaway.com/global/en/c/tech-product-jobs',
			src: '../images/sponsors/justeat.png',
			confirmed: false,
			tier: 'food',
			order: 99
		},
		{
			name: 'dxw',
			href: 'https://www.dxw.com/',
			src: '../images/sponsors/dxw.png',
			confirmed: false,
			tier: 'food',
			order: 99
		}
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

{#snippet sponsorList(title: string, tier: string)}
	{#if sponsorsByTier(tier).length > 0}
		<section class={tier}>
			<h2>{title}</h2>
			<ul class="sponsor-logos">
				{#each sponsorsByTier(tier) as sponsor}
					<li>
						<a
							href={addTrackingParams(sponsor.href)}
							target="_blank"
							aria-label="Visit {sponsor.name} website">
							<img src={sponsor.src} alt="{sponsor.name} logo" aria-hidden="false" />
						</a>
					</li>
				{/each}
			</ul>
		</section>
	{/if}
{/snippet}

<div class="section">
	{@render sponsorList('With thanks to our 2026 Exhibitors:', 'exhibitor')}
	{@render sponsorList('And our Supporters:', 'supporter')}
</div>

<style>
	.sponsor-logos {
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		flex-wrap: wrap;
		gap: 20px;

		li {
			list-style-type: none;
		}

		img {
			max-height: 160px;
			max-width: 160px;
		}
	}
</style>

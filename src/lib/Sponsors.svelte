<script lang="ts">
	let sponsors = [
		{
			name: 'SECCL',
			href: 'https://seccl.tech/',
			src: '../images/sponsors/seccl.png',
			confirmed: true
		},
		{
			name: 'UK Hydrographics Office',
			href: 'https://www.gov.uk/government/organisations/uk-hydrographic-office',
			src: '../images/sponsors/UKHO.png',
			confirmed: true
		},
		{
			name: 'Rock Solid Knowledge',
			href: 'https://www.rocksolidknowledge.com/',
			src: '../images/sponsors/rocksolid.png',
			confirmed: true
		},
		{
			name: 'iO Associates',
			href: 'https://www.ioassociates.co.uk/',
			src: '../images/sponsors/io.png',
			confirmed: true
		},
		{
			name: 'Avanade',
			href: 'https://www.avanade.com/en-gb',
			src: '../images/sponsors/avanade.png',
			confirmed: false
		},
		{
			name: 'ALD Automotive',
			href: 'https://www.aldautomotive.com/',
			src: '../images/sponsors/ald.png',
			confirmed: false
		},
		{
			name: 'Elastic Mint',
			href: 'https://www.elasticmint.com/',
			src: '../images/sponsors/elasticmint.png',
			confirmed: true
		},
		{
			name: 'BJSS',
			href: 'https://www.bjss.com/',
			src: '../images/sponsors/bjss.jpg',
			confirmed: true
		},
		{
			name: 'Just Eat Takeaway.com',
			href: 'https://careers.justeattakeaway.com/global/en/c/tech-product-jobs',
			src: '../images/sponsors/justeat.png',
			confirmed: false
		},
		{
			name: 'dxw',
			href: 'https://www.dxw.com/',
			src: '../images/sponsors/dxw.png',
			confirmed: true
		}
	];
</script>

<div class="sponsors">
	<h2>With thanks to our 2024 sponsors:</h2>
	<div class="sponsor-logos">
		{#each sponsors as sponsor}
			{#if sponsor.confirmed}
				<a href={sponsor.href} target="_blank">
					<img src={sponsor.src} alt={sponsor.name} />
				</a>
			{/if}
		{/each}
	</div>
</div>

<style>
	.sponsors {
		width: 70%;
		margin: auto;
		padding-bottom: 30px;
	}

	.sponsor-logos {
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		flex-wrap: wrap;
		gap: 20px;
	}

	.sponsor-logos img {
		max-height: 150px;
		max-width: 150px;
	}
</style>

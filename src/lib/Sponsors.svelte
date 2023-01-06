<script lang="ts">
	let sponsors = [
		{ name: 'SECCL', href: 'https://seccl.tech/', src: '../images/sponsors/seccl.svg' }
	];
</script>

<div class="sponsors">
	<h2>With thanks to our 2023 sponsors:</h2>
	<div class="sponsor-logos">
		{#each sponsors as sponsor}
			<a href={sponsor.href} target="_blank">
				<img src={sponsor.src} alt={sponsor.name} />
			</a>
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

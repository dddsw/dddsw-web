<script lang="ts">
	import { run } from 'svelte/legacy';

	let carouselImages = [
		{
			id: 1,
			src: '../images/carousel/carousel-2024-1.jpg',
			alt: 'Attendees and sponsors mingling in the communal area'
		},
		{
			id: 2,
			src: '../images/carousel/carousel-2024-2.jpg',
			alt: 'A room full of attendees eager to start the day'
		},
		{
			id: 3,
			src: '../images/carousel/carousel-2024-3.jpg',
			alt: 'Visitors all gathered for the end of day prize giving'
		},
		{
			id: 4,
			src: '../images/carousel/carousel-2024-4.jpg',
			alt: 'Guests eagerly waiting for the speakers to start their session'
		},
		{
			id: 5,
			src: '../images/carousel/carousel-2024-5.jpg',
			alt: 'Standing room only in one of our stages'
		},
		{
			id: 6,
			src: '../images/carousel/carousel-2024-6.jpg',
			alt: 'The amazing food as provided by our sponsors'
		},
		{
			id: 7,
			src: '../images/carousel/carousel-2024-7.jpg',
			alt: 'A live podcast recording with a guest panel of speakers'
		}
	];

	let carouselImage;
	run(() => {
		carouselImage = carouselImages[0];
	});

	setInterval(() => {
		const currentId = carouselImage.id;
		if (currentId === carouselImages.length) {
			carouselImage = carouselImages[0];
		} else {
			carouselImage = carouselImages[currentId];
		}
	}, 4000);
</script>

{#key carouselImage}
	<div
		class="header"
		style="background-image: url({carouselImage.src});"
		aria-label={carouselImage.alt}>
		<div class="details-container shadow">
			<span class="name">DDD South West</span><br />
			<span class="details">26th April 2025 @ Engine Shed</span>
		</div>
	</div>
{/key}

<style>
	.header {
		background-size: cover;
		background-position: center;
		min-height: 250px;
		display: flex;
		flex-direction: row;
		align-items: flex-end;
		justify-content: space-between;
		clip-path: inset(0px 0px 0px 0px); /* Stops the shadow spilling over outside the header */
	}

	.details-container {
		color: white;
		margin-left: 30px;
		margin-bottom: 10px;
	}

	.name {
		font-size: 1.5rem;
		font-weight: bold;
	}

	.shadow {
		box-shadow: 0px 0px 50px 43px rgb(0 0 0 / 50%);
		background-color: rgb(0 0 0 / 50%);
	}

	@media (min-width: 350px) {
		.name {
			font-size: 2rem;
		}
	}

	@media (min-width: 768px) {
		.name {
			font-size: 3rem;
		}

		.details {
			font-size: 1.5rem;
		}

		.details-container {
			margin-left: 100px;
			margin-bottom: 50px;
		}

		.header {
			min-height: 400px;
		}
	}

	@media (min-width: 992px) {
		.name {
			font-size: 5rem;
		}

		.details {
			font-size: 2rem;
		}
	}

	@media (min-width: 1200px) {
		.header {
			min-height: 500px;
		}
	}

	@media (min-width: 1800px) {
		.header {
			min-height: 700px;
		}

		.details-container {
			margin-left: 25%;
		}
	}
</style>

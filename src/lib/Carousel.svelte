<script>
	let carouselImages = [
		{ id: 1, src: '../images/carousel/carousel-1.jpg' },
		{ id: 2, src: '../images/carousel/carousel-2.jpg' },
		{ id: 3, src: '../images/carousel/carousel-3.jpg' },
		{ id: 4, src: '../images/carousel/carousel-4.png' },
		{ id: 5, src: '../images/carousel/carousel-5.png' },
		{ id: 6, src: '../images/carousel/carousel-6.jpg' }
	];

	$: carouselImage = carouselImages[0];

	setInterval(() => {
		const currentId = carouselImage.id;
		if (currentId === carouselImages.length) {
			carouselImage = carouselImages[0];
		} else {
			carouselImage = carouselImages[currentId];
		}
	}, 5000);
</script>

{#key carouselImage}
	<div class="header" style="background-image: url({carouselImage.src});">
        <slot></slot>
		<div class="name"><span class="shadow">DDD South West</span></div>
	</div>
{/key}

<style>
	.header {
		background-size: cover;
		background-position: center;
		min-height: 800px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.name {
		color: white;
		font-size: 100px;
		font-weight: bold;
		margin-left: 100px;
		margin-bottom: 50px;
	}

	.shadow {
		box-shadow: 0px 0px 50px 43px rgb(0 0 0 / 50%);
		background-color: rgb(0 0 0 / 50%);
	}
</style>

<script>
	let showSponsors = true;
	let sponsors = [
		{
			name: 'IO Associates',
			href: 'https://www.ioassociates.co.uk',
			src: '../images/sponsors/io_associates.png'
		},
		{ name: 'SECCL', href: 'https://seccl.tech/', src: '../images/sponsors/seccl.svg' },
		{ name: 'Elastic', href: 'https://www.elastic.co/', src: '../images/sponsors/elastic.png' },
		{ name: 'NDC London', href: 'https://ndclondon.com/', src: '../images/sponsors/ndc_london.png' }
	];

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

<div class="home-container">
	{#key carouselImage}
		<div class="header" style="background-image: url({carouselImage.src});">
			<nav>
				<span class="shadow">
					<a href="/">Home</a>
				</span>
				<span class="shadow">
					<a href="/about">About</a>
				</span>

				<span class="shadow">
					<a href="/sponsors">DDDSW 2023</a>
				</span>
			</nav>
			<div class="name"><span class="shadow">DDD South West</span></div>
		</div>
	{/key}

	<div class="introduction primary-bg">
		<p>
			DDD South West is an inclusive, non-profit developer conference organised by the community,
			for the community.
		</p>
	</div>

	{#if showSponsors}
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
	{/if}

	<div class={showSponsors ? 'tertiary-bg' : 'secondary-bg'}>
		<div class="key-points-container">
			<div class="key-point">
				<div>
					<h1>For developers</h1>
					<p>
						Developers are at the heart of DDD South West. We love to learn and share their ideas
						with others. You'll meet likeminded peers, make new friends and connections, and feel
						part of our friendly community where everyone is welcome. (Link to about?)
					</p>
				</div>
				<span class="material-symbols-outlined icon">code</span>
			</div>
			<div class="key-point">
				<span class="material-symbols-outlined icon">diversity_1</span>
				<div class="key-point-right">
					<h1>For speakers</h1>
					<p>
						Our events are a fantastic place to get your name out there as a speaker. Whether you're
						a professional or a first-timer, you will be made to feel welcome and supported. (Link
						to submit talk)
					</p>
				</div>
			</div>
			<div class="key-point">
				<div>
					<h1>For sponsors</h1>
					<p>
						Our events would not be possible without the help from our generous sponsors. If you're
						interested in supporting the tech community and getting access to exactly the people you
						need for your technical roles please consider sponsoring our event (link to sponsors
						page).
					</p>
				</div>
				<span class="material-symbols-outlined icon">storefront</span>
			</div>
		</div>
	</div>

	<div class="footer primary-bg">
		<a href="https://twitter.com/dddsouthwest"
			><i class="fa-brands fa-twitter fa-3x" style="color: black;" /></a
		>
		<a href="https://www.linkedin.com/company/ddd-south-west/"
			><i class="fa-brands fa-linkedin fa-3x" style="color: black;" /></a
		>
	</div>
</div>

<style>
	.home-container {
		display: flex;
		flex-direction: column;
	}

	.header {
		/* background-image: url('../images/header.jpg'); */
		background-size: cover;
		/* background-position-x: right; */
		background-position: center;
		min-height: 800px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	nav {
		display: flex;
		justify-content: flex-end;
		gap: 50px;
		margin: 50px;
	}

	nav a {
		color: white;
		text-decoration: none;
		font-size: x-large;
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

	.introduction {
		font-size: 1.75em;
	}

	.introduction p {
		padding: 50px;
		margin: 0;
		text-align: center;
	}

	.icon {
		font-size: 125px;
	}

	.primary-bg {
		background-color: #ff9930;
	}

	.secondary-bg {
		background-color: white;
	}

	.tertiary-bg {
		background-color: #eaeaea;
	}

	.key-points-container {
		width: 80%;
		margin: auto;
	}

	.key-point {
		display: flex;
		align-items: center;
		padding: 30px 100px;
		justify-content: space-between;
		gap: 200px;
	}

	.key-point-right {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}

	.key-point-right p {
		text-align: right;
	}

	.sponsors {
		width: 70%;
		margin: auto;
		padding-bottom: 30px;
	}

	.sponsor-logos {
		display: flex;
		justify-content: space-evenly;
		align-items: center;
	}

	.sponsor-logos img {
		max-height: 150px;
		max-width: 150px;
	}

	.footer {
		padding: 30px;
		display: flex;
		justify-content: flex-end;
		gap: 30px;
	}
</style>

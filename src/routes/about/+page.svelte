<script>
	import Footer from '$lib/Footer.svelte';
	import Navbar from '$lib/Navbar.svelte';
</script>

<div class="container">
	<div class="header primary-bg section">
		<a href="/"><img src="../images/logo.png" alt="The DDD South West logo" class="logo" /></a>
		<h1>About DDD South West</h1>
		<Navbar currentRoute={'/about'} />
		<!-- <i class="fa-solid fa-bars fa-2x" /> -->
	</div>

	<div class="secondary-bg section">
		<h2>What to expect</h2>
		<p>
			DDD South West is a free one day technical event organised by developers for developers. It is
			a day of learning, discussing, contributing and being part of the developer community in the
			South West. Our goal is to provide free technical education, the opportunity to mix with peers
			and to make and develop relationships in the .NET community.
		</p>
	</div>

	<div class="tertiary-bg section">
		<h2>Get involved</h2>
		<p>DDD South West is a community event and there are several ways you can get involved:</p>
		<ul>
			<li>Spread the word!</li>
			<li>Speak at our event</li>
			<li>Volunteer to help us on the day</li>
		</ul>
	</div>

	<div class="secondary-bg section team-section">
		<h2>Meet the team</h2>
		<p>
			DDD South West is brought to you by a small team of volunteers. Please feel free to get in
			touch with us if you have any questions or ideas.
		</p>

		<div class="team-container">
			<div class="member-container">
				<img src="../images/team/lorraine.jpg" alt="Lorraine Pearce" />
				<span>Lorraine Pearce</span>
				<span>
					<a href="https://twitter.com/LorrainePearce"
						><i class="fa-brands fa-twitter fa-2x" style="color: black;" /></a
					>
					<a href="mailto:lorrainepearce@dddsouthwest.com">
						<i class="fa-regular fa-envelope fa-2x" style="color: black;" />
					</a>
				</span>
			</div>
			<div class="member-container">
				<img src="../images/team/russ.jpg" alt="Russ Day" />
				<span>Russell Day</span>
				<span>
					<a href="mailto:russell.day@dddsouthwest.com">
						<i class="fa-regular fa-envelope fa-2x" style="color: black;" />
					</a>
				</span>
			</div>
			<div class="member-container">
				<img src="../images/team/stu.jpg" alt="Stuart Lang" />
				<span>Stuart Lang</span>
				<span>
					<a href="https://twitter.com/stuartblang"
						><i class="fa-brands fa-twitter fa-2x" style="color: black;" /></a
					><a href="mailto:stuartlang@dddsouthwest.com">
						<i class="fa-regular fa-envelope fa-2x" style="color: black;" />
					</a>
				</span>
			</div>
			<div class="member-container">
				<img src="../images/team/hannah.jpg" alt="Hannah Price" />
				<span>Hannah Price</span>
				<span>
					<a href="https://twitter.com/Handalf1994"
						><i class="fa-brands fa-twitter fa-2x" style="color: black;" /></a
					><a href="mailto:hannahprice@dddsouthwest.com">
						<i class="fa-regular fa-envelope fa-2x" style="color: black;" />
					</a>
				</span>
			</div>
			<div class="member-container">
				<img src="../images/team/profile_default.png" alt="Default profile" />
				<span>Joseph Woodward</span>
				<span>
					<a href="mailto:josephwoodward@dddsouthwest.com">
						<i class="fa-regular fa-envelope fa-2x" style="color: black;" />
					</a>
				</span>
			</div>
			<div class="member-container">
				<img src="../images/team/profile_default.png" alt="Default profile" />
				<span>Martyn Fewtrell</span>
				<span>
					<a href="mailto:martynfewtrell@dddsouthwest.com">
						<i class="fa-regular fa-envelope fa-2x" style="color: black;" />
					</a>
				</span>
			</div>
		</div>
	</div>

	<div class="quaternary-bg section tagline">
		<h2>By the community, for the community</h2>
	</div>

	<Footer />
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.header {
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	@media (min-width: 576px) {
		.header {
			justify-content: space-between;
			flex-direction: row;
		}
	}

	.logo {
		max-width: 300px;
	}

	.section {
		padding: 0px 20px;
	}

	@media (min-width: 768px) {
		.section {
			padding: 20px 150px;
		}
	}

	@media (min-width: 1400px) {
		.section {
			padding: 20px 25%;
		}

		p {
			font-size: 1.5rem;
		}
	}

	.team-container {
		display: flex;
		flex-wrap: wrap;
		gap: 30px;
		justify-content: center;
		margin: auto;
		padding: 20px 0px;
	}

	@media (min-width: 992px) {
		.team-container {
			width: 75%;
		}
	}

	.team-container img {
		border-radius: 50%;
		max-width: 150px;
	}

	.member-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 5px;
	}

	.tagline {
		text-align: center;
	}

	.team-section {
		flex-grow: 1;
	}
</style>

<script lang="ts">
	import CallToActions from '$lib/CallToActions.svelte';
	import Footer from '$lib/Footer.svelte';
	import Navbar from '$lib/Navbar.svelte';
	import type { KeyPoint } from '../../types/KeyPoint.type';

	let keyPoints: KeyPoint[] = [
		{
			title: 'Spread the word',
			icon: 'campaign',
			paragraph: `Sharing our tweets and LinkedIn posts will help us reach new attendees, speakers, and potential sponsors. Our event is funded solely on sponsorship so any sharing is appreciated by the team.`
		},
		{
			title: 'Speak at our event',
			icon: 'record_voice_over',
			paragraph: `We're looking for people to speak at our event! We aim to offer a broad range of talks in our schedule and we'd love to include topics such as mental health, neurodiversity, and inclusivity in tech. Lightning talk submissions are also very welcome.`
		},
		{
			title: 'Help us on the day',
			icon: 'volunteer_activism',
			paragraph: `With the increasing popularity of our event we may need extra help on the day. Keep an eye on our Twitter feed for volunteering opportunities.`
		}
	];
</script>

<div class="container">
	<div class="primary-bg">
		<div class="section header">
			<a href="/"><img src="../images/logo.png" alt="The DDD South West logo" class="logo" /></a>
			<h1>About DDD South West</h1>
			<Navbar currentRoute={'/about'} />
		</div>
	</div>

	<div class="secondary-bg">
		<div class="section">
			<h1>What to expect</h1>
			<p>
				DDD South West is a free one day technical event organised by developers for developers. It
				is a day of learning, discussing, contributing and being part of the developer community in
				the South West. Our goal is to provide free technical education, the opportunity to mix with
				peers and to make and develop relationships in the .NET community.
			</p>
		</div>
	</div>

	<div class="tertiary-bg">
		<div class="section">
			<h1>Get involved</h1>
			<p>DDD South West is a community event and there are several ways you can get involved:</p>
		</div>

		<CallToActions {keyPoints} />
	</div>

	<div class="secondary-bg">
		<div class="section team-section">
			<h1>Meet the team</h1>
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
	</div>

	<div class="quaternary-bg">
		<div class="section tagline">
			<h2>By the community, for the community</h2>
		</div>
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
		width: 90%;
		margin: auto;
	}

	@media (min-width: 768px) {
		.section {
			width: 70%;
		}
	}

	@media (min-width: 1800px) {
		.section {
			width: 50%;
		}
	}

	/* .section {
		padding: 0px 20px;
	}

	@media (min-width: 768px) {
		.section {
			padding: 20px 150px;
		}
	} */

	@media (min-width: 1400px) {
		/* .section {
			padding: 20px 25%;
		} */

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

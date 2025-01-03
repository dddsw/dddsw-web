<script lang="ts">
	import CallToActions from '$lib/CallToActions.svelte';
	import type { KeyPoint } from '../../types/KeyPoint.type';
	import { pageTitle } from '../../stores.js';

	let keyPoints: KeyPoint[] = [
		{
			title: 'Spread the word',
			icon: 'campaign',
			paragraph: `Sharing our social media posts will help us reach new attendees, speakers, and potential sponsors. Our event is funded solely on sponsorship so any sharing is appreciated by the team.`
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

	let teamMembers = [
		{
			name: 'Lorraine Pearce',
			imageName: 'lorraine.jpg',
			email: 'lorrainepearce@dddsouthwest.com',
			twitter: 'LorrainePearce',
			linkedIn: 'lorraine-pearce-688aba8'
		},
		{
			name: 'Russell Day',
			imageName: 'russ.jpg',
			email: 'russell.day@dddsouthwest.com',
			linkedIn: 'russellday'
		},
		{
			name: 'Stuart Lang',
			imageName: 'stu.jpg',
			email: 'stuartlang@dddsouthwest.com',
			twitter: 'stuartblang'
		},
		{
			name: 'Carl Sargunar',
			imageName: 'carl.jpg',
			email: 'carlsargunar@dddsouthwest.com',
			twitter: 'carlcod_es',
			bsky: 'carlcod.es',
			linkedIn: 'carl-sargunar-63b5814'
		},
		{
			name: 'Sara Gowen',
			imageName: 'sara.jpg',
			email: 'saragowen@dddsouthwest.com',
			linkedIn: 'sara-gowen-27404734'
		}
	];

	pageTitle.set('About DDD South West');
</script>

<div class="secondary-bg">
	<div class="section">
		<h1>What to expect</h1>
		<p>
			DDD South West is an annual free one day technical conference organised by developers for
			developers. It is a day of learning, discussing, contributing and being part of the developer
			community in the South West. Our goal is to provide free technical education, the opportunity
			to mix with peers and to make and develop relationships in the developer community.
		</p>
	</div>
</div>

<div class="tertiary-bg">
	<div class="section team-section">
		<h1>Meet the team</h1>
		<p>
			DDD South West is brought to you by a small team of volunteers. Please feel free to get in
			touch with us if you have any questions or ideas.
		</p>

		<div class="team-container">
			{#each teamMembers as member}
				<div class="member-container">
					<img src="../images/team/{member.imageName}" alt={member.name} class="boop-effect" />
					<span>{member.name}</span>
					<span>
						{#if member.bsky}
							<a href="https://bsky.app/profile/{member.bsky}" target="_blank">
								<i class="fa-brands fa-bluesky fa-2x icon" title="{member.name} BlueSky"></i>
							</a>
						{/if}
						{#if member.twitter}
							<a href="https://twitter.com/{member.twitter}" target="_blank">
								<i class="fa-brands fa-twitter fa-2x icon" title="{member.name} Twitter"></i>
							</a>
						{/if}
						{#if member.linkedIn}
							<a href="https://www.linkedin.com/in/{member.linkedIn}" target="_blank">
								<i class="fa-brands fa-linkedin fa-2x icon" title="{member.name} LinkedIn"></i>
							</a>
						{/if}
						<a href="mailto:{member.email}">
							<i class="fa-regular fa-envelope fa-2x icon" title="{member.name} email"></i>
						</a>
					</span>
				</div>
			{/each}
		</div>
	</div>
</div>

<div class="secondary-bg">
	<div class="section">
		<h1>Get involved</h1>
		<p>DDD South West is a community event and there are several ways you can get involved:</p>
	</div>

	<CallToActions {keyPoints} />
</div>

<style>
	.team-container {
		display: flex;
		flex-wrap: wrap;
		gap: 30px;
		justify-content: center;
		margin: auto;
		padding: 20px 0px;
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

	.team-section {
		flex-grow: 1;
	}

	.icon {
		color: black;
	}

	.icon:hover {
		color: var(--primary-color);
	}

	@media (min-width: 992px) {
		.team-container {
			width: 75%;
		}
	}
</style>

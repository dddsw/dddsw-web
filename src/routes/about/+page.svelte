<script lang="ts">
	import { pageTitle } from '../../stores.js';

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

<div>
	<div>
		<h2>What to expect</h2>
		<p>
			DDD South West is a free one day technical event organised by developers for developers. It is
			a day of learning, discussing, contributing and being part of the developer community in the
			South West. Our goal is to provide free technical education, the opportunity to mix with peers
			and to make and develop relationships in the developer community.
		</p>
	</div>
</div>

<div>
	<div>
		<h2>Meet the team</h2>
		<p>
			DDD South West is brought to you by a small team of volunteers. Please feel free to get in
			touch with us if you have any questions or ideas.
		</p>

		<div>
			{#each teamMembers as member}
				<div>
					<img src="../images/team/{member.imageName}" alt={member.name} />
					<span>{member.name}</span>
					<span>
						{#if member.twitter}
							<a href="https://twitter.com/{member.twitter}" target="_blank">
								<i class="fa-brands fa-twitter fa-2x icon" title="{member.name} Twitter" />
							</a>
						{/if}
						{#if member.linkedIn}
							<a href="https://www.linkedin.com/in/{member.linkedIn}" target="_blank">
								<i class="fa-brands fa-linkedin fa-2x icon" title="{member.name} LinkedIn" />
							</a>
						{/if}
						<a href="mailto:{member.email}">
							<i class="fa-regular fa-envelope fa-2x icon" title="{member.name} email" />
						</a>
					</span>
				</div>
			{/each}
		</div>
	</div>
</div>

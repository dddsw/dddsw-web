<script lang="ts">
	import { event, social } from '#lib/eventDetails.ts';
	import { preview } from '#lib/featured.svelte.ts';
	import { moreLinks, visibleNav } from '#lib/navigation.ts';
	import Container from './Container.svelte';
	import Cow from './Cow.svelte';
	import SocialIcon from './SocialIcon.svelte';

	const navItems = $derived(visibleNav(preview));

	// White icons on the dark footer, orange on hover.
	const footerLink = 'text-surface-50! hover:text-primary-400!';

	// The year the page is served, not the event year: the site is updated all year round.
	const copyrightYear = new Date().getFullYear();
</script>

<footer class="mt-24 bg-surface-950 text-surface-50">
	<Container class="grid gap-10 py-12 md:grid-cols-[1.5fr_1fr_1fr]">
		<div class="space-y-4">
			<Cow class="h-16 w-auto text-primary-500" />
			<p class="font-heading text-xl">{event.name}</p>
			<p class="max-w-sm text-surface-300">{event.tagline}. By the community, for the community.</p>
		</div>
		<nav aria-label="Footer" class="space-y-2">
			<h2 class="h6 text-primary-400">Explore</h2>
			<ul class="space-y-1">
				{#each navItems as item (item.href)}
					<li><a href={item.href} class="text-surface-50!">{item.label}</a></li>
				{/each}
			</ul>
		</nav>
		<nav aria-label="More" class="space-y-2">
			<h2 class="h6 text-primary-400">More</h2>
			<ul class="space-y-1">
				{#each moreLinks as item (item.href)}
					<li><a href={item.href} class="text-surface-50!">{item.label}</a></li>
				{/each}
			</ul>
			<h2 class="pt-3 h6 text-primary-400">Find us</h2>
			<ul class="flex items-center gap-4">
				<li>
					<SocialIcon
						name="bluesky"
						href={social.bluesky}
						label="{event.shortName} on Bluesky"
						class={footerLink}
						iconClass="size-7" />
				</li>
				<li>
					<SocialIcon
						name="linkedin"
						href={social.linkedIn}
						label="{event.shortName} on LinkedIn"
						class={footerLink}
						iconClass="size-7" />
				</li>
				<li>
					<SocialIcon
						name="email"
						href="mailto:{event.contactEmail}"
						label="Email {event.contactEmail}"
						class={footerLink}
						iconClass="size-7" />
				</li>
			</ul>
		</nav>
	</Container>
	<p class="border-t border-surface-800 px-4 py-4 text-center text-sm text-surface-400">
		&copy; {copyrightYear}
		{event.shortName}. An inclusive, non-profit, volunteer-run conference. No cows were harmed in
		the making of this website.
	</p>
</footer>

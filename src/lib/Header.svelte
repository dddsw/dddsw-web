<script lang="ts">
	import { page } from '$app/stores';

	import { AppBar, LightSwitch } from '@skeletonlabs/skeleton';

	import { House } from 'lucide-svelte';
	//https://lucide.dev/icons/

	$: classesActive = (href: string) =>
		href === $page.url.pathname ? 'variant-filled-secondary' : '';
</script>

<!-- 
<header class="sticky top-0 z-10 bg-primary-500 backdrop-blur-sm p-4">
	<div class="flex flex-row gap-5">

		<a href="/" class="w-2/5">
			<img src="../images/logo.png" alt="The DDD South West logo" class="logo" />
		</a>
	<h1 class="h1 w-2/5 grow">{$pageTitle}</h1>
	<LightSwitch  class="self-end"/>

	</div>
</header> -->
<AppBar
	background="bg-primary-500"
	gridColumns="grid-cols-3"
	slotDefault="place-self-center"
	slotTrail="place-content-end">
	<svelte:fragment slot="lead"
		><a href="/" class="w-2/5">
			<img src="../images/logo.png" alt="The DDD South West logo" class="logo" />
		</a></svelte:fragment>
	<h1 class="h1 text-secondary-500">{$page.data.title}</h1>
	<svelte:fragment slot="headline">
		<nav class="list-nav flex flex-row justify-end gap-5">
			<a href="/" class="{classesActive('page')} variant-filled gap-2">
				<House />
				Home
			</a>
			<a href="/about" class="{classesActive('about')} variant-filled"> About </a>
		</nav></svelte:fragment>
	<svelte:fragment slot="trail"><LightSwitch /></svelte:fragment>
</AppBar>

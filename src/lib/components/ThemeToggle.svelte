<script lang="ts">
	import { flushSync, onMount } from 'svelte';
	import { themeTransition } from '#lib/viewTransitions.ts';
	import { Switch } from '@skeletonlabs/skeleton-svelte';

	let dark = $state(false);
	let wrapper: HTMLElement | undefined = $state();

	onMount(() => {
		dark = document.documentElement.classList.contains('dark');
	});

	function setDark(next: boolean) {
		themeTransition(wrapper?.querySelector('[data-part="control"]') ?? null, () => {
			flushSync(() => (dark = next));
			document.documentElement.classList.toggle('dark', next);
		});
		try {
			localStorage.setItem('mode', next ? 'dark' : 'light');
		} catch {
			// Storage can be unavailable (private mode); the switch still works for this visit.
		}
	}
</script>

<span bind:this={wrapper} class="inline-flex">
	<Switch checked={dark} onCheckedChange={(details) => setDark(details.checked)}>
		<Switch.Control
			class="cursor-pointer transition data-[state=checked]:hover:preset-filled-surface-500 data-[state=unchecked]:hover:preset-filled-primary-500">
			<Switch.Thumb>
				<span aria-hidden="true" class="text-xs leading-none">{dark ? '🌙' : '☀️'}</span>
			</Switch.Thumb>
		</Switch.Control>
		<Switch.Label class="sr-only">Dark mode</Switch.Label>
		<Switch.HiddenInput />
	</Switch>
</span>

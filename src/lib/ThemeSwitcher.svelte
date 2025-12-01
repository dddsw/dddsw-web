<script lang="ts">
	import { browser } from '$app/environment';

	let prefersDarkMode = $derived.by(() => {
		if (browser) {
			const match = window.matchMedia('(prefers-color-scheme: dark)');
			return match.matches;
		}
		return false;
	});

	let isDarkMode = $derived.by(() => {
		if (browser) {
			if (prefersDarkMode) return true;

			const storedPreference = localStorage.getItem('isdark');
			if (storedPreference !== null) return JSON.parse(storedPreference);

			return false;
		}
	});

	$effect(() => {
		if (browser && !prefersDarkMode) localStorage.setItem('isdark', JSON.stringify(isDarkMode));
	});
</script>

<label class={[prefersDarkMode && 'hidden', 'toggle text-base-content']}>
	<input
		type="checkbox"
		value="dark"
		class="theme-controller"
		role="switch"
		bind:checked={isDarkMode} />

	<svg aria-label="light mode" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
		><g
			stroke-linejoin="round"
			stroke-linecap="round"
			stroke-width="2"
			fill="none"
			stroke="currentColor"
			><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path
			><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path
				d="M2 12h2"></path
			><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path
				d="m19.07 4.93-1.41 1.41"></path
			></g
		></svg>

	<svg aria-label="dark mode" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
		><g
			stroke-linejoin="round"
			stroke-linecap="round"
			stroke-width="2"
			fill="none"
			stroke="currentColor"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></g
		></svg>
</label>

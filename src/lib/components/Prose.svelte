<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<!-- A readable line length for long-form text (left-aligned within the standard container). -->
<div class="max-w-3xl space-y-5 [&_h2]:pt-6 [&_h3]:pt-4">
	{@render children()}
</div>

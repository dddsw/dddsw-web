<script lang="ts">
	import type { Snippet } from 'svelte';

	let { class: className, children }: { class?: string; children?: Snippet } = $props();
</script>

<!--
	The one place that defines the site's standard content width and side padding. The header,
	footer, page banners and every page use this, so changing the width here changes it everywhere.
-->
<div class={['mx-auto max-w-6xl px-4', className]}>
	{@render children?.()}
</div>

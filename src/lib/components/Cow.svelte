<script lang="ts">
	import type { SVGAttributes } from 'svelte/elements';
	import { cowPath, cowViewBox } from '#lib/cow.ts';

	let { title, ...rest }: SVGAttributes<SVGSVGElement> & { title?: string } = $props();
</script>

<svg
	viewBox={cowViewBox}
	xmlns="http://www.w3.org/2000/svg"
	fill="currentColor"
	role={title ? 'img' : undefined}
	aria-hidden={title ? undefined : 'true'}
	aria-label={title}
	{...rest}>
	<path d={cowPath} />
</svg>

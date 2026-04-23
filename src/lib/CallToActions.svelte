<script lang="ts">
	import type { KeyPoint } from '../types/KeyPoint.type';
	interface Props {
		keyPoints: KeyPoint[];
	}

	let { keyPoints }: Props = $props();
</script>

<div
	class="mx-auto grid w-[90%] grid-cols-1 gap-8 py-10 sm:grid-cols-3 md:w-[70%] min-[1800px]:w-1/2">
	{#each keyPoints as keyPoint}
		<div class="flex flex-col gap-3">
			<span class="material-symbols-outlined text-[2.5rem] text-[var(--primary-color)]">
				{keyPoint.icon}
			</span>
			<h2 class="m-0 text-xl font-semibold">{keyPoint.title}</h2>
			<p class="m-0 leading-relaxed">{@html keyPoint.paragraph}</p>
		</div>
	{/each}
</div>

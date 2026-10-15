<script lang="ts">
	import { principles } from '$lib/content/principles';
</script>

<section aria-labelledby="ddd-way" class="space-y-6">
	<div class="max-w-3xl space-y-3">
		<h2 id="ddd-way" class="h2">The DDD way</h2>
		<p>
			Since the first Developer! Developer! Developer! day in Reading in 2005, DDD conferences have
			been organised by software developers, for software developers, and built on a few simple
			principles.
		</p>
	</div>
	<ul class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
		{#each principles as p (p.title)}
			<li class="space-y-2 card tint-orange p-6">
				<span class="text-4xl" aria-hidden="true">{p.emoji}</span>
				<h3 class="h5">{p.title}</h3>
				<p>{p.body}</p>
			</li>
		{/each}
	</ul>
</section>

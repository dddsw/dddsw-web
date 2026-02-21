<script lang="ts">
	let { title, paragraph, icon, iconOnRight = false } = $props();
</script>

<div
	class="card card-side bg-base-100 card-border md:w-2/3 border-primary"
	class:flex-row-reverse={!iconOnRight}
	class:self-end={iconOnRight}>
	<div class="card-body w-2/3">
		<h2 class="card-title">{title}</h2>
		<p>
			{@render paragraph()}
		</p>
	</div>
	<figure class="place-self-center" class:mr-4={iconOnRight} class:ml-4={!iconOnRight}>
		{@render icon()}
	</figure>
</div>

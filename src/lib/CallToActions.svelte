<script lang="ts">
	let { children } = $props();
</script>

<div class="flex flex-col gap-4 my-4">
	{@render children()}
</div>

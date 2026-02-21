<script lang="ts">
	let { iconName } = $props();
</script>

<span class="material-symbols-outlined icon">{iconName}</span>

<style>
	.icon {
		font-size: var(--size, 125px);
	}
</style>

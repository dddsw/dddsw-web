<script lang="ts">
	export let isHomepage: boolean;
</script>

<footer class="container">
	{#if !isHomepage}
		<div class="quaternary-bg">
			<div class="text-center">
				<h2>By the community, for the community</h2>
			</div>
		</div>
	{/if}
	<div class="footer primary-bg">
		<a href="https://twitter.com/dddsouthwest" target="_blank">
			<i class="fa-brands fa-twitter fa-3x" title="DDD South West Twitter" />
		</a>
		<a href="https://www.linkedin.com/company/ddd-south-west/" target="_blank">
			<i class="fa-brands fa-linkedin fa-3x" title="DDD South West LinkedIn" />
		</a>
	</div>
</footer>

<style>
	.footer {
		padding: 30px;
		display: flex;
		justify-content: flex-end;
		gap: 30px;
	}

	.fa-brands {
		color: black;
	}

	.fa-brands:hover {
		color: white;
	}

	h2 {
		padding: 0 10px;
	}
</style>

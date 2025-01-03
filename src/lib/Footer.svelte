<script lang="ts">
	interface Props {
		isHomepage: boolean;
	}

	let { isHomepage }: Props = $props();
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
		<div class="footer-content">
			<div class="footer-left">
				<p>&copy; 2024 DDD South West | <a href="/privacy-policy">Privacy Policy</a></p>
			</div>
			<div class="footer-right">
				<a href="https://bsky.app/profile/dddsouthwest.bsky.social" target="_blank">
					<i class="fa-brands fa-bluesky fa-3x" title="DDD South West BlueSky"></i>
				</a>
				<a href="https://twitter.com/dddsouthwest" target="_blank">
					<i class="fa-brands fa-twitter fa-3x" title="DDD South West Twitter"></i>
				</a>
				<a href="mailto:management@dddsouthwest.com">
					<i class="fa-solid fa-envelope fa-3x icon" title="DDD South West Email"></i>
				</a>
				<a href="https://www.linkedin.com/company/ddd-south-west/" target="_blank">
					<i class="fa-brands fa-linkedin fa-3x" title="DDD South West LinkedIn"></i>
				</a>
			</div>
		</div>
	</div>
</footer>

<style>
	.footer {
		padding: 30px;
	}

	.footer-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 30px;
		flex-wrap: wrap; /* Allow wrapping */
	}

	.footer-left {
		display: flex;
		align-items: center;
		gap: 10px;
		text-align: left;
		order: 1; /* Ensure it stays on the left in desktop view */
	}

	.footer-right {
		display: flex;
		gap: 30px;
		justify-content: flex-end; /* Align icons to the right */
		order: 2; /* Ensure it stays on the right in desktop view */
	}

	.fa-brands {
		color: black;
	}

	.fa-brands:hover {
		color: white;
	}

	.icon {
		color: black;
		transition: color 0.3s;
	}

	.icon:hover {
		color: white;
	}

	h2 {
		padding: 0 10px;
	}

	/* Media query for mobile screens */
	@media screen and (max-width: 768px) {
		.footer-content {
			flex-direction: column; /* Stack the items vertically */
			align-items: center;
		}
		.footer-left {
			order: 2; /* Place below the social icons on mobile */
			text-align: center;
			margin-top: 20px;
		}
		.footer-right {
			order: 1; /* Place above the message on mobile */
			justify-content: center;
			margin-bottom: 20px;
		}
	}
</style>

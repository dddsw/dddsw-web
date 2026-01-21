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
				<p>
					&copy; {new Date().getFullYear()} DDD South West |
					<a href="/privacy-policy">Privacy Policy</a>
				</p>
			</div>
			<div class="footer-right">
				<a href="https://bsky.app/profile/dddsouthwest.com" target="_blank">
					<i class="fa-brands fa-bluesky fa-3x" title="DDD South West BlueSky"></i>
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

		& a:link,
		& a:visited {
			/* This isn't a normal link colour because the colour is inaccessible against the 
			 * primary orange background. We have to use an underline to indicate that this
			 * is a link because the contrast between the link text and the standard black text is poor
			 * https://webaim.org/resources/linkcontrastchecker/?fcolor=FF9930&bcolor=8AE8FF */
			color: #0000e3;
			text-decoration: underline;
		}
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
		.footer {
			padding: 15px;
		}

		.footer-content {
			flex-direction: column; /* Stack the items vertically */
			align-items: center;
			gap: 10px;
		}
		.footer-left {
			order: 2; /* Place below the social icons on mobile */
			text-align: center;
		}
		.footer-left p {
			margin: 0px;
		}
		.footer-right {
			order: 1; /* Place above the message on mobile */
			justify-content: center;
		}
	}
</style>

<script lang="ts">
	import { page } from '$app/stores';
	import '../app.css';
	import Navbar from '../components/layout/Navbar.svelte';
</script>

<svelte:head>
	<title>{$page.data.title}</title>
</svelte:head>

<header>
	<a href="/">
		<img src="../images/logo.png" alt="The DDD South West logo" />
	</a>
	<Navbar />
	<h1 class="text-3xl font-bold underline">{$page.data.title}</h1>
</header>

<main class="prose">
	<slot />
</main>

<footer>
	<div>
		<div>
			<h2>By the community, for the community</h2>
		</div>
	</div>
	<div>
		<a href="https://twitter.com/dddsouthwest" target="_blank">
			<i class="fa-brands fa-twitter fa-3x" title="DDD South West Twitter" />
		</a>
		<a href="https://www.linkedin.com/company/ddd-south-west/" target="_blank">
			<i class="fa-brands fa-linkedin fa-3x" title="DDD South West LinkedIn" />
		</a>
	</div>
</footer>

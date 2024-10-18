<script lang="ts">
	import { page } from '$app/stores';
	import Navbar from '$lib/Navbar.svelte';
</script>

<header>
	<div>
		<div>
			<a href="/">
				<img src="../images/logo.png" alt="The DDD South West logo" />
			</a>
			<h1>{$page.data.title}</h1>
			<Navbar />
		</div>
	</div>
</header>

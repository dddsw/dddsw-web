<nav>
	<div class="nav-buttons">
		<a href="/">Home</a>
	</div>
	<!-- <div class="nav-buttons">
		<a href="/about">About</a>
	</div>
	<div class="nav-buttons">
		<a href="/sponsors">DDDSW 2023</a>
	</div> -->
</nav>

<style>
	nav {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 5px;
		margin: 20px;
	}

	@media (min-width: 400px) {
		nav {
			flex-direction: row;
			justify-content: flex-end;
			gap: 20px;
			margin: 50px;
		}
	}

	nav a {
		color: white;
		text-decoration: none;
	}

	.nav-buttons {
		background-color: rgb(0 0 0 / 70%);
		box-shadow: 0px 0px 20px 5px rgb(0 0 0 / 70%);
		border-radius: 20px;
		padding: 5px 10px;
	}
</style>

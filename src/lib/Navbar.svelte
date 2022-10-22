<nav>
	<div class="nav-button">
		<a href="/about">About</a>
	</div>
	<!-- <div class="nav-buttons">
		<a href="/sponsors">DDDSW 2023</a>
	</div>  -->
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

	@media (min-width: 768px) {
		nav a {
			font-size: 1.5rem;
		}
	}

	.nav-button {
		background-color: rgb(0 0 0 / 70%);
		box-shadow: 0px 0px 20px 5px rgb(0 0 0 / 70%);
		border-radius: 20px;
		padding: 5px 10px;
	}

	.nav-button:hover {
		background-color: white;
	}

	.nav-button:hover a {
		color: black;
	}
</style>

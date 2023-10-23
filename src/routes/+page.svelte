<script lang="ts">
	import type { UserQueryData } from "$lib/api";
	import { getUser } from "$lib/api";
	import { onMount } from "svelte";

	let isLoading = false;
	let userLoggedIn = false;
	let user: UserQueryData | null = null;
	onMount(async () => {
		const token = localStorage.getItem("token");
		if (!token) {
			return;
		}

		isLoading = true;
		user = await getUser(token);
		isLoading = false;
		if (!user) {
			localStorage.removeItem("token");
			return;
		}

		userLoggedIn = true;
	});

	function disconnect() {
		localStorage.removeItem("token");
		userLoggedIn = false;
		user = null;
	}
</script>

<div class="container">
	<div class="header">
		<h2><span class="title">Anemy</span>.fr</h2>
	</div>
	<div class="bd">
		{#if userLoggedIn}
			<div class="user-display">
				<div>
					<h2>{user?.Me.username}: {user?.Me.id}</h2>
					<img alt="avatar" src={user?.Me.avatar} />
					<button on:click={disconnect}>Disconnect</button>
				</div>
			</div>
		{:else if isLoading}
			<div class="login-form">
				<svg width="50" height="50" viewBox="0 0 50 50">
					<circle cx="25" cy="25" r="20" stroke="black" stroke-width="5" fill="none">
						<animate
							attributeName="stroke-dasharray"
							from="1,150"
							to="150,1"
							dur="1s"
							repeatCount="indefinite"
						/>
					</circle>
				</svg>
			</div>
		{:else}
			<div class="login-form">
				<div>
					<a href="https://anemy.fr/oauth/authorize.php?client_id=4&response_type=token">
						<button class="button">Login</button>
					</a>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	:global(html, body) {
		height: 100%;
		width: 100%;
		margin: 0;
	}

	h2 {
		margin: 0;
	}

	:global(body) {
		color: white;
		background-color: #1a1b1e;
	}

	.container {
		display: flex;
		flex-direction: column;
		height: 100vh; /* 100% of the viewport height */
	}

	.header {
		flex: 0;
	}

	.bd {
		flex: 1;
	}

	.title {
		color: #e2780e;
	}

	.login-form {
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.button {
		color: rgba(255, 255, 255, 0.85);
		font-size: 18px;
		height: 50px;
		width: 120px;
		border-radius: 5px;
		background-color: #df8022;
		border: none;
	}

	.button:hover {
		cursor: pointer;
	}

	.user-display {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}
</style>

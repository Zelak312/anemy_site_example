<script lang="ts">
	import { onMount } from "svelte";

	onMount(async () => {
		const params = new URLSearchParams(document.location.search);
		const accesToken = params.get("access_token");

		if (accesToken == null) {
			return (window.location.href = "/");
		}

		// test the access token
		localStorage.setItem("token", accesToken);
		window.location.href = "/";
	});
</script>

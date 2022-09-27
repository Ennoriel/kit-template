<script lang="ts">
	export let size: "s" | "m" = "m"
	export let bg = true;
</script>

<a href="/" on:click class="favicon">
	<img src="/svg/favicon-{size}.svg?bg={bg}" aria-hidden="true" alt="" />
</a>

<style>
	a {
		border-radius: 8px;

		display: flex;
		align-items: center;
		height: 60px;
		margin: 0 8px 0 -8px;
		padding: 0 8px;
	}

	a:focus-visible {
		outline-offset: -4px;
	}

	img {
		height: 48px;
		margin: auto;
	}
</style>

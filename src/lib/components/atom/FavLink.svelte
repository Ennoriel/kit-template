<script lang="ts">
	import { primaryColor } from '$lib/components/configuration/store';
	import Fav from '../svg/logo/Fav.svelte';

	export let size: 's' | 'm' = 'm';
</script>

<a href="/" on:click class="favicon">
	<Fav maxheight={50} {size} color={$primaryColor} />
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
</style>

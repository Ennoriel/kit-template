<script lang="ts">
	import { locale } from '$i18n/i18n-svelte';
	import Fav from '../svg/logo/Fav.svelte';

	export let size: 's' | 'm' = 'm';
	export let bg = false;
</script>

<a href="/{$locale}" on:click class="favicon">
	<Fav maxheight={50} {size} {bg} />
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

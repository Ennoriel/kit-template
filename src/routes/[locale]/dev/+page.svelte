<script lang="ts">
	import { locale } from '$i18n/i18n-svelte';
</script>

<a href="/{$locale}/dev/favicon">Favicon</a>
<a href="/{$locale}/dev/img">Images</a>
<a href="/{$locale}/dev/lucide">Lucide</a>
<a href="/{$locale}/dev/svg">Svg</a>

<style>
	a {
		display: block;
	}
</style>

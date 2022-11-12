<script>
	import { Seo } from 'chyme-svelte';
	import LL from '$i18n/i18n-svelte';
	import { locales } from '$i18n/i18n-util';
</script>

<Seo title={$LL.global_seo_title()} description={$LL.global_seo_description()} {locales} />

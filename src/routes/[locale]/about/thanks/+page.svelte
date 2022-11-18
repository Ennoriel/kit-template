<script>
	import Numbers from '$lib/components/landing-page/Numbers.svelte';
	import Text from '$lib/components/landing-page/Text.svelte';
	import Svelte from '$lib/components/svg/logo/Svelte.svelte';
	import LL from '$i18n/i18n-svelte';
	import Lucide from '$lib/components/svg/logo/Lucide.svelte';
	import UnDraw from '$lib/components/svg/logo/UnDraw.svelte';
</script>

<Text title={$LL.about_thanks_title()} theme="transparent" />

<Numbers
	data={[
		{ compo: Svelte, number: 'Svelte', description: $LL.about_thanks_svelte() },
		{ compo: UnDraw, number: 'unDraw', description: $LL.about_thanks_undraw() },
		{ compo: Lucide, number: 'Lucide', description: $LL.about_thanks_lucide() }
	]}
	maxItemSm={1}
	maxItemLg={3}
	theme="transparent"
/>


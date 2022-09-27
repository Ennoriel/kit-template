<script lang="ts">
    import type { LayoutData } from './$types';

    export let data: LayoutData;
    
	import ResponsiveWrapper from '$lib/components/layout/ResponsiveWrapper.svelte';
	import MenuMobile from '$lib/components/layout/MenuMobile.svelte';
	import Menu from '$lib/components/layout/Menu.svelte';
	
	import 'chyme/css/reset.css';
	import 'chyme/css/tokens.css';
	import 'chyme/css/scroll.css';
	import 'chyme/css/a11y.css';
	import 'chyme/css/code.css';

	import '$lib/css/theme.css';
	import '$lib/css/input.css';
	import '$lib/css/font.css';
</script>

<ResponsiveWrapper>
	<MenuMobile slot="s" session={data.user} />
	<Menu slot="l" session={data.user} />
</ResponsiveWrapper>

<main>
	<slot/>
</main>

<style>
	main {
		min-height: calc(100vh - var(--header-height));
	}
</style>
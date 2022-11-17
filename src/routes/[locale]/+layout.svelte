<script lang="ts">
	import { primaryColor } from '$lib/components/configuration/store';
	import ConfigurationPanel from '$lib/components/configuration/ConfigurationPanel.svelte';
	import Menu from '$lib/components/layout/Menu.svelte';
	import type { UserF } from '$lib/types/user.type';
	import type { LayoutData } from './$types';
	import { browser } from '$app/environment';

	export let data: LayoutData & { user: UserF };

	import 'chyme/css/reset.css';
	import 'chyme/css/tokens.css';
	import 'chyme/css/scroll.css';
	import 'chyme/css/a11y.css';
	import 'chyme/css/code.css';

	import '$lib/css/theme.css';
	import '$lib/css/input.css';
	import '$lib/css/font.css';

	$: if ($primaryColor && browser) {
		const link: HTMLLinkElement =
			document.querySelector("link[rel*='icon']") || document.createElement('link');
		link.href = `/svg/favicon-s.svg?color=%23${$primaryColor.slice(1, 7)}`;
		document.getElementsByTagName('head')[0].appendChild(link);
	}
</script>

<Menu session={data.user} />

<main id="content">
	<slot />
</main>

<ConfigurationPanel />

<style>
	main {
		min-height: calc(100vh - var(--header-height) - var(--subheader-height, 0px));
		max-width: 896px;
		margin: auto;
		padding: 32px 0;

		--color: var(--primary-color);
	}
</style>

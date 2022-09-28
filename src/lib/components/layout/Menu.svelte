<script lang="ts">
	import type { UserF } from '$lib/types/user.type';
	import { ResponsiveWrapper } from 'chyme-svelte';
	import MenuDesktop from './MenuDesktop.svelte';
	import MenuMobile from './MenuMobile.svelte';

	export let session: UserF | undefined = undefined;
</script>

<ResponsiveWrapper>
	<MenuMobile slot="s" {session} />
	<MenuDesktop slot="l" {session} />
</ResponsiveWrapper>

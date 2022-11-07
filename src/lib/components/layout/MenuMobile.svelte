<script lang="ts">
	import { fly } from 'svelte/transition';
	import { isOpen } from '$lib/store';
	import {
		display,
		getActiveRoute,
		getRouteLabel,
		getRouteUrl,
		guard,
		ROUTES
	} from '$lib/data/routes';
	import { page } from '$app/stores';
	import { XOrMenu } from 'chyme-svelte';
	import Fav from '$lib/components/svg/logo/Fav.svelte';
	import FavLink from '$lib/components/atom/FavLink.svelte';
	import type { UserF } from '$lib/types/user.type';
	import { locale } from '$i18n/i18n-svelte';

	export let session: UserF | undefined = undefined;

	let burgerMenu: HTMLDivElement;

	function click({ target }: MouseEvent) {
		if ($isOpen && !burgerMenu.contains(target as Node)) $isOpen = false;
	}

	$: displayedRoutes = display(guard(ROUTES, session), { mobile: true });
	$: activeRoute = getActiveRoute($page.url.pathname + $page.url.search, displayedRoutes);
</script>

<svelte:window on:click={click} />

<nav>
	<span id="menu-bar">
		<FavLink />
		<button class="open-menu" on:click|stopPropagation={() => ($isOpen = !$isOpen)}>
			<XOrMenu visible={!$isOpen} />
		</button>
	</span>

	{#if $isOpen}
		<div class="menu" transition:fly={{ x: -200, duration: 400 }}>
			<Fav bg={false} on:click={() => ($isOpen = false)} />
			{#each displayedRoutes as route}
				{#if 'spacer' in route}
					<hr />
				{:else if route.action}
					<form method="post" action={getRouteUrl($locale, route)}>
						<button type="submit">
							{getRouteLabel(route, session)}
						</button>
					</form>
				{:else}
					{@const active = activeRoute?.route === route.route}
					<a
						data-sveltekit-prefetch={route.prefetch ? '' : 'off'}
						on:click={() => ($isOpen = false)}
						href={getRouteUrl($locale, route)}
						class:active
						aria-current={(active && 'page') || undefined}
					>
						{#if active}
							&gt;
						{/if}
						{getRouteLabel(route, session)}
					</a>
					{#if route.subRoutes}
						<div class="sub-menu">
							{#each route.subRoutes as subRoute}
								{@const active = $page.url.pathname.indexOf(subRoute.route) >= 0}
								<a
									data-sveltekit-prefetch
									on:click={() => ($isOpen = false)}
									href={subRoute.route}
									class:active
									aria-current={(active && 'page') || undefined}
								>
									{#if active}
										&gt;
									{/if}
									{getRouteLabel(subRoute, session)}
								</a>
							{/each}
						</div>
					{/if}
				{/if}
			{/each}
		</div>
	{/if}
</nav>

<style>
	nav {
		height: var(--header-height);
		font-size: 14px;
		color: white;
	}

	#menu-bar {
		height: var(--header-height);
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;

		padding: 0 10px;
		box-sizing: border-box;
		background-color: var(--primary-color);

		z-index: 1002;
	}

	button.open-menu {
		height: calc(var(--header-height) - 25px);
		width: calc(var(--header-height) - 25px);
		border-radius: calc((var(--header-height) - 25px) / 2);
		border: none;
		background-color: var(--primary-color);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0;

		color: white;
	}

	#menu-bar :focus-visible {
		outline: 2px solid white;
		outline-offset: 2px;
	}

	.menu {
		position: absolute;
		top: 0;
		width: 200px;
		height: 100vh;
		box-sizing: border-box;
		left: 0;
		z-index: 1001;
		background-color: white;
		color: var(--primary-color);
		box-shadow: 5px 0 20px -5px #333;
		margin: 0;
		padding: 16px 32px;
		list-style: none;
		font-size: 16px;
	}

	.menu :global(.favicon) {
		margin: 0 -16px;
	}

	.menu hr {
		margin: 16px 96px 16px 0;
		border: none;
		border-bottom: 0.1px solid var(--primary-color);
	}

	.menu a,
	.menu button {
		display: block;
		text-decoration: none;
		border: none;
		background: none;
		color: inherit;
		transition: padding-left 0.4s;
		line-height: 2rem;
	}

	.menu a.active {
		cursor: default;
	}

	.menu a:not(.active):hover,
	.menu a:focus-visible,
	.menu button:not(.active):hover,
	.menu button:focus-visible {
		padding-left: 8px;
	}

	.menu a:focus-visible {
		outline: 2px solid var(--focus-color);
		outline-offset: 2px;
		border-radius: 4px;
	}

	.sub-menu {
		margin-left: 16px;
		font-size: 14px;
		line-height: 1.75em;
	}
</style>

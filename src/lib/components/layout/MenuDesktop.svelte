<script lang="ts">
	import {
		display,
		getActiveRoute,
		getRouteLabel,
		getRouteUrl,
		guard,
		ROUTES
	} from '$lib/data/routes';
	import { Languages, FormAction } from 'chyme-svelte';
	import { page } from '$app/stores';
	import FavLink from '$lib/components/atom/FavLink.svelte';
	import type { UserF } from '$lib/types/user.type';
	import { locale } from '$i18n/i18n-svelte';
	import { locales } from '$i18n/i18n-util';
	import { slide } from 'svelte/transition';
	import { languages } from '$i18n/i18n-store';
	import { browser } from '$app/environment';

	export let session: UserF | undefined = undefined;

	let showLanguage = false;
	let pathname: string;

	$: displayedRoutes = display(guard($ROUTES, session), { mobile: false });
	$: activeRoute = getActiveRoute($page.url.pathname + $page.url.search, displayedRoutes);
	$: {
		const [, , ...u] = $page.url.pathname.split('/');
		pathname = '/' + u.join('/');
	}
	$: if (browser)
		window.document.documentElement.style.setProperty(
			'--subheader-height',
			showLanguage ? '40px' : '0px'
		);
</script>

<nav>
	<span class="menu">
		<FavLink />
		{#each displayedRoutes as route}
			{#if 'spacer' in route}
				<span style:flex-grow="1" />
			{:else if route.action}
				<FormAction action={getRouteUrl($locale, route)}>
					{getRouteLabel(route, session)}
				</FormAction>
			{:else}
				{@const active = activeRoute?.route === route.route}
				<a
					data-sveltekit-prefetch={route.prefetch ? '' : 'off'}
					href={getRouteUrl($locale, route)}
					class={route.class}
					class:active
					aria-current={(active && 'page') || undefined}
				>
					<span>
						{getRouteLabel(route, session)}
					</span>
				</a>
			{/if}
		{/each}
		<a
			href="/{$locale}/languages"
			on:click|preventDefault={() => {
				showLanguage = !showLanguage;
				return false;
			}}
			style:padding="18px 12px"
			style:line-height="24px"
		>
			<Languages strokeWidth={1} />
		</a>
	</span>
	{#if showLanguage}
		<span class="sub-menu" style:justify-content="end" in:slide>
			{#each locales as language}
				{@const active = language === $locale}
				<a
					href="/{language}{pathname}"
					aria-current={active || undefined}
					class:active
					on:click={() => (showLanguage = false)}
				>
					<span>
						{languages[language]}
					</span>
				</a>
			{/each}
		</span>
	{/if}
	{#if activeRoute?.subRoutes}
		{@const activeSubRoute = getActiveRoute(
			$page.url.pathname + $page.url.search,
			activeRoute.subRoutes
		)}
		<span class="sub-menu">
			{#each activeRoute.subRoutes as route}
				{@const active = activeSubRoute?.route === route.route}
				<a
					data-sveltekit-prefetch={route.prefetch ? '' : 'off'}
					href={route.route}
					class:active
					aria-current={(active && 'page') || undefined}
				>
					<span>
						{getRouteLabel(route, session)}
					</span>
				</a>
			{/each}
		</span>
	{/if}
</nav>

<style>
	nav {
		color: white;
	}

	.menu,
	.sub-menu {
		width: 100%;
		padding: 0 10px;
		box-sizing: border-box;
		--focus-color: white;

		margin: 0;
		list-style: none;

		display: flex;
		align-items: stretch;
	}

	.menu {
		height: var(--header-height);
		background-color: var(--primary-color);
	}

	.sub-menu {
		height: 40px;
		background-color: var(--secondary-color);
	}

	a,
	.menu :global(form) {
		font-size: 16px;
		line-height: var(--header-height);
		font-weight: 300;

		transition: color 0.2s;
		color: white;
		text-decoration: none;

		padding: 0 16px;
		border-radius: 8px;
	}

	.sub-menu a {
		line-height: 40px;
	}

	.menu :global(form) {
		padding: 0;
	}

	.menu :global(button[type='submit']) {
		color: white;
		background: none;
		border: none;
		font-weight: 300;
		transition: color 0.2s;
		line-height: var(--header-height);
		padding: 0 16px;
		border-radius: 8px;
		outline-offset: -4px;
	}

	.menu :global(button[type='submit']):hover {
		color: var(--secondary-color);
	}

	.button {
		background: none;
		border: none;
		padding: 0 8px;
	}

	.button span {
		border: 1px solid white;
		height: 32px;
		line-height: 32px;
		margin: calc(var(--header-height) / 2 - 16px) 0;
		display: block;
		padding: 0 12px;
		border-radius: 16px;
		transition: border-color 0.2s;
	}

	.a11y-link {
		opacity: 0;
		pointer-events: none;
	}

	.a11y-link:focus-visible {
		opacity: 1;
	}

	.active {
		cursor: default;
	}

	.menu :not(.button).active span {
		border-bottom: 1.5px solid var(--secondary-color);
		padding: 4px 0;
	}

	.menu .button.active span {
		border-color: var(--secondary-color);
	}

	.sub-menu .active span {
		border-bottom: 2px solid white;
		padding: 2px 0;
	}

	.menu a:not(.active):hover {
		color: var(--secondary-color);
	}

	.menu a.button:not(.active):hover span {
		border-color: var(--secondary-color);
	}

	:focus-visible {
		outline-offset: -4px;
	}
</style>

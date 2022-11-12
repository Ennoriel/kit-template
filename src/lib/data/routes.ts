import type { Locales } from '$i18n/i18n-types';
import { locales } from '$i18n/i18n-util';
import type { UserF } from '$lib/types/user.type';
import LL from '$i18n/i18n-svelte';
import { derived, type Readable, type Writable } from 'svelte/store';

export type Route = {
	route: string;
	label?: string;
	getLabel?: (session: UserF | undefined) => string;
	guard?: (session: UserF | undefined) => boolean;
	display?: (config?: { mobile: boolean }) => boolean;
	class?: string;
	subRoutes?: Array<Route>;
	prefetch?: boolean;
	action?: boolean;
};

export type Spacer = {
	spacer: true;
	display?: (config?: { mobile: boolean }) => boolean;
};

export const ROUTES: Readable<Array<Route | Spacer>> = derived(LL, ($LL) => ([
	{
		spacer: true
	} as Spacer,
	{
		route: '/about',
		label: $LL.menu_label_about(),
		prefetch: true
	} as Route,
	{
		route: '/dev',
		label: 'Dev',
		guard: loggedGuard,
		prefetch: true
	} as Route,
	{
		route: '/blog',
		label: $LL.menu_label_blog(),
		prefetch: true
	} as Route,
	{
		route: '/user/settings',
		label: $LL.menu_label_settings(),
		guard: loggedGuard,
		prefetch: true
	} as Route,
	{
		route: '/user/logout',
		label: $LL.menu_label_logout(),
		guard: loggedGuard,
		action: true
	} as Route,
	{
		route: '/user/sign-in',
		label: $LL.menu_label_sign_in(),
		guard: notLoggedGuard
	} as Route,
	{
		route: '/user/login',
		label: $LL.menu_label_login(),
		guard: notLoggedGuard
	} as Route,
	{
		spacer: true,
		display: (config?: { mobile: boolean }) => !!config?.mobile
	} as Spacer
]));

export function loggedGuard(session: UserF | undefined) {
	return !!session;
}

export function notLoggedGuard(session: UserF | undefined) {
	return !session;
}

export const guard = (
	routes: Array<Route | Spacer>,
	session: UserF | undefined
): Array<Route | Spacer> => {
	return routes.filter((route) => !('guard' in route) || !route.guard || route.guard(session));
};

export const display = (
	routes: Array<Route | Spacer>,
	config: { mobile: boolean }
): Array<Route | Spacer> => {
	return routes.filter((route) => !route.display || route.display(config));
};

export function getOnlyRoutes(routes: Array<Route | Spacer>): Array<Route> {
	return routes.filter((r) => 'route' in r) as Array<Route>;
}

export function getActiveRoute(path: string, routes: Array<Route | Spacer>): Route | undefined {
	const basePath = removeRouteLocale(path);
	const onlyRoutes = getOnlyRoutes(routes).sort((r1, r2) => r2.route.length - r1.route.length);

	const activeSubRoute = onlyRoutes.find(
		(r) => r.subRoutes && getActiveRoute(basePath, r.subRoutes)
	);
	if (activeSubRoute) return activeSubRoute;

	const equalRoute = onlyRoutes.find((r) => r.route === basePath);
	if (equalRoute) return equalRoute;

	return onlyRoutes.find((r) => basePath.startsWith(r.route));
}

export function getRouteLabel(route: Route | Spacer, session: UserF | undefined) {
	const onlyRoute = getOnlyRoutes([route])?.[0];
	if (onlyRoute) {
		return 'getLabel' in onlyRoute && onlyRoute.getLabel
			? onlyRoute.getLabel(session)
			: onlyRoute.label;
	}
}

export function getRouteUrl(locale: Locales, route: Route | Spacer) {
	const onlyRoute = getOnlyRoutes([route])?.[0];
	if (onlyRoute) {
		return `/${locale}${onlyRoute.route}`;
	}
	return '';
}

export function removeRouteLocale(path: string) {
	const locale = locales.filter((l) => path.startsWith('/' + l));
	return locale.length ? path.slice(3) : path;
}

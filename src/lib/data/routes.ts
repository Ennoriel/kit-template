import type { UserF } from '$lib/types/user.type';

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

export const ROUTES: Array<Route | Spacer> = [
	{
		spacer: true
	},
	{
		route: '/img',
		label: 'Images',
		guard: loggedGuard,
		prefetch: true
	},
	{
		route: '/blog',
		label: 'Blog',
		prefetch: true
	},
	{
		route: '/user/settings',
		label: 'Settings',
		guard: loggedGuard,
		prefetch: true
	},
	{
		route: '/user/logout',
		label: 'Logout',
		guard: loggedGuard,
		action: true
	},
	{
		route: '/user/sign-in',
		label: 'Sign in',
		guard: notLoggedGuard
	},
	{
		route: '/user/login',
		label: 'Login',
		guard: notLoggedGuard
	},
	{
		spacer: true,
		display: (config) => !!config?.mobile
	}
];

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

export function getActiveRoute(path: string, routes = ROUTES): Route | undefined {
	const onlyRoutes = getOnlyRoutes(routes).sort((r1, r2) => r2.route.length - r1.route.length);

	const activeSubRoute = onlyRoutes.find((r) => r.subRoutes && getActiveRoute(path, r.subRoutes));
	if (activeSubRoute) return activeSubRoute;

	const equalRoute = onlyRoutes.find((r) => r.route === path);
	if (equalRoute) return equalRoute;

	return onlyRoutes.find((r) => path.startsWith(r.route));
}

export function getRouteLabel(route: Route | Spacer, session: UserF | undefined) {
	const onlyRoute = getOnlyRoutes([route])?.[0];
	if (onlyRoute) {
		return 'getLabel' in onlyRoute && onlyRoute.getLabel
			? onlyRoute.getLabel(session)
			: onlyRoute.label;
	}
}

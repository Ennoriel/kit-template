import type { Handle, RequestEvent } from '@sveltejs/kit';
import { loadAllLocales } from '$i18n/i18n-util.sync';
import { detectLocale, i18n, isLocale } from '$i18n/i18n-util';
import { initAcceptLanguageHeaderDetector } from 'typesafe-i18n/detectors';
import type { Locales } from '$i18n/i18n-types';

loadAllLocales();
const L = i18n();

export const handle: Handle = async ({ event, resolve }) => {
	const [, lang] = event.url.pathname.split('/');

	const safeRouteList = ['img', 'robots.txt', 'svg', 'sitemap.xml'];
	const safeRoute = safeRouteList.includes(lang);

	// redirect to base locale if no locale slug was found or if locale is not supported
	if (!lang || (!safeRoute && !isLocale(lang))) {
		return new Response(null, {
			status: 302,
			headers: { Location: `/${getPreferredLocale(event)}` }
		});
	}

	const locale = safeRoute ? 'fr' : (lang as Locales);
	const LL = L[locale];

	// bind locale and translation functions to current request
	event.locals.locale = locale;
	event.locals.LL = LL;

	return await resolve(event, { transformPageChunk: ({ html }) => html.replace('%lang%', lang) });
};

const getPreferredLocale = ({ request }: RequestEvent) => {
	// detect the preferred language the user has configured in his browser
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language
	const acceptLanguageDetector = initAcceptLanguageHeaderDetector(request);

	return detectLocale(acceptLanguageDetector);
};

import type { Handle, RequestEvent } from '@sveltejs/kit';
import { loadAllLocales } from '$i18n/i18n-util.sync';
import { detectLocale, isLocale } from '$i18n/i18n-util';
import { initAcceptLanguageHeaderDetector } from 'typesafe-i18n/detectors';

loadAllLocales();

export const handle: Handle = async ({ event, resolve }) => {
	const [, lang] = event.url.pathname.split('/');
	console.log('detected lang', lang);

	// redirect to base locale if no locale slug was found or if locale is not supported
	if (!lang || !isLocale(lang)) {
		const locale = getPreferredLocale(event);

		return new Response(null, {
			status: 302,
			headers: { Location: `/${locale}` }
		});
	}

	return await resolve(event, { transformPageChunk: ({ html }) => html.replace('%lang%', lang) });
};

const getPreferredLocale = ({ request }: RequestEvent) => {
	// detect the preferred language the user has configured in his browser
	// https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language
	const acceptLanguageDetector = initAcceptLanguageHeaderDetector(request);

	return detectLocale(acceptLanguageDetector);
};

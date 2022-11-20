import type { RequestHandler } from '@sveltejs/kit';
import { PUBLIC_BASE_URL } from '$env/static/public';
import type { Locales } from '$i18n/i18n-types';
import { locales } from '$i18n/i18n-util';
import { getArticles } from '$lib/server/db/article';

/**
 * each entry in the form of:
 *
 * <url>
 *     <loc>https://developers.google.com/docs/api/samples</loc>
 *     <changefreq>daily</changefreq>
 *     <priority>0.5</priority>
 *     <xhtml:link xmlns:xhtml="http://www.w3.org/1999/xhtml" rel="alternate" hreflang="en" href="https://developers.google.com/docs/api/samples" />
 *     <xhtml:link xmlns:xhtml="http://www.w3.org/1999/xhtml" rel="alternate" hreflang="x-default" href="https://developers.google.com/docs/api/samples" />
 * </url>
 */

function getPages() {
	const glob = import.meta.glob('../**/+page.svelte', { eager: true });
	return Object.keys(glob);
}

const getUrl = (path: string | undefined, locale: Locales) =>
	`${PUBLIC_BASE_URL}/${path ? `${path.replaceAll(/\[locale\]/g, locale)}` : ''}`;

const getAlternate = (
	path: string | undefined,
	locale: Locales,
	hreflang: Locales | 'x-default' = locale
) =>
	`<xhtml:link xmlns:xhtml="http://www.w3.org/1999/xhtml" rel="alternate" hreflang="${hreflang}" href="${getUrl(
		path,
		locale
	)}" />`;

const getAlternates = (path: string | undefined) =>
	locales.map((locale) => getAlternate(path, locale)).join('') +
	getAlternate(path, 'en', 'x-default');

const getEntry = (url: string | undefined, priority = 0.5) =>
	`<url><loc>${getUrl(
		url,
		'fr'
	)}</loc><changefreq>weekly</changefreq><priority>${priority}</priority>${getAlternates(
		url
	)}</url>`;

const render = (pages: string[]) =>
	`<?xml version="1.0" encoding="UTF-8" ?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${pages.join(
		''
	)}</urlset>`;

const filters = [
	'/blog/[url]/',
	'/blog/create/',
	'/private/',
	'/user/logout/',
	'/user/password-reset/[code]/',
	'/user/validate/[code]/',
	'/img/[slug]/'
];

export const GET: RequestHandler = async () => {
	const ttlInMin = 24 * 60;

	const pages = getPages()
		.filter((file) => !filters.some((filter) => file.includes(filter)))
		.map((file) => /^\.\.\/(.*)\/\+page\.svelte$/.exec(file)?.[1])
		.map((url) => getEntry(url));

	const articles = (await getArticles()).map(({ locale, url }) =>
		getEntry(`/blog/${locale}/${url}`)
	);

	const sitemap = render([...pages, ...articles]);

	return new Response(sitemap, {
		headers: {
			'Cache-Control': 'max-age=0, s-maxage=' + ttlInMin * 60,
			'Content-Type': 'application/xml'
		}
	});
};

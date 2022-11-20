import type { RequestHandler } from '@sveltejs/kit';
import { getArticles } from '$lib/server/db/article';
import { getRss } from 'chyme';
import type { Locales } from '$i18n/i18n-types';

export const GET: RequestHandler = async ({ params }) => {
	const ttlInMin = 24 * 60;
	const posts = (await getArticles({ locale: params.locale as Locales })).map(
		({ _id, title, description, url }) => ({
			title,
			description,
			date: _id.getTimestamp(),
			link: url
		})
	);

	const rss = getRss({
		title: 'SKit blog articles',
		description: 'New blog articles',
		link: 'https://www.machyme.fr/blog/',
		rssLink: 'https://www.machyme.fr/rss.xml',
		ttlInMin,
		posts
	});

	return new Response(rss, {
		headers: {
			'Cache-Control': 'max-age=0, s-maxage=' + ttlInMin * 60,
			'Content-Type': 'application/xml'
		}
	});
};

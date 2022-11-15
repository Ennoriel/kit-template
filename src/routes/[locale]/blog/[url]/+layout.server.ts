import { getLocale } from '$i18n/i18n-store';
import { getArticle } from '$lib/server/db/article';
import { convertObjectIdToString } from '$lib/utils/mongodb';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ params, url }) => {
	const article = await getArticle({ url: params.url });
	if (article) {
		return { article: convertObjectIdToString(article) };
	}
	throw redirect(303, `/${getLocale(url)}/blog`);
};

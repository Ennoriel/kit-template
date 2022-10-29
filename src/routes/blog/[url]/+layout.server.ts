import { getArticle } from '$lib/server/db/article';
import { convertObjectIdToString } from '$lib/utils/mongodb';
import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ params }) => {
	const article = await getArticle({ url: params.url });
	if (article) {
		return convertObjectIdToString(article);
	}
	throw redirect(303, `/blog`);
};

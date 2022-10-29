import { getArticle } from '$lib/server/db/article';
import { convertObjectIdToString } from '$lib/utils/mongodb';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ params }) => {
	const article = await getArticle({ url: params.url });
	if (article) {
		return convertObjectIdToString(article);
	}
	throw redirect(303, `/blog`);
};

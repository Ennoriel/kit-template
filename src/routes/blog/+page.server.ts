import { getArticles } from '$lib/server/db/article';
import { convertArrayIdToString } from '$lib/utils/mongodb';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return { articles: convertArrayIdToString(await getArticles()) };
};

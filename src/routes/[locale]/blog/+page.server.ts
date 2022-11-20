import type { Locales } from '$i18n/i18n-types';
import { getArticles } from '$lib/server/db/article';
import { convertArrayIdToString } from '$lib/utils/mongodb';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	return {
		articles: convertArrayIdToString(await getArticles({ locale: params.locale as Locales }))
	};
};

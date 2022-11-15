import type { Actions } from './$types';
import { formDataToObject, type WithStrId } from 'chyme';
import type { Article } from '$lib/types/article.type';
import { updateArticle } from '$lib/server/db/article';
import { redirect } from '@sveltejs/kit';
import { getLocale } from '$i18n/i18n-store';

export const actions: Actions = {
	default: async ({ request, url }) => {
		const body = await request.formData();
		const { _id, ...article } = formDataToObject<WithStrId<Article>>(body);

		const newArticle = await updateArticle(_id, article);

		throw redirect(303, `/${getLocale(url)}/blog/${newArticle.url}`);
	}
};

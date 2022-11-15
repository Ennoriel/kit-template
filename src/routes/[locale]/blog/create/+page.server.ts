import type { Actions } from './$types';
import { formDataToObject } from 'chyme';
import type { Article } from '$lib/types/article.type';
import { createArticle } from '$lib/server/db/article';
import { redirect } from '@sveltejs/kit';
import { getLocale } from '$i18n/i18n-store';

export const actions: Actions = {
	default: async ({ request, url }) => {
		const body = await request.formData();
		const article = formDataToObject<Article>(body);

		const newArticle = await createArticle(article);

		throw redirect(303, `/${getLocale(url)}/blog/${newArticle.url}`);
	}
};

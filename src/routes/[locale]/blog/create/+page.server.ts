import type { Actions } from './$types';
import { formDataToObject } from 'chyme';
import type { Article } from '$lib/types/article.type';
import { createArticle } from '$lib/server/db/article';
import { redirect } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request }) => {
		const body = await request.formData();
		const article = formDataToObject<Article>(body);

		const newArticle = await createArticle(article);

		throw redirect(303, `/blog/${newArticle.url}`);
	}
};

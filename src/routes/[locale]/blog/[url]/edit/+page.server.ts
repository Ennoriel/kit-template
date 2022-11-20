import type { Actions } from './$types';
import { formDataToObject, type WithStrId } from 'chyme';
import type { Article } from '$lib/types/article.type';
import { updateArticle } from '$lib/server/db/article';
import { redirect } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request }) => {
		const body = await request.formData();
		const { _id, ...article } = formDataToObject<WithStrId<Article>>(body);

		const newArticle = await updateArticle(_id, article);

		throw redirect(303, `/${newArticle.locale}/blog/${newArticle.url}`);
	}
};

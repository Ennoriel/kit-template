import type { Actions } from './$types';
import { formDataToObject } from 'chyme';
import type { Article } from '$lib/types/article.type';
import { createArticle } from '$lib/server/db/article';
import { redirect } from '@sveltejs/kit';
import { FilterXSS } from 'xss';

export const actions: Actions = {
	default: async ({ request, url }) => {
		const body = await request.formData();
		const article = formDataToObject<Article>(body);

        // todo check is admin
        article.content = new FilterXSS().process(article.content);

        const newArticle = await createArticle(article);

        throw redirect(303, `/blog/${newArticle.url}`);
    }
}
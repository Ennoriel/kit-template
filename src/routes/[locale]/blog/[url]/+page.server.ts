import { getLocale } from '$i18n/i18n-store';
import { deleteArticle } from '$lib/server/db/article';
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	delete: async ({ params, url }) => {
		// todo check is admin
		await deleteArticle({ url: params.url });
		throw redirect(303, `/${getLocale(url)}/blog`);
	}
};

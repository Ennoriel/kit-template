import { deleteArticle } from '$lib/server/db/article';
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	delete: async ({ params }) => {
		// todo check is admin
		await deleteArticle({ url: params.url });
		throw redirect(303, `/blog`);
	}
};

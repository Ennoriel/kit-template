import { deleteArticle, getArticle } from '$lib/server/db/article';
import { convertObjectIdToString } from '$lib/utils/mongodb';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({params}) => {
    const article = await getArticle({ url: params.url });
    if (article) {
        return convertObjectIdToString(article);
    }
    throw redirect(303, `/blog`);
};

export const actions: Actions = {
	delete: async ({ params }) => {
        // todo check is admin
        await deleteArticle({ url: params.url });
        throw redirect(303, `/blog`);
    }
}
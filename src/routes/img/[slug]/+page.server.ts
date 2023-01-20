import { deleteImage } from '$lib/server/db/image';
import { getUser } from '$lib/server/db/users';
import { deleteS3 } from '$lib/server/s3/s3';
import { verifyUser } from '$lib/utils/user';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = ({ params }) => {
	throw redirect(307, `https://website-rennes-sports.s3.fr-par.scw.cloud/${params.slug}`);
};

export const actions: Actions = {
	delete: async ({ params, request }) => {
		console.log('delete file');

		const user = await verifyUser(request);
		if (!user) {
			return fail(400, { error: 'Vous devez être authentifié.' });
		}
		const dbUser = await getUser({ email: user.email });

		if (!dbUser?._id) {
			return fail(400, { error: 'Vous devez être authentifié.' });
		}

		const path = params.slug;

		await deleteS3(path)
			.then(() => {
				return deleteImage({ path });
			})
			.catch((e) => {
				console.log('error', e);
				return fail(400, {
					error: "Un problème à eu lieu lors de la suppression de l'image."
				});
			});

		console.log('redirect to /img');

		throw redirect(303, '/img');
	}
};

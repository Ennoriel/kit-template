import { generateToken } from '$lib/server/db/csrf';
import { createImage, getImages } from '$lib/server/db/image';
import { getUser } from '$lib/server/db/users';
import { uploadS3 } from '$lib/server/s3/s3';
import { convertArrayIdToString } from '$lib/utils/mongodb';
import { verifyUser } from '$lib/utils/user';
import { invalid, redirect } from '@sveltejs/kit';
import { randomString } from 'chyme';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { user } = await parent();

	if (!user) throw redirect(302, '/');

	return {
		csrf: generateToken(),
		images: convertArrayIdToString(await getImages())
	};
};

export const actions: Actions = {
	default: async ({ request }) => {
		console.log('upload file');

		const user = await verifyUser(request);
		if (!user) {
			return invalid(400, { error: 'Vous devez être authentifié.' });
		}
		const dbUser = await getUser({ email: user.email });

		if (!dbUser?._id) {
			return invalid(400, { error: 'Vous devez être authentifié.' });
		}

		const data = await request.formData();
		const title = data.get('title') as string;

		const path = randomString(16);

		await uploadS3(data, path)
			.then(async () => {
				await createImage({
					title,
					path
				});
			})
			.catch((e) => {
				console.log('error', e);
				return invalid(400, {
					error: "Un problème à eu lieu lors de l'enregistrement de l'image."
				});
			});
	}
};

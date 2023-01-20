import { generateToken } from '$lib/server/db/csrf';
import { getUser, setUserImage } from '$lib/server/db/users';
import { uploadS3 } from '$lib/server/s3/s3';
import { verifyUser } from '$lib/utils/user';
import { fail, redirect } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { user } = await parent();

	if (!user) throw redirect(302, '/');

	return {
		csrf: generateToken()
	};
};

export const actions: Actions = {
	uploadProfileImage: async ({ request }) => {
		const data = await request.formData();
		const user = await verifyUser(request);
		if (!user) {
			return fail(400, { message: 'Vous devez être authentifié.' });
		}
		const dbUser = await getUser({ email: user.email });

		if (!dbUser?._id) {
			return fail(400, { message: 'Vous devez être authentifié.' });
		}
		uploadS3(data, dbUser._id.toString())
			.then(() => {
				setUserImage(new ObjectId(user._id));
			})
			.catch(() => {
				return fail(400, {
					message: "Un problème à eu lieu lors de l'enregistrement de l'image."
				});
			});
	}
};

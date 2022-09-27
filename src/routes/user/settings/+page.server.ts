import { invalidate } from '$app/navigation';
import { generateToken } from '$lib/server/db/csrf';
import { getUser, setUserImage } from '$lib/server/db/users';
import { uploadS3 } from '$lib/server/s3/s3';
import { verifyUser } from '$lib/utils/user';
import { invalid, redirect } from '@sveltejs/kit';
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
		const user = await verifyUser(request);
		if (!user) {
			return invalid(400, { message: 'Vous devez être authentifié.' });
		}
		const dbUser = await getUser({ email: user.email });

		if (!dbUser?._id) {
			return invalid(400, { message: 'Vous devez être authentifié.' });
		}
		uploadS3(request, dbUser._id.toString())
			.then(() => {
				setUserImage(new ObjectId(user._id));
				invalidate((url) => url.pathname === '/user/settings');
			})
			.catch(() => {
				return invalid(400, {
					message: "Un problème à eu lieu lors de l'enregistrement de l'image."
				});
			});
	}
};

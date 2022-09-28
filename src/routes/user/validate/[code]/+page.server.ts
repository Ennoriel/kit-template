import { getUser, validateUser } from '$lib/server/db/users';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const dbUser = await getUser({ validationCode: params.code }, ['validated']);

	if (dbUser) {
		if (dbUser.validated) {
			return {
				message: 'All good, your account has already been validated'
			};
		} else {
			const result = await validateUser(dbUser._id);
			if (result.acknowledged && result.modifiedCount === 1) {
				return {
					message: 'All good, your account just got validated :)'
				};
			}
		}
	}

	throw error(404, 'We have a problem');
};

import { getLL } from '$i18n/i18n-store';
import { getUser, validateUser } from '$lib/server/db/users';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, params }) => {
	const $LL = getLL(url);

	const dbUser = await getUser({ validationCode: params.code }, ['validated']);

	if (dbUser) {
		if (dbUser.validated) {
			return {
				message: $LL.user_validation_error_already_validated()
			};
		} else {
			const result = await validateUser(dbUser._id);
			if (result.acknowledged && result.modifiedCount === 1) {
				return {
					message: $LL.user_validation_success()
				};
			}
		}
	}

	throw error(404, $LL.global_error());
};

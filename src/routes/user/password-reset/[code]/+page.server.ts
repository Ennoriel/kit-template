import { getUser, resetPassword } from '$lib/server/db/users';
import { error, invalid, redirect } from '@sveltejs/kit';
import { formDataToObject } from 'chyme';
import { crypt } from '../../user.utils';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const dbUser = await getUser({ 'passwordReset.code': params.code });
	if (!dbUser) {
		throw error(404, 'Your password reset request has been lost. Please try again or contact us.');
	}

	if (!dbUser.passwordReset?.date /* TODO check date not to old */) {
		throw error(404, 'Your password reset request is too old. Please issue a new request.');
	}

	return {
		message: 'All good, you may reset your password',
		passwordResetCode: params.code
	};
};

export const actions: Actions = {
	default: async ({ params, request, url }) => {
		const dbUser = await getUser({ 'passwordReset.code': params.code });
		if (!dbUser) {
			return invalid(404, {
				error: 'Your password reset request has been lost. Please try again or contact us.'
			});
		}

		if (!dbUser.passwordReset?.date /* TODO check date not to old */) {
			return invalid(404, {
				error: 'Your password reset request is too old. Please issue a new request.'
			});
		}

		const body = await request.formData();
		const { password } = formDataToObject<{ password: string }>(body);

		await resetPassword(dbUser._id, crypt(password));

		throw redirect(303, url.searchParams.get('redirectTo') ?? '/');
	}
};

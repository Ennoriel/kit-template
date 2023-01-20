import { getLL } from '$i18n/i18n-store';
import { getUser, resetPassword } from '$lib/server/db/users';
import { error, fail, redirect } from '@sveltejs/kit';
import { formDataToObject } from 'chyme';
import { crypt } from '../../user.utils';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, params }) => {
	const $LL = getLL(url);

	const dbUser = await getUser({ 'passwordReset.code': params.code }, ['passwordReset']);
	if (!dbUser) {
		throw error(404, $LL.password_reset_error_wrong_code());
	}

	if (!dbUser.passwordReset?.date /* TODO check date not to old */) {
		throw error(404, $LL.password_reset_error_too_old());
	}

	return {
		message: $LL.password_reset_success(),
		passwordResetCode: params.code
	};
};

export const actions: Actions = {
	default: async ({ params, request, url }) => {
		const $LL = getLL(url);

		const dbUser = await getUser({ 'passwordReset.code': params.code }, ['passwordReset']);
		if (!dbUser) {
			return fail(404, {
				error: $LL.password_reset_error_wrong_code()
			});
		}

		if (!dbUser.passwordReset?.date /* TODO check date not to old */) {
			return fail(404, {
				error: $LL.password_reset_error_too_old()
			});
		}

		const body = await request.formData();
		const { password } = formDataToObject<{ password: string }>(body);

		await resetPassword(dbUser._id, crypt(password));

		throw redirect(303, url.searchParams.get('redirectTo') ?? '/');
	}
};

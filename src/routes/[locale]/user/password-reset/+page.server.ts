import type { Actions } from './$types';
import { formDataToObject } from 'chyme';
import { getUser, addResetPasswordCode } from '$lib/server/db/users';
import { sendMailPasswordLost } from '$lib/utils/mail';
import { invalid, redirect } from '@sveltejs/kit';
import { PUBLIC_BASE_URL } from '$env/static/public';
import { getLL, getLocale } from '$i18n/i18n-store';

export const actions: Actions = {
	default: async ({ request, url }) => {
		const $LL = getLL(url);

		const body = await request.formData();
		const { email } = formDataToObject<{ email: string }>(body);

		if (!email) {
			return invalid(400, { error: $LL.password_reset_error_missing_parameters() });
		}

		const dbUser = await getUser({ email });

		if (!dbUser)
			return invalid(400, {
				error: $LL.password_reset_error_no_account_found({ email })
			});

		const passwordReset = await addResetPasswordCode(dbUser._id);

		if (passwordReset) {
			sendMailPasswordLost(email, {
				name: email,
				password_reset_link: `${PUBLIC_BASE_URL}/${getLocale(url)}/user/password-reset/${
					passwordReset.code
				}`
			});
		}

		throw redirect(303, url.searchParams.get('redirectTo') ?? '/');
	}
};

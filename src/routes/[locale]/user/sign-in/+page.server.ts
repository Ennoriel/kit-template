import type { Actions } from './$types';
import { formDataToObject, randomString } from 'chyme';
import { getUser, createUser } from '$lib/server/db/users';
import { sendMailConfirmAccount } from '$lib/utils/mail';
import { crypt } from '../user.utils';
import { fail, redirect } from '@sveltejs/kit';
import { PUBLIC_BASE_URL } from '$env/static/public';
import { getLL, getLocale } from '$i18n/i18n-store';

type User = {
	email: string;
	password: string;
};

export const actions: Actions = {
	default: async ({ request, url }) => {
		const $LL = getLL(url);

		const body = await request.formData();
		const user = formDataToObject<User>(body);

		const { email, password } = user;

		if (!email || !password) {
			return fail(400, { error: $LL.sign_in_error_missing_data() });
		}

		const dbUser = await getUser({ email });

		if (dbUser) return fail(400, { error: $LL.sign_in_error_email_exists({ email }) });

		const newUser = await createUser({
			email,
			hash: crypt(password),
			validationCode: randomString(32)
		});

		if (newUser.validationCode) {
			sendMailConfirmAccount(email, {
				name: email,
				validation_link: `${PUBLIC_BASE_URL}/${getLocale(url)}/user/validate/${
					newUser.validationCode
				}`
			});
		}

		throw redirect(303, url.searchParams.get('redirectTo') ?? '/');
	}
};

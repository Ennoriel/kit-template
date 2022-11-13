import jsonwebtoken from 'jsonwebtoken';
import type { Actions } from './$types';
import { formDataToObject } from 'chyme';
import { getUser } from '$lib/server/db/users';
import { validate } from '../user.utils';
import { invalid, redirect } from '@sveltejs/kit';
import { getLL } from '$i18n/i18n-store';

type User = {
	email: string;
	password: string;
};

export const actions: Actions = {
	default: async ({ cookies, request, url }) => {
		const $LL = getLL(url);

		const body = await request.formData();
		const user = formDataToObject<User>(body);

		const { email, password } = user;

		if (!email || !password) {
			return invalid(400, { error: $LL.login_error_missing_parameters() });
		}

		const dbUser = await getUser({ email }, ['hash']);

		if (!dbUser || !validate(password, dbUser.hash)) {
			return invalid(400, { error: $LL.login_error_wrong_parameters() });
		}

		const token = jsonwebtoken.sign(
			{ email, _id: dbUser._id },
			import.meta.env.VITE_JWT_SECRET as string
		);

		cookies.set('session', token, {
			httpOnly: true,
			maxAge: 60 * 60 * 24 * 7,
			sameSite: 'lax',
			secure: true,
			path: '/'
		});

		throw redirect(303, url.searchParams.get('redirectTo') ?? '/');
	}
};

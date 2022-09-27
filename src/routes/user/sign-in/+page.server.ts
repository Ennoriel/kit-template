import type { Actions } from './$types';
import { formDataToObject, randomString } from 'chyme';
import { getUser, createUser } from '$lib/server/db/users';
import { sendMailConfirmAccount } from '$lib/utils/mail';
import { crypt } from '../user.utils';
import { invalid, redirect } from '@sveltejs/kit';

type User = {
	email: string;
	password: string;
};

export const actions: Actions = {
	default: async ({ request, url }) => {
		const body = await request.formData();
		const user = formDataToObject<User>(body);

		const { email, password } = user;

		if (!email || !password) {
			return invalid(400, { error: 'The email and password should be provided' });
		}

		const dbUser = await getUser({ email });

		if (dbUser)
			return invalid(400, { error: `An account with the email ${email} already exists!` });

		const newUser = await createUser({
			email,
			hash: crypt(password),
			validationCode: randomString(32)
		});

		if (newUser.validationCode) {
			sendMailConfirmAccount(email, {
				name: email,
				validation_link: `http://localhost:5173/user/validate/${newUser.validationCode}`
			});
		}

		throw redirect(303, url.searchParams.get('redirectTo') ?? '/');
	}
};

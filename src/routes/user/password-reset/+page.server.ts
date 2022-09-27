import type { Actions } from './$types';
import { formDataToObject } from 'chyme';
import { getUser, addResetPasswordCode } from '$lib/server/db/users';
import { sendMailPasswordLost } from '$lib/utils/mail';
import { invalid, redirect } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request, url }) => {
		const body = await request.formData();
		const { email } = formDataToObject<{ email: string }>(body);

		if (!email) {
			return invalid(400, { error: 'Toutes les informations sont obligatoires' });
		}

		const dbUser = await getUser({ email });

		if (!dbUser) return invalid(400, { error: `Aucun compte trouvé avec l'email ${email} !` });

		const user = await addResetPasswordCode(dbUser);

		if (user.passwordReset) {
			sendMailPasswordLost(email, {
				name: email,
				password_reset_link: `http://localhost:5173/user/password-reset/${user.passwordReset.code}`
			});
		}

		throw redirect(303, url.searchParams.get('redirectTo') ?? '/');
	}
};

import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ cookies }) => {
		cookies.set('session', 'logged out', {
			httpOnly: true,
			maxAge: -1,
			sameSite: 'lax',
			secure: true,
			path: '/'
		});

		throw redirect(303, '/');
	}
};

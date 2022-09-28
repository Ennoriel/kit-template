import type { LayoutServerLoad } from './$types';
import { verifyUser } from '$lib/utils/user';

export const load: LayoutServerLoad = async ({ request }) => {
	return {
		user: verifyUser(request)
	};
};

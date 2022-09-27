import type { LayoutServerLoad } from './$types';
import { verifyUser } from '$lib/utils/user';

export type User = {
	email: string;
	validationCode?: string;
	validated?: boolean;
	passwordReset?: {
		code: string;
		date: number;
	};
	hash?: string;
	hasImage?: string;
	lastUpdated?: Date;
};

export const load: LayoutServerLoad = async ({ request }) => {
	return {
		user: verifyUser(request)
	};
};

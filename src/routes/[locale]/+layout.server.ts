import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ params: { locale } }) => {
	return { locale };
};

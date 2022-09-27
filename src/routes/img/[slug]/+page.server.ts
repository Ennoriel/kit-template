import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ params }) => {
	throw redirect(307, `https://website-rennes-sports.s3.fr-par.scw.cloud/${params.slug}`);
};

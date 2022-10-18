import { getFaviconBody } from '$lib/components/configuration/favicon';
import type { Cookies } from '@sveltejs/kit';
import { formDataToObject, isHexColorValid, isDark } from 'chyme';
import type { RequestHandler } from './$types';

type SearchParams = {
	color?: string;
	bg?: boolean;
};

function getCookie<T>(cookies: Cookies, name: string) {
	const value = cookies.get(name);
	if (!value) return;
	try {
		return JSON.parse(value) as T;
	} catch {
		return;
	}
}

export const GET: RequestHandler = ({ params, url, cookies }) => {
	const ttlInMin = 60 * 24 * 30;

	const configuration = getCookie<{ "primaryColor": string }>(cookies, 'configuration');

	const query = formDataToObject<SearchParams>(url.searchParams);

	const svgBody = getFaviconBody(configuration?.primaryColor, query.bg, params.size);
	const width = params.size === 's' ? 150 : 450;

	const svg = `<svg viewBox="0 0 ${width} 150" height="150" width="${width}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">${svgBody}</svg>`

	return new Response(String(svg), {
		headers: {
			'Cache-Control': `max-age=0, s-max-age=${ttlInMin * 60}`,
			'Content-Type': 'image/svg+xml'
		}
	});
};

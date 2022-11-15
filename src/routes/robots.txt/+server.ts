import type { RequestHandler } from '@sveltejs/kit';
import { PUBLIC_BASE_URL } from '$env/static/public';

export const prerender = true;

const robots = `User-agent: *
Disallow:

Sitemap: ${PUBLIC_BASE_URL}/sitemap.xml
`;

export const GET: RequestHandler = async () => {
	return new Response(robots, {
		headers: {
			'Cache-Control': 'max-age=0, s-maxage=86400',
			'Content-Type': 'text/plain; charset=utf-8'
		}
	});
};

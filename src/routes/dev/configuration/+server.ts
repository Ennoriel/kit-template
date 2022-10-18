import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ cookies, request }) => {
    const body = await request.json();

    cookies.set('configuration', JSON.stringify(body), { sameSite: 'lax', secure: true, path: '/' })

    return new Response();
};
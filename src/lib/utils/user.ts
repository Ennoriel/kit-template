import jsonwebtoken from 'jsonwebtoken';
import { parse } from 'cookie';
import { getUser } from '$lib/server/db/users';
import { ObjectId } from 'mongodb';

export type FrontUser = {
	_id: string;
	email: string;
};

export async function verifyUser(request: Request) {
	const cookie = request.headers.get('cookie');
	if (cookie) {
		const { session } = parse(cookie);
		if (session) {
			const tokenUser = jsonwebtoken.verify(
				session,
				import.meta.env.VITE_JWT_SECRET as string
			) as FrontUser;
			const dbUser = await getUser({ _id: new ObjectId(tokenUser._id) });

			return {
				...dbUser,
				_id: dbUser?._id.toString()
			};
		}
	}
}

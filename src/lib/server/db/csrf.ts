import db from '$lib/server/db/db';
import { randomString } from 'chyme';

export async function generateToken(): Promise<string> {
	const token = randomString(8);
	return db
		.collection('csrf')
		.insertOne({ token })
		.then(() => token);
}

export async function validateToken(token: string) {
	return db
		.collection('csrf')
		.updateOne({ token, expired: null }, { $set: { expired: true } })
		.then((res) => res.modifiedCount === 1);
}

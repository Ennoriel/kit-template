import db from '$lib/server/db/db';
import { randomString } from 'chyme';
import type { Filter, ObjectId, WithId } from 'mongodb';
import type { User } from 'src/routes/+layout.server';

export async function createUser(user: User): Promise<User> {
	await db.collection('users').insertOne(user);
	delete user.hash;
	return user;
}

export async function getUsers() {
	return (await db.collection('users').find<WithId<User>>({}).toArray()) || [];
}

export async function getUser(query: Filter<User> = {}) {
	const users = (await db.collection('users').find<WithId<User>>(query).toArray()) || [];
	return users.length === 1 ? users[0] : undefined;
}

export async function validateUser(user: WithId<User>) {
	const result = await db
		.collection('users')
		.updateOne({ _id: user._id }, { $set: { validated: true } });
	return result;
}

export async function addResetPasswordCode(user: WithId<User>) {
	const passwordReset = {
		code: randomString(32),
		date: new Date()
	};
	await db.collection('users').updateOne({ _id: user._id }, { $set: { passwordReset } });
	return { ...user, passwordReset };
}

export async function resetPassword(_id: ObjectId, hash: string) {
	await db.collection('users').updateOne(
		{ _id },
		{
			$unset: { passwordReset: '' },
			$set: { hash }
		}
	);
}

export async function setUserImage(_id: ObjectId) {
	const date = new Date();
	await db.collection('users').updateOne(
		{ _id },
		{
			$set: {
				hasImage: true,
				lastUpdated: date
			}
		}
	);
	return getUser({ _id });
}

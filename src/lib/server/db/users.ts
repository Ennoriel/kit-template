import db from '$lib/server/db/db';
import type { User } from '$lib/types/user.type';
import { randomString } from 'chyme';
import type { Filter, FindOptions, ObjectId, WithId } from 'mongodb';

export async function createUser(user: User): Promise<User> {
	await db.collection('users').insertOne(user);
	delete user.hash;
	return user;
}

export async function getUsers<Field extends keyof User = 'email' | 'hasImage' | 'lastUpdated'>(
	query: Filter<User> = {},
	projectionFields: Array<Field> = []
): Promise<Array<Pick<WithId<User>, Field | '_id'>>> {
	const projection = projectionFields.length
		? projectionFields.reduce(
				(acc, field) => ((acc[field] = 1), acc),
				{} as NonNullable<FindOptions['projection']>
		  )
		: { email: 1, hasImage: 1, lastUpdated: 1 };
	return (await db.collection('users').find<WithId<User>>(query, { projection }).toArray()) || [];
}

export async function getUser<Field extends keyof User = 'email' | 'hasImage' | 'lastUpdated'>(
	query: Filter<User> = {},
	projectionFields: Array<Field> = []
): Promise<Pick<WithId<User>, Field | '_id'> | undefined> {
	const users = await getUsers(query, projectionFields);
	return users.length === 1 ? users[0] : undefined;
}

export async function validateUser(userId: ObjectId) {
	const result = await db
		.collection('users')
		.updateOne({ _id: userId }, { $set: { validated: true } });
	return result;
}

export async function addResetPasswordCode(userId: ObjectId) {
	const passwordReset = {
		code: randomString(32),
		date: new Date()
	};
	await db.collection('users').updateOne({ _id: userId }, { $set: { passwordReset } });
	return passwordReset;
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

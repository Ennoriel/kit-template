import db from '$lib/server/db/db';
import type { Image } from '$lib/types/image.type';
import type { Filter, FindOptions, WithId } from 'mongodb';

export async function createImage(image: Image): Promise<Image> {
	// TODO check uniqueness of url
	await db.collection('images').insertOne(image);
	return image;
}

export async function getImages<Field extends keyof Image = 'path' | 'title'>(
	query: Filter<Image> = {},
	projectionFields: Array<Field> = []
): Promise<Array<Pick<WithId<Image>, Field | '_id'>>> {
	const projection = projectionFields.length
		? projectionFields.reduce(
				(acc, field) => ((acc[field] = 1), acc),
				{} as NonNullable<FindOptions['projection']>
		  )
		: { path: 1, title: 1 };
	return (await db.collection('images').find<WithId<Image>>(query, { projection }).toArray()) || [];
}

export async function deleteImage(query: Filter<Image> = {}) {
	return await db.collection('images').deleteOne(query);
}

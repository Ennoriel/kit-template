import db from '$lib/server/db/db';
import type { Article } from '$lib/types/article.type';
import { ObjectId, type Filter, type FindOptions, type WithId } from 'mongodb';

const defaultAttributes = { title: 1, url: 1, content: 1, locale: 1, description: 1 };
type defaultAttributesType = keyof typeof defaultAttributes;

export async function createArticle(article: Article): Promise<Article> {
	// TODO check uniqueness of url
	await db.collection('articles').insertOne(article);
	return article;
}

export async function getArticles<Field extends keyof Article = defaultAttributesType>(
	query: Filter<Article> = {},
	projectionFields: Array<Field> = []
): Promise<Array<Pick<WithId<Article>, Field | '_id'>>> {
	const projection = projectionFields.length
		? projectionFields.reduce(
				(acc, field) => ((acc[field] = 1), acc),
				{} as NonNullable<FindOptions['projection']>
		  )
		: defaultAttributes;
	return (
		(await db.collection('articles').find<WithId<Article>>(query, { projection }).toArray()) || []
	);
}

export async function getArticle<Field extends keyof Article = defaultAttributesType>(
	query: Filter<Article> = {},
	projectionFields: Array<Field> = []
): Promise<Pick<WithId<Article>, Field | '_id'> | undefined> {
	const articles = await getArticles(query, projectionFields);
	return articles.length === 1 ? articles[0] : undefined;
}

export async function deleteArticle(query: Filter<Article> = {}) {
	return await db.collection('articles').deleteOne(query);
}

export async function updateArticle(_id: string, article: Omit<Article, '_id'>) {
	// TODO check uniqueness of url
	await db.collection('articles').updateOne({ _id: new ObjectId(_id) }, { $set: article });
	return { _id, ...article };
}

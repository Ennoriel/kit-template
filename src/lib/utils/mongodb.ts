import type { WithId } from 'mongodb';

export function convertObjectIdToString<T>({ _id, ...object }: WithId<T>) {
	return {
		...object,
		_id: _id.toString()
	};
}

export function convertArrayIdToString<T>(array: Array<WithId<T>>) {
	return array.map(convertObjectIdToString);
}

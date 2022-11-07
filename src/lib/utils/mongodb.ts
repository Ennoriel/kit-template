import type { ObjectId } from 'mongodb';

export function convertObjectIdToString<T extends { _id: ObjectId | string }>({
	_id,
	...object
}: T) {
	return {
		...object,
		_id: _id.toString()
	};
}

export function convertArrayIdToString<T extends { _id: ObjectId | string }>(array: Array<T>) {
	return array.map(convertObjectIdToString);
}

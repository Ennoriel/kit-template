export function makeError(text: string) {
	return {
		text,
		removeAfter: 4000,
		position: 'top-right',
		type: 'error'
	};
}

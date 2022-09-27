export function error(message: string) {
	return {
		status: 403,
		errors: {
			message
		}
	};
}

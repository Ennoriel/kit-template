import { getUsers } from '$lib/server/db/users';

export async function load() {
	return {
		users: JSON.parse(JSON.stringify(await getUsers()))
	};
}

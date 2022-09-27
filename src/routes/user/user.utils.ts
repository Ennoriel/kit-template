import bcryptjs from 'bcryptjs';

export function crypt(password: string, saltRounds = 12): string {
	const salt = bcryptjs.genSaltSync(saltRounds);
	return bcryptjs.hashSync(password, salt);
}

export function validate(password: string, hash: string | undefined): boolean {
	return !!hash && bcryptjs.compareSync(password, hash);
}

import type { WithStrId } from 'chyme';

export type User = {
	email: string;
	validationCode?: string;
	validated?: boolean;
	passwordReset?: {
		code: string;
		date: number;
	};
	hash?: string;
	hasImage?: string;
	lastUpdated?: Date;
};

export type UserF = WithStrId<Pick<User, 'email' | 'hasImage' | 'lastUpdated'>>;

export type UserS = WithStrId<Pick<User, 'email'>>;

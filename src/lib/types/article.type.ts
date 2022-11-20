import type { Locales } from '$i18n/i18n-types';

export type Article = {
	title: string;
	url: string;
	description: string;
	content: string;
	locale: Locales;
};

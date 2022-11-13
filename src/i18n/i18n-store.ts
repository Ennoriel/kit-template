import LL, { setLocale } from '$i18n/i18n-svelte';
import type { Locales } from '$i18n/i18n-types';
import { get } from 'svelte/store';

export function getLL(url: URL) {
	setLocale(getLocale(url));
	return get(LL);
}

export function getLocale(url: URL) {
	const [, lang] = url.pathname.split('/');
	return lang as Locales;
}

export const languages: Record<Locales, string> = {
	fr: 'Français',
	en: 'English'
};

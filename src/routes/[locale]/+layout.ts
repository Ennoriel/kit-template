import type { LayoutLoad } from './$types';
import { loadLocaleAsync } from '$i18n/i18n-util.async';
import { setLocale } from '$i18n/i18n-svelte';
import type { Locales } from '$i18n/i18n-types';

export const load: LayoutLoad = async ({ params: { locale } }) => {
	await loadLocaleAsync(locale as Locales);
	setLocale(locale as Locales);

	return { locale };
};

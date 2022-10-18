import { writable } from 'svelte/store';

export const stylePropertyStore = (name: string, defaultValue: string) => {
	const storedValue = typeof localStorage !== 'undefined' && localStorage.getItem(name);
	const store = writable(storedValue || defaultValue);

	store.subscribe((value) => {
		if (typeof localStorage !== 'undefined') localStorage.setItem(name, value);
		if (typeof window !== 'undefined') window.document.documentElement.style.setProperty(name, value);
		return value;
	});

	return store;
};

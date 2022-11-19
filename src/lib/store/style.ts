import { writable } from 'svelte/store';

export const stylePropertyStore = (name: string, defaultValue: string) => {
	const storedValue = typeof localStorage !== 'undefined' && localStorage.getItem(name);
	const store = writable(storedValue || defaultValue);

	store.subscribe((value) => {
		if (typeof localStorage !== 'undefined') localStorage.setItem(name, value);
		if (typeof window !== 'undefined')
			window.document.documentElement.style.setProperty(name, value);
		return value;
	});

	return store;
};

export const classPropertyStore = (
	name: string,
	defaultValue: string | undefined,
	allowedValues: Array<string>
) => {
	const storedValue = typeof localStorage !== 'undefined' && localStorage.getItem(name);
	const store = writable<string | undefined>(storedValue || defaultValue);

	store.subscribe((value) => {
		if (typeof localStorage !== 'undefined')
			value ? localStorage.setItem(name, value) : localStorage.removeItem(name);
		if (typeof window !== 'undefined') {
			allowedValues.forEach((v) => window.document.documentElement.classList.remove(v));
			if (value) window.document.documentElement.classList.add(value);
		}
		return value;
	});

	return store;
};

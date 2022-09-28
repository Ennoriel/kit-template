import { stylePropertyStore } from '$lib/store/style';
import { writable } from 'svelte/store';

export const isOpen = writable(false);

export const bgColor = stylePropertyStore('--bg-color', '#f7f7fa');
export const linkColor = stylePropertyStore('--link-color', '#ed1f3a');
export const primaryColor = stylePropertyStore('--primary-color', '#002395');
export const textColor = stylePropertyStore('--text-color', '#333333');

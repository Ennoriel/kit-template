import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		alias: {
			$i18n: 'src/i18n'
		}
	},

	vitePlugin: {
		experimental: {
			inspector: {
				holdMode: true,
				showToggleButton: 'always',
				toggleButtonPos: 'bottom-right'
			}
		}
	}
};

export default config;

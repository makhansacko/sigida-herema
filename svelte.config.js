import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		// Site statique. Sans options, adapter-static détecte Vercel (zéro configuration) ;
		// en local, `npm run build` écrit toujours dans build/.
		adapter: adapter()
	}
};

export default config;

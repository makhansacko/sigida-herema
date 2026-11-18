import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		// Site statique : `npm run build` produit le dossier build/, déployable sur n'importe quel hébergeur.
		adapter: adapter({ pages: 'build', assets: 'build', fallback: undefined })
	}
};

export default config;

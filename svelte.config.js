import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		// Site statique écrit dans build/, en local comme sur Vercel (voir vercel.json).
		adapter: adapter({ pages: 'build', assets: 'build', fallback: undefined, precompress: false, strict: true })
	}
};

export default config;

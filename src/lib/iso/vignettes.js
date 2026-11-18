// Petites vignettes isométriques, une par acteur, dans le même style que la scène.

import { projection, makeIso } from './iso.js';

const P = projection(13, 70, 40);
const I = makeIso(P);

const DRAW = {
	search: (g) => I.box(g, 1.5, 1.5, 0.5, 3, 3, 5, '#1254b2', { windows: true }),
	bailleur: (g) => {
		I.box(g, 1.5, 1.5, 0.5, 3, 3, 3.2, '#eef1f5', { windows: true });
		I.flag(g, P(3, 3, 3.7));
	},
	urtel: (g) => {
		I.box(g, 1.5, 2, 0.5, 2.8, 2.8, 1.8, '#faad45');
		I.tower(g, 2.9, 3.4, 2.3, 5);
	},
	osc: (g) => {
		I.house(g, 1, 1.4, 0.5, '#30ad96');
		I.house(g, 3.6, 3, 0.5, '#30ad96');
	},
	medias: (g) =>
		I.crowd(g, 2.2, 2.4, 0.5, [
			[0, 0, '#1254b2', { phone: true, k: 1 }],
			[1.2, 0.6, '#faad45', { mic: true, scarf: '#30ad96', k: 2 }],
			[0.2, 1.6, '#4d7fc5', { phone: true, k: 3 }]
		]),
	etat: (g) => {
		I.box(g, 1.3, 1.6, 0.5, 3.4, 3, 0.5, '#e9e2f3');
		I.box(g, 1.5, 1.8, 1, 3, 2.6, 2.8, '#efe8f8', { windows: true });
		I.roof(g, 1.4, 1.7, 3.8, 3.2, 2.8, 1.5, '#a157ab');
	},
	coutume: (g) => {
		I.tree(g, 3, 2.4, 0.5, true);
		I.crowd(g, 1.8, 3.2, 0.5, [
			[0, 0, '#ffffff', { cap: '#ffffff', k: 1 }],
			[1.7, 0.7, '#f4efe6', { cap: '#7a5c3a' }],
			[2.4, -0.6, '#30ad96', { scarf: '#faad45', k: 2 }]
		]);
	},
	pop: (g) => {
		I.crowd(g, 1.4, 2, 0.5, [
			[0, 0, '#e07a5f', { scarf: '#a157ab' }],
			[1, -0.2, '#30ad96', { k: 1 }],
			[1.9, 0.4, '#f2c55c', { scarf: '#1254b2', k: 2 }],
			[0.5, 1.2, '#4d7fc5', { kid: true, k: 3 }],
			[1.6, 1.4, '#a157ab', { scarf: '#faad45' }]
		]);
		const p = P(2.4, 2.4, 0.5);
		I.bubble(g, p[0] + 6, p[1] - 30);
	}
};

/** Renvoie les formes d'une vignette : un socle et l'acteur. viewBox commun : 0 0 140 110. */
export function vignette(sh, tint = '#eef3f9') {
	const g = [];
	I.box(g, 0, 0, 0, 6, 6, 0.5, tint, { stroke: '#c9d6e6' });
	DRAW[sh]?.(g);
	return g;
}
export const VIGNETTE_VIEWBOX = '0 -30 140 152';
/** Cadrage plus serré pour les vignettes de personnages. */
const TIGHT = { medias: '22 18 96 96', coutume: '18 8 104 104', pop: '20 14 100 100' };
export const viewBoxOf = (sh) => TIGHT[sh] || VIGNETTE_VIEWBOX;

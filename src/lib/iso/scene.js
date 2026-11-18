// Composition de la scène isométrique : socle, fleuve Niger, trois zones et les acteurs.
// Pour ajouter un acteur : ajoutez une entrée dans OBJECTS (sh = clé de STAKE dans data/projet.js).

import { projection, makeIso, pts, mix } from './iso.js';

export const VIEWBOX = '0 0 700 470';
const P = projection(14.5, 300, 78);
const I = makeIso(P);
const zb = 1.5; // hauteur du dessus des zones

// depth : ordre de peinture (du fond vers l'avant). pin : l'objet porte le numéro de l'acteur.
// zone : Bamako, Mopti ou Gao.
const OBJECTS = [
	// Bamako
	{ zone: 'Bamako', sh: 'search', depth: 16, pin: true, draw: (g) => { const t = I.box(g, 1.6, 9, zb, 3, 3, 5.4, '#1254b2', { windows: true }); return [t[0], t[1] - 6]; } },
	{ zone: 'Bamako', sh: 'bailleur', depth: 15, pin: true, draw: (g) => { I.box(g, 5.6, 9, zb, 2.4, 2.4, 3, '#eef1f5', { windows: true }); const p = P(6.8, 10.2, zb + 3); I.flag(g, p); return [p[0], p[1] - 22]; } },
	{ zone: 'Bamako', sh: 'etat', depth: 18, pin: true, draw: (g) => { I.box(g, 8.8, 9.2, zb, 3, 2.6, 0.5, '#e9e2f3'); I.box(g, 9, 9.4, zb + 0.5, 2.6, 2.2, 2.6, '#efe8f8', { windows: true }); const a = I.roof(g, 8.9, 9.3, zb + 3.1, 2.8, 2.4, 1.4, '#a157ab'); return [a[0], a[1] - 4]; } },
	{ zone: 'Bamako', sh: 'urtel', depth: 15, pin: true, draw: (g) => { I.box(g, 1.6, 13.2, zb, 2.4, 2.4, 2, '#faad45'); const t = I.tower(g, 2.8, 14.4, zb + 2, 5.6); return [t[0], t[1] - 14]; } },
	{ zone: 'Bamako', sh: 'osc', depth: 18.8, pin: true, draw: (g) => { const a = I.house(g, 5.6, 13.2, zb, '#30ad96'); return [a[0], a[1] - 4]; } },
	{ zone: 'Bamako', sh: 'osc', depth: 21, draw: (g) => { I.house(g, 8.4, 12.6, zb, '#30ad96'); } },
	{ zone: 'Bamako', sh: 'medias', depth: 25.4, pin: true, draw: (g) => {
		I.crowd(g, 10.4, 15, zb, [[0, 0, '#1254b2', { phone: true, k: 1 }], [0.9, 0.7, '#faad45', { mic: true, scarf: '#30ad96', k: 2 }], [-0.4, 1.2, '#4d7fc5', { phone: true, k: 3 }]]);
		const p = P(10.6, 15.4, zb); return [p[0], p[1] - 30]; } },
	{ zone: 'Bamako', sh: 'pop', depth: 20, pin: true, draw: (g) => {
		I.crowd(g, 3, 16.6, zb, [[0, 0, '#e07a5f', { scarf: '#a157ab' }], [1, -0.2, '#30ad96', { k: 1 }], [1.9, 0.4, '#f2c55c', { scarf: '#1254b2', k: 2 }], [0.4, 1.1, '#4d7fc5', { kid: true, k: 3 }], [1.4, 1.3, '#a157ab', { scarf: '#faad45' }], [2.6, 1.4, '#5aa469', { k: 1 }]]);
		const p = P(4.2, 16.8, zb); I.bubble(g, p[0], p[1] - 30); return [p[0] - 4, p[1] - 46]; } },
	{ zone: 'Bamako', sh: 'coutume', depth: 26, pin: true, draw: (g) => {
		const t = I.tree(g, 9.2, 17.2, zb, true);
		I.crowd(g, 8, 17.6, zb, [[0, 0, '#ffffff', { cap: '#ffffff', k: 1 }], [1.6, 0.8, '#f4efe6', { cap: '#7a5c3a' }], [2.4, -0.4, '#30ad96', { scarf: '#faad45', k: 2 }]]);
		return [t[0], t[1] - 6]; } },
	// Mopti
	{ zone: 'Mopti', sh: 'urtel', depth: 11.2, draw: (g) => { I.box(g, 9.4, 1.4, zb, 1.8, 1.8, 1.4, '#faad45'); I.tower(g, 10.3, 2.3, zb + 1.4, 4.6); } },
	{ zone: 'Mopti', sh: 'etat', depth: 14.6, draw: (g) => { I.box(g, 12.6, 1.4, zb, 2.4, 2, 2.2, '#efe8f8', { windows: true }); I.roof(g, 12.5, 1.3, zb + 2.2, 2.6, 2.2, 1.2, '#a157ab'); } },
	{ zone: 'Mopti', sh: 'osc', depth: 17.6, draw: (g) => { I.house(g, 16, 1.5, zb, '#30ad96'); } },
	{ zone: 'Mopti', sh: 'pop', depth: 15.6, draw: (g) => { I.crowd(g, 11, 4.4, zb, [[0, 0, '#e07a5f', { scarf: '#1254b2' }], [1, 0.1, '#30ad96', { k: 2 }], [2, -0.1, '#f2c55c', { scarf: '#a157ab', k: 1 }], [3, 0.2, '#4d7fc5', { k: 3 }]]); } },
	// Gao
	{ zone: 'Gao', sh: 'urtel', depth: 28.4, draw: (g) => { I.box(g, 18.4, 10, zb, 1.8, 1.8, 1.4, '#faad45'); I.tower(g, 19.3, 10.9, zb + 1.4, 4.8); } },
	{ zone: 'Gao', sh: 'etat', depth: 32.8, draw: (g) => { I.box(g, 22.4, 10, zb, 2.4, 2, 2.2, '#efe8f8', { windows: true }); I.roof(g, 22.3, 9.9, zb + 2.2, 2.6, 2.2, 1.2, '#a157ab'); } },
	{ zone: 'Gao', sh: 'osc', depth: 33.4, draw: (g) => { I.house(g, 19, 14.2, zb, '#30ad96'); } },
	{ zone: 'Gao', sh: 'coutume', depth: 38.2, draw: (g) => { I.tree(g, 25.6, 12.8, zb, true); I.crowd(g, 24.6, 13.4, zb, [[0, 0, '#ffffff', { cap: '#ffffff' }], [1.4, 0.8, '#30ad96', { scarf: '#f2c55c', k: 2 }]]); } },
	{ zone: 'Gao', sh: 'pop', depth: 38.8, draw: (g) => { I.crowd(g, 22.4, 16.2, zb, [[0, 0, '#a157ab', { scarf: '#30ad96' }], [1, 0.2, '#f2c55c', { k: 1 }], [2, -0.1, '#e07a5f', { scarf: '#1254b2', k: 3 }], [0.6, 1.1, '#4d7fc5', { kid: true, k: 2 }]]); } },
	{ zone: 'Gao', sh: 'medias', depth: 43.4, draw: (g) => { I.crowd(g, 25.8, 17.4, zb, [[0, 0, '#1254b2', { phone: true, k: 1 }]]); } }
];

/** Décalage [dx, dy] du numéro de chaque acteur par rapport à son point d'ancrage. */
const MARKER_OFF = {
	search: [-14, 2],
	bailleur: [8, 4],
	etat: [10, 0],
	urtel: [-14, 6],
	osc: [10, 0],
	medias: [10, 6],
	pop: [-6, 4],
	coutume: [12, 6]
};

/** Boîte englobante approximative d'une liste de formes (ignore les chemins). */
function bboxOf(shapes) {
	let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
	const add = (x, y) => {
		x = +x; y = +y;
		if (!isFinite(x) || !isFinite(y)) return;
		if (x < x0) x0 = x; if (x > x1) x1 = x;
		if (y < y0) y0 = y; if (y > y1) y1 = y;
	};
	for (const { tag, attrs: a } of shapes) {
		if (tag === 'polygon') a.points.split(' ').forEach((p) => add(...p.split(',')));
		else if (tag === 'circle') { add(a.cx - a.r, a.cy - a.r); add(+a.cx + +a.r, +a.cy + +a.r); }
		else if (tag === 'ellipse') { add(a.cx - a.rx, a.cy - a.ry); add(+a.cx + +a.rx, +a.cy + +a.ry); }
		else if (tag === 'rect') { add(a.x, a.y); add(+a.x + +a.width, +a.y + +a.height); }
		else if (tag === 'line') { add(a.x1, a.y1); add(a.x2, a.y2); }
	}
	return { x: x0, y: y0, w: x1 - x0, h: y1 - y0 };
}

export function buildScene() {
	// Socle, fleuve, zones
	const base = [];
	I.box(base, 0, 0, 0, 28, 20, 1, '#dfe8f3', { top: '#eef3f9', stroke: '#c2cfdf' });
	const river = [[0, 7.3], [6, 7.1], [12.6, 6.6], [16, 7.2], [20, 8.2], [28, 8.1]];
	const up = river.map(([x, y]) => P(x, y - 0.45, 1.01));
	const dn = river.map(([x, y]) => P(x, y + 0.45, 1.01)).reverse();
	base.push({ tag: 'polygon', attrs: { points: pts(up.concat(dn)), fill: '#9cc7ec', stroke: '#7fb2e0', 'stroke-width': 0.6 } });
	[
		{ x: 1, y: 8.5, w: 11.5, d: 10.8, c: '#cfe0f5' },
		{ x: 8.5, y: 0.8, w: 10, d: 5.2, c: '#fde3bf' },
		{ x: 17.6, y: 9.4, w: 9.6, d: 9.6, c: '#cdeee7' }
	].forEach((z) => I.box(base, z.x, z.y, 1, z.w, z.d, 0.5, z.c, { stroke: mix(z.c, -0.25) }));

	// Acteurs : chaque objet reçoit une zone de clic (boîte englobante élargie)
	const anchors = {};
	const zonesOf = {};
	const objs = [...OBJECTS]
		.sort((a, b) => a.depth - b.depth)
		.map((o, i) => {
			const shapes = [];
			const anchor = o.draw(shapes);
			if (o.pin && anchor) anchors[o.sh] = anchor;
			(zonesOf[o.sh] ||= new Set()).add(o.zone);
			const b = bboxOf(shapes), pad = 5;
			return { id: i, sh: o.sh, zone: o.zone, shapes, hit: { x: b.x - pad, y: b.y - pad, w: b.w + 2 * pad, h: b.h + 2 * pad }, top: [b.x + b.w / 2, b.y] };
		});

	// Réseau des radios URTEL : courbes entre antennes
	const A = P(2.8, 14.4, zb + 7.8), B = P(10.3, 2.3, zb + 6.2), C = P(19.3, 10.9, zb + 6.4);
	const net = [[A, B], [B, C], [A, C]].map(([p, q]) => {
		const mx = (p[0] + q[0]) / 2, my = Math.min(p[1], q[1]) - 40;
		return `M${p[0]},${p[1]} Q${mx},${my} ${q[0]},${q[1]}`;
	});

	// Noms de zones
	const zones = [
		['BAMAKO', 'District · toutes les communes', P(3.5, 19.6, 1.5), -62],
		['MOPTI', 'Chef-lieu de région', P(18.6, 1, 1.5), 8],
		['GAO', 'Chef-lieu de région', P(27.4, 15.5, 1.5), 8]
	].map(([name, sub, p, dx]) => ({ name, sub, x: p[0] + dx, y: p[1] + 14 }));

	// Numéros des acteurs (point d'ancrage décalé)
	const markers = Object.fromEntries(
		Object.entries(anchors).map(([k, p]) => {
			const [dx, dy] = MARKER_OFF[k] || [0, 0];
			return [k, [p[0] + dx, p[1] + dy]];
		})
	);

	return { base, objs, net, zones, markers, zonesOf: Object.fromEntries(Object.entries(zonesOf).map(([k, v]) => [k, [...v]])) };
}

/** Courbe entre deux points, bombée sur le côté gauche du trajet (deux sens = deux courbes distinctes). */
export function arc(a, b, bend = 0.22) {
	const dx = b[0] - a[0], dy = b[1] - a[1];
	const mx = (a[0] + b[0]) / 2 - dy * bend, my = (a[1] + b[1]) / 2 + dx * bend;
	// raccourcit l'extrémité pour laisser la place à la pointe de flèche et au numéro
	const L = Math.hypot(b[0] - mx, b[1] - my) || 1, k = 12 / L;
	const ex = b[0] - (b[0] - mx) * k, ey = b[1] - (b[1] - my) * k;
	const L0 = Math.hypot(mx - a[0], my - a[1]) || 1, k0 = 10 / L0;
	const sx = a[0] + (mx - a[0]) * k0, sy = a[1] + (my - a[1]) * k0;
	return { d: `M${sx},${sy} Q${mx},${my} ${ex},${ey}`, mid: [(sx + 2 * mx + ex) / 4, (sy + 2 * my + ey) / 4] };
}

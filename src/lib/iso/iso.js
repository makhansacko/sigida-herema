// Primitives isométriques.
// Chaque fonction pousse des descripteurs de formes { tag, attrs, text? } dans un tableau `g`.
// Le composant <Shapes> les rend en SVG. Cela garde le dessin déclaratif et facile à étendre.

export const C30 = Math.cos(Math.PI / 6);
export const S30 = 0.5;

/** Mélange une couleur hex vers le blanc (t > 0) ou le noir (t < 0). */
export function mix(hex, t) {
	const n = parseInt(hex.slice(1), 16);
	let r = n >> 16,
		gg = (n >> 8) & 255,
		b = n & 255;
	const tg = t > 0 ? 255 : 0,
		a = Math.abs(t);
	r = Math.round(r + (tg - r) * a);
	gg = Math.round(gg + (tg - gg) * a);
	b = Math.round(b + (tg - b) * a);
	return '#' + ((1 << 24) | (r << 16) | (gg << 8) | b).toString(16).slice(1);
}

export const pts = (a) => a.map((p) => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');

/** Crée une projection isométrique : (x, y, z) en unités de grille vers des coordonnées écran. */
export function projection(S, OX, OY) {
	return (x, y, z = 0) => [OX + (x - y) * C30 * S, OY + (x + y) * S30 * S - z * S];
}

const add = (g, tag, attrs, text) => g.push(text === undefined ? { tag, attrs } : { tag, attrs, text });

export function makeIso(P) {
	function box(g, x, y, z, w, d, h, col, opt = {}) {
		const top = [P(x, y, z + h), P(x + w, y, z + h), P(x + w, y + d, z + h), P(x, y + d, z + h)];
		const left = [P(x, y + d, z), P(x + w, y + d, z), P(x + w, y + d, z + h), P(x, y + d, z + h)];
		const right = [P(x + w, y, z), P(x + w, y + d, z), P(x + w, y + d, z + h), P(x + w, y, z + h)];
		const st = opt.stroke || mix(col, -0.35);
		const face = { stroke: st, 'stroke-width': 0.6, 'stroke-linejoin': 'round' };
		add(g, 'polygon', { points: pts(left), fill: mix(col, -0.08), ...face });
		add(g, 'polygon', { points: pts(right), fill: mix(col, -0.25), ...face });
		add(g, 'polygon', { points: pts(top), fill: opt.top || mix(col, 0.18), ...face });
		if (opt.windows) {
			const rows = Math.max(1, Math.floor(h / 1.3)),
				wc = '#dbe9fb';
			for (let r = 0; r < rows; r++) {
				const zz = z + 0.55 + r * 1.3;
				for (let i = 0; i < Math.floor(w); i++) {
					const xx = x + 0.3 + i;
					if (xx + 0.5 > x + w) break;
					add(g, 'polygon', { points: pts([P(xx, y + d, zz), P(xx + 0.5, y + d, zz), P(xx + 0.5, y + d, zz + 0.7), P(xx, y + d, zz + 0.7)]), fill: wc, opacity: 0.9 });
				}
				for (let i = 0; i < Math.floor(d); i++) {
					const yy = y + 0.3 + i;
					if (yy + 0.5 > y + d) break;
					add(g, 'polygon', { points: pts([P(x + w, yy, zz), P(x + w, yy + 0.5, zz), P(x + w, yy + 0.5, zz + 0.7), P(x + w, yy, zz + 0.7)]), fill: mix(wc, -0.15), opacity: 0.9 });
				}
			}
		}
		return P(x + w / 2, y + d / 2, z + h);
	}

	function roof(g, x, y, z, w, d, h, col) {
		const a = P(x + w / 2, y + d / 2, z + h),
			st = mix(col, -0.35);
		add(g, 'polygon', { points: pts([P(x, y + d, z), P(x + w, y + d, z), a]), fill: col, stroke: st, 'stroke-width': 0.6, 'stroke-linejoin': 'round' });
		add(g, 'polygon', { points: pts([P(x + w, y, z), P(x + w, y + d, z), a]), fill: mix(col, -0.2), stroke: st, 'stroke-width': 0.6, 'stroke-linejoin': 'round' });
		return a;
	}

	function house(g, x, y, z, col) {
		box(g, x, y, z, 2, 2, 1.6, '#f4efe6');
		// porte sur la face droite
		add(g, 'polygon', { points: pts([P(x + 2, y + 0.75, z), P(x + 2, y + 1.25, z), P(x + 2, y + 1.25, z + 0.95), P(x + 2, y + 0.75, z + 0.95)]), fill: '#8a6a4a' });
		return roof(g, x - 0.15, y - 0.15, z + 1.6, 2.3, 2.3, 1.4, col);
	}

	function tower(g, x, y, z, h) {
		const b = P(x, y, z),
			t = P(x, y, z + h),
			c = '#1254b2';
		add(g, 'line', { x1: b[0] - 7, y1: b[1], x2: t[0], y2: t[1], stroke: c, 'stroke-width': 1.4 });
		add(g, 'line', { x1: b[0] + 7, y1: b[1], x2: t[0], y2: t[1], stroke: c, 'stroke-width': 1.4 });
		for (let i = 1; i < 6; i++) {
			const f = i / 6,
				f2 = Math.min((i + 1) / 6, 1),
				ya = b[1] + (t[1] - b[1]) * f,
				yb = b[1] + (t[1] - b[1]) * f2,
				wa = 7 * (1 - f),
				wb = 7 * (1 - f2);
			add(g, 'line', { x1: b[0] - wa, y1: ya, x2: b[0] + wb, y2: yb, stroke: c, 'stroke-width': 0.7 });
			add(g, 'line', { x1: b[0] + wa, y1: ya, x2: b[0] - wb, y2: yb, stroke: c, 'stroke-width': 0.7 });
		}
		add(g, 'circle', { cx: t[0], cy: t[1] - 2, r: 2.4, fill: '#faad45', stroke: c, 'stroke-width': 0.8 });
		[7, 12].forEach((r, i) => {
			[-1, 1].forEach((sx) => {
				add(g, 'path', {
					d: `M ${t[0] + sx * r * 0.55} ${t[1] - 2 - r * 0.8} A ${r} ${r} 0 0 ${sx > 0 ? 1 : 0} ${t[0] + sx * r * 0.55} ${t[1] - 2 + r * 0.8}`,
					fill: 'none',
					stroke: '#faad45',
					'stroke-width': 1.4 - i * 0.3,
					'stroke-linecap': 'round'
				});
			});
		});
		return [t[0], t[1] - 2];
	}

	const SKIN = ['#7a4b2c', '#5e3a22', '#8d5a36', '#6b4428'];
	function person(g, x, y, z, col, o = {}) {
		const p = P(x, y, z),
			sk = SKIN[o.k || 0],
			hgt = o.kid ? 8 : 11;
		add(g, 'ellipse', { cx: p[0], cy: p[1], rx: 4, ry: 1.6, fill: 'rgba(0,0,0,.12)' });
		add(g, 'path', {
			d: `M${p[0] - 3.3},${p[1]} L${p[0] - 3.3},${p[1] - hgt + 3} Q${p[0] - 3.3},${p[1] - hgt} ${p[0]},${p[1] - hgt} Q${p[0] + 3.3},${p[1] - hgt} ${p[0] + 3.3},${p[1] - hgt + 3} L${p[0] + 3.3},${p[1]} Z`,
			fill: col,
			stroke: mix(col, -0.3),
			'stroke-width': 0.5
		});
		const hy = p[1] - hgt - 3.2;
		if (o.scarf) {
			add(g, 'circle', { cx: p[0], cy: hy, r: 3.6, fill: o.scarf });
			add(g, 'circle', { cx: p[0], cy: hy + 0.8, r: 2.3, fill: sk });
		} else add(g, 'circle', { cx: p[0], cy: hy, r: 2.9, fill: sk });
		if (o.cap) add(g, 'rect', { x: p[0] - 2.6, y: hy - 4.4, width: 5.2, height: 2.2, rx: 0.8, fill: o.cap });
		if (o.phone) {
			add(g, 'rect', { x: p[0] + 3.2, y: p[1] - hgt + 1.5, width: 2.6, height: 4, rx: 0.6, fill: '#1b2430' });
			add(g, 'rect', { x: p[0] + 3.6, y: p[1] - hgt + 2, width: 1.8, height: 2.6, fill: '#7fd3c4' });
		}
		if (o.mic) {
			add(g, 'line', { x1: p[0] + 3, y1: p[1] - hgt + 4, x2: p[0] + 6, y2: p[1] - hgt + 1, stroke: '#333', 'stroke-width': 1 });
			add(g, 'circle', { cx: p[0] + 6.3, cy: p[1] - hgt + 0.6, r: 1.4, fill: '#333' });
		}
		return [p[0], hy - 4];
	}

	/** spec : liste de [dx, dy, couleur, options] */
	function crowd(g, x, y, z, spec) {
		spec.forEach((s) => person(g, x + s[0], y + s[1], z, s[2], s[3] || {}));
	}

	function tree(g, x, y, z, wide) {
		const b = P(x, y, z);
		add(g, 'ellipse', { cx: b[0], cy: b[1], rx: wide ? 12 : 6, ry: wide ? 4.5 : 2.4, fill: 'rgba(0,0,0,.12)' });
		add(g, 'rect', { x: b[0] - 1.6, y: b[1] - 14, width: 3.2, height: 14, fill: '#8a6a4a', rx: 1 });
		add(g, 'ellipse', { cx: b[0], cy: b[1] - 17, rx: wide ? 17 : 8, ry: wide ? 7.5 : 8, fill: '#5aa469' });
		add(g, 'ellipse', { cx: b[0] - 3, cy: b[1] - 19.5, rx: wide ? 10 : 5, ry: wide ? 4 : 5, fill: '#7cc08a' });
		return [b[0], b[1] - 26];
	}

	function bubble(g, cx, cy) {
		add(g, 'path', {
			d: `M${cx - 13},${cy - 9} h26 a4,4 0 0 1 4,4 v8 a4,4 0 0 1 -4,4 h-17 l-5,5 l1,-5 h-5 a4,4 0 0 1 -4,-4 v-8 a4,4 0 0 1 4,-4 z`,
			fill: '#fff',
			stroke: '#1254b2',
			'stroke-width': 1
		});
		[-6, 0, 6].forEach((dx) => add(g, 'circle', { cx: cx + dx, cy: cy - 1, r: 1.6, fill: '#30ad96' }));
	}

	/** Drapeau belge sur un mât. */
	function flag(g, p) {
		add(g, 'line', { x1: p[0], y1: p[1], x2: p[0], y2: p[1] - 18, stroke: '#555', 'stroke-width': 1 });
		['#1b1b1b', '#f6d04d', '#e0322f'].forEach((c, i) => add(g, 'rect', { x: p[0] + i * 3.4, y: p[1] - 18, width: 3.4, height: 7, fill: c }));
	}

	return { box, roof, house, tower, person, crowd, tree, bubble, flag };
}

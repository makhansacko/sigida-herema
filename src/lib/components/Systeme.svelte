<script>
	import { W, H, COLS, NODES, LINKS, SRC, nodeById, chainOf } from '$lib/data/systeme.js';
	import { STAKE, INTER } from '$lib/data/projet.js';
	import { vignette, viewBoxOf } from '$lib/iso/vignettes.js';
	import { sys } from '$lib/state.svelte.js';
	import Shapes from './Shapes.svelte';
	import SysIcon from './SysIcon.svelte';

	const interById = Object.fromEntries(INTER.map((i) => [i.id, i]));

	/** Libellé d'un nœud, où qu'il soit défini. */
	const labelOf = (n) => (n.kind === 'acteur' ? STAKE[n.id].name : n.kind === 'inter' ? interById[n.id].name : n.label);

	/** Coupe un texte en lignes d'au plus `max` caractères. */
	function lines(text, max, limit = 4) {
		const out = [];
		let cur = '';
		for (const w of text.split(' ')) {
			if (cur && (cur + ' ' + w).length > max) {
				out.push(cur);
				cur = w;
			} else cur = cur ? cur + ' ' + w : w;
		}
		if (cur) out.push(cur);
		return out.slice(0, limit);
	}

	const firstNum = (n) => n.m?.find((x) => x.c != null);

	// ---------- Géométrie des nœuds ----------
	const SIZE = { acteur: [210, 84], inter: [220, 76], effet: [232, 0], change: [232, 0], objectif: [236, 0], contexte: [226, 54] };
	const geo = Object.fromEntries(
		NODES.map((n) => {
			let [w, h] = SIZE[n.kind];
			let ls;
			if (n.kind === 'acteur') ls = lines(STAKE[n.id].name, 17, 3);
			else if (n.kind === 'inter') ls = lines(interById[n.id].name, 19, 2);
			else if (n.kind === 'contexte') ls = lines(n.label, 30, 2);
			else ls = lines(n.label, n.kind === 'objectif' ? 30 : 30, 3);
			if (!h) h = 22 + ls.length * 16 + (n.m ? 26 : 4);
			return [n.id, { x: n.x - w / 2, y: n.y - h / 2, w, h, cx: n.x, cy: n.y, ls }];
		})
	);

	// ---------- Géométrie des liens (ports répartis sur les bords) ----------
	const isCtx = (t) => ['frein', 'hypothese', 'adapte'].includes(t);
	const vertical = (a, b) => Math.abs(geo[a].cx - geo[b].cx) < 20;

	function ports() {
		const outs = {}, ins = {};
		LINKS.forEach((l, i) => {
			const [a, b, t] = l;
			if (isCtx(t) || vertical(a, b)) return;
			(outs[a] ||= []).push(i);
			(ins[b] ||= []).push(i);
		});
		const pos = {};
		const spread = (list, node, end, other) => {
			const g = geo[node];
			list.sort((i, j) => geo[LINKS[i][other]].cy - geo[LINKS[j][other]].cy);
			const n = list.length, step = Math.min(13, (g.h * 0.7) / Math.max(n - 1, 1));
			list.forEach((i, k) => ((pos[i] ||= {})[end] = g.cy + (k - (n - 1) / 2) * step));
		};
		for (const [node, list] of Object.entries(outs)) spread(list, node, 'from', 1);
		for (const [node, list] of Object.entries(ins)) spread(list, node, 'to', 0);
		return pos;
	}
	const P = ports();

	const paths = LINKS.map((l, i) => {
		const [a, b, t] = l;
		const A = geo[a], B = geo[b];
		let d, mid;
		if (isCtx(t)) {
			const x1 = A.cx, y1 = A.y, x2 = B.cx + (A.cx < B.cx ? -30 : 30) * 0, y2 = B.y + B.h + 6;
			const k = (y1 - y2) * 0.5;
			d = `M${x1},${y1} C${x1},${y1 - k} ${x2},${y2 + k} ${x2},${y2}`;
			mid = [(x1 + x2) / 2, (y1 + y2) / 2];
		} else if (vertical(a, b)) {
			const down = B.cy > A.cy;
			const y1 = down ? A.y + A.h : A.y, y2 = down ? B.y - 6 : B.y + B.h + 6;
			d = `M${A.cx},${y1} L${B.cx},${y2}`;
			mid = [A.cx, (y1 + y2) / 2];
		} else {
			const x1 = A.x + A.w, y1 = P[i].from, x2 = B.x - 6, y2 = P[i].to;
			const k = (x2 - x1) * 0.5;
			d = `M${x1},${y1} C${x1 + k},${y1} ${x2 - k},${y2} ${x2},${y2}`;
			mid = [(x1 + x2) / 2, (y1 + y2) / 2];
		}
		return { i, a, b, t, d, mid };
	});

	// ---------- Interaction ----------
	let hover = $state(null);
	let lens = $state('all');
	const LENSES = [
		['all', 'Tout'],
		['os1', 'Objectif 1 · acteurs'],
		['os2', 'Objectif 2 · public'],
		['mesure', 'Ce qui est mesuré'],
		['ctx', 'Contexte et hypothèses']
	];

	const focus = $derived(hover ?? sys.sel);
	const showCtx = $derived(lens === 'ctx' || (focus && nodeById[focus]?.kind === 'contexte'));

	const active = $derived.by(() => {
		if (focus) return chainOf(focus, { withContext: showCtx });
		if (lens === 'os1') return chainOf('os1', { withContext: false });
		if (lens === 'os2') return chainOf('os2', { withContext: false });
		if (lens === 'mesure') return new Set(NODES.filter((n) => n.m).map((n) => n.id));
		if (lens === 'ctx') {
			const s = new Set();
			for (const [a, b, t] of LINKS) if (isCtx(t)) (s.add(a), s.add(b));
			return s;
		}
		return null;
	});
	const linkOn = (p) => (isCtx(p.t) ? showCtx && (!active || (active.has(p.a) && active.has(p.b))) : !active || (active.has(p.a) && active.has(p.b)));

	function select(id) {
		sys.sel = sys.sel === id ? null : id;
	}
	function key(e, id) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			select(id);
		}
		if (e.key === 'Escape') sys.sel = null;
	}

	// ---------- Panneau ----------
	const sel = $derived(sys.sel ? nodeById[sys.sel] : null);
	const up = $derived(sel ? LINKS.filter((l) => l[1] === sel.id).map((l) => nodeById[l[0]]) : []);
	const down = $derived(sel ? LINKS.filter((l) => l[0] === sel.id).map((l) => nodeById[l[1]]) : []);
	const KIND = { acteur: 'Acteur', inter: 'Intervention', effet: 'Effet immédiat', change: 'Changement visé', objectif: 'Objectif', contexte: 'Contexte' };
</script>

<section id="systeme">
	<h2 class="sh">Le système <span>du projet</span></h2>
	<p class="intro">
		Comment le projet est censé produire du changement, de gauche à droite : <b>qui agit</b>, par quelles <b>interventions</b>, ce
		qu'elles <b>produisent</b>, les <b>changements visés</b> et les <b>objectifs</b>. Chaque effet indique <b>comment il sera mesuré</b>.
		Survolez ou cliquez un élément pour suivre sa chaîne complète.
	</p>

	<div class="sys-bar">
		<span class="lab">Lecture</span>
		{#each LENSES as [id, t]}
			<button class="chip" aria-pressed={lens === id} onclick={() => ((lens = id), (sys.sel = null))}>{t}</button>
		{/each}
	</div>

	<div class="sys-wrap">
		<svg class="sysmap" viewBox="0 0 {W} {H}" role="group" aria-label="Carte systémique du projet Sigida Herema">
			<defs>
				{#each ['on', 'off', 'frein', 'adapte'] as m}
					<marker id="sm-{m}" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
						<path d="M0,1 L9,5 L0,9 z" class="sm-{m}" />
					</marker>
				{/each}
			</defs>

			<!-- Colonnes -->
			{#each COLS as c, i}
				<g class="col">
					{#if i > 0}<line x1={c.x - 140} x2={c.x - 140} y1="62" y2={H - 110} />{/if}
					<text x={c.x} y="26" class="col-l" text-anchor="middle">{c.label}</text>
					<text x={c.x} y="44" class="col-s" text-anchor="middle">{c.sub.toUpperCase()}</text>
				</g>
			{/each}
			<line class="ctx-sep" x1="30" x2={W - 30} y1={H - 102} y2={H - 102} />
			<text class="col-s" x="30" y={H - 112}>CONTEXTE, ADAPTATION ET HYPOTHÈSE</text>

			<!-- Liens -->
			{#each paths as p (p.i)}
				{#if !isCtx(p.t) || showCtx}
					{@const on = linkOn(p)}
					<path
						class="lk {p.t}"
						class:on={on && !!active}
						class:dim={!on}
						d={p.d}
						marker-end="url(#sm-{p.t === 'frein' ? 'frein' : p.t === 'adapte' ? 'adapte' : on && active ? 'on' : 'off'})"
					/>
					{#if isCtx(p.t)}
						<g class="sgn {p.t}" transform="translate({p.mid[0]},{p.mid[1]})">
							<circle r="8" />
							<text text-anchor="middle" dy="3.8">{p.t === 'frein' ? '−' : p.t === 'adapte' ? '+' : '?'}</text>
						</g>
					{/if}
				{/if}
			{/each}

			<!-- Nœuds -->
			{#each NODES as n (n.id)}
				{@const g = geo[n.id]}
				{@const fm = firstNum(n)}
				<g
					class="nd {n.kind} os{n.os ?? ''} {n.sub ?? ''}"
					class:dim={active && !active.has(n.id)}
					class:sel={sys.sel === n.id}
					transform="translate({g.x},{g.y})"
					role="button"
					tabindex="0"
					aria-label={labelOf(n)}
					onclick={() => select(n.id)}
					onkeydown={(e) => key(e, n.id)}
					onpointerenter={() => (hover = n.id)}
					onpointerleave={() => (hover = null)}
				>
					<rect class="box" width={g.w} height={g.h} rx="8" />
					{#if n.kind === 'acteur'}
						<svg x="4" y="4" width="76" height={g.h - 8} viewBox={viewBoxOf(n.id)} preserveAspectRatio="xMidYMid meet"><Shapes shapes={vignette(n.id)} /></svg>
						{#each g.ls as t, k}<text x="86" y={g.h / 2 + (k - (g.ls.length - 1) / 2) * 15 + 5} class="t">{t}</text>{/each}
					{:else if n.kind === 'inter'}
						<rect class="band" width="5" height={g.h} rx="2" />
						<g transform="translate(34,{g.h / 2})"><SysIcon id={n.id} /></g>
						<text x="66" y="22" class="code">{interById[n.id].res}</text>
						{#each g.ls as t, k}<text x="66" y={41 + k * 15} class="t b">{t}</text>{/each}
					{:else if n.kind === 'contexte'}
						<text x="14" y="20" class="code">{n.sub === 'frein' ? 'Frein' : n.sub === 'adapte' || n.sub === 'adaptation' ? 'Adaptation' : 'Hypothèse'}</text>
						{#each g.ls as t, k}<text x="14" y={37 + k * 14} class="t s">{t}</text>{/each}
					{:else}
						<rect class="band" width="5" height={g.h} rx="2" />
						{#each g.ls as t, k}<text x="16" y={24 + k * 16} class="t {n.kind === 'objectif' ? 'b' : ''}">{t}</text>{/each}
						{#if n.m}
							{@const yb = g.h - 18}
							<g transform="translate(16,{yb})" class="meas">
								<path d="M0,-4 h12 M0,0 h12 M0,4 h12 M3,-4 v3 M6,-4 v5 M9,-4 v3" class="ruler" />
								{#if fm}
									<line x1="20" x2="140" y1="0" y2="0" class="tr" />
									{#if fm.b != null}<line x1={20 + fm.b * 1.2} x2={20 + fm.c * 1.2} y1="0" y2="0" class="gp" /><circle cx={20 + fm.b * 1.2} cy="0" r="3.5" class="db" />{/if}
									<circle cx={20 + fm.c * 1.2} cy="0" r="3.5" class="dc" />
									<text x="148" y="3.5" class="mt">{fm.b != null ? `${fm.b} → ${fm.c} %` : `cible ${fm.c} %`}</text>
								{:else}
									<text x="20" y="3.5" class="mt">{n.m.length} mesure{n.m.length > 1 ? 's' : ''} · base à établir</text>
								{/if}
							</g>
						{/if}
					{/if}
				</g>
			{/each}
		</svg>
	</div>

	<div class="sys-legend">
		<span><i class="l-act"></i>Participe à</span>
		<span><i class="l-cause"></i>Contribue à</span>
		<span><i class="l-frein"></i>Frein (contexte)</span>
		<span><i class="l-adapte"></i>Adaptation</span>
		<span><i class="sw os1"></i>Objectif 1</span>
		<span><i class="sw os2"></i>Objectif 2</span>
		<span>Jauge : valeur de base → cible</span>
	</div>

	{#if sel}
		<aside class="drawer" aria-live="polite">
			<button class="close" onclick={() => (sys.sel = null)} aria-label="Fermer">×</button>
			<p class="kick">{KIND[sel.kind]}{sel.kind === 'inter' ? ' · ' + interById[sel.id].res : ''}</p>
			<h3>{labelOf(sel)}</h3>

			{#if sel.kind === 'acteur'}
				{@const s = STAKE[sel.id]}
				<p class="muted">{s.tag}</p>
				<p>{s.role}</p>
				{#if down.length}
					<div><p class="kick">Participe à</p><div class="chips">{#each down as d}<button class="chip" onclick={() => select(d.id)}>{labelOf(d)}</button>{/each}</div></div>
				{/if}
				<div class="force"><p class="kick">Méthodes de collecte auprès de cet acteur</p><p>{s.collecte}</p></div>
			{:else if sel.kind === 'inter'}
				{@const it = interById[sel.id]}
				<p>{it.desc}</p>
				<ol class="chain">
					<li><span class="step">Qui agit</span><div class="chips">{#each up.filter((d) => d.kind === 'acteur') as d}<button class="chip" onclick={() => select(d.id)}>{STAKE[d.id].short}</button>{/each}</div></li>
					{#each up.filter((d) => d.kind === 'contexte') as d}<li><span class="step">Adaptation</span><p>{d.what} <button class="link small" onclick={() => select(d.id)}>Voir →</button></p></li>{/each}
					<li><span class="step">Ce que ça produit</span><div class="chips">{#each down as d}<button class="chip" onclick={() => select(d.id)}>{labelOf(d)}</button>{/each}</div></li>
					<li><span class="step">Changement attendu</span><p><b>{it.change}</b></p></li>
					<li>
						<span class="step">Comment le mesurer</span>
						<ul class="blist">{#each down.flatMap((d) => d.m || []) as m}<li>{m.ind} <span class="muted">· {SRC[m.src]}</span></li>{/each}</ul>
					</li>
				</ol>
			{:else}
				<p>{sel.what}</p>
				{#if sel.m}
					<div>
						<p class="kick">Comment on le mesure</p>
						<div class="mlist">
							{#each sel.m as m}
								<div class="m">
									<p>{m.ind}</p>
									{#if m.c != null}
										<div class="gauge"><div class="tr"></div>{#if m.b != null}<div class="gp" style="left:{m.b}%;width:{m.c - m.b}%"></div><div class="dt b" style="left:{m.b}%"></div>{/if}<div class="dt c" style="left:{m.c}%"></div></div>
										<div class="gv">Base <b>{m.b != null ? m.b + ' %' : 'NA'}</b> · Cible <b>{m.c} %</b> · Finale <b>à mesurer</b></div>
									{:else}
										<div class="gv">Base <b>à établir</b> · valeur finale <b>à mesurer</b></div>
									{/if}
									<p class="muted">{SRC[m.src]}</p>
								</div>
							{/each}
						</div>
					</div>
				{/if}
				{#if sel.check}<div class="force"><p class="kick">À vérifier pendant l'évaluation</p><p>{sel.check}</p></div>{/if}
				{#if up.length}
					<div><p class="kick">{sel.kind === 'contexte' ? '' : 'Vient de'}</p><div class="chips">{#each up as d}<button class="chip" onclick={() => select(d.id)}>{labelOf(d)}</button>{/each}</div></div>
				{/if}
				{#if down.length}
					<div><p class="kick">{sel.kind === 'contexte' ? 'Agit sur' : 'Contribue à'}</p><div class="chips">{#each down as d}<button class="chip" onclick={() => select(d.id)}>{labelOf(d)}</button>{/each}</div></div>
				{/if}
			{/if}
		</aside>
	{:else}
		<p class="muted sys-hint">Astuce : cliquez sur une intervention pour voir qui la porte, ce qu'elle produit, le changement attendu et sa mesure. Échap ferme le panneau.</p>
	{/if}
</section>

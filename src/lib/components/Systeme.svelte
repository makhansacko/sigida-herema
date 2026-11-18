<script>
	import { W, H, COLS, NODES, LINKS, SRC, CTX_TYPES, TARGET_CHANGES, PIF_THEMES, nodeById, chainOf } from '$lib/data/systeme.js';
	import { STAKE, FAMILY, TINT, FAMILY_LABEL } from '$lib/data/projet.js';
	import { vignette, viewBoxOf } from '$lib/iso/vignettes.js';
	import { sys } from '$lib/state.svelte.js';
	import Shapes from './Shapes.svelte';
	import SysIcon from './SysIcon.svelte';

	const ACTOR_KINDS = ['pilote', 'porteur', 'cible'];
	const isActor = (n) => ACTOR_KINDS.includes(n.kind);
	const labelOf = (n) => (isActor(n) ? STAKE[n.id].name : n.label);
	const shortOf = (id) => STAKE[id]?.short ?? nodeById[id]?.label ?? id;

	/** Coupe un texte en lignes d'au plus `max` caractères. */
	function lines(text, max, limit = 3) {
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

	// Vignettes isométriques (calculées une fois)
	const vign = Object.fromEntries(NODES.filter(isActor).map((n) => [n.id, vignette(n.id)]));
	const mini = Object.fromEntries(Object.keys(STAKE).map((k) => [k, vignette(k)]));
	// Vignettes du panneau : même teinte de socle que dans « Les acteurs clés »
	const tinted = Object.fromEntries(Object.keys(STAKE).map((k) => [k, vignette(k, TINT[FAMILY[k]])]));

	// ---------- Géométrie des nœuds ----------
	const geo = Object.fromEntries(
		NODES.map((n) => {
			let w, h, ls;
			switch (n.kind) {
				case 'pilote':
					(w = 190), (ls = lines(STAKE[n.id].name, 14)), (h = 96);
					break;
				case 'porteur':
					(w = 214), (ls = lines(STAKE[n.id].name, 15)), (h = 112);
					break;
				case 'cible':
					(w = 236), (ls = lines(STAKE[n.id].name, 26, 2)), (h = 50);
					break;
				case 'appui':
					(w = 214), (ls = lines(n.label, 19)), (h = 30 + ls.length * 15 + 22);
					break;
				case 'inter':
					(w = 214), (ls = lines(n.label, 19, 2)), (h = 36 + ls.length * 15 + 34);
					break;
				case 'change':
					(w = 236), (ls = lines(n.label, 30, 2)), (h = 20 + ls.length * 15 + 28);
					break;
				case 'objectif':
					(w = 214), (ls = lines(n.label, 26)), (h = 22 + ls.length * 16 + (n.m ? 26 : 6));
					break;
				default:
					(w = 236), (ls = lines(n.label, 32, 2)), (h = 54);
			}
			return [n.id, { x: n.x - w / 2, y: n.y - h / 2, w, h, cx: n.x, cy: n.y, ls }];
		})
	);

	// ---------- Liens ----------
	const isCtx = (t) => CTX_TYPES.includes(t);
	const vertical = (a, b) => Math.abs(geo[a].cx - geo[b].cx) < 20;
	const P = (() => {
		const outs = {}, ins = {}, pos = {};
		LINKS.forEach(([a, b, t], i) => {
			if (isCtx(t) || vertical(a, b)) return;
			(outs[a] ||= []).push(i);
			(ins[b] ||= []).push(i);
		});
		const spread = (list, node, end, other) => {
			const g = geo[node];
			list.sort((i, j) => geo[LINKS[i][other]].cy - geo[LINKS[j][other]].cy);
			const n = list.length, step = Math.min(12, (g.h * 0.7) / Math.max(n - 1, 1));
			list.forEach((i, k) => ((pos[i] ||= {})[end] = g.cy + (k - (n - 1) / 2) * step));
		};
		for (const [node, l] of Object.entries(outs)) spread(l, node, 'from', 1);
		for (const [node, l] of Object.entries(ins)) spread(l, node, 'to', 0);
		return pos;
	})();
	const paths = LINKS.map(([a, b, t], i) => {
		const A = geo[a], B = geo[b];
		let d, mid;
		if (isCtx(t)) {
			const x1 = A.cx, y1 = A.y, x2 = B.cx, y2 = B.y + B.h + 6, k = (y1 - y2) * 0.5;
			d = `M${x1},${y1} C${x1},${y1 - k} ${x2},${y2 + k} ${x2},${y2}`;
			mid = [(x1 + x2) / 2, (y1 + y2) / 2];
		} else if (vertical(a, b)) {
			const down = B.cy > A.cy, y1 = down ? A.y + A.h : A.y, y2 = down ? B.y - 6 : B.y + B.h + 6;
			d = `M${A.cx},${y1} L${B.cx},${y2}`;
			mid = [A.cx, (y1 + y2) / 2];
		} else {
			const x1 = A.x + A.w, y1 = P[i].from, x2 = B.x - 6, y2 = P[i].to, k = (x2 - x1) * 0.5;
			d = `M${x1},${y1} C${x1 + k},${y1} ${x2 - k},${y2} ${x2},${y2}`;
			mid = [(x1 + x2) / 2, (y1 + y2) / 2];
		}
		return { i, a, b, t, d, mid };
	});

	// Bandes de fond des trois familles
	const bandOf = (fam) => {
		const cs = COLS.filter((c) => c.fam === fam);
		return { x1: cs[0].x - 122, x2: cs[cs.length - 1].x + 122 };
	};
	const BANDS = [
		{ fam: 'pil', ...bandOf('pil') },
		{ fam: 'voix', ...bandOf('voix') },
		{ fam: 'cible', ...bandOf('cible') }
	];

	// ---------- Interaction ----------
	let hover = $state(null);
	let lens = $state('all');
	const LENSES = [
		['all', 'Tout'],
		['os1', 'Objectif 1 · acteurs'],
		['os2', 'Objectif 2 · public'],
		['mesure', 'Ce qui est mesuré'],
		['pif', 'Thèmes du PIF'],
		['ctx', 'Contexte et hypothèse']
	];
	const focus = $derived(hover ?? sys.sel);
	const showCtx = $derived(lens === 'ctx' || (focus && nodeById[focus]?.kind === 'contexte'));
	const active = $derived.by(() => {
		if (focus) return chainOf(focus, { withContext: showCtx });
		if (lens === 'os1') return chainOf('os1', { withContext: false });
		if (lens === 'os2') return chainOf('os2', { withContext: false });
		if (lens === 'mesure') return new Set(NODES.filter((n) => n.m && n.kind !== 'appui').map((n) => n.id));
		if (lens === 'pif') return new Set(NODES.filter((n) => n.pif).map((n) => n.id));
		if (lens === 'ctx') {
			const s = new Set();
			for (const [a, b, t] of LINKS) if (isCtx(t)) (s.add(a), s.add(b));
			return s;
		}
		return null;
	});
	const linkOn = (p) => (!isCtx(p.t) || showCtx) && (!active || (active.has(p.a) && active.has(p.b)));

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
	const interOf = (id) => NODES.filter((n) => n.kind === 'inter' && n.who.some(([w]) => w === id));
	const KIND = {
		pilote: 'Ceux qui pilotent',
		appui: 'Activités du projet',
		porteur: 'Ceux qui portent la voix',
		inter: 'Intervention',
		cible: 'Ceux que le projet veut atteindre',
		change: 'Changement visé',
		objectif: 'Objectif',
		contexte: 'Contexte'
	};
</script>

{#snippet measures(list)}
	<div class="mlist">
		{#each list as m}
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
{/snippet}

{#snippet chips(list)}
	<div class="chips">
		{#each list as d}
			<button class="chip" class:actor-chip={isActor(d)} onclick={() => select(d.id)}>
				{#if isActor(d)}<svg viewBox={viewBoxOf(d.id)} aria-hidden="true"><Shapes shapes={tinted[d.id]} /></svg>{/if}{isActor(d) ? shortOf(d.id) : d.label}
			</button>
		{/each}
	</div>
{/snippet}

<section id="systeme">
	<h2 class="sh">Le modèle logique <span>du projet</span></h2>
	<p class="intro">
		De gauche à droite : les <b>activités du projet</b> qui appuient <b>ceux qui portent la voix</b>, les <b>interventions</b> par
		lesquelles ils atteignent <b>les cibles</b>, ce qui doit changer chez ces cibles, et comment cela mène aux <b>objectifs</b>.
		Chaque changement indique comment il sera mesuré. Survolez ou cliquez un élément pour suivre sa chaîne.
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
				{#each ['on', 'off', 'frein'] as m}
					<marker id="sm-{m}" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
						<path d="M0,1 L9,5 L0,9 z" class="sm-{m}" />
					</marker>
				{/each}
			</defs>

			<!-- Familles -->
			{#each BANDS as b}
				<rect class="fam {b.fam}" x={b.x1} y="8" width={b.x2 - b.x1} height={H - 112} rx="14" />
			{/each}
			{#each COLS as c}
				<text x={c.x} y="34" class="col-l" text-anchor="middle">{c.label}</text>
				<text x={c.x} y="51" class="col-s" text-anchor="middle">{c.sub.toUpperCase()}</text>
			{/each}
			<text class="col-s" x="30" y={H - 86}>CONTEXTE ET HYPOTHÈSE</text>

			<!-- Liens -->
			{#each paths as p (p.i)}
				{#if !isCtx(p.t) || showCtx}
					{@const on = linkOn(p)}
					<path class="lk {p.t}" class:on={on && !!active} class:dim={!on} d={p.d} marker-end="url(#sm-{p.t === 'frein' ? 'frein' : on && active ? 'on' : 'off'})" />
					{#if isCtx(p.t)}
						<g class="sgn {p.t}" transform="translate({p.mid[0]},{p.mid[1]})"><circle r="8" /><text text-anchor="middle" dy="3.8">{p.t === 'frein' ? '−' : '?'}</text></g>
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
					<rect class="box" width={g.w} height={g.h} rx="9" />
					{#if lens === 'pif' && n.pif}
						{@const th = PIF_THEMES[n.pif]}
						{@const tw = th.label.length * 6 + 16}
						<rect class="pif-ring" width={g.w} height={g.h} rx="9" style="stroke:{th.color}" />
						<g transform="translate({g.w - tw - 6},-8)"><rect width={tw} height="16" rx="8" style="fill:{th.color}" /><text x={tw / 2} y="11.5" text-anchor="middle" class="pif-t">{th.label}</text></g>
					{/if}

					{#if n.kind === 'pilote' || n.kind === 'porteur'}
						{@const vh = n.kind === 'pilote' ? g.h - 8 : 70}
						<svg x="4" y="4" width="78" height={vh} viewBox={viewBoxOf(n.id)}><Shapes shapes={vign[n.id]} /></svg>
						{#each g.ls as t, k}<text x="86" y={(n.kind === 'pilote' ? g.h / 2 : 40) + (k - (g.ls.length - 1) / 2) * 15 + 4} class="t b">{t}</text>{/each}
						{#if n.kind === 'porteur'}
							<line x1="10" x2={g.w - 10} y1="80" y2="80" class="sep" />
							<g transform="translate(12,96)" class="meas">
								<path d="M0,-4 h12 M0,0 h12 M0,4 h12 M3,-4 v3 M6,-4 v5 M9,-4 v3" class="ruler" />
								{#if fm}
									<line x1="20" x2="128" y1="0" y2="0" class="tr" />
									<line x1={20 + fm.b * 1.08} x2={20 + fm.c * 1.08} y1="0" y2="0" class="gp" /><circle cx={20 + fm.b * 1.08} cy="0" r="3.5" class="db" />
									<circle cx={20 + fm.c * 1.08} cy="0" r="3.5" class="dc" />
									<text x="136" y="3.5" class="mt">{fm.b} → {fm.c} %</text>
								{:else}
									<text x="20" y="3.5" class="mt">{n.m.length} mesure{n.m.length > 1 ? 's' : ''} · à établir</text>
								{/if}
							</g>
						{/if}
					{:else if n.kind === 'cible'}
						<rect class="band" width={g.w} height="5" rx="2" />
						<svg x="6" y="5" width="46" height="44" viewBox={viewBoxOf(n.id)}><Shapes shapes={vign[n.id]} /></svg>
						{#each g.ls as t, k}<text x="58" y={g.h / 2 + 5 + (k - (g.ls.length - 1) / 2) * 15} class="t b">{t}</text>{/each}
					{:else if n.kind === 'appui' || n.kind === 'inter'}
						<rect class="band" width="5" height={g.h} rx="2" />
						<g transform="translate(32,{n.kind === 'inter' ? 34 : g.h / 2 - 4})"><SysIcon id={n.icon} /></g>
						<text x="62" y="22" class="code">{n.kind === 'inter' ? n.res : 'Search'}</text>
						{#each g.ls as t, k}<text x="62" y={39 + k * 15} class="t b">{t}</text>{/each}
						{#if n.kind === 'inter'}
							<!-- acteurs impliqués -->
							{@const yy = g.h - 30}
							<line x1="10" x2={g.w - 10} y1={yy - 4} y2={yy - 4} class="sep" />
							{#each n.who as [w], k}
								<svg x={10 + k * 32} y={yy - 2} width="30" height="28" viewBox={viewBoxOf(w)}><Shapes shapes={mini[w]} /></svg>
							{/each}
							<text x={14 + n.who.length * 32} y={yy + 16} class="mt">{n.who.length} acteurs</text>
						{:else}
							{@const tgt = LINKS.filter((l) => l[0] === n.id)}
							<text x="62" y={g.h - 10} class="mt">→ {tgt.length > 1 ? `${tgt.length} porteurs de voix` : shortOf(tgt[0][1])}</text>
						{/if}
					{:else if n.kind === 'contexte'}
						<text x="14" y="20" class="code">{n.sub === 'frein' ? 'Frein' : 'Hypothèse'}</text>
						{#each g.ls as t, k}<text x="14" y={37 + k * 14} class="t s">{t}</text>{/each}
					{:else}
						<rect class="band" width="5" height={g.h} rx="2" />
						{#each g.ls as t, k}<text x="16" y={22 + k * 15} class="t {n.kind === 'objectif' ? 'b' : ''}">{t}</text>{/each}
						{#if n.m}
							<g transform="translate(16,{g.h - 16})" class="meas">
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

	{#if lens === 'pif'}
		<div class="pif-legend">
			{#each Object.values(PIF_THEMES) as th}<span><i style="background:{th.color}"></i><b>{th.label}</b> {th.q}</span>{/each}
			<span class="muted">Le PIF classe les changements en 5 thèmes ; il ne change ni la mesure ni le dispositif d’évaluation.</span>
		</div>
	{/if}
	<div class="sys-legend">
		<span><i class="sw pil"></i>Ceux qui pilotent</span>
		<span><i class="sw voix"></i>Ceux qui portent la voix</span>
		<span><i class="sw cible"></i>Ceux que le projet veut atteindre</span>
		<span><i class="l-frein"></i>Frein (contexte)</span>
		<span>Jauge : valeur de base → cible</span>
	</div>

	{#if sel}
		<aside class="drawer" aria-live="polite">
			<button class="close" onclick={() => (sys.sel = null)} aria-label="Fermer">×</button>
			{#if sel.pif}<p class="pif-line" style="border-color:{PIF_THEMES[sel.pif].color}">PIF · <b>{PIF_THEMES[sel.pif].label}</b> · {PIF_THEMES[sel.pif].q}</p>{/if}
			{#if isActor(sel)}
				<div class="dr-head">
					<svg viewBox={viewBoxOf(sel.id)} aria-hidden="true"><Shapes shapes={tinted[sel.id]} /></svg>
					<div>
						<p class="kick">{FAMILY_LABEL[FAMILY[sel.id]]}</p>
						<h3>{labelOf(sel)}</h3>
						<p class="muted">{STAKE[sel.id].tag}</p>
					</div>
				</div>
			{:else}
				<p class="kick">{KIND[sel.kind]}{sel.res ? ' · ' + sel.res : ''}</p>
				<h3>{labelOf(sel)}</h3>
			{/if}

			{#if sel.kind === 'pilote'}
				<p>{STAKE[sel.id].role}</p>
				{#if sel.id === 'search'}
					<div><p class="kick">Activités du projet pour appuyer ceux qui portent la voix</p>{@render chips(down)}</div>
					<div><p class="kick">Interventions que Search facilite directement</p>{@render chips(interOf('search'))}</div>
				{:else}
					<div><p class="kick">Finance</p>{@render chips(down)}</div>
				{/if}
				<div class="force"><p class="kick">Méthodes de collecte auprès de cet acteur</p><p>{STAKE[sel.id].collecte}</p></div>
			{:else if sel.kind === 'appui'}
				<p>{sel.what}</p>
				<div><p class="kick">Pour qui</p>{@render chips(down)}</div>
				<div><p class="kick">Suivi de l'appui</p>{@render measures(sel.m)}</div>
				{#if sel.check}<div class="force"><p class="kick">À vérifier pendant l'évaluation</p><p>{sel.check}</p></div>{/if}
			{:else if sel.kind === 'porteur'}
				<p>{STAKE[sel.id].role}</p>
				<ol class="chain">
					<li><span class="step">Appuyé par Search</span>{@render chips(up)}</li>
					<li><span class="step">Ce qui doit changer chez eux</span>{@render measures(sel.m)}</li>
					<li><span class="step">Comment ils atteignent les cibles</span>{@render chips(down)}</li>
				</ol>
				<div class="force"><p class="kick">Méthodes de collecte auprès de cet acteur</p><p>{STAKE[sel.id].collecte}</p></div>
			{:else if sel.kind === 'inter'}
				<p>{sel.what}</p>
				<ol class="chain">
					<li>
						<span class="step">Acteurs impliqués</span>
						<ul class="who">
							{#each sel.who as [w, role]}
								<li>
									<svg class="who-ico" viewBox={viewBoxOf(w)} aria-hidden="true"><Shapes shapes={tinted[w]} /></svg>
									<div><button class="link" onclick={() => select(w)}>{shortOf(w)}</button><span class="muted">{role}</span></div>
								</li>
							{/each}
						</ul>
					</li>
					<li><span class="step">Changement attendu</span><p><b>{sel.change}</b></p></li>
					<li><span class="step">Chez les cibles, cela doit produire</span>{@render chips(down)}</li>
					<li>
						<span class="step">Comment le mesurer</span>
						<ul class="blist">{#each down.flatMap((d) => d.m || []) as m}<li>{m.ind} <span class="muted">· {SRC[m.src]}</span></li>{/each}</ul>
					</li>
				</ol>
				{#if up.some((d) => d.kind === 'contexte')}
					<div class="force"><p class="kick">Freins</p>{@render chips(up.filter((d) => d.kind === 'contexte'))}</div>
				{/if}
			{:else if sel.kind === 'cible'}
				<p>{STAKE[sel.id].role}</p>
				<div><p class="kick">Atteints par</p>{@render chips(interOf(sel.id))}</div>
				<div><p class="kick">Ce qui doit changer chez eux</p>{@render chips(TARGET_CHANGES[sel.id].map((c) => nodeById[c]))}</div>
				<div class="force"><p class="kick">Méthodes de collecte auprès de cet acteur</p><p>{STAKE[sel.id].collecte}</p></div>
			{:else}
				<p>{sel.what}</p>
				{#if sel.m}<div><p class="kick">Comment on le mesure</p>{@render measures(sel.m)}</div>{/if}
				{#if sel.check}<div class="force"><p class="kick">À vérifier pendant l'évaluation</p><p>{sel.check}</p></div>{/if}
				{#if up.length}<div><p class="kick">{sel.kind === 'change' ? 'Produit par' : 'Vient de'}</p>{@render chips(up)}</div>{/if}
				{#if down.length}<div><p class="kick">{sel.kind === 'contexte' ? 'Agit sur' : 'Contribue à'}</p>{@render chips(down)}</div>{/if}
			{/if}
		</aside>
	{:else}
		<p class="muted sys-hint">Astuce : cliquez sur une intervention pour voir les acteurs impliqués, le changement attendu chez les cibles et sa mesure. Échap ferme le panneau.</p>
	{/if}
</section>

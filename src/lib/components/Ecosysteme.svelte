<script>
	import { buildScene, arc, VIEWBOX } from '$lib/iso/scene.js';
	import { STAKE, INTER, ACTORS, FUNDING } from '$lib/data/projet.js';
	import Shapes from './Shapes.svelte';
	import Pill from './Pill.svelte';
	import { eco } from '$lib/state.svelte.js';

	const scene = buildScene();
	const num = Object.fromEntries(ACTORS.map((k, i) => [k, i + 1]));

	// Zones de clic : les plus grandes d'abord, pour que les petites cibles (personnes, antennes) restent cliquables au-dessus.
	const hits = [...scene.objs].sort((a, b) => b.hit.w * b.hit.h - a.hit.w * a.hit.h);

	// État : aucune sélection = vue d'ensemble
	// curSh / curInter vivent dans l'état partagé (la section Projet peut sélectionner un acteur)
	const curSh = $derived(eco.sh);
	const curInter = $derived(eco.inter);
	let hoverId = $state(null);
	let hoverSh = $state(null);

	const inter = $derived(curInter ? INTER.find((i) => i.id === curInter) : null);
	const stake = $derived(curSh ? STAKE[curSh] : null);
	const active = $derived(inter ? new Set(inter.sh) : curSh ? new Set([curSh]) : null);
	const hoverObj = $derived(hoverId != null ? scene.objs.find((o) => o.id === hoverId) : null);

	/** Relations d'un acteur : avec qui il travaille, et via quelles interventions. */
	function partnersOf(sh) {
		const m = new Map();
		for (const i of INTER)
			for (const [a, b] of i.links)
				if (a === sh || b === sh) {
					const o = a === sh ? b : a;
					if (!m.has(o)) m.set(o, new Set());
					m.get(o).add(i.name);
				}
		if (sh === FUNDING.from || sh === FUNDING.to) {
			const o = sh === FUNDING.from ? FUNDING.to : FUNDING.from;
			if (!m.has(o)) m.set(o, new Set());
			m.get(o).add(FUNDING.label);
		}
		return [...m.entries()].map(([k, v]) => ({ sh: k, via: [...v] }));
	}

	// Flèches à dessiner
	const edges = $derived.by(() => {
		const M = scene.markers;
		let list = [];
		if (inter) list = inter.links.map(([a, b]) => ({ a, b, kind: 'inter' }));
		else if (curSh) {
			const seen = new Set();
			for (const i of INTER)
				for (const [a, b] of i.links)
					if ((a === curSh || b === curSh) && !seen.has(a + '>' + b)) {
						seen.add(a + '>' + b);
						list.push({ a, b, kind: 'actor' });
					}
			if (curSh === FUNDING.from || curSh === FUNDING.to) list.push({ a: FUNDING.from, b: FUNDING.to, kind: 'fund' });
		}
		return list.filter((e) => M[e.a] && M[e.b]).map((e) => ({ ...e, ...arc(M[e.a], M[e.b]) }));
	});

	const partners = $derived(curSh ? partnersOf(curSh) : []);
	const stakeInters = $derived(curSh ? INTER.filter((i) => i.sh.includes(curSh)) : []);

	function pickSh(sh) {
		eco.inter = null;
		eco.sh = eco.sh === sh ? null : sh;
	}
	function pickInter(id) {
		eco.sh = null;
		eco.inter = eco.inter === id ? null : id;
	}
	function reset() {
		eco.sh = null;
		eco.inter = null;
	}
	function onKey(e, fn) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			fn();
		}
	}
	function enter(o) {
		hoverId = o.id;
		hoverSh = o.sh;
	}
	function leave() {
		hoverId = null;
		hoverSh = null;
	}
</script>

<section id="ecosysteme">
	<h2 class="sh">L'écosystème <span>en un coup d'œil</span></h2>
	<p class="intro">
		Qui fait quoi, où, et avec qui. Choisissez un <b>acteur</b> pour voir son rôle et ses relations, ou une <b>intervention</b> pour
		suivre la chaîne qui va des acteurs au changement attendu, puis à sa mesure. Vous pouvez aussi cliquer directement dans la scène.
	</p>

	<div class="eco-bar">
		<div class="eco-row">
			<span class="lab">Acteurs</span>
			{#each ACTORS as k}
				<button class="chip actor" aria-pressed={curSh === k} onclick={() => pickSh(k)} onmouseenter={() => (hoverSh = k)} onmouseleave={() => (hoverSh = null)}>
					<span class="n">{num[k]}</span>{STAKE[k].short}
				</button>
			{/each}
		</div>
		<div class="eco-row">
			<span class="lab">Interventions</span>
			{#each INTER as i}
				<button class="chip" aria-pressed={curInter === i.id} onclick={() => pickInter(i.id)}>{i.name}</button>
			{/each}
			{#if curSh || curInter}
				<button class="chip reset" onclick={reset}>← Vue d'ensemble</button>
			{/if}
		</div>
	</div>

	<div class="two">
		<div class="scene-wrap">
			<svg id="scene" class:focus={!!active} viewBox={VIEWBOX} role="img" aria-label="Scène isométrique des acteurs du projet à Bamako, Mopti et Gao">
				<defs>
					<marker id="arrow-inter" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
						<path d="M0,0 L10,5 L0,10 z" fill="#1254b2" />
					</marker>
					<marker id="arrow-actor" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
						<path d="M0,0 L10,5 L0,10 z" fill="#30ad96" />
					</marker>
					<marker id="arrow-fund" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
						<path d="M0,0 L10,5 L0,10 z" fill="#bf6f05" />
					</marker>
				</defs>

				<!-- 1. Décor -->
				<g pointer-events="none"><Shapes shapes={scene.base} /></g>

				<!-- 2. Objets (visuels seulement, les clics passent par la couche 4) -->
				<g pointer-events="none">
					{#each scene.objs as o (o.id)}
						<g class="obj" class:hl={active?.has(o.sh)} class:hov={hoverSh === o.sh}>
							<Shapes shapes={o.shapes} />
						</g>
					{/each}
				</g>

				<!-- 3. Réseau radio, noms de zones, flèches -->
				<g pointer-events="none">
					{#each scene.net as d}
						<path {d} fill="none" stroke="#faad45" stroke-width="1.6" stroke-dasharray="5 4" opacity={active ? 0.35 : 0.9} />
					{/each}
					{#each scene.zones as z}
						<text x={z.x} y={z.y} class="zone">{z.name}</text>
						<text x={z.x} y={z.y + 12} class="zsub">{z.sub}</text>
					{/each}
					{#each edges as e (e.a + e.b + e.kind)}
						<path class="edge {e.kind}" d={e.d} marker-end="url(#arrow-{e.kind})" />
					{/each}
				</g>

				<!-- 4. Zones de clic invisibles, une par objet -->
				<g class="hits">
					{#each hits as o (o.id)}
						<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
						<rect data-sh={o.sh} x={o.hit.x} y={o.hit.y} width={o.hit.w} height={o.hit.h} onclick={() => pickSh(o.sh)} onpointerenter={() => enter(o)} onpointerleave={leave} />
					{/each}
				</g>

				<!-- 5. Numéros des acteurs (accessibles au clavier) -->
				{#each ACTORS as k}
					{#if scene.markers[k]}
						{@const m = scene.markers[k]}
						<g
							class="marker"
							class:on={curSh === k || active?.has(k)}
							class:dim={active && !active.has(k)}
							class:hov={hoverSh === k}
							role="button"
							tabindex="0"
							aria-label="{num[k]}. {STAKE[k].name}"
							onclick={() => pickSh(k)}
							onkeydown={(e) => onKey(e, () => pickSh(k))}
							onpointerenter={() => (hoverSh = k)}
							onpointerleave={() => (hoverSh = null)}
						>
							<circle cx={m[0]} cy={m[1]} r="9" />
							<text x={m[0]} y={m[1] + 3.6} text-anchor="middle">{num[k]}</text>
						</g>
					{/if}
				{/each}

				<!-- 6. Infobulle au survol -->
				{#if hoverObj}
					{@const t = `${num[hoverObj.sh]}. ${STAKE[hoverObj.sh].short} · ${hoverObj.zone}`}
					{@const w = t.length * 5.4 + 16}
					{@const x = Math.min(Math.max(hoverObj.top[0] - w / 2, 4), 696 - w)}
					{@const y = Math.max(hoverObj.top[1] - 24, 4)}
					<g class="tip" pointer-events="none">
						<rect {x} {y} width={w} height="18" rx="9" />
						<text x={x + w / 2} y={y + 12.5} text-anchor="middle">{t}</text>
					</g>
				{/if}
			</svg>

			<div class="legend-s">
				<span><i></i>Réseau de radios URTEL</span>
				<span><i class="r"></i>Fleuve Niger</span>
				<span><i class="a"></i>Relation activée</span>
				<span><i class="f"></i>Financement</span>
			</div>
		</div>

		<aside class="panel" aria-live="polite">
			{#if inter}
				<p class="kick">Intervention · {inter.res}</p>
				<h3>{inter.name}</h3>
				<ol class="chain">
					<li>
						<span class="step">Qui agit</span>
						<div class="chips">
							{#each inter.sh as s}<button class="chip actor" onclick={() => pickSh(s)}><span class="n">{num[s]}</span>{STAKE[s].short}</button>{/each}
						</div>
					</li>
					<li><span class="step">Ce qui se passe</span><p>{inter.desc}</p></li>
					<li><span class="step">Changement attendu</span><p><b>{inter.change}</b></p></li>
					<li><span class="step">Thèmes du PIF</span><div class="chips">{#each inter.dims as d}<Pill id={d} />{/each}</div></li>
					<li><span class="step">Comment le mesurer</span><ul class="blist">{#each inter.ind as x}<li>{x}</li>{/each}</ul></li>
				</ol>
			{:else if stake}
				<p class="kick">{num[curSh]} · {stake.tag}</p>
				<h3>{stake.name}</h3>
				<p class="muted">Présent à : <b>{scene.zonesOf[curSh].join(' · ')}</b></p>
				<p class="role">{stake.role}</p>
				{#if partners.length}
					<div>
						<p class="kick">Travaille avec</p>
						<ul class="partners">
							{#each partners as p}
								<li>
									<button class="link" onclick={() => pickSh(p.sh)}><span class="n">{num[p.sh]}</span>{STAKE[p.sh].short}</button>
									<span class="muted">{p.via.join(', ')}</span>
								</li>
							{/each}
						</ul>
					</div>
				{/if}
				{#if stakeInters.length}
					<div>
						<p class="kick">Interventions</p>
						<div class="chips">{#each stakeInters as i}<button class="chip" onclick={() => pickInter(i.id)}>{i.name}</button>{/each}</div>
					</div>
				{/if}
				{#if stake.dims.length}
					<div>
						<p class="kick">Thèmes du PIF éclairés</p>
						<div class="chips">{#each stake.dims as d}<Pill id={d} />{/each}</div>
					</div>
				{/if}
				<div>
					<p class="kick">Indicateurs liés</p>
					<ul class="blist">{#each stake.ind as x}<li>{x}</li>{/each}</ul>
				</div>
				<div class="force">
					<p class="kick">Méthodes de collecte auprès de cet acteur</p>
					<p>{stake.collecte}</p>
				</div>
			{:else}
				<p class="kick">Lire la scène</p>
				<h3>8 acteurs, 6 interventions, 3 zones</h3>
				<p class="role">
					Le projet relie un bailleur et une ONG internationale à des radios, des OSC, des médias, des autorités et des communautés, à
					Bamako, Mopti et Gao. Chaque numéro correspond à un acteur.
				</p>
				<ol class="actors">
					{#each ACTORS as k}
						<li>
							<button class="link" onclick={() => pickSh(k)} onmouseenter={() => (hoverSh = k)} onmouseleave={() => (hoverSh = null)}>
								<span class="n">{num[k]}</span>{STAKE[k].name}
							</button>
							<span class="muted">{STAKE[k].tag}</span>
						</li>
					{/each}
				</ol>
				<div class="force">
					<p class="kick">Comment lire</p>
					<ul class="arr">
						<li>Bâtiments : institutions (Search, ambassade, autorités, OSC).</li>
						<li>Antennes : radios du réseau URTEL, reliées en pointillés orange.</li>
						<li>Personnages : publics et acteurs de terrain ; l'arbre à palabres signale les leaders coutumiers.</li>
						<li>Choisissez une intervention : des flèches montrent qui agit sur qui.</li>
					</ul>
				</div>
			{/if}
		</aside>
	</div>

</section>

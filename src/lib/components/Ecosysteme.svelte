<script>
	import { buildScene, VIEWBOX } from '$lib/iso/scene.js';
	import { STAKE, INTER } from '$lib/data/projet.js';
	import Shapes from './Shapes.svelte';
	import Pill from './Pill.svelte';

	const scene = buildScene();

	let curSh = $state('urtel');
	let curInter = $state(null);

	const inter = $derived(curInter ? INTER.find((i) => i.id === curInter) : null);
	const active = $derived(new Set(inter ? inter.sh : [curSh]));
	const stake = $derived(STAKE[curSh]);
	const stakeInters = $derived(INTER.filter((i) => i.sh.includes(curSh)));

	function pick(sh) {
		curSh = sh;
		curInter = null;
	}
	function toggleInter(id) {
		curInter = curInter === id ? null : id;
	}
	function onKey(e, sh) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			pick(sh);
		}
	}
</script>

<section id="ecosysteme">
	<h2 class="sh">Le projet <span>en un coup d'œil</span></h2>
	<p class="intro">
		Qui fait quoi, et où. Cliquez sur un acteur de la scène pour voir son rôle, les thèmes du PIF qu'il éclaire et la façon de
		l'écouter pendant l'évaluation. Cliquez sur une intervention pour voir les acteurs qu'elle mobilise.
	</p>
	<div class="two">
		<div class="scene-wrap">
			<div class="scene-bar">
				<span class="lab">Interventions</span>
				{#each INTER as i}
					<button class="chip" aria-pressed={curInter === i.id} onclick={() => toggleInter(i.id)}>{i.name}</button>
				{/each}
			</div>

			<svg id="scene" class:focus={!!curInter} viewBox={VIEWBOX} role="img" aria-label="Scène isométrique des acteurs du projet à Bamako, Mopti et Gao">
				<g><Shapes shapes={scene.base} /></g>

				{#each scene.objs as o}
					<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
					<g class="obj" class:hl={active.has(o.sh)} class:sel={!curInter && active.has(o.sh)} onclick={() => pick(o.sh)}>
						<Shapes shapes={o.shapes} />
					</g>
				{/each}

				<g pointer-events="none">
					{#each scene.net as d}
						<path {d} fill="none" stroke="#faad45" stroke-width="1.6" stroke-dasharray="5 4" opacity="0.9" />
					{/each}
				</g>

				<g pointer-events="none">
					{#each scene.zones as z}
						<text x={z.x} y={z.y} class="zone">{z.name}</text>
						<text x={z.x} y={z.y + 12} class="zsub">{z.sub}</text>
					{/each}
				</g>

				{#each scene.labels as l}
					<g
						class="pin"
						class:hl={active.has(l.sh)}
						class:sel={!curInter && active.has(l.sh)}
						role="button"
						tabindex="0"
						aria-label={l.text}
						onclick={() => pick(l.sh)}
						onkeydown={(e) => onKey(e, l.sh)}
					>
						<line x1={l.line[0]} y1={l.line[1]} x2={l.line[2]} y2={l.line[3]} stroke="#1254b2" stroke-width="0.8" />
						<rect x={l.x} y={l.y} width={l.w} height="15" rx="7.5" />
						<text x={l.x + l.w / 2} y={l.y + 10.5} text-anchor="middle">{l.text}</text>
					</g>
				{/each}
			</svg>

			<div class="legend-s">
				<span><i></i>Réseau de radios URTEL</span>
				<span><i class="r"></i>Fleuve Niger</span>
				<span>Cliquez sur un bâtiment, un groupe ou une étiquette</span>
			</div>
		</div>

		<aside class="panel" aria-live="polite">
			{#if inter}
				<p class="kick">Intervention · {inter.res}</p>
				<h3>{inter.name}</h3>
				<p class="role">{inter.desc}</p>
				<div>
					<p class="kick">Acteurs mobilisés</p>
					<div class="chips">
						{#each inter.sh as s}<button class="chip" onclick={() => pick(s)}>{STAKE[s].name}</button>{/each}
					</div>
				</div>
				<div>
					<p class="kick">Thèmes du PIF éclairés</p>
					<div class="chips">{#each inter.dims as d}<Pill id={d} />{/each}</div>
				</div>
			{:else}
				<p class="kick">{stake.tag}</p>
				<h3>{stake.name}</h3>
				<p class="role">{stake.role}</p>
				<div>
					<p class="kick">Interventions</p>
					<div class="chips">
						{#each stakeInters as i}
							<button class="chip" onclick={() => (curInter = i.id)}>{i.name}</button>
						{:else}
							<span class="muted">Pilotage et financement</span>
						{/each}
					</div>
				</div>
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
					<p class="kick">Comment l'écouter pendant l'évaluation</p>
					<p>{stake.listen}</p>
				</div>
			{/if}
		</aside>
	</div>

	<div class="obj-grid">
		<div class="os">
			<b class="code">Objectif spécifique 1</b>
			<p>Favoriser un plaidoyer collaboratif des OSC et des médias en faveur d'un espace civique paisible, sensible et ouvert.</p>
			<p class="muted">R1.1 Capacités et soutien pour un plaidoyer constructif sur la gouvernance · R1.2 Compréhension mutuelle et collaboration avec les régulateurs</p>
		</div>
		<div class="os t">
			<b class="code">Objectif spécifique 2</b>
			<p>Favoriser une meilleure compréhension et un soutien accru du public pour un espace civique libre et inclusif.</p>
			<p class="muted">R2.1 Dialogues publics inclusifs favorisés et amplifiés · R2.2 Accès à une information crédible, transparente et sensible aux conflits liée aux élections</p>
		</div>
	</div>
</section>

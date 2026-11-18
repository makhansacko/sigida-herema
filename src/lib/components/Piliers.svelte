<script>
	import { PILLARS } from '$lib/data/pif.js';
	import { C30, S30, pts } from '$lib/iso/iso.js';

	let curP = $state(0);

	// Escalier isométrique : une marche par pilier
	const s = 20, ox = 150, oy = 110;
	const Q = (x, y, z) => [ox + (x - y) * C30 * s, oy + (x + y) * S30 * s - z * s];
	const steps = [0, 1, 2].map((i) => {
		const x = i * 4, h = (i + 1) * 1.6;
		return {
			i,
			top: pts([Q(x, 0, h), Q(x + 4, 0, h), Q(x + 4, 5, h), Q(x, 5, h)]),
			left: pts([Q(x, 5, 0), Q(x + 4, 5, 0), Q(x + 4, 5, h), Q(x, 5, h)]),
			right: pts([Q(x + 4, 0, 0), Q(x + 4, 5, 0), Q(x + 4, 5, h), Q(x + 4, 0, h)]),
			label: Q(x + 2, 5, 0),
			stand: Q(x + 2, 2.5, h)
		};
	});

	const p = $derived(PILLARS[curP]);
	const st = $derived(steps[curP].stand);

	function key(e, i) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			curP = i;
		}
	}
</script>

<section id="piliers">
	<h2 class="sh">Comment le mesurer ? <span>Les 3 piliers</span></h2>
	<p class="intro">
		Chaque marche correspond à une façon de produire des données. Un dispositif mixte qui couvre les trois répond à la fois aux
		exigences OCDE des TDR et à la logique du PIF.
	</p>
	<div class="two">
		<div style="display:grid;gap:14px">
			<div class="pbtns">
				{#each PILLARS as pl, i}
					<button class="pbtn" aria-pressed={i === curP} onclick={() => (curP = i)}>
						Pilier {i + 1} : {pl.name}<small>{pl.sub}</small>
					</button>
				{/each}
			</div>

			<svg viewBox="0 0 520 300" role="img" aria-label="Escalier isométrique des trois piliers">
				{#each steps as m}
					<g style="cursor:pointer" role="button" tabindex="0" aria-label={PILLARS[m.i].name} onclick={() => (curP = m.i)} onkeydown={(e) => key(e, m.i)}>
						<polygon points={m.left} fill={m.i === curP ? '#f39a24' : '#fff'} stroke="#4a4f57" stroke-width="1" />
						<polygon points={m.right} fill={m.i === curP ? '#e0861a' : '#f2f4f7'} stroke="#4a4f57" stroke-width="1" />
						<polygon points={m.top} fill={m.i === curP ? '#faad45' : '#fff'} stroke="#4a4f57" stroke-width="1" />
						<text x={m.label[0] - 8} y={m.label[1] + 20} text-anchor="middle" style="font:800 10px var(--head);fill:#1254b2">{PILLARS[m.i].name.toUpperCase()}</text>
					</g>
				{/each}
				<!-- personnage au trait -->
				<g fill="none" stroke="#1254b2" stroke-width="1.8" stroke-linecap="round" pointer-events="none">
					<circle cx={st[0]} cy={st[1] - 44} r="5.5" />
					<line x1={st[0]} y1={st[1] - 38} x2={st[0]} y2={st[1] - 18} />
					<path d="M{st[0]},{st[1] - 18} L{st[0] - 6},{st[1]} M{st[0]},{st[1] - 18} L{st[0] + 7},{st[1] - 2} M{st[0]},{st[1] - 32} L{st[0] - 8},{st[1] - 22} M{st[0]},{st[1] - 32} L{st[0] + 9},{st[1] - 38}" />
				</g>
			</svg>

			<div class="nums" aria-label="Échantillon de l'étude de base">
				<div class="num"><b>384</b><span>ménages, aléatoire simple (RGPH 2022)</span></div>
				<div class="num"><b>80 + 40</b><span>acteurs OSC et médias, choix raisonné</span></div>
				<div class="num"><b>12</b><span>FGD, 4 par commune, 8 personnes min.</span></div>
				<div class="num"><b>33</b><span>entretiens avec informateurs clés</span></div>
			</div>
			<p class="muted">Échantillon de l'étude de base. Les TDR demandent d'en faire une analyse critique, et pas seulement de le reprendre.</p>
		</div>

		<div class="panel" aria-live="polite">
			<p class="kick">Pilier {curP + 1}</p>
			<h3>{p.name}</h3>
			<p>{p.intro}</p>
			<div>
				<p class="kick">Dans cette évaluation</p>
				<ul class="blist">{#each p.here as h}<li>{h}</li>{/each}</ul>
			</div>
			<div class="force">
				<p class="kick">Qu'est-ce qui fait la force de ces données ?</p>
				<ul class="arr">{#each p.force as f}<li>{f}</li>{/each}</ul>
			</div>
		</div>
	</div>
</section>

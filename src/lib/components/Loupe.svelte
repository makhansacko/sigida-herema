<script>
	import { D, CRIT, SEGCOL } from '$lib/data/pif.js';
	import { mix, pts } from '$lib/iso/iso.js';
	import ThemeIcon from './ThemeIcon.svelte';

	let curDim = $state('agency');

	// Géométrie de la loupe pentagonale (reprise du PIF Packet)
	const cx = 220, cy = 210, R = 150, r = 124;
	const ang = [-126, -54, 18, 90, 162].map((a) => (a * Math.PI) / 180);
	const V = (rad, i) => [cx + rad * Math.cos(ang[i % 5]), cy + rad * Math.sin(ang[i % 5])];
	const ORDER = ['agency', 'polar', 'legit', 'invest', 'violence']; // haut, puis sens horaire

	const segs = ORDER.map((id, i) => ({
		id,
		outer: `M${pts([V(R, i), V(R, i + 1), V(r, i + 1), V(r, i)])}Z`,
		bevel: `M${pts([V(r, i), V(r, i + 1), V(r + 7, i + 1), V(r + 7, i)])}Z`
	}));
	const glass = pts([0, 1, 2, 3, 4].map((i) => V(r, i)));

	// Position des pictos [x, y] et des libellés [x, y]
	const POS = {
		agency: [cx, 42, cx, 80],
		polar: [cx + 178, 150, cx + 178, 196],
		legit: [cx + 138, 335, cx + 138, 384],
		invest: [cx - 138, 335, cx - 138, 384],
		violence: [cx - 178, 150, cx - 178, 196]
	};

	const d = $derived(D[curDim]);
	const qs = $derived(CRIT.flatMap((c) => c.qs.filter((q) => q.tags.includes(curDim)).map((q) => ({ c: c.name, ...q }))));

	function key(e, id) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			curDim = id;
		}
	}
</script>

<section id="themes">
	<h2 class="sh">5 Thèmes Essentiels <span>pour la Paix</span></h2>
	<p class="intro">
		Dans les TDR, ces thèmes ne sont pas des critères supplémentaires. Ce sont des <em>grilles de lecture transversales</em>,
		mobilisées surtout pour l'<b>impact</b> et la <b>durabilité</b>. Cliquez sur un côté de la loupe.
	</p>
	<div class="two">
		<svg id="loupe" viewBox="-24 0 488 560" role="img" aria-label="Loupe pentagonale des cinq thèmes du PIF">
			<!-- manche -->
			<rect x={cx - 26} y={cy + R + 34} width="52" height="200" rx="8" fill="#fff" stroke="#9aa3ad" stroke-width="1.3" />
			<ellipse cx={cx} cy={cy + R + 234} rx="26" ry="7" fill="#fff" stroke="#9aa3ad" stroke-width="1.3" />
			<polygon points={pts([[cx, cy + R + 4], [cx + 26, cy + R + 34], [cx, cy + R + 50], [cx - 26, cy + R + 34]])} fill="#fff" stroke="#9aa3ad" stroke-width="1.3" />
			<circle cx={cx} cy={cy + R + 8} r="8" fill="#fff" stroke="#9aa3ad" stroke-width="1.3" />
			<!-- verre et cadre -->
			<polygon points={glass} fill="#f4f8fd" />
			{#each segs as s}
				<g class="seg" class:sel={s.id === curDim} role="button" tabindex="0" aria-label={D[s.id].name} onclick={() => (curDim = s.id)} onkeydown={(e) => key(e, s.id)}>
					<path class="f" d={s.outer} fill={SEGCOL[s.id]} stroke={mix(SEGCOL[s.id], -0.3)} stroke-width="1" />
					<path d={s.bevel} fill={mix(SEGCOL[s.id], 0.35)} pointer-events="none" />
				</g>
			{/each}
			<!-- pictos et libellés -->
			{#each ORDER as id}
				<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
				<g class="ico" transform="translate({POS[id][0]} {POS[id][1]})" onclick={() => (curDim = id)}><ThemeIcon {id} /></g>
				<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
				<text x={POS[id][2]} y={POS[id][3]} class="lbl" text-anchor="middle" onclick={() => (curDim = id)}>{D[id].name}</text>
			{/each}
			<!-- contenu du verre -->
			<text x={cx} y={cy - 16} text-anchor="middle" style="font:12px var(--brush);fill:#30ad96">Sous la loupe</text>
			<text x={cx} y={cy + 14} text-anchor="middle" style="font:28px var(--display);letter-spacing:.02em" fill={mix(SEGCOL[curDim], -0.35)}>{d.name.toUpperCase()}</text>
			<text x={cx} y={cy + 38} text-anchor="middle" style="font:700 10.5px var(--head);fill:#5d6878">CONTRAIRE : {d.opp.toUpperCase()}</text>
		</svg>

		<div class="panel" aria-live="polite">
			<div class="dimhead d-{curDim}">
				<span class="sw"></span>
				<div>
					<h3>{d.name}</h3>
					<div class="opp d-{curDim}">Son contraire : <b>{d.opp}</b></div>
				</div>
			</div>
			<p>{d.def}</p>
			<p class="muted">Formulation des TDR : « {d.tdr} »</p>
			<div>
				<p class="kick">Les deux mesures alignées du PIF</p>
				<div class="ind2">
					{#each d.m as m}<div>{m[0]}<small>{m[1]}</small></div>{/each}
				</div>
			</div>
			<div class="force">
				<p class="kick">Dans l'évaluation Sigida Herema</p>
				<ul class="arr">{#each d.here as h}<li>{h}</li>{/each}</ul>
			</div>
			<div>
				<p class="kick">Questions d'évaluation liées ({qs.length})</p>
				{#if qs.length}
					<ul class="blist">
						{#each qs as q}<li><b>{q.c}</b> · {q.t} <span class="muted">{q.x ? '(TDR)' : '(proposée)'}</span></li>{/each}
					</ul>
				{:else}
					<p class="muted">Aucune.</p>
				{/if}
			</div>
		</div>
	</div>
</section>

<script>
	// Évaluer l'impact avec un budget serré : changement ≠ impact, facteurs de confusion,
	// dispositif léger et calculateur de différence minimale détectable (DMD).

	const Z = 1.96 + 0.84; // 5 % bilatéral, puissance 80 %

	const PRESETS = [
		{ id: '02', label: '0.2 · Confiance envers médias et OSC', b: 45, c: 60, n: 384 },
		{ id: '21', label: '2.1 · Opinions prises en compte', b: 22, c: 50, n: 384 },
		{ id: '22', label: '2.2 · Connaissance des droits', b: 51, c: 70, n: 384 },
		{ id: '1', label: '1 · Collaboration OSC-médias (OSC)', b: 57, c: 70, n: 80 },
		{ id: '01', label: '0.1 · Protection des journalistes (médias + OSC)', b: 33, c: 50, n: 120 }
	];
	const SPLITS = [
		{ k: 1, label: 'Global' },
		{ k: 3, label: 'Par région (≈ ÷3)' },
		{ k: 6, label: 'Région × sexe (≈ ÷6)' }
	];

	let preset = $state('02');
	let b = $state(45);
	let c = $state(60);
	let n = $state(384);
	let deff = $state(1);
	let split = $state(1);
	let panel = $state(false);
	const RHO = 0.4; // corrélation supposée entre deux mesures des mêmes répondants (hypothèse)

	function usePreset(id) {
		const p = PRESETS.find((x) => x.id === id);
		preset = id;
		b = p.b;
		c = p.c;
		n = p.n;
	}

	const calc = $derived.by(() => {
		const p = (b + c) / 200;
		const ns = Math.max(n / split, 1);
		const f = deff * (panel ? 1 - RHO : 1);
		const dmd = Z * Math.sqrt((f * 2 * p * (1 - p)) / ns) * 100;
		const gap = c - b;
		const need = gap > 0 ? Math.ceil(((Z * Z * 2 * p * (1 - p) * f) / (gap / 100) ** 2) * split) : null;
		return { dmd, gap, ok: gap >= dmd, ns: Math.round(ns), need };
	});
	const scale = (v) => Math.min(v, 60) / 60 * 100; // barres sur 0 à 60 points

	const CONFUSION = [
		{ t: 'L’évolution du contexte', d: 'Transition politique, élections, paysage médiatique : la confiance ou la participation peuvent bouger pour tout le pays, projet ou pas.', icon: 'M-14,8 L-6,0 L0,4 L12,-8 M6,-8 H12 V-2' },
		{ t: 'Les événements imprévus', d: 'Un incident de sécurité, une suspension d’activités ou un changement de stratégie (comme le passage par l’URTEL) modifie les résultats.', icon: 'M0,-12 L12,10 H-12 Z M0,-3 V3 M0,6 V7' },
		{ t: 'Le biais de participation', d: 'Ceux qui écoutent les émissions sur la paix, ou les OSC choisies pour être appuyées, étaient peut-être déjà plus favorables.', icon: 'M-10,-6 a4,4 0 1 0 0.1,0 M10,-6 a4,4 0 1 0 0.1,0 M-16,10 Q-10,0 -4,10 M4,10 Q10,0 16,10 M10,-14 L13,-11 L18,-17' },
		{ t: 'La désirabilité sociale', d: 'Sur la confiance et la sécurité, dans un climat de pression, les répondants peuvent donner la réponse « attendue ».', icon: 'M-14,-10 h20 a3,3 0 0 1 3,3 v8 a3,3 0 0 1 -3,3 h-12 l-5,5 v-5 h-3 a3,3 0 0 1 -3,-3 v-8 a3,3 0 0 1 3,-3 z M-6,-3 h8' }
	];

	const DESIGN = [
		{
			k: 'garder', t: 'Garder', sub: 'Exigé et comparable',
			items: [
				['Enquête ménages, même taille (n = 384) et mêmes questions qu’à la base', 'Coût prévu'],
				['12 FGD, même dispositif qu’à la base', 'Coût prévu']
			]
		},
		{
			k: 'ajouter', t: 'Ajouter', sub: 'Presque gratuit, remplace un groupe témoin',
			items: [
				['3 ou 4 questions d’exposition dans l’enquête (émissions écoutées, dialogue suivi, message retenu) : comparaison exposés / non exposés', '0 coût terrain'],
				['Différence-de-différences par commune, en bureau : communes très exposées vs peu exposées, avec les données d’activités de Search', 'Travail de bureau'],
				['Repère national gratuit sur la tendance générale (par exemple Afrobarometer, s’il mesure la confiance envers les médias au Mali)', 'Gratuit']
			]
		},
		{
			k: 'moins', t: 'Faire moins cher', sub: 'Sans perdre en qualité',
			items: [
				['Réinterroger les mêmes 80 OSC et 40 médias qu’à la base (panel) : même coût, beaucoup plus de puissance', 'Même coût'],
				['Entretiens OSC, médias et KII à Mopti et Gao par téléphone', 'Économie'],
				['Un atelier d’une demi-journée de récolte des résultats avec Search, l’URTEL et des OSC, à la place d’une partie des KII', 'Économie'],
				['Efficience calculée sur données existantes : finances de Search, journaux de diffusion URTEL', 'Travail de bureau'],
				['Un seul questionnaire KoboToolbox (cadre logique + safeguarding + MEAL), enquêteurs recrutés sur place', 'Économie']
			]
		},
		{
			k: 'eviter', t: 'Éviter', sub: 'Trop coûteux pour ce budget',
			items: [
				['Enquête dans des zones non couvertes pour créer un groupe de comparaison', '€€€'],
				['Agrandir l’échantillon pour obtenir des résultats significatifs par région × sexe × âge', '€€€'],
				['Un panel de ménages (retrouver les mêmes foyers qu’à la base)', '€€']
			]
		}
	];
</script>

<section id="impact">
	<h2 class="sh">Évaluer l’impact <span>avec un budget serré</span></h2>
	<p class="intro">
		Le dispositif des TDR compare une étude de base et une enquête finale, sans groupe de comparaison : c’est un <b>avant-après</b>.
		Il montre un <em>changement</em>, pas forcément l’<em>impact</em> du projet. L’enjeu est de rendre la contribution du projet
		<b>plausible</b>, maillon par maillon du modèle logique, sans dispositif coûteux.
	</p>

	<div class="imp-two">
		<div class="imp-block">
			<p class="kick">Changement ≠ impact</p>
			<svg viewBox="0 0 500 240" class="cf" role="img" aria-label="Illustration : le changement observé se décompose en effet du contexte et contribution du projet">
				<text x="40" y="20" class="axl">Indicateur (%)</text>
				<line x1="40" y1="190" x2="370" y2="190" class="ax" />
				<text x="80" y="210" text-anchor="middle" class="axl">Étude de base</text>
				<text x="340" y="210" text-anchor="middle" class="axl">Évaluation finale</text>
				<line x1="80" y1="140" x2="340" y2="140" class="guide" />
				<line x1="80" y1="140" x2="340" y2="112" class="cfl" />
				<line x1="80" y1="140" x2="340" y2="52" class="obs" />
				<circle cx="80" cy="140" r="5" class="pt" />
				<circle cx="340" cy="52" r="5" class="pt" />
				<circle cx="340" cy="112" r="4" class="pt2" />
				<path d="M352,52 h8 v60 h-8" class="br p" />
				<text x="368" y="78" class="lab p">contribution</text>
				<text x="368" y="91" class="lab p">du projet</text>
				<path d="M352,113 h8 v27 h-8" class="br c" />
				<text x="368" y="131" class="lab c">contexte</text>
				<!-- légende -->
				<line x1="40" y1="228" x2="64" y2="228" class="obs" /><text x="70" y="232" class="lab b">observé</text>
				<line x1="140" y1="228" x2="164" y2="228" class="cfl" /><text x="170" y="232" class="lab">sans le projet (invisible)</text>
			</svg>
			<p class="muted">Illustration, chiffres fictifs. Seule la ligne « observé » sera mesurée ; la ligne « sans le projet » est invisible et doit être approchée.</p>
		</div>
		<div class="imp-block">
			<p class="kick">Ce qui peut faire bouger un indicateur, à part le projet</p>
			<div class="conf">
				{#each CONFUSION as x}
					<div class="cfc">
						<svg viewBox="-20 -20 40 40" aria-hidden="true"><path d={x.icon} /></svg>
						<div><b>{x.t}</b><p>{x.d}</p></div>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<h3 class="pj-h3">Le dispositif léger</h3>
	<div class="design">
		{#each DESIGN as col}
			<div class="dcol {col.k}">
				<div class="dhead"><b>{col.t}</b><span>{col.sub}</span></div>
				<ul>
					{#each col.items as [t, cost]}
						<li><p>{t}</p><span class="cost">{cost}</span></li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>

	<h3 class="pj-h3">Ce que l’échantillon permet de détecter</h3>
	<div class="imp-two calc">
		<div class="imp-block">
			<p class="muted">
				La <b>différence minimale détectable (DMD)</b> est le plus petit écart entre la base et la finale qu’on peut distinguer du
				hasard (seuil 5 %, puissance 80 %). Si l’écart visé est plus petit que la DMD, un vrai changement risque de passer pour
				« non significatif ».
			</p>
			<div class="chips">
				{#each PRESETS as p}<button class="chip" aria-pressed={preset === p.id} onclick={() => usePreset(p.id)}>{p.label}</button>{/each}
			</div>
			<div class="form">
				<label for="cb">Valeur de base (%)<input id="cb" type="number" min="1" max="99" bind:value={b} oninput={() => (preset = null)} /></label>
				<label for="cc">Cible (%)<input id="cc" type="number" min="1" max="99" bind:value={c} oninput={() => (preset = null)} /></label>
				<label for="cn">Répondants par vague<input id="cn" type="number" min="10" step="10" bind:value={n} oninput={() => (preset = null)} /></label>
				<label for="cd">Effet de grappe
					<select id="cd" bind:value={deff}>
						<option value={1}>Aucun (aléatoire simple)</option>
						<option value={1.5}>Modéré (× 1,5)</option>
						<option value={2}>Fort (× 2)</option>
					</select>
				</label>
				<label for="cs">Découpage
					<select id="cs" bind:value={split}>{#each SPLITS as s}<option value={s.k}>{s.label}</option>{/each}</select>
				</label>
				<label class="chk" for="cp"><input id="cp" type="checkbox" bind:checked={panel} />Mêmes répondants qu’à la base (panel)</label>
			</div>
		</div>
		<div class="imp-block result" class:ok={calc.ok}>
			<p class="kick">Résultat</p>
			<div class="bars">
				<div class="bar-l">Écart visé</div>
				<div class="bar-t"><div class="bar gap" style="width:{scale(Math.max(calc.gap, 0))}%"></div><span>{calc.gap} pts</span></div>
				<div class="bar-l">DMD</div>
				<div class="bar-t"><div class="bar dmd" style="width:{scale(calc.dmd)}%"></div><span>{calc.dmd.toFixed(1)} pts</span></div>
			</div>
			<p class="verdict">{calc.ok ? 'Détectable' : 'Non démontrable statistiquement'}</p>
			<p>
				Avec environ <b>{calc.ns}</b> répondants par vague dans chaque sous-groupe, un écart de {calc.gap} points
				{calc.ok ? 'peut être distingué du hasard.' : 'risque de ne pas ressortir comme significatif, même s’il est réel.'}
			</p>
			{#if calc.need}
				<p class="muted">Il faudrait environ <b>{calc.need}</b> répondants par vague au total pour détecter cet écart.</p>
			{/if}
			{#if panel}<p class="muted">Panel : corrélation supposée de {RHO} entre les deux mesures (hypothèse à vérifier).</p>{/if}
			<p class="muted">Formule : DMD = 2,8 × √(effet de grappe × 2 p(1 − p) / n). Les découpages régionaux sont approximatifs.</p>
		</div>
	</div>

	<div class="force" style="margin-top:20px">
		<p class="kick">À écrire dans le rapport de démarrage</p>
		<ul class="arr">
			<li>Les résultats présentent la <b>contribution</b> du projet, argumentée maillon par maillon le long du modèle logique, et non un impact attribué.</li>
			<li>Les résultats par sous-groupe (région, sexe, âge) sont donnés avec leurs <b>intervalles de confiance</b>, comme résultats indicatifs.</li>
			<li>Pour l’indicateur 1 : un recensement du réseau d’OSC, ou à défaut un panel, faute de quoi un gain de 13 points ne sera pas démontrable.</li>
		</ul>
	</div>
</section>

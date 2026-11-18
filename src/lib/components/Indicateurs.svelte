<script>
	import { INDICATEURS, PUBLICS, APPROCHES, ANALYSES } from '$lib/data/indicateurs.js';
	import { nodeById } from '$lib/data/systeme.js';
	import { STAKE } from '$lib/data/projet.js';
	import { showInSystem, ui } from '$lib/state.svelte.js';

	const nodeLabel = (id) => STAKE[id]?.short ?? nodeById[id]?.label ?? id;

	let fAp = $state('all');
	let fPub = $state('all');

	const count = (k, v) => INDICATEURS.filter((i) => i[k] === v).length;
	const list = $derived(INDICATEURS.filter((i) => (fAp === 'all' || i.ap === fAp) && (fPub === 'all' || i.pub === fPub)));

	function toggle(code) {
		ui.openInd = ui.openInd.includes(code) ? ui.openInd.filter((c) => c !== code) : [...ui.openInd, code];
	}
</script>

<section id="indicateurs">
	<h2 class="sh">Les indicateurs <span>de changement</span></h2>
	<p class="intro">
		Les <b>18 indicateurs</b> que l’évaluation doit renseigner : qui on interroge, la valeur de base et la cible, et comment on
		traite chacun. Seuls ceux qui ont une valeur de base permettent un <b>avant-après</b> ; les autres ne peuvent être mesurés qu’à
		la fin, ce qui limite ce qu’on peut affirmer.
	</p>

	<div class="ind-sum">
		<div class="sum-group">
			<p class="kick">Par approche</p>
			<div class="tiles">
				{#each Object.entries(APPROCHES) as [k, a]}
					<button class="tile ap-{k}" aria-pressed={fAp === k} onclick={() => (fAp = fAp === k ? 'all' : k)}>
						<b>{count('ap', k)}</b><span>{a.label}</span>
					</button>
				{/each}
			</div>
		</div>
		<div class="sum-group">
			<p class="kick">Par public interrogé</p>
			<div class="tiles">
				{#each Object.entries(PUBLICS) as [k, p]}
					<button class="tile pub" aria-pressed={fPub === k} onclick={() => (fPub = fPub === k ? 'all' : k)}>
						<b>{count('pub', k)}</b><span>{p.label}</span>
					</button>
				{/each}
			</div>
		</div>
	</div>
	{#if fAp !== 'all' || fPub !== 'all'}
		<p class="muted filt">
			{list.length} indicateur{list.length > 1 ? 's' : ''} affiché{list.length > 1 ? 's' : ''}.
			<button class="link small" onclick={() => ((fAp = 'all'), (fPub = 'all'))}>Tout afficher</button>
		</p>
	{/if}

	<div class="ind-table" role="table" aria-label="Indicateurs de l'évaluation">
		<div class="ind-head" role="row">
			<span role="columnheader">N°</span><span role="columnheader">Indicateur</span><span role="columnheader">Public</span><span role="columnheader">Base → cible</span><span role="columnheader">Approche</span><span></span>
		</div>
		{#each list as i (i.code)}
			{@const isOpen = ui.openInd.includes(i.code)}
			<div class="ind-row" class:open={isOpen} role="row" id="ind-{i.code.replace('.', '-')}">
				<button class="ind-main" onclick={() => toggle(i.code)} aria-expanded={isOpen}>
					<span class="code">{i.code}</span>
					<span class="t"><small>{i.table}</small>{i.t}</span>
					<span class="pub-tag {i.pub}">{PUBLICS[i.pub].label}</span>
					<span class="bc">
						{#if i.b != null || i.c != null}
							<span class="mini-g">
								<span class="tr"></span>
								{#if i.b != null && i.c != null}<span class="gp" style="left:{i.b}%;width:{i.c - i.b}%"></span>{/if}
								{#if i.b != null}<span class="dt b" style="left:{i.b}%"></span>{/if}
								{#if i.c != null}<span class="dt c" style="left:{i.c}%"></span>{/if}
							</span>
							<span class="bv">{i.b != null ? i.b + ' %' : '—'} → {i.c != null ? i.c + ' %' : '—'}</span>
						{:else}
							<span class="bv none">Pas de base ni de cible</span>
						{/if}
					</span>
					<span class="ap-tag ap-{i.ap}">{APPROCHES[i.ap].short}</span>
					<span class="chev" aria-hidden="true">{isOpen ? '−' : '+'}</span>
				</button>
				{#if isOpen}
					<div class="ind-detail">
						<div>
							<p class="kick">Approche</p>
							<p><b>{APPROCHES[i.ap].label}.</b> {APPROCHES[i.ap].text}</p>
							{#if i.dmd}
								<p class="dmd" class:ok={i.c - i.b >= i.dmd}>
									Écart visé <b>{i.c - i.b} pts</b> · différence minimale détectable <b>≈ {i.dmd} pts</b> ·
									{i.c - i.b >= i.dmd ? 'détectable avec l’échantillon de la base' : 'pas démontrable statistiquement en l’état'}
								</p>
							{/if}
						</div>
						<div>
							<p class="kick">Données</p>
							<p>{PUBLICS[i.pub].src}.</p>
							<p class="kick" style="margin-top:8px">Analyse</p>
							<p>{ANALYSES[i.ap]}</p>
						</div>
						<div>
							<p class="kick">Où ce changement se produit</p>
							<div class="chips">
								{#each i.node as n}<button class="chip to-map" onclick={() => showInSystem(n)}>{nodeLabel(n)} · voir dans le modèle logique →</button>{/each}
							</div>
							<p class="kick" style="margin-top:8px">Ce qu’on pourra affirmer</p>
							<p>{i.claim}</p>
							<p class="kick" style="margin-top:8px">Points d’attention</p>
							<ul class="arr">{#each i.watch as w}<li>{w}</li>{/each}</ul>
						</div>
					</div>
				{/if}
			</div>
		{/each}
	</div>
	<p class="muted" style="margin-top:10px">
		Sources : TDR, tableaux 1 (cadre logique), 2 (safeguarding), 3 (cadre MEAL global de Search) et matrice de définition des
		indicateurs. Numérotation 7 à 18 : Sahel Analytics. DMD calculée pour un seuil de 5 % et une puissance de 80 %, sans effet de
		grappe, avec la taille d’échantillon de la base.
	</p>
</section>

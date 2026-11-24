<script>
	import { STAKE, ACTORS } from '$lib/data/projet.js';
	import { vignette, viewBoxOf } from '$lib/iso/vignettes.js';
	import { showInSystem } from '$lib/state.svelte.js';
	import Shapes from './Shapes.svelte';
	import { CONDITIONS, ALORS, PARCE_QUE, READAPTATION } from '$lib/data/toc.js';

	const num = Object.fromEntries(ACTORS.map((k, i) => [k, i + 1]));

	// Les acteurs regroupés par rôle dans le projet
	const FAMILLES = [
		{ titre: 'Ceux qui pilotent', sub: 'Financement et mise en œuvre', tint: '#e3ecf8', sh: ['search', 'bailleur'] },
		{ titre: 'Ceux qui portent la voix', sub: 'Le cœur du projet, appuyés et renforcés', tint: '#e2f4ef', sh: ['urtel', 'osc', 'medias'] },
		{ titre: 'Ceux que le projet veut atteindre', sub: 'Décideurs, relais locaux et public', tint: '#fdeedb', sh: ['etat', 'coutume', 'pop'] }
	];
	const vign = Object.fromEntries(FAMILLES.flatMap((f) => f.sh.map((k) => [k, vignette(k, f.tint)])));
</script>

<section id="projet">
	<h2 class="sh">Le projet <span>Sigida Herema</span></h2>
	<p class="lead">
		Un projet de <b>Search for Common Ground</b>, financé par la <b>Belgique</b>, qui aide les médias et les organisations de la
		société civile maliennes à défendre <em>ensemble</em> un espace civique ouvert et apaisé : la liberté de s'informer, de
		s'exprimer, de débattre et de participer aux décisions publiques.
	</p>

	<div class="pj-two">
		<div class="pj-block">
			<p class="kick">Le problème de départ</p>
			<p>
				Depuis la transition politique, les relations entre l'État, les médias, les OSC et les citoyens sont tendues. L'insécurité,
				les crises sociales et la désinformation pèsent sur le débat public.
			</p>
			<p>
				S'y ajoutent des contraintes moins visibles : l'autocensure, les pressions politiques ou religieuses, les tabous. Résultat :
				les citoyens participent peu, font moyennement confiance aux médias, et les OSC ont du mal à se faire entendre sans être
				perçues comme hostiles.
			</p>
		</div>
		<div class="pj-block">
			<p class="kick">Ce que le projet veut changer</p>
			<div class="pj-obj">
				<div class="os">
					<b class="code">Objectif spécifique 1 · Du côté des acteurs</b>
					<p>Les OSC et les médias font un plaidoyer <b>collaboratif et constructif</b> sur les sujets sensibles de gouvernance, plutôt que de s'opposer frontalement aux autorités.</p>
					<p class="muted">Comment : renforcement des capacités (plaidoyer, vérification des faits, production d'émissions) et forums réguliers OSC-gouvernement.</p>
				</div>
				<div class="os t">
					<b class="code">Objectif spécifique 2 · Du côté du public</b>
					<p>Les citoyens <b>comprennent mieux leurs droits</b> et soutiennent un espace civique libre et inclusif.</p>
					<p class="muted">Comment : dialogues publics inclusifs (femmes, jeunes, leaders coutumiers), campagnes radio sur la paix et le vivre-ensemble, information fiable notamment sur les élections.</p>
				</div>
			</div>
		</div>
	</div>

	<h3 class="pj-h3">Les acteurs clés</h3>
	<div class="familles">
		{#each FAMILLES as f}
			<div class="famille">
				<div class="fam-head"><b>{f.titre}</b><span>{f.sub}</span></div>
				<div class="fam-cards">
					{#each f.sh as k}
						<article class="acteur">
							<svg viewBox={viewBoxOf(k)} aria-hidden="true"><Shapes shapes={vign[k]} /></svg>
							<div class="ac-body">
								<div class="ac-name"><span class="n">{num[k]}</span>{STAKE[k].name}</div>
								<p>{STAKE[k].brief}</p>
								<button class="link small" onclick={() => showInSystem(k)}>Voir dans le système →</button>
							</div>
						</article>
					{/each}
				</div>
			</div>
		{/each}
	</div>

	<div class="pj-three lean">
		<div class="pj-block">
			<p class="kick">Où</p>
			<div class="zones-l">
				<div><b>Bamako</b><span>Toutes les communes du district</span></div>
				<div><b>Mopti</b><span>Chef-lieu de région</span></div>
				<div><b>Gao</b><span>Chef-lieu de région</span></div>
			</div>
		</div>
		<div class="force">
			<p class="kick">Un point important</p>
			<p>
				Le projet a <b>changé de stratégie en cours de route</b>. Après la dissolution des partis politiques (mai 2025), les activités
				électorales ont été remplacées par des émissions de cohésion sociale diffusées par les radios de l'URTEL (réadaptation approuvée
				par la DGD le 13 septembre 2025). En janvier 2026, les cibles sur la confiance envers les médias et le plaidoyer des OSC ont été
				<b>revues à la hausse</b>. L'évaluation devra dire si ces ajustements ont marché.
			</p>
		</div>
	</div>

	<div class="toc">
		<h3 class="toc-h">La théorie du changement de Search</h3>
		<p class="toc-src">Formulaire de projet (2023) et plan MEAL. L'analyse de contribution teste chaque condition une à une.</p>
		<ol class="toc-c">
			{#each CONDITIONS as c}
				<li class:readapte={c.readapte}>
					<span class="toc-k">{c.k}</span>
					<span class="toc-t">{c.t}{#if c.readapte}<em>{c.readapte}</em>{/if}</span>
					<span class="toc-i">{#each c.ind as i}<b>Ind. {i}</b>{/each}</span>
				</li>
			{/each}
		</ol>
		<p class="toc-r"><span class="toc-k">Alors</span>{ALORS}.</p>
		<p class="toc-r"><span class="toc-k">Parce que</span>{PARCE_QUE}.</p>
		<h3 class="toc-h">La réadaptation de 2025</h3>
		<table class="toc-tab">
			<thead><tr><th>Activité initiale</th><th>Activité réadaptée</th><th>Cible</th></tr></thead>
			<tbody>{#each READAPTATION as r}<tr><td>{r.avant}</td><td>{r.apres}</td><td>{r.cible}</td></tr>{/each}</tbody>
		</table>
	</div>
</section>

<style>
	.toc { margin-top: 2rem; }
	.toc-h { font-size: 1rem; margin: 1.4rem 0 0.3rem; }
	.toc-src { color: #5d6878; font-size: 0.85rem; margin: 0 0 0.8rem; }
	.toc-c { list-style: none; padding: 0; margin: 0; display: grid; gap: 0.5rem; }
	.toc-c li { display: grid; grid-template-columns: 4.5rem 1fr auto; gap: 0.8rem; align-items: start; background: #f5f8fc; border-left: 3px solid #1254b2; padding: 0.6rem 0.8rem; border-radius: 6px; }
	.toc-c li.readapte { border-left-color: #e8a33d; background: #fff7ea; }
	.toc-k { font-weight: 700; color: #1254b2; margin-right: 0.5rem; }
	.toc-t em { display: block; font-style: normal; font-size: 0.82rem; color: #a5650c; margin-top: 0.2rem; }
	.toc-i { display: flex; gap: 0.25rem; flex-wrap: wrap; justify-content: flex-end; }
	.toc-i b { font-size: 0.7rem; background: #1254b2; color: #fff; padding: 0.1rem 0.35rem; border-radius: 4px; white-space: nowrap; }
	.toc-r { margin: 0.6rem 0 0; }
	.toc-tab { width: 100%; border-collapse: collapse; font-size: 0.88rem; }
	.toc-tab th { text-align: left; background: #1254b2; color: #fff; padding: 0.4rem 0.6rem; }
	.toc-tab td { border-bottom: 1px solid #dde4ee; padding: 0.4rem 0.6rem; vertical-align: top; }
	@media (max-width: 700px) { .toc-c li { grid-template-columns: 1fr; } .toc-i { justify-content: flex-start; } }
</style>

<script>
	import { STAKE, ACTORS } from '$lib/data/projet.js';
	import { vignette, viewBoxOf } from '$lib/iso/vignettes.js';
	import { showInSystem } from '$lib/state.svelte.js';
	import Shapes from './Shapes.svelte';

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
					<b class="code">Objectif 1 · Du côté des acteurs</b>
					<p>Les OSC et les médias font un plaidoyer <b>collaboratif et constructif</b> sur les sujets sensibles de gouvernance, plutôt que de s'opposer frontalement aux autorités.</p>
					<p class="muted">Comment : renforcement des capacités (plaidoyer, vérification des faits, production d'émissions) et forums réguliers OSC-gouvernement.</p>
				</div>
				<div class="os t">
					<b class="code">Objectif 2 · Du côté du public</b>
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
				Le projet a <b>changé de stratégie en cours de route</b>. Le partenariat avec l'URTEL a été ajouté après l'approche prévue en
				octobre 2025, pour toucher plus de monde à moindre coût. En janvier 2026, les cibles sur la confiance envers les médias et le
				plaidoyer des OSC ont été <b>revues à la hausse</b>. L'évaluation devra dire si ces ajustements ont marché.
			</p>
		</div>
	</div>
</section>

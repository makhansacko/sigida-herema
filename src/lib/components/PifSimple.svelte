<script>
	import { D } from '$lib/data/pif.js';
	import { nodeById } from '$lib/data/systeme.js';
	import { STAKE } from '$lib/data/projet.js';
	import { showInSystem } from '$lib/state.svelte.js';
	import ThemeIcon from './ThemeIcon.svelte';

	const label = (id) => STAKE[id]?.short ?? nodeById[id]?.label ?? id;

	// Les 5 thèmes = QUOI regarder : chaque thème regroupe des changements du modèle logique
	const THEMES = [
		{ id: 'agency', q: 'Les gens se sentent-ils capables d’agir ?', links: ['c_rights', 'osc'] },
		{ id: 'legit', q: 'Les institutions, médias compris, gagnent-elles la confiance ?', links: ['c_trust', 'c_voice'] },
		{ id: 'polar', q: 'La méfiance entre groupes recule-t-elle ?', links: ['c_cohesion', 'plaid'] },
		{ id: 'invest', q: 'Reste-t-il des ressources pour la paix après le projet ?', links: ['forum', 's_urtel'] },
		{ id: 'violence', q: 'Les gens sont-ils plus en sécurité ?', links: ['c_protect', 'dial'], note: 'Aucune question d’évaluation des TDR n’y est rattachée.' }
	];
	// Les 3 piliers = COMMENT le prouver : des méthodes déjà prévues
	const PILIERS = [
		{ t: 'Mesures alignées', d: 'Des chiffres standard, comparables d’un projet à l’autre.', m: 'Enquête ménages, enquête OSC et médias' },
		{ t: 'Expérience vécue', d: 'Ce que les gens eux-mêmes disent avoir changé.', m: 'FGD, récits du changement le plus significatif' },
		{ t: 'Observations d’experts', d: 'Ce que les praticiens observent, y compris l’inattendu.', m: 'KII, atelier de récolte des résultats' }
	];
</script>

<section id="pif">
	<h2 class="sh">Le PIF, <span>simplement</span></h2>
	<div class="pif-two">
		<div class="pif-box">
			<p class="kick">Critères OCDE</p>
			<p><b>Le bulletin du projet.</b> Pertinence, efficacité, efficience, impact, durabilité : le projet a-t-il bien fonctionné ? C’est le cadre principal de l’évaluation.</p>
		</div>
		<div class="pif-box t">
			<p class="kick">Cadre d’impact pour la paix (PIF)</p>
			<p><b>Les signes vitaux de la société autour du projet.</b> Qu’est-ce qui a changé pour la paix ? Les TDR l’utilisent surtout pour l’<b>impact</b> et la <b>durabilité</b>. Il n’ajoute presque pas de travail : il <b>classe</b> les résultats et vérifie qu’ils reposent sur <b>trois types de preuves</b>.</p>
		</div>
	</div>

	<h3 class="pj-h3">5 thèmes : quoi regarder</h3>
	<div class="themes">
		{#each THEMES as th}
			<div class="theme d-{th.id}">
				<svg viewBox="-34 -26 68 52" class="ico-s" aria-hidden="true"><g class="ico"><ThemeIcon id={th.id} /></g></svg>
				<div>
					<b class="tn">{D[th.id].name}</b>
					<p>{th.q}</p>
					<div class="chips">
						{#each th.links as l}<button class="chip" onclick={() => showInSystem(l)}>{label(l)} →</button>{/each}
					</div>
					{#if th.note}<p class="muted">{th.note}</p>{/if}
				</div>
			</div>
		{/each}
	</div>

	<h3 class="pj-h3">3 piliers : comment le prouver</h3>
	<div class="piliers3">
		{#each PILIERS as p, i}
			<div class="p3">
				<span class="step-n">{i + 1}</span>
				<b>{p.t}</b>
				<p>{p.d}</p>
				<p class="muted">Dans cette évaluation : <b>{p.m}</b></p>
			</div>
		{/each}
	</div>
	<p class="muted" style="margin-top:12px">
		En pratique : présenter les résultats d’impact et de durabilité classés par thème, en s’assurant que chaque thème s’appuie sur
		les trois piliers. Exemple pour la polarisation : l’écart entre groupes (enquête), ce que disent les FGD et ce qu’observent les KII.
	</p>
</section>

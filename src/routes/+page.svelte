<script>
	import Cover from '$lib/components/Cover.svelte';
	import Bord from '$lib/components/Bord.svelte';
	import Calendrier from '$lib/components/Calendrier.svelte';
	import Livrables from '$lib/components/Livrables.svelte';
	import Equipe from '$lib/components/Equipe.svelte';
	import Collecte from '$lib/components/Collecte.svelte';
	import Decisions from '$lib/components/Decisions.svelte';
	import Risques from '$lib/components/Risques.svelte';
	import Documents from '$lib/components/Documents.svelte';
	import Projet from '$lib/components/Projet.svelte';
	import Systeme from '$lib/components/Systeme.svelte';
	import Indicateurs from '$lib/components/Indicateurs.svelte';
	import Questions from '$lib/components/Questions.svelte';
	import Pif from '$lib/components/Pif.svelte';
	import { loadAll } from '$lib/persist.svelte.js';

	$effect(() => {
		loadAll();
	});
</script>

<svelte:head>
	<title>Évaluation finale Sigida Herema · pilotage de la mission</title>
	<meta name="description" content="Pilotage de l'évaluation finale du projet Sigida Herema (Search for Common Ground) par Sahel Analytics : calendrier, livrables, collecte, décisions, risques, et ce qu'il faut comprendre du projet." />
</svelte:head>

<Cover />

<main class="wrap">
	<div class="part" id="piloter"><span>Partie 1</span><h2>Piloter la mission</h2><p>Où en est-on, que faut-il livrer, qui fait quoi, que faut-il trancher.</p></div>
	<Bord />
	<Calendrier />
	<Livrables />
	<Decisions />
	<Collecte />
	<Equipe />
	<Risques />
	<Documents />

	<div class="part" id="comprendre"><span>Partie 2</span><h2>Comprendre ce qu’on évalue</h2><p>Le projet, sa logique, les indicateurs, les questions d’évaluation et le PIF.</p></div>
	<Projet />
	<Systeme />
	<Indicateurs />
	<Questions />
	<Pif />
</main>

<footer class="wrap">
	<div class="attr">
		Sources : TDR SFCG ML 03-172026 (août 2026), offre technique de Sahel Analytics, réunion de cadrage du 20/11/2026, documents de
		Search reçus le 23/11/2026 (étude de base, cadres logiques, plan MEAL, analyse de contexte, PIF d’août 2026). Le modèle logique est
		une reconstruction de Sahel Analytics.
	</div>
</footer>

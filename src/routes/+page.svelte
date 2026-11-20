<script>
	import Cover from '$lib/components/Cover.svelte';
	import Projet from '$lib/components/Projet.svelte';
	import Systeme from '$lib/components/Systeme.svelte';
	import Indicateurs from '$lib/components/Indicateurs.svelte';
	import Questions from '$lib/components/Questions.svelte';
	import Pif from '$lib/components/Pif.svelte';
	import Calendrier from '$lib/components/Calendrier.svelte';
	import Demandes from '$lib/components/Demandes.svelte';
</script>

<svelte:head>
	<title>Évaluation finale Sigida Herema</title>
	<meta name="description" content="Préparation de l'évaluation finale du projet Sigida Herema (Search for Common Ground) : projet, modèle logique et indicateurs." />
</svelte:head>

<Cover />

<main class="wrap">
	<Projet />
	<Systeme />
	<Indicateurs />
	<Questions />
	<Pif />
	<Calendrier />
	<Demandes />
</main>

<footer class="wrap">
	<div class="attr">
		Source : TDR de l'appel d'offres Search for Common Ground n° SFCG ML 03-172026, août 2026. Le modèle logique et le
		traitement des indicateurs sont une reconstruction de Sahel Analytics, à valider avec Search au cadrage.
	</div>
</footer>

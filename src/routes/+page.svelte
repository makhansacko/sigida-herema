<script>
	import Cover from '$lib/components/Cover.svelte';
	import Projet from '$lib/components/Projet.svelte';
	import Systeme from '$lib/components/Systeme.svelte';
	import Loupe from '$lib/components/Loupe.svelte';
	import Piliers from '$lib/components/Piliers.svelte';
	import Matrice from '$lib/components/Matrice.svelte';
	import Indicateurs from '$lib/components/Indicateurs.svelte';
	import Mission from '$lib/components/Mission.svelte';
</script>

<svelte:head>
	<title>Évaluation finale Sigida Herema · PIF</title>
	<meta name="description" content="Visualisation de l'évaluation finale du projet Sigida Herema à travers le Cadre d'Impact pour la Paix de Search for Common Ground." />
</svelte:head>

<Cover />

<main class="wrap">
	<Projet />
	<Systeme />
	<Loupe />
	<Piliers />
	<Matrice />
	<Indicateurs />
	<Mission />
</main>

<footer class="wrap">
	<div class="attr">
		<b>Le Cadre d'Impact pour la Paix</b> est un outil en libre accès qui peut être utilisé, distribué et adapté par tous : « The
		Peace Impact Framework » de Lemon, A. et al., disponible sur
		<a href="https://cnxus.org/peace-impact-framework/">cnxus.org/peace-impact-framework</a> (version française, juin 2023). Données
		du projet : TDR de l'appel d'offres Search n° SFCG ML 03-172026, août 2026. Rattachements aux thèmes signalés comme « proposés
		» : analyse Sahel Analytics, à valider au cadrage.
	</div>
</footer>

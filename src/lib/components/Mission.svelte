<script>
	const ETAPES = [
		['Rencontre de cadrage', "Début des 45 jours. Questions finales arrêtées par consensus avec Search et l'URTEL."],
		['Rapport de démarrage', "Design, échantillonnage justifié, matrice de définition des indicateurs (unité, numérateur et dénominateur, seuils), plan d'analyse et plan qualité."],
		['Outils et test pilote', "Revue par l'équipe MEAL ; pilote le lendemain de la formation des enquêteurs ; accès au serveur donné à Search."],
		['Collecte de terrain', 'KoboToolbox ou Survey Solutions, langues locales à Mopti et Gao, approche Do No Harm, dossier photo.'],
		['Restitution des tendances', 'Dans les 5 jours ouvrables après la fin de la collecte.'],
		['Rapport provisoire', 'En français, relu en plusieurs phases par Search, ses partenaires et le bailleur.'],
		['Rapport final et bases', "60 pages maximum, canevas Search, tableau récapitulatif des indicateurs ; données brutes, apurées et script d'apurement."],
		['Diffusion', 'PowerPoint, présentation virtuelle de 1 à 2 h, note de synthèse de 2 pages.']
	];
	const VIGILANCES = [
		["La Violence n'est rattachée à aucune question des TDR.", "Elle n'apparaît qu'à travers la sécurité ressentie des participants et l'opinion selon laquelle « la violence est parfois nécessaire ». À traiter explicitement, ou à justifier comme thème secondaire pour un projet centré sur l'espace civique."],
		['Les Investissements ne reposent que sur la durabilité.', "La mesure alignée « valeur du temps et des ressources investis dans la paix » peut relier l'efficience (levier des 383 radios) à ce thème."],
		["L'indicateur 2.3 n'a pas de valeur de base.", 'Il faut le signaler et proposer une alternative, par exemple une question rétrospective ou une comparaison entre auditeurs et non-auditeurs.'],
		['Les cibles sur la confiance envers les médias et le plaidoyer des OSC ont été revues à la hausse en janvier 2026.', "Il faut lire les écarts au regard de la théorie du changement adaptée."],
		['Les indicateurs « co-créés »', 'relèvent du pilier Expérience vécue. Leur formulation doit rester celle des communautés pour que la comparaison base/finale tienne.'],
		['Désirabilité sociale', "sur la confiance et la sécurité, dans un contexte de pression informationnelle. Elle peut être atténuée par l'anonymat, des enquêteurs extérieurs au projet et la triangulation avec les KII et les FGD."]
	];
</script>

<section id="mission">
	<h2 class="sh">La mission <span>pas à pas</span></h2>
	<div style="max-width:780px">
		<ol class="road">
			{#each ETAPES as [t, m]}
				<li><div><b>{t}</b><p class="muted">{m}</p></div></li>
			{/each}
		</ol>
	</div>
	<div class="warn">
		<p class="kick" style="color:var(--t-polar)">Points de vigilance pour le rapport de démarrage</p>
		<ol>
			{#each VIGILANCES as [b, t]}<li><b>{b}</b> {t}</li>{/each}
		</ol>
	</div>
</section>

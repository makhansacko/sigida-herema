/**
 * Registre des décisions à arbitrer avec Search (note d'arbitrage du 26/11 et suivantes).
 * `reco` : position de Sahel Analytics ; `ech` : échéance ; `ind` : indicateurs concernés.
 */
export const DECISIONS = [
	{ id: 'regles', t: 'Règles de calcul des indicateurs composites',
		pourquoi: 'Chaque indicateur de la base combine 2 à 5 affirmations notées de 1 à 5, mais le rapport ne dit pas comment on passe des notes au pourcentage.',
		reco: 'Obtenir la base de données et la syntaxe de l’étude de base, reconstituer les règles, puis les appliquer à l’identique.', ech: '2026-11-26', ind: ['0.1', '0.2', '1', '2.1', '2.2', '8', '12'] },
	{ id: 'age', t: 'Âge minimum des répondants',
		pourquoi: 'La base a interrogé des 15–19 ans (3 % de l’échantillon) ; interroger des mineurs demande un consentement parental.',
		reco: 'Interroger à partir de 18 ans et recalculer les valeurs de base sur les 18 ans et plus à partir de la base de données.', ech: '2026-11-26', ind: [] },
	{ id: 'taille', t: 'Taille de l’échantillon ménages',
		pourquoi: 'L’offre prévoit 384 personnes ; la base en a interrogé 503, acteurs compris, sans dire combien venaient des communautés.',
		reco: 'Garder 384 ménages : les écarts visés restent détectables pour 0.2, 2.1 et 2.2.', ech: '2026-11-26', ind: ['0.2', '2.1', '2.2'] },
	{ id: 'panel', t: 'Réinterroger les OSC et médias de la base',
		pourquoi: 'Avec 80 OSC, l’écart visé pour les indicateurs 1 et 12 n’est pas démontrable si l’on interroge d’autres organisations.',
		reco: 'Réinterroger les mêmes organisations (panel), sans coût supplémentaire, si Search fournit les listes.', ech: '2026-11-26', ind: ['1', '12', '0.1'] },
	{ id: 'cible23', t: 'Cible de l’indicateur 2.3',
		pourquoi: 'Le cadre logique révisé et les TDR disent 60 % ; l’analyse de contexte d’avril 2026 mesure 83 % et fixe la cible à 95 %.',
		reco: 'Retenir 83 % comme base (mars 2026) et faire confirmer la cible par Search.', ech: '2026-11-26', ind: ['2.3'] },
	{ id: 'leaders', t: 'Sous-échantillon de leaders communautaires auditeurs (indicateur 2.3)',
		pourquoi: 'La base de mars 2026 (83 %) porte sur 360 auditeurs, dont 83 leaders communautaires ; sans eux, la valeur finale n’est pas comparable.',
		reco: 'Ajouter environ 20 leaders auditeurs par zone (60 au total, 6 à 8 jours-enquêteur) et reprendre la même question.', ech: '2026-12-01', ind: ['2.3'] },
	{ id: 'pif', t: 'Ajouter les trois questions du PIF absentes des TDR',
		pourquoi: 'Sécurité dans le quartier, sentiment de pouvoir agir, sentiment d’être perçu comme moins qu’humain : trois questions fermées.',
		reco: 'Les ajouter à l’enquête ménages, pour un coût quasi nul ; sans valeur de base.', ech: '2026-11-26', ind: [] },
	{ id: 'cocrees', t: 'Indicateurs co-créés auprès de la population',
		pourquoi: 'Le plan MEAL prévoit deux indicateurs GAM à l’évaluation finale, absents des TDR : sources fiables connues, informations sur les candidats.',
		reco: 'Garder le premier (sources fiables) ; abandonner le second, sans objet depuis la suspension des élections.', ech: '2026-12-01', ind: [] },
	{ id: 'conges', t: 'Collecte pendant les congés de Search',
		pourquoi: 'Search est absent du 22 décembre au 3 janvier, pendant la collecte.',
		reco: 'Tout régler avant le 19 décembre et convenir d’un contact d’urgence (sécurité, safeguarding).', ech: '2026-12-10', ind: [] },
	{ id: 'avenant', t: 'Avenant au contrat',
		pourquoi: 'Le contrat-cadre avec Search prend fin le 30 novembre 2026.',
		reco: 'Avenant jusqu’au 26 janvier 2027 au moins, hors délais de revue.', ech: '2026-11-30', ind: [] },
	{ id: 'fane', t: 'Rôle d’Abdoulaye Fané',
		pourquoi: 'Ancien chef de projet de Sigida Herema chez Search : risque d’indépendance perçu.',
		reco: 'Déclarer le lien par écrit, limiter son rôle au PIF, l’interroger comme informateur clé.', ech: '2026-11-26', ind: [] }
];

/** Documents de Search reçus le 23/11/2026, ce qu'on en tire, et ce qu'il reste à obtenir. */
export const RECUS = [
	{ t: 'Rapport de l’étude de base (juin 2024)', tire: 'Valeurs de base, dont 43 % (ind. 8) et 36 % (ind. 12) ; méthode et localités.' },
	{ t: 'Questionnaire de l’étude de base', tire: 'Formulations exactes ; indicateurs composites notés de 1 à 5.' },
	{ t: 'Guide FGD GAM', tire: '4 groupes par zone, 8 personnes ; création et vote d’indicateurs locaux.' },
	{ t: 'Guides d’entretien : OSC, médias, autorités locales, État et experts', tire: 'Réutilisables, à resserrer sur les questions d’évaluation.' },
	{ t: 'Cadre logique initial et cadre logique révisé (31/01/2026)', tire: 'Cibles révisées ; nouvel indicateur 2.2 sur les auditeurs ; 1 532 diffusions URTEL prévues.' },
	{ t: 'Plan de suivi, évaluation et apprentissage', tire: 'Définitions et méthodes de calcul ; missions de suivi ; journaux de réflexion.' },
	{ t: 'Note de réadaptation (15/07/2025) et lettre d’approbation de la DGD (13/09/2025)', tire: 'Passage des activités électorales aux émissions de cohésion sociale via l’URTEL.' },
	{ t: 'Analyse de contexte (avril 2026)', tire: 'Base de 83 % pour l’indicateur 2.3 (360 auditeurs) ; comparaison participants et non-participants.' },
	{ t: 'Formulaire de projet (septembre 2023)', tire: '1 000 000 €, 30 mois, théorie du changement.' }
];

export const CONSTATS = [
	{ t: 'Huit indicateurs ont une valeur de base, pas cinq', d: 'Les indicateurs 8 (capacité de plaidoyer, 43 %) et 12 (participation aux décisions, 36 %) figurent dans le rapport de base ; le 2.3 a une base de 83 % depuis mars 2026.' },
	{ t: 'Les indicateurs sont composites', d: 'Chacun combine plusieurs affirmations notées de 1 à 5 ; la règle de calcul doit être reconstituée depuis la base de données de l’étude de base.' },
	{ t: 'La numérotation des TDR diffère du cadre logique', d: 'TDR 2.1 = cadre logique 2 ; TDR 2.2 = cadre logique 2.1 ; TDR 2.3 = cadre logique 2.2 révisé ; nos 8 et 12 = cadre logique 1.1 et 1.2.' },
	{ t: 'Le GAM a déjà été pratiqué', d: 'L’étude de base a fait créer des indicateurs locaux en groupe de discussion : reprendre le même guide donne de la comparabilité qualitative.' },
	{ t: 'La théorie du changement a quatre conditions, dont une électorale',
		d: 'Formulaire de projet et plan MEAL : la quatrième condition (couverture responsable des élections) a été remplacée de fait par les émissions de cohésion sociale URTEL. L’analyse de contribution teste chaque condition.' },
	{ t: 'Les groupes de discussion de 2024 ont créé des indicateurs locaux',
		d: 'Les indicateurs 9 à 11 en sont issus ; les groupes de discussion finaux y reviennent pour une comparaison qualitative.' },
	{ t: 'Une évaluation à mi-parcours existe de fait', d: 'L’analyse de contexte de mars 2026 compare participants et non-participants : une source directe pour l’analyse de contribution.' },
	{ t: 'Le projet a changé de cap en 2025', d: 'Dissolution des partis (mai 2025), suspension des élections : réadaptation approuvée le 13/09/2025, à évaluer comme telle (pertinence, efficience).' }
];

export const A_OBTENIR = [
	{ id: 'bdd', t: 'Base de données de l’étude de base, brute et apurée, avec la syntaxe de calcul', pourquoi: 'Reconstituer les règles de calcul ; recalculer sur les 18 ans et plus ; indicateur 7.' },
	{ id: 'listes-base', t: 'Listes des OSC et médias interrogés à la base, avec contacts', pourquoi: 'Réinterroger les mêmes organisations (indicateurs 0.1, 1, 8, 12).' },
	{ id: 'suivi', t: 'Rapports des missions de suivi et données des fiches d’évaluation des activités', pourquoi: 'Valeurs intermédiaires ; indicateurs de safeguarding 13 à 15.' },
	{ id: 'ctx-bdd', t: 'Questionnaire et données de l’analyse de contexte de mars 2026', pourquoi: 'Mesurer l’indicateur 2.3 avec la même question et la même règle de calcul (recalcul de la base sur les 277 auditeurs ordinaires) ; comparaison participants et non-participants. Avant le 19/12.' },
	{ id: 'listes-part', t: 'Listes de participants avec contacts (formations, forums, dialogues, initiatives)', pourquoi: 'Questionnaire participants, groupes de discussion, entretiens.' },
	{ id: 'produits', t: 'Données de suivi des produits du cadre logique : rapports d’activité, listes de présence, prétests et post-tests', pourquoi: 'Comparer les réalisations aux cibles (annexe D du rapport de démarrage) ; efficacité et efficience. À obtenir avant le 19/12.' },
	{ id: 'lettres', t: 'Lettres d’introduction auprès des autorités, de la HAC et du MATD', pourquoi: 'Les autorités ont refusé les entretiens en 2024 et en 2026. À obtenir avant le début de la collecte (17/12).' },
	{ id: 'urtel', t: 'Rapports de diffusion URTEL et grilles des radios partenaires', pourquoi: 'Portée réelle ; exposition par zone et par période.' },
	{ id: 'budget', t: 'Budget et dépenses par activité, avant et après la réadaptation', pourquoi: 'Efficience : coût par personne atteinte.' },
	{ id: 'rapports', t: 'Rapports narratifs au bailleur et journaux de réflexion', pourquoi: 'Mise en œuvre réelle, adaptations, effets inattendus.' },
	{ id: 'meal', t: 'Formulations standard du cadre MEAL global (indicateurs 16 à 18)', pourquoi: 'Reprendre exactement les questions.' },
	{ id: 'canevas', t: 'Canevas du rapport d’évaluation et normes graphiques de Search', pourquoi: 'Le rapport final doit le suivre.' }
];

/**
 * Ce qu'il faut demander à Search avant ou au cadrage, et à quoi chaque élément sert.
 * `ind` : indicateurs concernés (codes de data/indicateurs.js).
 */
export const DEMANDES = [
	{
		id: 'base', t: 'Rapport de l’étude de base, base de données et questionnaires',
		why: 'Valeurs de base des indicateurs 7 et 8, formulation exacte des questions, mode d’entretien, listes des OSC et médias interrogés, répartition par commune.',
		ind: ['0.1', '0.2', '1', '2.1', '2.2', '7', '8']
	},
	{
		id: 'doc', t: 'Document de projet, cadre logique, théorie du changement et plan MEAL',
		why: 'Hypothèse critique à tester, résultats attendus, définitions des indicateurs.',
		ind: []
	},
	{
		id: 'suivi', t: 'Rapports d’étape et rapports des missions de suivi',
		why: 'Valeurs des indicateurs de safeguarding mesurées pendant le projet ; adaptations au contexte.',
		ind: ['13', '14', '15']
	},
	{
		id: 'activites', t: 'Données d’activités par commune : dialogues, forums, formations, émissions',
		why: 'Vérifier ce qui a réellement été mis en œuvre, et comparer les communes très et peu exposées.',
		ind: []
	},
	{
		id: 'listes', t: 'Listes de participants avec contacts (OSC, journalistes formés, dialogues, forums)',
		why: 'Retrouver les participants pour le safeguarding et les entretiens ; vérifier la participation déclarée.',
		ind: ['10', '13', '14', '15']
	},
	{
		id: 'budget', t: 'Budget et dépenses par activité, y compris l’approche prévue en octobre 2025',
		why: 'Questions d’efficience : coût par personne atteinte, apport du partenariat URTEL.',
		ind: []
	},
	{
		id: 'urtel', t: 'Journaux de diffusion URTEL : radios, émissions, langues, dates',
		why: 'Portée réelle des campagnes ; identifier les zones et périodes d’exposition.',
		ind: ['2.3']
	},
	{
		id: 'cibles', t: 'Note sur la révision des cibles de janvier 2026 et le passage par l’URTEL',
		why: 'Lire les écarts au regard des cibles révisées et de la théorie du changement adaptée.',
		ind: ['0.2', '1']
	},
	{
		id: 'meal', t: 'Formulations standard du cadre MEAL global et définition des groupes comparés',
		why: 'Reprendre exactement les questions des indicateurs 16 à 18 ; définir « participant » et les groupes de l’indicateur 18.',
		ind: ['16', '17', '18']
	},
	{
		id: 'canevas', t: 'Canevas du rapport d’évaluation et normes graphiques de Search',
		why: 'Le rapport final doit suivre le canevas fourni par Search (60 pages maximum).',
		ind: []
	}
];

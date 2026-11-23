/**
 * Plan de collecte : qui, combien, avec quel outil, et ce que l'étude de base a fait.
 * Les outils de l'étude de base (questionnaire et guides) ont été reçus le 23/11/2026.
 */
export const ZONES = ['Bamako', 'Mopti', 'Gao'];

export const OUTILS = [
	{ t: 'Enquête ménages', n: [230, 77, 77], niveau: 'Environnement systémique', approche: 'Mesures alignées',
		qui: 'Personnes de 15 ans et plus, tirées au hasard dans les localités de la base', base: 'Questionnaire de base (sections « communautés ») + 3 questions du PIF en option',
		ind: ['0.2', '2.1', '2.2', '2.3', '7', '16', '17', '18'] },
	{ t: 'Enquête OSC', n: null, total: 80, niveau: 'Noyau', approche: 'Mesures alignées',
		qui: 'Membres d’OSC, dont le réseau Sigida Herema ; sélection raisonnée comme à la base', base: 'Questionnaire de base (sections « OSC et médias »)',
		ind: ['0.1', '1', '8', '9', '10', '11', '12'] },
	{ t: 'Enquête médias', n: null, total: 40, niveau: 'Noyau', approche: 'Mesures alignées',
		qui: 'Journalistes, animateurs, responsables de radios, blogueurs', base: 'Questionnaire de base (sections « OSC et médias »)',
		ind: ['0.1', '9', '12'] },
	{ t: 'Questionnaire participants', n: null, total: null, niveau: 'Noyau', approche: 'Mesures alignées',
		qui: 'Participants aux formations, forums et dialogues (listes de Search)', base: 'Fiches d’évaluation des activités de Search',
		ind: ['13', '14', '15'] },
	{ t: 'Groupes de discussion (GAM)', n: [4, 4, 4], niveau: 'Noyau et groupe secondaire', approche: 'Expérience vécue',
		qui: 'Par zone, comme à la base : femmes (OSC et communauté), jeunes mixtes, médias traditionnels, médias en ligne ; 8 personnes chacun', base: 'Guide FGD GAM de la base',
		ind: [] },
	{ t: 'Entretiens avec des informateurs clés', n: null, total: 35, niveau: 'Groupe secondaire et praticiens', approche: 'Observations des praticiens',
		qui: 'Répartition proposée : autorités locales 9, responsables d’OSC 9, médias et radios 9, État et experts 4, URTEL 2, équipe Search 2', base: 'Quatre guides de la base (OSC, médias, autorités locales, État et experts)',
		ind: [] },
	{ t: 'Récits de changement significatif', n: null, total: null, niveau: 'Noyau', approche: 'Expérience vécue',
		qui: 'Participants du réseau et auditeurs, recueillis pendant les groupes de discussion', base: 'Nouveau (méthode citée par le PIF)',
		ind: [] }
];

/** Localités de l'étude de base (rapport de juin 2024). */
export const LOCALITES = {
	Bamako: 'Communes I à VI',
	Mopti: 'Komoguel, Tiaboly, Bangueta, Millon Kin, Attbougou, Taikiri, Socoura',
	Gao: 'Boulgou Djié, Saney, Sosso Koira, Farandjireye, Aljanabandia, Château'
};

/** Ce qu'a fait l'étude de base (avril 2024, équipe MEAL de Search). */
export const BASE = [
	'Collecte en avril 2024, pendant le Ramadan, souvent de nuit.',
	'Sondage de 503 personnes (64 % d’hommes, 15 ans et plus) ; sélection raisonnée pour les OSC et médias, aléatoire pour les communautés.',
	'31 entretiens (dont 8 femmes) et 12 groupes de discussion GAM (96 personnes, dont 56 femmes).',
	'Un seul questionnaire pour tous, avec des sections par public ; chaque indicateur combine 2 à 5 affirmations notées de 1 à 5.',
	'MATD et HAC n’ont pas pu être interrogés.'
];

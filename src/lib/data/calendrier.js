/** Calendrier d'exécution de l'offre : 45 jours ouvrés à partir de la réunion de cadrage du 20 novembre 2026, hors délais de revue. */
export const PHASES = [
	{ t: 'Cadrage et rapport de démarrage', a: '2026-11-20', b: '2026-12-01', k: 'prep' },
	{ t: 'Conception des outils, revue MEAL', a: '2026-12-02', b: '2026-12-10', k: 'prep' },
	{ t: 'Formation et test pilote', a: '2026-12-11', b: '2026-12-16', k: 'terrain' },
	{ t: 'Collecte : Bamako, Mopti, Gao', a: '2026-12-17', b: '2026-12-31', k: 'terrain' },
	{ t: 'Apurement, analyse, restitution (08/01)', a: '2027-01-04', b: '2027-01-08', k: 'rapport' },
	{ t: 'Rapport provisoire', a: '2027-01-11', b: '2027-01-19', k: 'rapport' },
	{ t: 'Finalisation et rapport final', a: '2027-01-21', b: '2027-01-26', k: 'rapport' }
];
/** Congés de l'équipe Search (retour le 4 janvier), confirmés à la réunion de cadrage. */
export const CONGES = { a: '2026-12-22', b: '2027-01-03', t: 'Search en congé du 22 décembre au 3 janvier' };
export const CONDITIONS = [
	'Tout ce qui demande Search doit être réglé avant le 19 décembre : validation des outils, lettres d’introduction, contacts des OSC et des participants.',
	'La collecte (17–31 décembre) se déroule en grande partie pendant les congés de Search : convenir d’un contact d’urgence pour la sécurité et le safeguarding.',
	'La restitution du 8 janvier tombe quatre jours après le retour de Search : à caler dès maintenant.',
	'Les délais de revue de Search, des partenaires et du bailleur s’ajoutent à ce calendrier.',
	'Avenant au contrat nécessaire : le contrat actuel prend fin le 30 novembre.'
];

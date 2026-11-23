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
export const CONDITIONS = [
	'Les délais de revue de Search, des partenaires et du bailleur s’ajoutent à ce calendrier.',
	'La collecte tombe pendant les fêtes de fin d’année : à confirmer avec Search.',
	'Avenant au contrat nécessaire : le contrat actuel prend fin le 30 novembre.'
];

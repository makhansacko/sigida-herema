/** Calendrier d'exécution actualisé à la réunion de cadrage du 20 novembre 2026 : rapport final au 31 décembre. */
export const PHASES = [
	{ t: 'Cadrage et rapport de démarrage', a: '2026-11-20', b: '2026-11-25', k: 'prep' },
	{ t: 'Outils de collecte, revue MEAL', a: '2026-11-26', b: '2026-12-01', k: 'prep' },
	{ t: 'Formation (2 jours) et test pilote', a: '2026-12-02', b: '2026-12-04', k: 'terrain' },
	{ t: 'Collecte : Bamako, Mopti, Gao', a: '2026-12-07', b: '2026-12-16', k: 'terrain' },
	{ t: 'Analyse et restitution (21/12)', a: '2026-12-17', b: '2026-12-21', k: 'rapport' },
	{ t: 'Rapport provisoire', a: '2026-12-22', b: '2026-12-23', k: 'rapport' },
	{ t: 'Revue par Search', a: '2026-12-24', b: '2026-12-29', k: 'revue' },
	{ t: 'Rapport final', a: '2026-12-30', b: '2026-12-31', k: 'rapport' }
];
export const CONDITIONS = [
	'Revues de Search en 2 jours pour les outils et 3 jours pour le rapport provisoire.',
	'Collecte en 8 jours au lieu de 10 : prévoir 2 enquêteurs de plus à Bamako.',
	'Avenant au contrat jusqu’au 31 décembre (le contrat actuel prend fin le 30 novembre).'
];

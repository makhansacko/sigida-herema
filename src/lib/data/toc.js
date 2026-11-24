/**
 * Théorie du changement de Search (formulaire de projet 2023 et plan MEAL), et réadaptation de 2025
 * (note du 15/07/2025, approuvée par la DGD le 13/09/2025). Reprise telle quelle dans le rapport de démarrage.
 */
export const CONDITIONS = [
	{ k: 'Si', t: 'les capacités d’un réseau diversifié d’acteurs des médias et de la société civile sont renforcées en plaidoyer collaboratif et en journalisme sensible aux conflits', ind: ['1', '8'] },
	{ k: 'Si', t: 'le dialogue continu entre ce réseau et les acteurs gouvernementaux est facilité pour identifier des intérêts communs', ind: ['10', '12'] },
	{ k: 'Si', t: 'les discussions publiques inclusives sur les libertés fondamentales sont amplifiées par des débats radiophoniques et des concours en ligne', ind: ['0.2', '2.2', '16'] },
	{ k: 'Et si', t: 'les médias sont coordonnés autour d’une stratégie concertée de couverture responsable des élections', ind: ['2.3'], readapte: 'Réadaptée en 2025 : émissions de cohésion sociale diffusées par l’URTEL' }
];
export const ALORS = 'les acteurs des médias et de la société civile seront mieux outillés et interconnectés pour promouvoir et défendre un espace civique ouvert et pacifique au Mali';
export const PARCE_QUE = 'ils auront la capacité, la confiance, les réseaux, le soutien, les ressources et la collaboration des acteurs gouvernementaux nécessaires, tout en fournissant à la population des informations crédibles et transparentes sur ses droits et devoirs';

export const READAPTATION = [
	{ avant: 'A222 Comité de coordination technique des médias (élections)', apres: 'Formation des journalistes à l’animation de débats constructifs pour la paix', cible: '50 journalistes, une semaine' },
	{ avant: 'A223 Ateliers de préparation des journalistes', apres: 'Émissions de concertation et micro-programmes', cible: '9 émissions (3 par région), 4 micro-programmes' },
	{ avant: 'A224 Journées de synergie médiatique', apres: 'Diffusion par le réseau URTEL', cible: '1 532 diffusions (4 × 383 radios) en un mois' }
];

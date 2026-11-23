/** Sections de l'app, regroupées dans la barre latérale. */
export const NAV = [
	{
		group: 'Piloter la mission',
		items: [
			{ href: '/', label: 'Tableau de bord', title: 'Tableau de bord' },
			{ href: '/calendrier', label: 'Calendrier', title: 'Calendrier et jalons' },
			{ href: '/livrables', label: 'Livrables', title: 'Livrables' },
			{ href: '/decisions', label: 'Décisions', title: 'Décisions à arbitrer' },
			{ href: '/collecte', label: 'Collecte', title: 'Plan de collecte' },
			{ href: '/equipe', label: 'Équipe', title: 'Équipe et rôles' },
			{ href: '/risques', label: 'Risques', title: 'Risques' },
			{ href: '/documents', label: 'Documents', title: 'Documents de Search' }
		]
	},
	{
		group: 'Comprendre l’évaluation',
		items: [
			{ href: '/projet', label: 'Le projet', title: 'Le projet' },
			{ href: '/modele-logique', label: 'Modèle logique', title: 'Modèle logique' },
			{ href: '/indicateurs', label: 'Indicateurs', title: 'Indicateurs' },
			{ href: '/questions', label: 'Questions d’évaluation', title: 'Questions d’évaluation' },
			{ href: '/pif', label: 'Le PIF', title: 'Cadre d’impact sur la paix' }
		]
	}
];

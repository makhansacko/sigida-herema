/**
 * Questions d'évaluation par critère OCDE/CAD (TDR, section 3), en version courte.
 * - `ind` : indicateurs qui y répondent (codes de data/indicateurs.js).
 * - `src` : autres sources (clés de SOURCES).
 * - `pif` : dimension du PIF quand les TDR en indiquent une.
 * Les questions finales sont arrêtées au cadrage avec Search et l'URTEL.
 */

export const SOURCES = { kii: 'KII', fgd: 'FGD', docs: 'Documents projet', budget: 'Budget et dépenses', urtel: 'Données URTEL' };

export const CRITERES = [
	{
		id: 'pert', name: 'Pertinence',
		qs: [
			{ t: 'Le projet a-t-il renforcé la légitimité perçue des institutions, médias et OSC, leur redevabilité et leur capacité à représenter les citoyens ?', ind: ['0.2', '7'], src: ['kii'], pif: ['Légitimité', 'Pouvoir d’agir'] },
			{ t: 'Les interventions (dialogues, campagnes, plaidoyer) étaient-elles les plus adaptées aux contraintes sécuritaires et politiques ?', ind: [], src: ['docs', 'kii', 'fgd'] },
			{ t: 'Le projet a-t-il répondu aux attentes de chaque cible : URTEL, OSC, services de l’État, médias, autorités coutumières, communautés ?', ind: ['15'], src: ['kii', 'fgd'], pif: ['Pouvoir d’agir', 'Légitimité'] }
		]
	},
	{
		id: 'effi', name: 'Efficacité',
		qs: [
			{ t: 'Les résultats sont-ils atteints, y compris les cibles revues à la hausse en janvier 2026 (confiance envers les médias, plaidoyer des OSC) ?', ind: ['0.1', '0.2', '1', '2.1', '2.2'], src: [], pif: ['Légitimité', 'Pouvoir d’agir'] },
			{ t: 'Le projet a-t-il renforcé à la fois les compétences techniques et les capacités relationnelles des OSC et des médias ?', ind: ['8', '1'], src: ['kii'] },
			{ t: 'Les acteurs de l’espace civique sont-ils mieux à même de jouer leur rôle ?', ind: ['8', '10', '12'], src: ['kii'], pif: ['Pouvoir d’agir'] }
		]
	},
	{
		id: 'effc', name: 'Efficience',
		qs: [
			{ t: 'Le recours aux 383 radios de l’URTEL a-t-il amélioré le rapport coût-efficacité par rapport à l’approche prévue en octobre 2025 ?', ind: [], src: ['budget', 'urtel'] },
			{ t: 'La logistique et la gestion des partenariats (URTEL, réseau Sigida Herema) ont-elles amélioré le rapport coût-résultats ?', ind: [], src: ['budget', 'kii'] },
			{ t: 'Les ressources financières, humaines et techniques ont-elles été utilisées de façon efficiente ?', ind: [], src: ['budget', 'docs'] }
		]
	},
	{
		id: 'imp', name: 'Impact',
		qs: [
			{ t: 'Les émissions, réseaux sociaux et activités ont-ils transformé les perceptions, discours et pratiques : confiance envers les médias, participation, collaboration des OSC ?', ind: ['0.2', '2.2', '2.3', '16', '1'], src: ['fgd'], pif: ['Polarisation'] },
			{ t: 'Quels changements qualitatifs dans la relation entre la population, les médias et les OSC ?', ind: [], src: ['fgd', 'kii'] },
			{ t: 'La collaboration entre OSC, URTEL et gouvernement a-t-elle amélioré l’accès à une information vérifiée et sensible aux conflits ?', ind: ['9', '10'], src: ['kii'], pif: ['Polarisation'] }
		]
	},
	{
		id: 'dur', name: 'Durabilité',
		qs: [
			{ t: 'Les mécanismes de collaboration, outils et partenariats vont-ils perdurer après le projet ?', ind: [], src: ['kii', 'docs'], pif: ['Investissements'] },
			{ t: 'Quelles perspectives de pérennité institutionnelle (forums OSC-Gouvernement) et de viabilité financière ?', ind: [], src: ['kii', 'budget'] },
			{ t: 'L’URTEL et les forums garantissent-ils une meilleure pérennité que le modèle initial ?', ind: [], src: ['kii'] },
			{ t: 'Les capacités renforcées (plaidoyer, fact-checking, animation de débats) sont-elles ancrées dans les pratiques des partenaires ?', ind: ['8'], src: ['kii'], pif: ['Pouvoir d’agir'] }
		]
	},
	{
		id: 'eq', name: 'Équité, inclusion, protection',
		qs: [
			{ t: 'Les dynamiques de genre et de jeunesse ont-elles été intégrées dans le choix des cibles et des activités ?', ind: [], src: ['docs', 'fgd'] },
			{ t: 'Comment l’intersectionnalité a-t-elle été prise en compte pour atteindre les plus marginalisés (femmes rurales, jeunes déplacés) ?', ind: [], src: ['fgd', 'docs'] },
			{ t: 'Les participants se sont-ils sentis en sécurité, connaissent-ils les mécanismes de signalement, leur avis est-il pris en compte ?', ind: ['13', '14', '15'], src: [] },
			{ t: 'La sensibilité aux conflits et l’intersectionnalité ont-elles été appliquées tout au long du cycle du projet ?', ind: [], src: ['docs', 'kii'] }
		]
	}
];

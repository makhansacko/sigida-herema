// Parties prenantes et interventions du projet Sigida Herema (d'après les TDR).

/** Ordre et numérotation des acteurs dans la scène et dans la légende. */
export const ACTORS = ['search', 'bailleur', 'urtel', 'osc', 'medias', 'etat', 'coutume', 'pop'];

export const STAKE = {
	search: {
		brief: "Conçoit et met en œuvre le projet. Commanditaire de l'évaluation.",
		name: 'Search for Common Ground',
		short: 'Search',
		tag: 'Commanditaire, mise en œuvre',
		role: "Conçoit et met en œuvre le projet avec l'approche du terrain d'entente. Porte le cadre MEAL et le PIF, valide la méthodologie et les livrables, facilite l'accès aux bénéficiaires et aux autorités.",
		dims: [],
		ind: ['Cadre MEAL global (3 indicateurs)', 'Matrice de définition à compléter'],
		collecte: "Entretiens avec l'équipe projet et MEAL ; revue documentaire (cadre logique, plan MEAL, rapports d'activités, étude de base)."
	},
	bailleur: {
		brief: "Finance le projet. Utilisera l'évaluation pour orienter ses futurs financements.",
		name: 'Gouvernement de Belgique',
		short: 'Ambassade de Belgique',
		tag: 'Bailleur, ambassade au Mali',
		role: "Finance le projet. Utilisera l'évaluation pour comprendre ce qui a été accompli, apprécier l'efficacité de l'investissement et orienter ses financements futurs.",
		dims: [],
		ind: ['Efficience et rapport coût-résultats'],
		collecte: 'Entretien au cadrage ; relecture du rapport provisoire ; restitution finale, présentation virtuelle et note de synthèse de 2 pages.'
	},
	urtel: {
		brief: "Union des radios et télévisions libres : 383 radios membres, le principal porte-voix du projet.",
		name: 'URTEL et ses 383 radios',
		short: 'URTEL · radios',
		tag: 'Partenaire stratégique',
		role: "Union des radios et télévisions libres. Ses radios membres diffusent les émissions et campagnes ; c'est le principal levier d'échelle et d'efficience du projet, introduit après l'approche prévue en octobre 2025.",
		dims: ['polar', 'legit'],
		ind: ['2.3 Émissions favorisant le dialogue', '0.2 Confiance envers les médias', "Efficience par rapport à l'approche initiale"],
		collecte: "KII avec les responsables URTEL et les radios partenaires ; elles font partie des 40 acteurs médias de l'échantillon raisonné."
	},
	osc: {
		brief: "Les OSC appuyées techniquement et financièrement. Elles donnent son nom au projet.",
		name: 'Réseau Sigida Herema',
		short: 'OSC du réseau',
		tag: 'Organisations de la société civile',
		role: "OSC ayant reçu des appuis techniques et financiers. Elles mènent le plaidoyer collaboratif, animent les dialogues et portent l'intégration du genre et de l'inclusion.",
		dims: ['agency', 'polar'],
		ind: ['1 Collaboration médias-OSC pour le plaidoyer', 'Capacité de plaidoyer constructif', 'Participation aux dialogues avec les autorités', 'Espace civique perçu comme diversifié'],
		collecte: "Enquête auprès de 80 acteurs OSC (choix raisonné) ; KII avec des représentants d'OSC ; récits de changement (MSC)."
	},
	medias: {
		brief: "Journalistes, jeunes du programme Youth Talk, blogueurs : formés à la vérification des faits.",
		name: 'Médias, journalistes, blogueurs',
		short: 'Médias et blogueurs',
		tag: "Acteurs de l'information",
		role: 'Journalistes, jeunes journalistes du programme Youth Talk, influenceurs, blogueurs et activistes. Renforcés en fact-checking et en production sensible aux conflits.',
		dims: ['legit', 'polar', 'violence'],
		ind: ['0.1 Protection des journalistes et défenseurs', 'Accès à des sources diverses sans restriction', 'Participation aux processus décisionnels'],
		collecte: 'Enquête auprès de 40 acteurs médias ; KII avec des influenceurs, des blogueurs et des participants de Youth Talk.'
	},
	etat: {
		brief: "Autorités administratives, régulateurs, maires : interlocuteurs du plaidoyer et des forums.",
		name: 'Autorités et régulateurs',
		short: 'Autorités',
		tag: "Services de l'État, collectivités",
		role: 'Autorités administratives, régulateurs gouvernementaux, services étatiques, maires et conseillers. Ce sont les interlocuteurs du plaidoyer et des forums OSC-Gouvernement.',
		dims: ['legit'],
		ind: ['2.1 Opinions prises en compte dans les décisions', 'Satisfaction envers les services des autorités', 'Institutionnalisation des forums'],
		collecte: 'KII avec des autorités locales et des acteurs gouvernementaux, après introduction par Search.'
	},
	coutume: {
		brief: "Relais des dialogues et garants de la cohésion locale, sous l'arbre à palabres.",
		name: 'Leaders coutumiers et communautaires',
		short: 'Leaders coutumiers',
		tag: 'Autorités traditionnelles',
		role: "Autorités coutumières et leaders communautaires : relais des dialogues sous l'arbre à palabres et garants de la cohésion locale. Leurs attentes sont visées par une question de pertinence.",
		dims: ['legit', 'polar'],
		ind: ['Attentes des cibles (pertinence)', 'Qualité des relations entre groupes'],
		collecte: 'KII avec les leaders communautaires ; observation des dialogues ; FGD séparés si nécessaire.'
	},
	pop: {
		brief: "Femmes, jeunes, auditeurs : le public visé par l'objectif 2.",
		name: 'Communautés',
		short: 'Communautés',
		tag: 'Femmes, jeunes, auditeurs',
		role: "Public des émissions et des dialogues, cible de l'objectif 2. Une attention particulière va aux femmes rurales et aux jeunes déplacés (intersectionnalité).",
		dims: ['agency', 'legit', 'polar', 'violence'],
		ind: ['0.2 Confiance envers médias et OSC', '2.1 Prise en compte des opinions', '2.2 Connaissance des droits et devoirs', 'Safeguarding : sécurité, signalement, voix'],
		collecte: 'Enquête ménages représentative (base : 384) ; 12 FGD homogènes ; questions de safeguarding aux participants.'
	}
};

/** Famille de chaque acteur (même découpage que la section « Les acteurs clés ») et teinte du socle de sa vignette. */
export const FAMILY = { search: 'pil', bailleur: 'pil', urtel: 'voix', osc: 'voix', medias: 'voix', etat: 'cible', coutume: 'cible', pop: 'cible' };
export const TINT = { pil: '#e3ecf8', voix: '#e2f4ef', cible: '#fdeedb' };
export const FAMILY_LABEL = { pil: 'Ceux qui pilotent', voix: 'Ceux qui portent la voix', cible: 'Ceux que le projet veut atteindre' };

// Parties prenantes et interventions du projet Sigida Herema (d'après les TDR).

/** Ordre et numérotation des acteurs dans la scène et dans la légende. */
export const ACTORS = ['search', 'bailleur', 'urtel', 'osc', 'medias', 'etat', 'coutume', 'pop'];

export const STAKE = {
	search: {
		name: 'Search for Common Ground',
		short: 'Search',
		tag: 'Commanditaire, mise en œuvre',
		role: "Conçoit et met en œuvre le projet avec l'approche du terrain d'entente. Porte le cadre MEAL et le PIF, valide la méthodologie et les livrables, facilite l'accès aux bénéficiaires et aux autorités.",
		dims: [],
		ind: ['Cadre MEAL global (3 indicateurs)', 'Matrice de définition à compléter'],
		listen: "Entretiens avec l'équipe projet et MEAL ; revue documentaire (cadre logique, plan MEAL, rapports d'activités, étude de base)."
	},
	bailleur: {
		name: 'Gouvernement de Belgique',
		short: 'Ambassade de Belgique',
		tag: 'Bailleur, ambassade au Mali',
		role: "Finance le projet. Utilisera l'évaluation pour comprendre ce qui a été accompli, apprécier l'efficacité de l'investissement et orienter ses financements futurs.",
		dims: ['invest'],
		ind: ['Efficience et rapport coût-résultats'],
		listen: 'Entretien au cadrage ; relecture du rapport provisoire ; restitution finale, présentation virtuelle et note de synthèse de 2 pages.'
	},
	urtel: {
		name: 'URTEL et ses 383 radios',
		short: 'URTEL · radios',
		tag: 'Partenaire stratégique',
		role: "Union des radios et télévisions libres. Ses radios membres diffusent les émissions et campagnes ; c'est le principal levier d'échelle et d'efficience du projet, introduit après l'approche prévue en octobre 2025.",
		dims: ['polar', 'legit', 'invest'],
		ind: ['2.3 Émissions favorisant le dialogue', '0.2 Confiance envers les médias', "Efficience par rapport à l'approche initiale"],
		listen: "KII avec les responsables URTEL et les radios partenaires ; elles font partie des 40 acteurs médias de l'échantillon raisonné."
	},
	osc: {
		name: 'Réseau Sigida Herema',
		short: 'OSC du réseau',
		tag: 'Organisations de la société civile',
		role: "OSC ayant reçu des appuis techniques et financiers. Elles mènent le plaidoyer collaboratif, animent les dialogues et portent l'intégration du genre et de l'inclusion.",
		dims: ['agency', 'polar', 'invest'],
		ind: ['1 Collaboration médias-OSC pour le plaidoyer', 'Capacité de plaidoyer constructif', 'Participation aux dialogues avec les autorités', 'Espace civique perçu comme diversifié'],
		listen: "Enquête auprès de 80 acteurs OSC (choix raisonné) ; KII avec des représentants d'OSC ; récits de changement (MSC)."
	},
	medias: {
		name: 'Médias, journalistes, blogueurs',
		short: 'Médias et blogueurs',
		tag: "Acteurs de l'information",
		role: 'Journalistes, jeunes journalistes du programme Youth Talk, influenceurs, blogueurs et activistes. Renforcés en fact-checking et en production sensible aux conflits.',
		dims: ['legit', 'polar', 'violence'],
		ind: ['0.1 Protection des journalistes et défenseurs', 'Accès à des sources diverses sans restriction', 'Participation aux processus décisionnels'],
		listen: 'Enquête auprès de 40 acteurs médias ; KII avec des influenceurs, des blogueurs et des participants de Youth Talk.'
	},
	etat: {
		name: 'Autorités et régulateurs',
		short: 'Autorités',
		tag: "Services de l'État, collectivités",
		role: 'Autorités administratives, régulateurs gouvernementaux, services étatiques, maires et conseillers. Ce sont les interlocuteurs du plaidoyer et des forums OSC-Gouvernement.',
		dims: ['legit', 'invest'],
		ind: ['2.1 Opinions prises en compte dans les décisions', 'Satisfaction envers les services des autorités', 'Institutionnalisation des forums'],
		listen: 'KII avec des autorités locales et des acteurs gouvernementaux, après introduction par Search.'
	},
	coutume: {
		name: 'Leaders coutumiers et communautaires',
		short: 'Leaders coutumiers',
		tag: 'Autorités traditionnelles',
		role: "Autorités coutumières et leaders communautaires : relais des dialogues sous l'arbre à palabres et garants de la cohésion locale. Leurs attentes sont visées par une question de pertinence.",
		dims: ['legit', 'polar'],
		ind: ['Attentes des cibles (pertinence)', 'Qualité des relations entre groupes'],
		listen: 'KII avec les leaders communautaires ; observation des dialogues ; FGD séparés si nécessaire.'
	},
	pop: {
		name: 'Communautés',
		short: 'Communautés',
		tag: 'Femmes, jeunes, auditeurs',
		role: "Public des émissions et des dialogues, cible de l'objectif 2. Une attention particulière va aux femmes rurales et aux jeunes déplacés (intersectionnalité).",
		dims: ['agency', 'legit', 'polar', 'violence'],
		ind: ['0.2 Confiance envers médias et OSC', '2.1 Prise en compte des opinions', '2.2 Connaissance des droits et devoirs', 'Safeguarding : sécurité, signalement, voix'],
		listen: 'Enquête ménages représentative (base : 384) ; 12 FGD homogènes ; questions de safeguarding aux participants.'
	}
};

/**
 * Interventions. `links` = relations [de, vers] dessinées en flèches dans la scène.
 * `change` = changement attendu ; `ind` = indicateurs qui le mesurent.
 */
export const INTER = [
	{
		id: 'plaid',
		name: 'Plaidoyer collaboratif',
		res: 'R1.1',
		desc: 'Les OSC et les médias portent ensemble des messages constructifs auprès des décideurs sur des questions sensibles de gouvernance.',
		sh: ['osc', 'medias', 'etat'],
		links: [['osc', 'medias'], ['osc', 'etat'], ['medias', 'etat']],
		change: 'Les OSC et les médias défendent des positions communes et sont écoutés par les décideurs.',
		ind: ['1 Collaboration médias-OSC pour le plaidoyer', 'Capacité de plaidoyer constructif'],
		dims: ['agency', 'polar']
	},
	{
		id: 'capa',
		name: 'Renforcement de capacités',
		res: 'R1.1',
		desc: "Formation au plaidoyer, au fact-checking et à la production médiatique, ainsi qu'aux capacités relationnelles : réseautage et dialogues multi-acteurs.",
		sh: ['search', 'osc', 'medias', 'urtel'],
		links: [['search', 'osc'], ['search', 'medias'], ['search', 'urtel']],
		change: "Les acteurs vérifient l'information, produisent des contenus sensibles aux conflits et savent travailler ensemble.",
		ind: ['Capacité de plaidoyer constructif', 'Ancrage des capacités dans les pratiques (durabilité)'],
		dims: ['agency']
	},
	{
		id: 'forum',
		name: 'Forums OSC-Gouvernement',
		res: 'R1.2',
		desc: "Espaces de compréhension mutuelle et de collaboration entre la société civile et les régulateurs sur la protection de l'espace civique.",
		sh: ['search', 'osc', 'etat'],
		links: [['search', 'etat'], ['osc', 'etat'], ['etat', 'osc']],
		change: 'Un canal régulier et reconnu existe entre société civile et autorités, et peut durer après le projet.',
		ind: ['Participation aux processus décisionnels', 'Dialogues inclusifs avec les autorités (co-créé)', 'Institutionnalisation des forums'],
		dims: ['legit', 'invest']
	},
	{
		id: 'dial',
		name: 'Dialogues publics inclusifs',
		res: 'R2.1',
		desc: 'Débats citoyens ouverts aux femmes, aux jeunes et aux leaders coutumiers sur les questions civiques, puis amplifiés à la radio.',
		sh: ['osc', 'coutume', 'pop', 'etat'],
		links: [['osc', 'pop'], ['coutume', 'pop'], ['pop', 'etat']],
		change: 'Des groupes différents se parlent, et les citoyens ont le sentiment que leur avis compte.',
		ind: ['2.1 Opinions prises en compte', 'Écart entre groupes (MEAL global)'],
		dims: ['polar', 'agency']
	},
	{
		id: 'camp',
		name: 'Campagnes médiatiques',
		res: 'R2.1 · 2.3',
		desc: 'Émissions radio sur la paix, la cohésion sociale et le vivre-ensemble, diffusées par le réseau URTEL et relayées sur les réseaux sociaux.',
		sh: ['urtel', 'medias', 'pop'],
		links: [['medias', 'urtel'], ['urtel', 'pop'], ['medias', 'pop']],
		change: 'Le public entend des messages de dialogue et de vivre-ensemble à grande échelle, en langues locales.',
		ind: ['2.3 Émissions favorisant le dialogue', '0.2 Confiance envers médias et OSC'],
		dims: ['polar', 'legit']
	},
	{
		id: 'info',
		name: 'Information électorale crédible',
		res: 'R2.2',
		desc: 'Accès du public à une information plus crédible, transparente et sensible aux conflits sur les élections.',
		sh: ['medias', 'urtel', 'pop'],
		links: [['medias', 'urtel'], ['urtel', 'pop']],
		change: 'Le public fait davantage confiance à une information vérifiée et connaît mieux ses droits.',
		ind: ['0.2 Confiance envers médias et OSC', '2.2 Connaissance des droits et devoirs'],
		dims: ['legit']
	}
];

/** Relation hors interventions : le financement. */
export const FUNDING = { from: 'bailleur', to: 'search', label: 'Financement' };

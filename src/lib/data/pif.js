/**
 * Le Cadre d'impact sur la paix (PIF), version d'août 2026 transmise par Search après la réunion de cadrage,
 * appliqué à l'évaluation finale de Sigida Herema.
 * Source : A. Lemon et S. Rajoelison, « Le Cadre d'impact sur la paix : un guide de présentation et d'application », Search for Common Ground, août 2026.
 * Les codes `ind` renvoient à data/indicateurs.js ; les clés `key` à PIF_THEMES (data/systeme.js).
 */

/** Ce qui change par rapport à la version de 2023 utilisée jusqu'ici. */
export const NOUVEAUTES = [
	'4 signes vitaux au lieu de 5 thèmes : « Investissements » disparaît ; le coût devient une dimension de la restitution.',
	'7 indicateurs d’enquête alignés sur l’ODD 16, au lieu de 10.',
	'3 niveaux de population à définir dès le départ : noyau, groupe secondaire, environnement systémique.',
	'Chaque résultat d’enquête, citation et observation doit être codé selon un signe vital avant d’entrer dans le rapport.',
	'Chaque constat est restitué selon quatre dimensions : quoi, où, pourquoi, coût.'
];

/** Les 4 signes vitaux : ce que l'on mesure. */
export const SIGNES = [
	{ key: 'violence', def: 'La sécurité personnelle : violence, risques, traumatismes, et le fait de vivre sans appréhension.', ici: 'Journalistes et défenseurs mieux protégés ; participants en sécurité pendant les activités.', ind: ['0.1', '13'] },
	{ key: 'agency', def: 'La capacité perçue d’influer sur le changement, et le lien avec sa société.', ici: 'Citoyens et OSC se sentent capables d’agir sur l’espace civique.', ind: ['1', '2.2', '8', '16'] },
	{ key: 'polar', def: 'La confiance horizontale : entre individus et entre groupes, à l’égard des règles communes.', ici: 'La méfiance entre groupes recule ; le dialogue progresse dans les communautés.', ind: ['18'] },
	{ key: 'legit', def: 'La confiance verticale : les institutions gardent la confiance de ceux qu’elles servent, selon leur équité et leur réactivité.', ici: 'Médias, OSC, autorités et projet gagnent la confiance de ceux qu’ils servent.', ind: ['0.2', '2.1', '7', '9', '10', '11', '12', '14', '15', '17'] }
];

/** Les 3 niveaux de population (piste « Évaluation » du guide), appliqués à Sigida Herema. */
export const NIVEAUX = [
	{ label: 'Noyau', def: 'Ceux que le programme sert directement.', ici: 'OSC du réseau Sigida Herema, journalistes et médias formés, radios partenaires de l’URTEL.', outils: 'Enquêtes OSC (80) et médias (40), entretiens, safeguarding' },
	{ label: 'Groupe secondaire', def: 'Ceux qui sont touchés sans être directement impliqués.', ici: 'Auditeurs des émissions, participants aux dialogues et aux forums, autorités et leaders coutumiers associés.', outils: 'Groupes de discussion, entretiens, ménages exposés au projet' },
	{ label: 'Environnement systémique', def: 'La population des zones, exposée ou non au projet.', ici: 'Population de Bamako, Mopti et Gao.', outils: 'Enquête ménages (384)' }
];

/** Les 3 approches : comment on le mesure. */
export const APPROCHES_PIF = [
	{ label: 'Expérience vécue', what: 'Les communautés décrivent la paix et le changement avec leurs propres mots.', how: 'Groupes de discussion et récits de changement significatif, guides sans jargon, du général au particulier.' },
	{ label: 'Mesures alignées', what: 'Des indicateurs communs, alignés sur l’ODD 16, comparables entre programmes.', how: 'Enquête ménages et enquêtes acteurs, avec les questions du PIF (voir ci-dessous).' },
	{ label: 'Observations des praticiens', what: 'Les évolutions progressives et inattendues que voient ceux qui travaillent dans le contexte.', how: 'Entretiens avec l’URTEL, les OSC, les autorités et l’équipe projet ; observations vérifiables, positives comme négatives.' }
];

/**
 * Les 7 indicateurs d'enquête du PIF et leur place dans nos outils.
 * statut : 'repris' (indicateur des TDR identique), 'proche' (indicateur des TDR voisin), 'absent' (à ajouter en option).
 */
export const MESURES = [
	{ key: 'violence', t: '% qui se sentent en sécurité en marchant seuls dans leur quartier', statut: 'absent', ind: [] },
	{ key: 'agency', t: '% qui pensent pouvoir avoir un impact positif dans leur quartier', statut: 'absent', ind: [] },
	{ key: 'agency', t: '% qui agissent concrètement pour influencer ce qui leur tient à cœur', statut: 'repris', ind: ['16'] },
	{ key: 'polar', t: '% qui pensent être perçus comme moins qu’humains en raison de leur groupe', statut: 'absent', ind: [] },
	{ key: 'polar', t: '% disposés à recourir à la violence pour les intérêts de leur groupe', statut: 'proche', ind: ['18'] },
	{ key: 'legit', t: '% qui estiment que la prise de décision est inclusive et réactive', statut: 'proche', ind: ['2.1'] },
	{ key: 'legit', t: '% satisfaits des services sollicités auprès des autorités', statut: 'repris', ind: ['17'] }
];
export const STATUT = { repris: 'Déjà dans les TDR', proche: 'Proche d’un indicateur des TDR', absent: 'À ajouter (option)' };

/** Étape 6 du guide : chaque constat est restitué selon quatre dimensions. */
export const RESTITUTION = [
	{ label: 'Ce qui change', ici: 'L’évolution des indicateurs depuis la base, avec des citations des communautés.' },
	{ label: 'Où cela change', ici: 'Par zone (Bamako, Mopti, Gao), par sexe, âge et groupe ; exposés et non exposés.' },
	{ label: 'Pourquoi cela change', ici: 'L’analyse de contribution le long du modèle logique : observations des praticiens et vécu.' },
	{ label: 'Ce que coûte le changement', ici: 'L’efficience : coût par personne atteinte, avant et après le passage à l’URTEL.' }
];

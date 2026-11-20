/**
 * Le Cadre d'impact pour la paix (PIF) appliqué à Sigida Herema.
 * Source : PIF Packet (version française, juin 2023) et TDR de l'évaluation.
 * - THEMES : ce que l'on mesure. `ind` = indicateurs rangés sous ce thème (codes de data/indicateurs.js).
 * - PILIERS : comment on le mesure, et la méthode de l'évaluation qui y répond.
 */
export const THEMES = [
	{ key: 'agency', label: 'Pouvoir d’agir', def: 'Le lien des gens avec leur société et leur conviction de pouvoir la changer.', ici: 'Citoyens et OSC se sentent capables d’agir sur l’espace civique.', ind: ['1', '2.2', '8', '16'] },
	{ key: 'legit', label: 'Légitimité', def: 'La confiance que les institutions, médias compris, gardent auprès de ceux qu’elles servent.', ici: 'Médias, OSC et autorités gagnent la confiance de ceux qu’ils servent.', ind: ['0.2', '2.1', '7', '9', '11', '12', '17'] },
	{ key: 'polar', label: 'Polarisation', def: 'La confiance entre groupes pour partager un même contrat social.', ici: 'La méfiance entre groupes recule.', ind: ['18'] },
	{ key: 'violence', label: 'Violence', def: 'L’expérience directe de la violence, ou à l’inverse le sentiment de sécurité.', ici: 'Journalistes et défenseurs des droits mieux protégés.', ind: ['0.1'] },
	{ key: 'invest', label: 'Investissements', def: 'Les ressources dont une société dispose pour soutenir la paix dans la durée.', ici: 'Des ressources restent pour la paix : URTEL, forums, capacités acquises.', ind: ['10'] }
];

export const PILIERS = [
	{ label: 'Expérience vécue', what: 'Ce que vivent les personnes concernées, dans leurs propres mots.', how: 'Groupes de discussion et récits de changement significatif (méthode citée par le PIF).' },
	{ label: 'Mesures alignées', what: 'Des indicateurs communs au secteur, comparables dans le temps.', how: 'Enquête ménages : les indicateurs 16 et 17 du cadre MEAL de Search sont des indicateurs du PIF ; le 2.1 en est très proche.' },
	{ label: 'Observations d’experts', what: 'Ce que voient les praticiens, y compris les effets inattendus.', how: 'Entretiens avec l’URTEL, les OSC, les autorités et l’équipe projet.' }
];

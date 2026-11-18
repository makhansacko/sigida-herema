/**
 * Carte systémique du projet Sigida Herema (inspirée du system map de l'AI Productivity Atlas).
 *
 * - `COLS` : colonnes de gauche à droite. `x` = centre de la colonne dans le viewBox (W × H).
 * - `NODES` : éléments. `kind` = acteur | inter | effet | change | objectif | contexte.
 *   `x`/`y` = centre du nœud ; déplacez un nœud en modifiant ces valeurs.
 *   `m` = mesures : { ind, b (valeur de base, %), c (cible, %), src (méthode de collecte) }.
 *   `os` = 1 ou 2 : objectif spécifique auquel le nœud contribue (couleur).
 * - `LINKS` : relations [de, vers, type]. type = agit | produit | contribue | objectif | frein | adapte | hypothese.
 *
 * Sources : TDR Search n° SFCG ML 03-172026 (août 2026). Les formulations des effets et changements
 * sont une reconstruction de la théorie du changement par Sahel Analytics, à valider au cadrage.
 */

export const W = 1400;
export const H = 1010;

export const COLS = [
	{ id: 'acteurs', x: 115, label: 'Qui agit', sub: 'Acteurs du projet' },
	{ id: 'inter', x: 385, label: 'Interventions', sub: 'Ce que le projet fait' },
	{ id: 'effet', x: 660, label: 'Ce qu’elles produisent', sub: 'Effets immédiats' },
	{ id: 'change', x: 940, label: 'Changements visés', sub: 'Chez les acteurs et le public' },
	{ id: 'objectif', x: 1235, label: 'Objectifs', sub: 'Cadre logique' }
];

export const SRC = {
	menages: 'Enquête ménages (base : n = 384)',
	osc: 'Enquête OSC (80) et médias (40)',
	kii: 'Entretiens informateurs clés (base : 33)',
	fgd: 'Groupes de discussion (base : 12 FGD)',
	part: 'Enquête auprès des participants (safeguarding)',
	urtel: 'Données de diffusion URTEL et données financières'
};

/** @type {Array<any>} */
export const NODES = [
	// ---------- Acteurs (les textes détaillés viennent de data/projet.js) ----------
	{ id: 'bailleur', kind: 'acteur', x: 115, y: 100 },
	{ id: 'search', kind: 'acteur', x: 115, y: 200 },
	{ id: 'osc', kind: 'acteur', x: 115, y: 300 },
	{ id: 'medias', kind: 'acteur', x: 115, y: 400 },
	{ id: 'urtel', kind: 'acteur', x: 115, y: 500 },
	{ id: 'etat', kind: 'acteur', x: 115, y: 600 },
	{ id: 'coutume', kind: 'acteur', x: 115, y: 700 },
	{ id: 'pop', kind: 'acteur', x: 115, y: 800 },

	// ---------- Interventions (textes : data/projet.js, INTER) ----------
	{ id: 'capa', kind: 'inter', x: 385, y: 160, icon: 'capa', os: 1 },
	{ id: 'plaid', kind: 'inter', x: 385, y: 285, icon: 'plaid', os: 1 },
	{ id: 'forum', kind: 'inter', x: 385, y: 405, icon: 'forum', os: 1 },
	{ id: 'camp', kind: 'inter', x: 385, y: 525, icon: 'camp', os: 2 },
	{ id: 'info', kind: 'inter', x: 385, y: 645, icon: 'info', os: 2 },
	{ id: 'dial', kind: 'inter', x: 385, y: 770, icon: 'dial', os: 2 },

	// ---------- Effets immédiats ----------
	{
		id: 'e_cap', kind: 'effet', x: 660, y: 155, os: 1,
		label: 'Capacités renforcées : plaidoyer, fact-checking, production',
		what: 'Les OSC, les journalistes et les radios maîtrisent mieux le plaidoyer constructif, la vérification des faits et la production d’émissions sensibles aux conflits, ainsi que le travail en réseau.',
		m: [{ ind: '% de membres d’OSC estimant avoir la capacité de mener des plaidoyers constructifs sur des questions sensibles de gouvernance', src: 'osc' }],
		check: 'Distinguer les compétences techniques des capacités relationnelles et stratégiques, comme le demande la question d’efficacité.'
	},
	{
		id: 'e_collab', kind: 'effet', x: 660, y: 285, os: 1,
		label: 'OSC et médias collaborent pour le plaidoyer',
		what: 'Au lieu d’agir chacun de son côté, OSC et médias préparent et portent ensemble des messages auprès des décideurs.',
		m: [{ ind: 'Indicateur 1 · % de membres d’OSC indiquant une meilleure collaboration entre médias et OSC pour le plaidoyer', b: 57, c: 70, src: 'osc' }]
	},
	{
		id: 'e_canal', kind: 'effet', x: 660, y: 410, os: 1,
		label: 'Un canal régulier entre OSC et autorités',
		what: 'Les forums OSC-Gouvernement créent un espace où société civile et régulateurs se comprennent et travaillent ensemble sur la protection de l’espace civique.',
		m: [{ ind: '% d’acteurs de la société civile ayant participé à des dialogues inclusifs sur la gouvernance avec les autorités (co-créé)', src: 'osc' }],
		check: 'Les forums sont-ils institutionnalisés et peuvent-ils durer sans le projet ? (durabilité)'
	},
	{
		id: 'e_portee', kind: 'effet', x: 660, y: 530, os: 2,
		label: 'Messages de paix diffusés à grande échelle',
		what: 'Les émissions sur la paix, la cohésion sociale et le vivre-ensemble sont diffusées par les radios URTEL, en langues locales, et relayées sur les réseaux sociaux.',
		m: [
			{ ind: 'Indicateur 2.3 · % d’auditeurs déclarant que les émissions favorisent le dialogue constructif et la compréhension mutuelle', c: 60, src: 'menages' },
			{ ind: 'Portée et coût par personne atteinte, comparés à l’approche prévue en octobre 2025', src: 'urtel' }
		],
		check: 'Pas de valeur de base pour l’indicateur 2.3 : prévoir une question rétrospective ou une comparaison auditeurs / non-auditeurs.'
	},
	{
		id: 'e_info', kind: 'effet', x: 660, y: 650, os: 2,
		label: 'Information vérifiée et sensible aux conflits accessible',
		what: 'Le public et les acteurs de l’espace civique ont accès à une information plus crédible et transparente, notamment sur les élections.',
		m: [{ ind: '% d’acteurs médias et OSC ayant accès à des sources d’information diverses, sans restriction et à temps (co-créé)', src: 'osc' }]
	},
	{
		id: 'e_dial', kind: 'effet', x: 660, y: 775, os: 2,
		label: 'Des groupes différents se rencontrent et dialoguent',
		what: 'Femmes, jeunes, leaders coutumiers, OSC et autorités débattent ensemble des questions civiques, dans un cadre sûr.',
		m: [
			{ ind: '% de participants qui se sentent en sécurité lors des activités', src: 'part' },
			{ ind: '% de participants estimant que leur voix est prise en compte', src: 'part' }
		],
		check: 'Vérifier qui participe réellement : femmes rurales, jeunes déplacés (intersectionnalité).'
	},

	// ---------- Changements visés ----------
	{
		id: 'c_voice', kind: 'change', x: 940, y: 170, os: 1,
		label: 'OSC et médias pèsent dans les décisions',
		what: 'Les OSC et les médias participent davantage aux processus de décision et à la formulation des politiques sur l’espace civique.',
		m: [
			{ ind: '% d’acteurs médias et OSC dont la participation aux processus décisionnels s’est améliorée', src: 'osc' },
			{ ind: '% d’acteurs de la société civile déclarant que l’espace civique est diversifié (co-créé)', src: 'osc' }
		]
	},
	{
		id: 'c_protect', kind: 'change', x: 940, y: 300, os: 1,
		label: 'Journalistes et défenseurs mieux protégés',
		what: 'Ceux qui travaillent sur l’espace civique bénéficient de plus de protection et de soutien de la part des décideurs.',
		m: [{ ind: 'Indicateur 0.1 · % d’acteurs médias et OSC estimant que la protection des défenseurs et des journalistes s’est améliorée', b: 33, c: 50, src: 'osc' }]
	},
	{
		id: 'c_trust', kind: 'change', x: 940, y: 445, os: 2,
		label: 'Le public fait confiance aux médias et aux OSC',
		what: 'La population considère les médias et les OSC comme des sources fiables sur les enjeux de l’espace civique.',
		m: [
			{ ind: 'Indicateur 0.2 · % de la population faisant confiance aux médias et OSC comme sources fiables', b: 45, c: 60, src: 'menages' },
			{ ind: 'Score de confiance envers les médias partenaires (Likert 1 à 5)', src: 'menages' }
		],
		check: 'Cible revue à la hausse en janvier 2026.'
	},
	{
		id: 'c_rights', kind: 'change', x: 940, y: 575, os: 2,
		label: 'Les citoyens connaissent leurs droits et agissent',
		what: 'La population se sent informée de ses droits et devoirs et passe à l’action sur ce qui lui tient à cœur.',
		m: [
			{ ind: 'Indicateur 2.2 · % de la population se sentant informée de ses droits et devoirs de citoyen', b: 51, c: 70, src: 'menages' },
			{ ind: '% de la population qui mène des actions pour influencer les choses qui lui tiennent à cœur (MEAL global)', src: 'menages' }
		]
	},
	{
		id: 'c_heard', kind: 'change', x: 940, y: 700, os: 2,
		label: 'Les citoyens se sentent entendus',
		what: 'La population pense que ses opinions et intérêts sont pris en compte dans la décision publique et se dit satisfaite des services demandés aux autorités.',
		m: [
			{ ind: 'Indicateur 2.1 · % de la population pensant que ses opinions sont prises en compte dans la décision publique', b: 22, c: 50, src: 'menages' },
			{ ind: '% de la population satisfaite des services demandés aux autorités (MEAL global)', src: 'menages' }
		],
		check: 'Le plus gros écart à combler : +28 points.'
	},
	{
		id: 'c_cohesion', kind: 'change', x: 940, y: 820, os: 2,
		label: 'Moins de méfiance entre groupes',
		what: 'Les écarts entre groupes se réduisent : confiance dans l’information, confiance dans les interactions, rejet de la violence.',
		m: [{ ind: 'Écart entre groupes démographiques : confiance dans l’information et les interactions, conviction que la violence est parfois nécessaire (MEAL global)', src: 'menages' }],
		check: 'Définir les groupes comparés dès le rapport de démarrage (région, âge, sexe, statut de déplacé…).'
	},

	// ---------- Objectifs ----------
	{
		id: 'os1', kind: 'objectif', x: 1235, y: 235, os: 1,
		label: 'Objectif 1 · Plaidoyer collaboratif des OSC et des médias',
		what: 'Favoriser un plaidoyer collaboratif des organisations de la société civile et des médias en faveur d’un espace civique au Mali paisible, sensible et ouvert.'
	},
	{
		id: 'og', kind: 'objectif', x: 1235, y: 460, os: 0,
		label: 'Objectif général · Expansion de l’espace civique',
		what: 'Soutenir les acteurs des médias et de la société civile à promouvoir l’expansion de l’espace civique au Mali.',
		m: [
			{ ind: 'Indicateur 0.1 · Protection des défenseurs et journalistes', b: 33, c: 50, src: 'osc' },
			{ ind: 'Indicateur 0.2 · Confiance envers médias et OSC', b: 45, c: 60, src: 'menages' }
		]
	},
	{
		id: 'os2', kind: 'objectif', x: 1235, y: 690, os: 2,
		label: 'Objectif 2 · Soutien du public à un espace civique libre',
		what: 'Favoriser une meilleure compréhension et un soutien accru du public en faveur d’un espace civique libre et inclusif au Mali.'
	},

	// ---------- Contexte, adaptation, hypothèse ----------
	{
		id: 'adapt', kind: 'contexte', sub: 'adaptation', x: 270, y: 935,
		label: 'Adaptation : partenariat URTEL',
		what: 'Le partenariat avec l’URTEL et ses 383 radios a été ajouté après l’approche prévue en octobre 2025, pour toucher plus de monde à moindre coût.',
		check: 'L’évaluation doit dire si cette adaptation a amélioré la portée et le coût-efficacité (question d’efficience).'
	},
	{
		id: 'ctx_secu', kind: 'contexte', sub: 'frein', x: 520, y: 935,
		label: 'Insécurité et transition politique',
		what: 'Contexte sécuritaire complexe et reconfiguration des relations entre l’État et la population, qui pèsent sur la participation et sur la possibilité de se réunir.',
		check: 'Documenter les ajustements faits face au contexte et leurs effets sur les résultats.'
	},
	{
		id: 'ctx_info', kind: 'contexte', sub: 'frein', x: 770, y: 935,
		label: 'Pression informationnelle et désinformation',
		what: 'La manipulation de l’information fragilise la confiance envers les médias et la cohésion sociale.',
		check: 'Tenir compte de la désirabilité sociale sur les questions de confiance.'
	},
	{
		id: 'ctx_auto', kind: 'contexte', sub: 'frein', x: 1020, y: 935,
		label: 'Autocensure, pressions et tabous',
		what: 'Dynamiques invisibles de l’espace civique : rapports de pouvoir informels, pressions politiques ou religieuses, autocensure.',
		check: 'Les capter surtout par les KII et les FGD, avec anonymat.'
	},
	{
		id: 'hyp', kind: 'contexte', sub: 'hypothese', x: 1270, y: 935,
		label: 'Hypothèse critique du projet',
		what: 'Les TDR demandent d’en tester la validité. Sa formulation exacte figure dans la théorie du changement du projet : à obtenir auprès de Search au cadrage.',
		check: 'Question d’évaluation : l’hypothèse s’est-elle vérifiée, et sinon, comment le projet s’est-il adapté ?'
	}
];

export const LINKS = [
	// Acteurs → interventions
	['bailleur', 'search', 'finance'],
	['search', 'capa', 'agit'], ['osc', 'capa', 'agit'], ['medias', 'capa', 'agit'], ['urtel', 'capa', 'agit'],
	['osc', 'plaid', 'agit'], ['medias', 'plaid', 'agit'],
	['search', 'forum', 'agit'], ['osc', 'forum', 'agit'], ['etat', 'forum', 'agit'],
	['urtel', 'camp', 'agit'], ['medias', 'camp', 'agit'],
	['medias', 'info', 'agit'], ['urtel', 'info', 'agit'],
	['osc', 'dial', 'agit'], ['etat', 'dial', 'agit'], ['coutume', 'dial', 'agit'], ['pop', 'dial', 'agit'],
	// Interventions → effets
	['capa', 'e_cap', 'produit'], ['capa', 'e_info', 'produit'],
	['plaid', 'e_collab', 'produit'],
	['forum', 'e_canal', 'produit'],
	['camp', 'e_portee', 'produit'],
	['info', 'e_info', 'produit'],
	['dial', 'e_dial', 'produit'],
	// Effets → changements
	['e_cap', 'c_voice', 'contribue'],
	['e_collab', 'c_voice', 'contribue'], ['e_collab', 'c_protect', 'contribue'],
	['e_canal', 'c_voice', 'contribue'], ['e_canal', 'c_protect', 'contribue'], ['e_canal', 'c_heard', 'contribue'],
	['e_portee', 'c_trust', 'contribue'], ['e_portee', 'c_rights', 'contribue'], ['e_portee', 'c_cohesion', 'contribue'],
	['e_info', 'c_trust', 'contribue'], ['e_info', 'c_rights', 'contribue'],
	['e_dial', 'c_heard', 'contribue'], ['e_dial', 'c_cohesion', 'contribue'],
	// Changements → objectifs
	['c_voice', 'os1', 'objectif'], ['c_protect', 'os1', 'objectif'],
	['c_trust', 'os2', 'objectif'], ['c_rights', 'os2', 'objectif'], ['c_heard', 'os2', 'objectif'], ['c_cohesion', 'os2', 'objectif'],
	['os1', 'og', 'objectif'], ['os2', 'og', 'objectif'],
	// Contexte
	['adapt', 'camp', 'adapte'],
	['ctx_secu', 'e_dial', 'frein'],
	['ctx_info', 'c_trust', 'frein'],
	['ctx_auto', 'c_voice', 'frein'], ['ctx_auto', 'c_protect', 'frein'],
	['hyp', 'c_heard', 'hypothese'], ['hyp', 'c_voice', 'hypothese']
];

export const nodeById = Object.fromEntries(NODES.map((n) => [n.id, n]));

/** Tous les nœuds en amont et en aval d'un nœud (chaîne complète). */
export function chainOf(id, { withContext = true } = {}) {
	const ok = (l) => withContext || !['frein', 'hypothese', 'adapte'].includes(l[2]);
	const walk = (start, dir) => {
		const seen = new Set([start]);
		const stack = [start];
		while (stack.length) {
			const cur = stack.pop();
			for (const l of LINKS) {
				if (!ok(l)) continue;
				const [a, b] = l;
				const next = dir === 'down' ? (a === cur ? b : null) : b === cur ? a : null;
				if (next && !seen.has(next)) {
					seen.add(next);
					stack.push(next);
				}
			}
		}
		return seen;
	};
	return new Set([...walk(id, 'down'), ...walk(id, 'up')]);
}

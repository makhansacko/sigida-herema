/**
 * Carte systémique du projet Sigida Herema, organisée autour des interventions.
 *
 * Flux de gauche à droite :
 *   Ceux qui pilotent → Ce que Search fait (appui) → Ceux qui portent la voix
 *   → Comment ils atteignent les cibles (interventions) → Ceux que le projet veut atteindre → Objectifs
 *
 * - `COLS` : colonnes. `fam` relie une colonne à une famille d'acteurs (fond coloré).
 * - `NODES` : `kind` = pilote | appui | porteur | inter | cible | change | objectif | contexte.
 *   `x`/`y` = centre du nœud. Déplacez un nœud en modifiant ces valeurs.
 *   `who` (interventions) = acteurs impliqués, avec leur rôle.
 *   `m` = mesures : { ind, b (base %), c (cible %), src (clé de SRC) }.
 *   `os` = 1 ou 2 : objectif auquel le nœud contribue (couleur).
 * - `LINKS` : [de, vers, type]. type = finance | appui | porte | vise | objectif | frein | hypothese.
 *
 * Source : TDR Search n° SFCG ML 03-172026 (août 2026). La répartition des rôles et les effets
 * intermédiaires sont une reconstruction de Sahel Analytics, à confirmer avec Search au cadrage.
 */

export const W = 1560;
export const H = 975;

export const COLS = [
	{ id: 'pilote', x: 110, label: 'Ceux qui pilotent', sub: 'Financement, mise en œuvre', fam: 'pil' },
	{ id: 'appui', x: 360, label: 'Ce que Search fait', sub: 'Appui et renforcement', fam: 'pil' },
	{ id: 'porteur', x: 620, label: 'Ceux qui portent la voix', sub: 'Et ce qui change chez eux', fam: 'voix' },
	{ id: 'inter', x: 880, label: 'Leurs interventions', sub: 'Comment ils atteignent les cibles', fam: 'voix' },
	{ id: 'cible', x: 1150, label: 'Ceux que le projet veut atteindre', sub: 'Et ce qui change chez eux', fam: 'cible' },
	{ id: 'objectif', x: 1425, label: 'Objectifs', sub: 'Cadre logique' }
];

export const SRC = {
	menages: 'Enquête ménages (base : n = 384)',
	osc: 'Enquête OSC (80) et médias (40)',
	kii: 'Entretiens informateurs clés (base : 33)',
	fgd: 'Groupes de discussion (base : 12 FGD)',
	part: 'Enquête auprès des participants (safeguarding)',
	urtel: 'Données de diffusion URTEL et données financières',
	doc: 'Revue documentaire (rapports d’activités, suivi MEAL)'
};

/** @type {Array<any>} */
export const NODES = [
	// ---------- Ceux qui pilotent ----------
	{ id: 'bailleur', kind: 'pilote', x: 110, y: 303 },
	{ id: 'search', kind: 'pilote', x: 110, y: 456 },

	// ---------- Ce que Search fait pour appuyer ceux qui portent la voix ----------
	{
		id: 's_osc', kind: 'appui', x: 360, y: 231, icon: 'appui',
		label: 'Appui technique et financier au réseau d’OSC',
		what: 'Search soutient techniquement et financièrement les OSC du réseau Sigida Herema, qui mènent ensuite le plaidoyer et les dialogues.',
		m: [{ ind: 'Appuis fournis aux OSC du réseau (nature, montants, calendrier)', src: 'doc' }],
		check: 'L’appui est-il adapté aux besoins des OSC et ancré dans leurs pratiques ? (pertinence, durabilité)'
	},
	{
		id: 's_capa', kind: 'appui', x: 360, y: 429, icon: 'capa',
		label: 'Renforcement de capacités',
		what: 'Formations au plaidoyer constructif, au fact-checking et à la production d’émissions sensibles aux conflits, ainsi qu’au réseautage et aux dialogues multi-acteurs. Pour les OSC, les journalistes (dont Youth Talk) et les radios.',
		m: [{ ind: 'Personnes formées, par type d’acteur, sexe et âge', src: 'doc' }],
		check: 'Distinguer compétences techniques et capacités relationnelles et stratégiques (question d’efficacité).'
	},
	{
		id: 's_urtel', kind: 'appui', x: 360, y: 636, icon: 'reseau',
		label: 'Partenariat avec l’URTEL',
		what: 'Search mobilise le réseau de l’URTEL (383 radios membres) pour diffuser les émissions et campagnes. Ce partenariat a été ajouté après l’approche prévue en octobre 2025, pour toucher plus de monde à moindre coût.',
		m: [{ ind: 'Coût par personne atteinte, comparé à l’approche initiale d’octobre 2025', src: 'urtel' }],
		check: 'Question d’efficience : le passage par l’URTEL a-t-il amélioré le rapport coût-efficacité ?'
	},

	// ---------- Ceux qui portent la voix (et ce qui change chez eux) ----------
	{
		id: 'osc', kind: 'porteur', x: 620, y: 231, os: 1,
		m: [
			{ ind: 'Indicateur 1 · % de membres d’OSC indiquant une meilleure collaboration entre médias et OSC pour le plaidoyer', b: 57, c: 70, src: 'osc' },
			{ ind: '% de membres d’OSC estimant avoir la capacité de mener des plaidoyers constructifs sur des questions sensibles', src: 'osc' }
		]
	},
	{
		id: 'medias', kind: 'porteur', x: 620, y: 429, os: 1,
		m: [
			{ ind: '% d’acteurs médias et OSC ayant accès à des sources d’information diverses, sans restriction et à temps (co-créé)', src: 'osc' },
			{ ind: 'Indicateur 1 · Collaboration médias-OSC pour le plaidoyer (mesurée aussi côté médias)', b: 57, c: 70, src: 'osc' }
		]
	},
	{
		id: 'urtel', kind: 'porteur', x: 620, y: 636, os: 2,
		m: [{ ind: 'Radios ayant diffusé, volume et langues des émissions, audience estimée', src: 'urtel' }]
	},

	// ---------- Comment ils atteignent les cibles ----------
	{
		id: 'plaid', kind: 'inter', x: 880, y: 164, icon: 'plaid', os: 1, res: 'R1.1',
		label: 'Plaidoyer collaboratif',
		what: 'Les OSC et les médias préparent et portent ensemble des messages constructifs auprès des décideurs, sur des questions sensibles de gouvernance.',
		who: [['osc', 'portent le plaidoyer'], ['medias', 'portent le plaidoyer'], ['etat', 'destinataires']],
		change: 'Les autorités associent davantage les OSC et les médias aux décisions sur l’espace civique.'
	},
	{
		id: 'forum', kind: 'inter', x: 880, y: 285, icon: 'forum', os: 1, res: 'R1.2',
		label: 'Forums OSC-Gouvernement',
		what: 'Des espaces réguliers où la société civile et les régulateurs se rencontrent pour se comprendre et collaborer sur la protection de l’espace civique.',
		who: [['osc', 'participent'], ['etat', 'participent'], ['search', 'facilite']],
		change: 'Un canal régulier et reconnu existe entre société civile et autorités, et peut durer après le projet.'
	},
	{
		id: 'dial', kind: 'inter', x: 880, y: 429, icon: 'dial', os: 2, res: 'R2.1',
		label: 'Dialogues publics inclusifs',
		what: 'Débats citoyens sur les questions civiques, ouverts aux femmes, aux jeunes et aux leaders coutumiers, avec les autorités locales, puis amplifiés à la radio.',
		who: [['osc', 'animent'], ['coutume', 'relaient'], ['pop', 'participent'], ['etat', 'participent']],
		change: 'Des groupes différents se parlent, et les citoyens ont le sentiment que leur avis compte.'
	},
	{
		id: 'camp', kind: 'inter', x: 880, y: 582, icon: 'camp', os: 2, res: 'R2.1 · 2.3',
		label: 'Campagnes médiatiques',
		what: 'Émissions radio sur la paix, la cohésion sociale et le vivre-ensemble, en langues locales, diffusées par les radios URTEL et relayées sur les réseaux sociaux.',
		who: [['urtel', 'diffusent'], ['medias', 'produisent'], ['pop', 'écoutent']],
		change: 'Le public entend des messages de dialogue et de vivre-ensemble à grande échelle.'
	},
	{
		id: 'info', kind: 'inter', x: 880, y: 717, icon: 'info', os: 2, res: 'R2.2',
		label: 'Information électorale crédible',
		what: 'Diffusion d’une information plus crédible, transparente et sensible aux conflits sur les élections.',
		who: [['medias', 'vérifient et produisent'], ['urtel', 'diffusent'], ['pop', 's’informent']],
		change: 'Le public fait davantage confiance à une information vérifiée et connaît mieux ses droits.'
	},

	// ---------- Ceux que le projet veut atteindre (et ce qui change chez eux) ----------
	{ id: 'etat', kind: 'cible', x: 1150, y: 89 },
	{
		id: 'c_voice', kind: 'change', x: 1150, y: 157, os: 1,
		label: 'Associent OSC et médias aux décisions',
		what: 'Les autorités font davantage participer les OSC et les médias aux processus de décision et à la formulation des politiques sur l’espace civique.',
		m: [{ ind: '% d’acteurs médias et OSC dont la participation aux processus décisionnels s’est améliorée', src: 'osc' }],
		check: 'Croiser avec les KII auprès des autorités.'
	},
	{
		id: 'c_protect', kind: 'change', x: 1150, y: 242, os: 1,
		label: 'Protègent mieux journalistes et défenseurs',
		what: 'Ceux qui travaillent sur l’espace civique bénéficient de plus de protection et de soutien des décideurs. Mesuré auprès des médias et OSC.',
		m: [{ ind: 'Indicateur 0.1 · % d’acteurs médias et OSC estimant que la protection des défenseurs et des journalistes s’est améliorée', b: 33, c: 50, src: 'osc' }]
	},
	{ id: 'coutume', kind: 'cible', x: 1150, y: 323 },
	{
		id: 'c_lead', kind: 'change', x: 1150, y: 388, os: 2,
		label: 'Relaient le dialogue dans les communautés',
		what: 'Les leaders coutumiers et communautaires portent les messages de dialogue et facilitent la participation de leurs communautés.',
		m: [{ ind: 'Réponse du projet aux attentes des leaders coutumiers ; rôle joué dans les dialogues', src: 'kii' }]
	},
	{ id: 'pop', kind: 'cible', x: 1150, y: 467 },
	{
		id: 'c_trust', kind: 'change', x: 1150, y: 535, os: 2,
		label: 'Font confiance aux médias et aux OSC',
		what: 'La population considère les médias et les OSC comme des sources fiables sur les enjeux de l’espace civique.',
		m: [
			{ ind: 'Indicateur 0.2 · % de la population faisant confiance aux médias et OSC comme sources fiables', b: 45, c: 60, src: 'menages' },
			{ ind: 'Indicateur 2.3 · % d’auditeurs déclarant que les émissions favorisent le dialogue constructif', c: 60, src: 'menages' }
		],
		check: 'Cible 0.2 revue à la hausse en janvier 2026. Pas de valeur de base pour 2.3.'
	},
	{
		id: 'c_rights', kind: 'change', x: 1150, y: 627, os: 2,
		label: 'Connaissent leurs droits et agissent',
		what: 'La population se sent informée de ses droits et devoirs et passe à l’action sur ce qui lui tient à cœur.',
		m: [
			{ ind: 'Indicateur 2.2 · % de la population se sentant informée de ses droits et devoirs de citoyen', b: 51, c: 70, src: 'menages' },
			{ ind: '% de la population qui mène des actions pour influencer les choses qui lui tiennent à cœur (MEAL global)', src: 'menages' }
		]
	},
	{
		id: 'c_heard', kind: 'change', x: 1150, y: 719, os: 2,
		label: 'Se sentent entendus par les autorités',
		what: 'La population pense que ses opinions sont prises en compte dans la décision publique et se dit satisfaite des services demandés aux autorités.',
		m: [
			{ ind: 'Indicateur 2.1 · % de la population pensant que ses opinions sont prises en compte dans la décision publique', b: 22, c: 50, src: 'menages' },
			{ ind: '% de la population satisfaite des services demandés aux autorités (MEAL global)', src: 'menages' }
		],
		check: 'Le plus gros écart à combler : +28 points.'
	},
	{
		id: 'c_cohesion', kind: 'change', x: 1150, y: 809, os: 2,
		label: 'Se méfient moins des autres groupes',
		what: 'Les écarts entre groupes se réduisent : confiance dans l’information et dans les interactions, rejet de la violence.',
		m: [{ ind: 'Écart entre groupes démographiques : confiance, conviction que la violence est parfois nécessaire (MEAL global)', src: 'menages' }],
		check: 'Définir les groupes comparés dès le rapport de démarrage.'
	},

	// ---------- Objectifs ----------
	{
		id: 'os1', kind: 'objectif', x: 1425, y: 200, os: 1,
		label: 'Objectif 1 · Plaidoyer collaboratif des OSC et des médias',
		what: 'Favoriser un plaidoyer collaboratif des organisations de la société civile et des médias en faveur d’un espace civique au Mali paisible, sensible et ouvert.'
	},
	{
		id: 'og', kind: 'objectif', x: 1425, y: 438, os: 0,
		label: 'Objectif général · Expansion de l’espace civique',
		what: 'Soutenir les acteurs des médias et de la société civile à promouvoir l’expansion de l’espace civique au Mali.',
		m: [
			{ ind: 'Indicateur 0.1 · Protection des défenseurs et journalistes', b: 33, c: 50, src: 'osc' },
			{ ind: 'Indicateur 0.2 · Confiance envers médias et OSC', b: 45, c: 60, src: 'menages' }
		]
	},
	{
		id: 'os2', kind: 'objectif', x: 1425, y: 672, os: 2,
		label: 'Objectif 2 · Soutien du public à un espace civique libre',
		what: 'Favoriser une meilleure compréhension et un soutien accru du public en faveur d’un espace civique libre et inclusif au Mali.'
	},

	// ---------- Contexte et hypothèse ----------
	{
		id: 'ctx_secu', kind: 'contexte', sub: 'frein', x: 500, y: 902,
		label: 'Insécurité et transition politique',
		what: 'Contexte sécuritaire complexe et reconfiguration des relations entre l’État et la population, qui pèsent sur la participation et la possibilité de se réunir.',
		check: 'Documenter les ajustements faits face au contexte et leurs effets sur les résultats.'
	},
	{
		id: 'ctx_info', kind: 'contexte', sub: 'frein', x: 770, y: 902,
		label: 'Pression informationnelle et désinformation',
		what: 'La manipulation de l’information fragilise la confiance envers les médias et la cohésion sociale.',
		check: 'Tenir compte de la désirabilité sociale sur les questions de confiance.'
	},
	{
		id: 'ctx_auto', kind: 'contexte', sub: 'frein', x: 1040, y: 902,
		label: 'Autocensure, pressions et tabous',
		what: 'Dynamiques invisibles de l’espace civique : rapports de pouvoir informels, pressions politiques ou religieuses, autocensure.',
		check: 'Les capter surtout par les KII et les FGD, avec anonymat.'
	},
	{
		id: 'hyp', kind: 'contexte', sub: 'hypothese', x: 1310, y: 902,
		label: 'Hypothèse critique du projet',
		what: 'Les TDR demandent d’en tester la validité. Sa formulation exacte figure dans la théorie du changement : à obtenir auprès de Search au cadrage.',
		check: 'L’hypothèse s’est-elle vérifiée, et sinon, comment le projet s’est-il adapté ?'
	}
];

export const LINKS = [
	// Pilotage
	['bailleur', 'search', 'finance'],
	['search', 's_osc', 'appui'], ['search', 's_capa', 'appui'], ['search', 's_urtel', 'appui'],
	// Appui → porteurs de voix
	['s_osc', 'osc', 'appui'],
	['s_capa', 'osc', 'appui'], ['s_capa', 'medias', 'appui'], ['s_capa', 'urtel', 'appui'],
	['s_urtel', 'urtel', 'appui'],
	// Porteurs → interventions
	['osc', 'plaid', 'porte'], ['medias', 'plaid', 'porte'],
	['osc', 'forum', 'porte'],
	['osc', 'dial', 'porte'],
	['medias', 'camp', 'porte'], ['urtel', 'camp', 'porte'],
	['medias', 'info', 'porte'], ['urtel', 'info', 'porte'],
	// Interventions → changements chez les cibles
	['plaid', 'c_voice', 'vise'], ['plaid', 'c_protect', 'vise'],
	['forum', 'c_voice', 'vise'], ['forum', 'c_protect', 'vise'], ['forum', 'c_heard', 'vise'],
	['dial', 'c_lead', 'vise'], ['dial', 'c_heard', 'vise'], ['dial', 'c_cohesion', 'vise'],
	['camp', 'c_trust', 'vise'], ['camp', 'c_rights', 'vise'], ['camp', 'c_cohesion', 'vise'],
	['info', 'c_trust', 'vise'], ['info', 'c_rights', 'vise'],
	// Changements → objectifs
	['c_voice', 'os1', 'objectif'], ['c_protect', 'os1', 'objectif'],
	['c_lead', 'os2', 'objectif'], ['c_trust', 'os2', 'objectif'], ['c_rights', 'os2', 'objectif'], ['c_heard', 'os2', 'objectif'], ['c_cohesion', 'os2', 'objectif'],
	['os1', 'og', 'objectif'], ['os2', 'og', 'objectif'],
	// Contexte
	['ctx_secu', 'dial', 'frein'],
	['ctx_info', 'c_trust', 'frein'],
	['ctx_auto', 'c_voice', 'frein'], ['ctx_auto', 'c_protect', 'frein'],
	['hyp', 'c_heard', 'hypothese'], ['hyp', 'c_voice', 'hypothese']
];

export const CTX_TYPES = ['frein', 'hypothese'];
export const nodeById = Object.fromEntries(NODES.map((n) => [n.id, n]));

/** Groupes cibles et leurs changements. */
export const TARGET_CHANGES = { etat: ['c_voice', 'c_protect'], coutume: ['c_lead'], pop: ['c_trust', 'c_rights', 'c_heard', 'c_cohesion'] };

/** Tous les nœuds en amont et en aval d'un nœud (chaîne complète). */
export function chainOf(id, { withContext = true } = {}) {
	if (TARGET_CHANGES[id]) {
		const s = new Set([id]);
		for (const c of TARGET_CHANGES[id]) for (const x of chainOf(c, { withContext })) s.add(x);
		return s;
	}
	const ok = (l) => withContext || !CTX_TYPES.includes(l[2]);
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
	const s = new Set([...walk(id, 'down'), ...walk(id, 'up')]);
	// un changement allume aussi le groupe cible auquel il appartient
	for (const [t, cs] of Object.entries(TARGET_CHANGES)) if (cs.some((c) => s.has(c))) s.add(t);
	return s;
}

/**
 * Les 18 indicateurs que l'évaluation doit renseigner (TDR, tableaux 1 à 3 et matrice de définition),
 * avec l'approche retenue pour chacun.
 *
 * - `pub` : public interrogé (clé de PUBLICS).
 * - `b` / `c` : valeur de base / cible en %, null si absente.
 * - `ap` : approche (clé de APPROCHES).
 * - `dmd` : différence minimale détectable entre base et finale (points, seuil 5 %, puissance 80 %),
 *   calculée avec la taille d'échantillon de la base ; seulement pour les indicateurs avant-après.
 * - `node` : où le changement se produit dans le modèle logique (identifiants de data/systeme.js).
 * - `claim` : ce qu'on pourra affirmer ; `watch` : points d'attention.
 *
 * Numérotation 7 à 18 : Sahel Analytics, pour s'y référer facilement.
 */

export const PUBLICS = {
	menages: { label: 'Ménages', src: 'Enquête ménages, n = 384, tirage aléatoire proportionnel par commune, comme à la base' },
	osc: { label: 'OSC et médias', src: 'Enquête auprès des 80 OSC et 40 médias de la base (mêmes listes ou même règle de sélection)' },
	part: { label: 'Participants', src: 'Questionnaire court aux participants des activités (listes de Search), complété par les FGD' }
};

export const APPROCHES = {
	ba: { label: 'Avant-après', short: 'Avant-après', text: 'Valeur de base et valeur finale mesurées de la même façon : on peut montrer un changement.' },
	ba_check: { label: 'Avant-après si la base est retrouvée', short: 'À vérifier', text: 'L’indicateur figure dans l’étude de base mais sa valeur n’est pas donnée dans les TDR : à récupérer auprès de Search.' },
	cible: { label: 'Fin seulement · comparé à la cible', short: 'Fin vs cible', text: 'Pas de valeur de base : on compare le niveau final à la cible, sans pouvoir parler de changement.' },
	fin: { label: 'Fin seulement · description', short: 'Fin seulement', text: 'Ni base ni cible : on décrit la situation à la fin du projet, globalement et par groupe.' },
	suivi: { label: 'Fin + données de suivi', short: 'Fin + suivi', text: 'Pas de base, mais les missions de suivi de Search ont peut-être mesuré l’indicateur pendant le projet : à demander.' }
};

export const ANALYSES = {
	ba: 'Différence de proportions base / finale avec intervalle de confiance à 95 % ; désagrégation donnée à titre indicatif.',
	ba_check: 'Si la base est retrouvée : différence base / finale avec intervalle de confiance. Sinon : niveau final avec intervalle de confiance.',
	cible: 'Proportion finale avec intervalle de confiance, comparée à la cible.',
	fin: 'Proportion (ou moyenne) finale avec intervalle de confiance, désagrégée par région, sexe et âge.',
	suivi: 'Proportion finale avec intervalle de confiance ; comparaison aux valeurs des missions de suivi si elles existent.'
};

export const INDICATEURS = [
	// ---------- Cadre logique ----------
	{
		code: '0.1', node: ['c_protect'], table: 'Cadre logique · objectif général', pub: 'osc', b: 33, c: 50, ap: 'ba', dmd: 17.8,
		t: '% des acteurs médias et OSC estimant que la protection et le soutien accordés aux défenseurs des droits de l’homme et aux journalistes travaillant sur l’espace civique se sont améliorés',
		claim: 'L’évolution de la perception de protection chez les médias et OSC interrogés, entre la base et la fin.',
		watch: ['Échantillon raisonné : réinterroger les mêmes acteurs ou appliquer la même règle de sélection.', 'Avec 120 répondants, la DMD (≈ 18 pts) est à peine supérieure à l’écart visé (17 pts) : résultat probablement non significatif.', 'Garder le même mode d’entretien qu’à la base (face à face ou téléphone).']
	},
	{
		code: '0.2', node: ['c_trust'], table: 'Cadre logique · objectif général', pub: 'menages', b: 45, c: 60, ap: 'ba', dmd: 10.1,
		t: '% de la population qui a confiance dans les médias et les OSC comme sources d’information fiables sur les enjeux de l’espace civique',
		claim: 'L’évolution de la confiance dans la population, entre la base et la fin.',
		watch: ['Cible revue à la hausse en janvier 2026.', 'Risque de désirabilité sociale sur la confiance : anonymat, enquêteurs extérieurs au projet.', 'Formulation de la question strictement identique à la base.']
	},
	{
		code: '1', node: ['osc', 'medias'], table: 'Cadre logique · objectif spécifique 1', pub: 'osc', b: 57, c: 70, ap: 'ba', dmd: 21.3,
		t: '% de membres des OSC indiquant une meilleure collaboration entre acteurs médias et OSC pour le plaidoyer en faveur d’un espace civique plus ouvert et paisible',
		claim: 'L’évolution de la collaboration déclarée par les membres d’OSC.',
		watch: ['Avec 80 OSC, la DMD (≈ 21 pts) dépasse l’écart visé (13 pts) : option à arbitrer au cadrage : réinterroger les OSC de l’étude de base (panel), sans coût supplémentaire.', 'Cible revue à la hausse en janvier 2026.']
	},
	{
		code: '2.1', node: ['c_heard'], table: 'Cadre logique · objectif spécifique 2', pub: 'menages', b: 22, c: 50, ap: 'ba', dmd: 9.7,
		t: '% de la population qui pense que ses opinions et intérêts sont pris en compte dans la prise de décision et la formulation des politiques publiques',
		claim: 'L’évolution du sentiment d’être entendu, entre la base et la fin.',
		watch: ['Cible la plus ambitieuse (+28 pts) et très dépendante du contexte politique, hors du contrôle du projet.']
	},
	{
		code: '2.2', node: ['c_rights'], table: 'Cadre logique · objectif spécifique 2', pub: 'menages', b: 51, c: 70, ap: 'ba', dmd: 9.9,
		t: '% de la population qui se sent informée et consciente de ses droits et devoirs de citoyen dans l’espace civique',
		claim: 'L’évolution de la connaissance des droits et devoirs, entre la base et la fin.',
		watch: ['Formulation de la question strictement identique à la base.']
	},
	{
		code: '2.3', node: ['c_trust', 'camp'], table: 'Cadre logique · objectif spécifique 2', pub: 'menages', b: null, c: 60, ap: 'cible',
		t: '% d’auditeurs déclarant que les émissions produites et diffusées sur la paix, la cohésion sociale et le vivre-ensemble favorisent le dialogue constructif et la compréhension mutuelle dans leur communauté',
		claim: 'Le niveau atteint chez les auditeurs à la fin, comparé à la cible de 60 %.',
		watch: ['Ne porte que sur les auditeurs : ajouter une question filtre (« avez-vous écouté ces émissions ? »).', 'Le nombre d’auditeurs dans l’échantillon de 384 peut être faible : intervalle de confiance large.', 'Les auditeurs se sélectionnent eux-mêmes : pas de conclusion sur l’ensemble de la population.']
	},

	// ---------- Matrice de définition ----------
	{
		code: '7', node: ['c_trust'], table: 'Matrice de définition', pub: 'menages', b: null, c: null, ap: 'ba_check',
		t: 'Confiance envers les médias : perception de la fiabilité et de l’impartialité des informations diffusées par les médias partenaires (score moyen, échelle de Likert 1 à 5)',
		claim: 'Le score moyen de confiance à la fin ; son évolution si la base l’a mesuré.',
		watch: ['Vérifier dans le rapport de base si ce score a été calculé.', 'Analyse sur une moyenne (et non une proportion).']
	},
	{
		code: '8', node: ['osc'], table: 'Matrice de définition', pub: 'osc', b: null, c: null, ap: 'ba_check',
		t: '% des membres d’OSC estimant avoir la capacité de mener des actions de plaidoyer constructif autour des questions sensibles de gouvernance',
		claim: 'Le niveau de capacité déclaré à la fin ; son évolution si la valeur de base est retrouvée.',
		watch: ['Listé « étude de base + évaluation finale » dans la matrice, mais sans valeur : la demander à Search.']
	},
	{
		code: '9', node: ['medias'], table: 'Matrice de définition · co-créé', pub: 'osc', b: null, c: null, ap: 'fin',
		t: '% des acteurs médias et OSC affirmant avoir accès à des sources d’information diverses, sans restriction et à temps',
		claim: 'La situation à la fin du projet, globalement et par région.',
		watch: ['Indicateur co-créé : garder la formulation définie avec les communautés.']
	},
	{
		code: '10', node: ['forum'], table: 'Matrice de définition · co-créé', pub: 'osc', b: null, c: null, ap: 'fin',
		t: '% des acteurs de la société civile ayant participé à des dialogues inclusifs et diversifiés sur la bonne gouvernance avec les autorités',
		claim: 'La part des acteurs ayant participé, à la fin du projet.',
		watch: ['À croiser avec les listes de participation de Search.', 'Indicateur co-créé : garder la formulation définie avec les communautés.']
	},
	{
		code: '11', node: ['c_voice'], table: 'Matrice de définition · co-créé', pub: 'osc', b: null, c: null, ap: 'fin',
		t: '% des acteurs de la société civile qui déclarent que l’espace civique est diversifié',
		claim: 'La perception de l’espace civique à la fin du projet.',
		watch: ['Notion à définir clairement dans le questionnaire.', 'Indicateur co-créé : garder la formulation définie avec les communautés.']
	},
	{
		code: '12', node: ['c_voice'], table: 'Matrice de définition', pub: 'osc', b: null, c: null, ap: 'fin',
		t: '% des acteurs médias et OSC qui affirment que leur participation aux processus décisionnels et à la formulation des politiques liées à la protection de l’espace civique s’est améliorée',
		claim: 'La part qui déclare une amélioration, à la fin.',
		watch: ['La question contient déjà une comparaison dans le temps (« s’est améliorée ») : c’est une perception du changement, pas une mesure avant-après.']
	},

	// ---------- Safeguarding ----------
	{
		code: '13', node: ['dial', 'forum'], table: 'Safeguarding de Search', pub: 'part', b: null, c: null, ap: 'suivi',
		t: '% de participants qui se sentent en sécurité lors de leur participation au projet et aux activités (par sexe, âge, localité)',
		claim: 'Le niveau de sécurité ressenti par les participants à la fin.',
		watch: ['Interroger des participants, pas des ménages : obtenir les listes auprès de Search.', 'Demander les valeurs des missions de suivi.']
	},
	{
		code: '14', node: ['dial', 'forum'], table: 'Safeguarding de Search', pub: 'part', b: null, c: null, ap: 'suivi',
		t: '% de participants qui connaissent les mécanismes de signalement (par sexe, localité, âge)',
		claim: 'La connaissance des mécanismes de signalement à la fin.',
		watch: ['Demander les valeurs des missions de suivi.']
	},
	{
		code: '15', node: ['dial', 'forum'], table: 'Safeguarding de Search', pub: 'part', b: null, c: null, ap: 'suivi',
		t: '% de participants qui estiment que leur voix et leur opinion sont prises en compte dans le projet (par sexe, âge, localité)',
		claim: 'Le sentiment des participants d’être pris en compte dans le projet, à la fin.',
		watch: ['Demander les valeurs des missions de suivi.']
	},

	// ---------- MEAL global de Search ----------
	{
		code: '16', node: ['c_rights'], table: 'Cadre MEAL global de Search', pub: 'menages', b: null, c: null, ap: 'fin',
		t: '% de la population qui mène des actions pour influencer les choses qui lui tiennent à cœur',
		claim: 'Le niveau d’action citoyenne à la fin, comparable aux autres projets de Search.',
		watch: ['Indicateur standard de Search : reprendre sa formulation exacte.']
	},
	{
		code: '17', node: ['c_heard'], table: 'Cadre MEAL global de Search', pub: 'menages', b: null, c: null, ap: 'fin',
		t: '% de la population qui est satisfaite des services qu’elle demande aux autorités',
		claim: 'Le niveau de satisfaction à la fin, comparable aux autres projets de Search.',
		watch: ['Types de services et d’autorités à préciser (« pilier 1 » du cadre MEAL de Search).']
	},
	{
		code: '18', node: ['c_cohesion'], table: 'Cadre MEAL global de Search', pub: 'menages', b: null, c: null, ap: 'fin',
		t: 'Niveau de différence entre groupes démographiques : confiance dans les sources d’information, confiance dans les interactions, conviction que la violence est parfois nécessaire',
		claim: 'Les écarts entre groupes à la fin : où la polarisation est la plus forte aujourd’hui. Pas d’affirmation sur une baisse.',
		watch: ['Définir les groupes comparés dès le rapport de démarrage (région, sexe, âge…).', 'Chaque sous-groupe est petit : intervalles de confiance larges.']
	}
];

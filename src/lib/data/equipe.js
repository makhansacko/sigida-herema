/** Équipe de la mission et répartition des rôles (offre technique, ajustée à la réunion de cadrage). */
export const EQUIPE = [
	{ id: 'diawara', name: 'Abdoulaye Diawara', role: 'Chef de mission · suivi-évaluation',
		profil: 'Docteur en sciences de gestion (IPU Bamako, 2026). Plus de 12 ans en conseil, suivi-évaluation, gouvernance des données et pilotage de missions multi-acteurs, dont une mission récente pour le PNUD Mali. Directeur général adjoint de Sahel Analytics.',
		fait: ['Pilote la mission et la relation avec Search', 'Méthodologie, matrice d’évaluation, analyse de contribution', 'Rédige les rapports et anime les restitutions'] },
	{ id: 'kane', name: 'Mahamadou Kane', role: 'Expert senior · gouvernance, espace civique et médias',
		profil: 'Journaliste et formateur, près de 20 ans d’expérience. Rédacteur en chef adjoint de Radio Kledu, correspondant de la Deutsche Welle au Mali depuis 2018, modérateur du débat politique hebdomadaire de Radio Kledu. ESJ Lille (2015), licence de sociologie. Membre du comité de pilotage des débats électoraux de 2018 ; formateur sur la documentation des violations des droits humains (Amnesty International).',
		fait: ['Entretiens avec les médias, les radios URTEL, les OSC et les autorités', 'Analyse de la gouvernance, de l’espace civique et des médias', 'Rédige les sections médias et espace civique du rapport'] },
	{ id: 'diarra', name: 'Idrissa Diarra', role: 'Genre, inclusion, safeguarding',
		profil: 'Juriste, master en genre et développement (Université des sciences juridiques et politiques de Bamako, 2020), doctorant. Prévention et prise en charge des violences basées sur le genre, protection contre l’exploitation et les abus sexuels, animation communautaire.',
		fait: ['Groupes de discussion et récits de changement', 'Protocole safeguarding et consentement', 'Analyse genre et inclusion'] },
	{ id: 'fane', name: 'Abdoulaye Fané', role: 'Personne ressource · PIF',
		profil: 'Juriste, formateur Common Ground. Chez Search de 2020 à 2026, dont chef de projet de Sigida Herema depuis août 2024 : lien déclaré à Search.',
		fait: ['Application du Cadre d’impact sur la paix : codage par signes vitaux', 'Ni entretiens ni analyse des résultats ; interrogé comme informateur clé'] },
	{ id: 'sacko', name: 'Makhan Sacko', role: 'Référent qualité interne',
		profil: 'Directeur général de Sahel Analytics. Ancien responsable de l’exploration au Laboratoire d’accélération du PNUD Mali (2019–2025). MPP de Princeton (2026), MBA de l’université de Kobe.',
		fait: ['Revue qualité de chaque livrable avant envoi', 'Reprend le volet données : échantillonnage, formulaires KoboToolbox, apurement, scripts, calcul des indicateurs', 'Cohérence entre indicateurs, modèle logique et conclusions'] },
	{ id: 'kelepily', name: 'Hassana Kelepily', role: 'Enquêteur-superviseur · Bamako et Mopti',
		profil: 'Sociologue, agent de collecte chez Sahel Analytics depuis 2024. Enquêtes quantitatives et qualitatives (KoboCollect, ODK, SurveyCTO) pour le PNUD (UniPod), l’OIM, OCHA, le Fonds mondial ; terrain à Bandiagara et dans le centre du Mali.',
		fait: ['Collecte et supervision à Bamako, puis à Mopti', 'Contrôle qualité et transmission quotidienne des données', 'Appui aux groupes de discussion de Mopti'] },
	{ id: 'maiga', name: 'Issa Maiga', role: 'Enquêteur-superviseur · Gao',
		profil: 'Gestionnaire, plus de 5 ans en administration, logistique et collecte de données ; chargé d’affaires chez Sahel Analytics depuis 2024. Supervision d’enquêtes pour le PNUD, le CNCR et Baobab (Mali, Guinée).',
		fait: ['Collecte et supervision à Gao', 'Logistique de terrain et suivi des dépenses', 'Appui aux groupes de discussion de Gao'] }
];
export const TERRAIN = 'Hassana Kelepily (Bamako, puis Mopti) et Issa Maiga (Gao) encadrent la collecte. Pour tenir 384 ménages et 120 OSC et médias en dix jours, il faut des enquêteurs d’appoint recrutés sur place (7 proposés : 3 à Bamako, 2 à Mopti, 2 à Gao), dont des femmes, parlant bamanankan, fulfulde, songhay et tamasheq.';

/** Qui fait quoi, par livrable : R = réalise, A = valide côté Sahel Analytics, C = contribue. */
export const RACI = {
	note: { diawara: 'R', kane: 'C', fane: 'C', sacko: 'A' },
	demarrage: { diawara: 'R', kane: 'C', diarra: 'C', fane: 'C', sacko: 'A' },
	outils: { diawara: 'A', kane: 'C', diarra: 'C', fane: 'C', sacko: 'R', kelepily: 'C', maiga: 'C' },
	formation: { diawara: 'R', kane: 'C', diarra: 'C', sacko: 'A', kelepily: 'C', maiga: 'C' },
	restitution: { diawara: 'R', kane: 'C', diarra: 'C', sacko: 'A' },
	donnees: { diawara: 'A', sacko: 'R', kelepily: 'C', maiga: 'C' },
	provisoire: { diawara: 'R', kane: 'C', diarra: 'C', fane: 'C', sacko: 'A' },
	final: { diawara: 'R', kane: 'C', diarra: 'C', fane: 'C', sacko: 'A' },
	'restit-finale': { diawara: 'R', sacko: 'A' },
	synthese: { diawara: 'C', sacko: 'R' },
	photos: { diarra: 'R', kelepily: 'C', maiga: 'C' }
};

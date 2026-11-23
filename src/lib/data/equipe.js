/** Équipe de la mission et répartition des rôles (offre technique, ajustée à la réunion de cadrage). */
export const EQUIPE = [
	{ id: 'diawara', name: 'Abdoulaye Diawara', role: 'Chef de mission · suivi-évaluation',
		profil: 'Docteur en sciences de gestion (IPU Bamako, 2026). Plus de 12 ans en conseil, suivi-évaluation, gouvernance des données et pilotage de missions multi-acteurs, dont une mission récente pour le PNUD Mali. Directeur général adjoint de Sahel Analytics.',
		fait: ['Pilote la mission et la relation avec Search', 'Méthodologie, matrice d’évaluation, analyse de contribution', 'Rédige les rapports et anime les restitutions'] },
	{ id: 'camara', name: 'Sékou Kader Camara', role: 'Statisticien · data manager',
		profil: 'Ingénieur statisticien économiste (ENSEA Abidjan, 2025), spécialisé en évaluation d’impact des politiques publiques ; MicroMasters du MIT en données et politiques publiques. Enquêtes, KoboToolbox, R et Stata.',
		fait: ['Échantillonnage et pondération', 'Programmation KoboToolbox, contrôle qualité quotidien', 'Apurement, scripts, analyses quantitatives'] },
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
		fait: ['Revue qualité de chaque livrable avant envoi', 'Cohérence entre indicateurs, modèle logique et conclusions'] }
];
export const TERRAIN = '3 superviseurs et 12 enquêteurs recrutés à Bamako, Mopti et Gao, dont au moins 40 % de femmes, parlant bamanankan, fulfulde, songhay et tamasheq (2 enquêteurs de plus proposés à Bamako).';

/** Qui fait quoi, par livrable : R = réalise, A = valide côté Sahel Analytics, C = contribue. */
export const RACI = {
	note: { diawara: 'R', camara: 'C', kane: 'C', fane: 'C', sacko: 'A' },
	demarrage: { diawara: 'R', camara: 'C', kane: 'C', diarra: 'C', fane: 'C', sacko: 'A' },
	outils: { diawara: 'C', camara: 'R', kane: 'C', diarra: 'C', fane: 'C', sacko: 'A' },
	formation: { diawara: 'A', camara: 'R', kane: 'C', diarra: 'C' },
	restitution: { diawara: 'R', camara: 'C', kane: 'C', diarra: 'C', sacko: 'A' },
	donnees: { camara: 'R', sacko: 'A' },
	provisoire: { diawara: 'R', camara: 'C', kane: 'C', diarra: 'C', fane: 'C', sacko: 'A' },
	final: { diawara: 'R', camara: 'C', kane: 'C', diarra: 'C', fane: 'C', sacko: 'A' },
	'restit-finale': { diawara: 'R', sacko: 'A' },
	synthese: { diawara: 'C', sacko: 'R' },
	photos: { diarra: 'R', camara: 'C' }
};

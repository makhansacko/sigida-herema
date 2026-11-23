/** Équipe de la mission et répartition des rôles (offre technique, ajustée à la réunion de cadrage). */
export const EQUIPE = [
	{ id: 'diawara', name: 'Abdoulaye Diawara', role: 'Chef de mission · suivi-évaluation',
		fait: ['Pilote la mission et la relation avec Search', 'Méthodologie, matrice d’évaluation, analyse de contribution', 'Rédige les rapports et anime les restitutions'] },
	{ id: 'camara', name: 'Sékou Kader Camara', role: 'Statisticien · data manager',
		fait: ['Échantillonnage et pondération', 'Programmation KoboToolbox, contrôle qualité quotidien', 'Apurement, scripts, analyses quantitatives'] },
	{ id: 'diarra', name: 'Idrissa Diarra', role: 'Genre, inclusion, safeguarding',
		fait: ['Groupes de discussion et récits de changement', 'Protocole safeguarding et consentement', 'Analyse genre et inclusion'] },
	{ id: 'fane', name: 'Abdoulaye Fané', role: 'Personne ressource · PIF',
		fait: ['Application du Cadre d’impact sur la paix : codage par signes vitaux', 'Ancien chef de projet de Sigida Herema chez Search : lien déclaré ; ni entretiens ni analyse des résultats ; interrogé comme informateur clé'] },
	{ id: 'sacko', name: 'Makhan Sacko', role: 'Référent qualité interne',
		fait: ['Revue qualité de chaque livrable avant envoi', 'Cohérence entre indicateurs, modèle logique et conclusions'] }
];
export const TERRAIN = '3 superviseurs et 12 enquêteurs recrutés à Bamako, Mopti et Gao, dont au moins 40 % de femmes, parlant bamanankan, fulfulde, songhay et tamasheq (2 enquêteurs de plus proposés à Bamako).';

/** Qui fait quoi, par livrable : R = réalise, A = valide côté Sahel Analytics, C = contribue. */
export const RACI = {
	note: { diawara: 'R', camara: 'C', fane: 'C', sacko: 'A' },
	demarrage: { diawara: 'R', camara: 'C', diarra: 'C', fane: 'C', sacko: 'A' },
	outils: { diawara: 'C', camara: 'R', diarra: 'C', fane: 'C', sacko: 'A' },
	formation: { diawara: 'A', camara: 'R', diarra: 'C' },
	restitution: { diawara: 'R', camara: 'C', diarra: 'C', sacko: 'A' },
	donnees: { camara: 'R', sacko: 'A' },
	provisoire: { diawara: 'R', camara: 'C', diarra: 'C', fane: 'C', sacko: 'A' },
	final: { diawara: 'R', camara: 'C', diarra: 'C', fane: 'C', sacko: 'A' },
	'restit-finale': { diawara: 'R', sacko: 'A' },
	synthese: { diawara: 'C', sacko: 'R' },
	photos: { diarra: 'R', camara: 'C' }
};

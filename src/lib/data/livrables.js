/** Livrables de la mission (TDR §4 et offre technique), avec leur échéance dans le calendrier de 45 jours ouvrés. */
export const STATUTS = {
	afaire: { label: 'À faire', next: 'encours' },
	encours: { label: 'En cours', next: 'remis' },
	remis: { label: 'Remis à Search', next: 'valide' },
	valide: { label: 'Validé', next: 'afaire' }
};

export const LIVRABLES = [
	{ id: 'note', t: 'Note d’arbitrage méthodologique', due: '2026-11-26', src: 'Offre technique', owner: 'diawara',
		contenu: ['Les points de méthode à trancher avec Search (voir « Décisions à arbitrer »)', 'Proposition chiffrée pour chacun'] },
	{ id: 'demarrage', t: 'Rapport de démarrage', due: '2026-12-01', src: 'TDR §4', owner: 'diawara',
		contenu: ['Méthodologie justifiée et matrice d’évaluation', 'Matrice de définition des indicateurs complétée', 'Taille et cibles de l’échantillon', 'Organisation du travail et équipe', 'Plan d’analyse des données'] },
	{ id: 'outils', t: 'Outils de collecte validés', due: '2026-12-10', src: 'TDR §4 · revue MEAL de Search', owner: 'camara',
		contenu: ['Questionnaire ménages (repris de la base, plus les questions du PIF)', 'Questionnaire OSC et médias', 'Quatre guides d’entretien (OSC, médias, autorités locales, État et experts)', 'Guide de groupe de discussion GAM', 'Fiche de récit de changement significatif'] },
	{ id: 'formation', t: 'Formation des enquêteurs et test pilote', due: '2026-12-16', src: 'Offre technique', owner: 'camara',
		contenu: ['Manuel de l’enquêteur', 'Rapport de test pilote et ajustements des outils'] },
	{ id: 'restitution', t: 'Session de restitution', due: '2027-01-08', src: 'TDR §4 : dans les 5 jours ouvrables après la collecte', owner: 'diawara',
		contenu: ['Présentation interactive des grandes tendances à Search et ses partenaires'] },
	{ id: 'donnees', t: 'Bases de données et scripts', due: '2027-01-08', src: 'TDR §4', owner: 'camara',
		contenu: ['Données brutes', 'Données apurées', 'Script d’apurement reproductible'] },
	{ id: 'provisoire', t: 'Rapport provisoire', due: '2027-01-19', src: 'TDR §4', owner: 'diawara',
		contenu: ['Revue en plusieurs phases par Search, ses partenaires et le bailleur'] },
	{ id: 'final', t: 'Rapport final (60 pages au plus)', due: '2027-01-26', src: 'TDR §4', owner: 'diawara',
		contenu: ['Canevas de Search', 'Résultats par groupe cible, reliés à la théorie du changement et aux ajustements', 'Tableau récapitulatif des indicateurs', 'Annexes : outils, personnes interrogées, TDR, profils de l’équipe'] },
	{ id: 'restit-finale', t: 'Diaporama et session virtuelle (1 à 2 h)', due: '2027-01-26', src: 'TDR §4', owner: 'diawara',
		contenu: ['Résultats clés pour Search et le bailleur'] },
	{ id: 'synthese', t: 'Note de synthèse (2 pages)', due: '2027-01-26', src: 'TDR §4', owner: 'sacko',
		contenu: ['Leçons apprises pour la planification future de Search et du bailleur'] },
	{ id: 'photos', t: 'Dossier photographique', due: '2027-01-26', src: 'TDR §4', owner: 'diarra',
		contenu: ['Formation des enquêteurs, collecte, supervision (avec consentement)'] }
];

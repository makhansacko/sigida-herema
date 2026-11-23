import { goto } from '$app/navigation';

// État partagé entre sections : élément sélectionné dans la carte systémique.
export const sys = $state({ sel: null });

async function aller(path) {
	if (location.pathname !== path) await goto(path);
}

/** Sélectionne un élément (acteur, intervention…) et ouvre le modèle logique. */
export async function showInSystem(id) {
	sys.sel = id;
	await aller('/modele-logique');
	setTimeout(() => document.getElementById('systeme')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
}

// Indicateurs dépliés dans la section Indicateurs (partagé : les autres sections peuvent en ouvrir un).
export const ui = $state({ openInd: [] });

/** Déplie un indicateur, ouvre la page Indicateurs et fait défiler jusqu'à sa ligne. */
export async function showIndicator(code) {
	if (!ui.openInd.includes(code)) ui.openInd = [...ui.openInd, code];
	await aller('/indicateurs');
	setTimeout(() => document.getElementById('ind-' + code.replace('.', '-'))?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 80);
}

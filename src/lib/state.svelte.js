// État partagé entre sections : élément sélectionné dans la carte systémique.
export const sys = $state({ sel: null });

/** Sélectionne un élément (acteur, intervention…) et fait défiler jusqu'à la carte. */
export function showInSystem(id) {
	sys.sel = id;
	document.getElementById('systeme')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Indicateurs dépliés dans la section Indicateurs (partagé : la section Questions peut en ouvrir un).
export const ui = $state({ openInd: [] });

/** Déplie un indicateur et fait défiler jusqu'à sa ligne. */
export function showIndicator(code) {
	if (!ui.openInd.includes(code)) ui.openInd = [...ui.openInd, code];
	setTimeout(() => document.getElementById('ind-' + code.replace('.', '-'))?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 30);
}

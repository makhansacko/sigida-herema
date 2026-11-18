// État partagé entre sections : élément sélectionné dans la carte systémique.
export const sys = $state({ sel: null });

/** Sélectionne un élément (acteur, intervention…) et fait défiler jusqu'à la carte. */
export function showInSystem(id) {
	sys.sel = id;
	document.getElementById('systeme')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

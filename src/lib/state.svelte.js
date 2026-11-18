// État partagé entre sections : acteur ou intervention sélectionné dans l'écosystème.
export const eco = $state({ sh: null, inter: null });

/** Sélectionne un acteur et fait défiler jusqu'à la scène. */
export function showInScene(sh) {
	eco.inter = null;
	eco.sh = sh;
	document.getElementById('ecosysteme')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

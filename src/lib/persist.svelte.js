/**
 * États cochés par l'utilisateur (statuts de livrables, décisions tranchées, documents reçus),
 * gardés dans ce navigateur seulement. Partagés entre les sections : le tableau de bord les lit aussi.
 * Chargés côté client par loadAll(), appelé une fois depuis la page.
 */
function store(key, init) {
	const s = $state({ v: init });
	return {
		get value() {
			return s.v;
		},
		set value(n) {
			s.v = n;
			try {
				localStorage.setItem(key, JSON.stringify(n));
			} catch {}
		},
		load() {
			try {
				const x = localStorage.getItem(key);
				if (x != null) s.v = JSON.parse(x);
			} catch {}
		}
	};
}

/** Statut de chaque livrable : id → 'afaire' | 'encours' | 'remis' | 'valide'. */
export const livStatus = store('sh-livrables', {});
/** Décisions tranchées : id → true. */
export const decDone = store('sh-decisions', {});
/** Documents encore à obtenir, cochés quand reçus : liste d'id (même clé que l'ancienne section). */
export const docDone = store('sigida-demandes', []);
/** Date du jour côté client (null pendant le rendu statique). */
export const today = $state({ d: null });

export function loadAll() {
	livStatus.load();
	decDone.load();
	docDone.load();
	today.d = new Date();
}

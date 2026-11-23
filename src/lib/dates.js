/** Petites fonctions de dates (UTC, au jour près). */
export const FERIES = ['2026-12-25', '2027-01-01'];
export const day = (s) => Math.floor(new Date(s + 'T00:00:00Z').getTime() / 864e5);
export const iso = (d) => d.toISOString().slice(0, 10);
export const fr = (s) => s.slice(8, 10) + '/' + s.slice(5, 7);
const MOIS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
export const frLong = (s) => `${+s.slice(8, 10)} ${MOIS[+s.slice(5, 7) - 1]}`;
/** Jours ouvrés de a (inclus) à b (inclus), hors week-ends et jours fériés. */
export function ouvres(a, b) {
	let n = 0;
	for (let t = day(a); t <= day(b); t++) {
		const d = new Date(t * 864e5);
		const w = d.getUTCDay();
		if (w !== 0 && w !== 6 && !FERIES.includes(iso(d))) n++;
	}
	return n;
}

<script>
	import { LIVRABLES, STATUTS } from '$lib/data/livrables.js';
	import { DECISIONS } from '$lib/data/decisions.js';
	import { RISQUES } from '$lib/data/risques.js';
	import { A_OBTENIR } from '$lib/data/documents.js';
	import { PHASES, CONGES } from '$lib/data/calendrier.js';
	import { livStatus, decDone, docDone, today } from '$lib/persist.svelte.js';
	import { day, iso, fr, frLong, ouvres } from '$lib/dates.js';

	const debut = PHASES[0].a, fin = PHASES.at(-1).b;
	const t = $derived(today.d ? iso(today.d) : null);
	const phase = $derived(t ? (PHASES.find((p) => t >= p.a && t <= p.b) ?? PHASES.find((p) => t < p.a)) : null);
	const ecoules = $derived(t ? Math.min(45, ouvres(debut, t < debut ? debut : t)) : 0);
	const statut = (id) => livStatus.value[id] ?? 'afaire';
	const prochains = $derived(t ? LIVRABLES.filter((l) => statut(l.id) !== 'valide' && statut(l.id) !== 'remis').sort((a, b) => (a.due < b.due ? -1 : 1)).slice(0, 4) : []);
	const ouvertes = $derived(DECISIONS.filter((d) => !decDone.value[d.id]));
	const urgentes = $derived(t ? ouvertes.filter((d) => day(d.ech) - day(t) <= 7).sort((a, b) => (a.ech < b.ech ? -1 : 1)) : []);
	const docsRestants = $derived(A_OBTENIR.filter((d) => !docDone.value.includes(d.id)).length);
	const majeurs = RISQUES.filter((r) => r.p * r.i >= 6);
	const enConge = $derived(t ? t >= CONGES.a && t <= CONGES.b : false);
	const jAvant = (s) => day(s) - day(t);
	const quand = (s) => {
		const n = jAvant(s);
		return n < 0 ? `en retard de ${-n} j` : n === 0 ? 'aujourd’hui' : n === 1 ? 'demain' : `dans ${n} j`;
	};
</script>

<section id="bord">
	<h2 class="sh">Tableau <span>de bord</span></h2>
	{#if !t}
		<p class="muted">Chargement…</p>
	{:else}
		<div class="kpis">
			<div class="kpi"><b>{ecoules}<small>/45</small></b><span>jours ouvrés écoulés</span></div>
			<div class="kpi ph"><b>{phase?.t ?? 'Terminé'}</b><span>phase en cours{phase ? ` · jusqu’au ${fr(phase.b)}` : ''}</span></div>
			<div class="kpi o"><b>{ouvertes.length}</b><span>décisions à arbitrer</span></div>
			<div class="kpi t"><b>{docsRestants}</b><span>documents encore à obtenir</span></div>
		</div>
		{#if enConge}<p class="alerte">Search est en congé jusqu’au 3 janvier : contact d’urgence uniquement.</p>{/if}
		<div class="bord2">
			<div>
				<h3 class="pif-h">Prochains livrables</h3>
				<ul class="nx">
					{#each prochains as l}
						<li class:late={jAvant(l.due) < 0}>
							<span class="nx-d">{frLong(l.due)}</span><span class="nx-t">{l.t}</span><span class="nx-w">{quand(l.due)} · {STATUTS[statut(l.id)].label}</span>
						</li>
					{/each}
				</ul>
				<a class="more" href="#livrables">Tous les livrables →</a>
				<h3 class="pif-h" style="margin-top:16px">Risques majeurs</h3>
				<ul class="nx">{#each majeurs as r}<li><span class="nx-t">{r.t}</span></li>{/each}</ul>
				<a class="more" href="#risques">Registre des risques →</a>
			</div>
			<div>
				<h3 class="pif-h">À trancher cette semaine</h3>
				{#if urgentes.length}
					<ul class="nx">
						{#each urgentes as d}<li class:late={jAvant(d.ech) < 0}><span class="nx-d">{frLong(d.ech)}</span><span class="nx-t">{d.t}</span><span class="nx-w">{quand(d.ech)}</span></li>{/each}
					</ul>
				{:else}<p class="muted">Rien d’urgent.</p>{/if}
				<a class="more" href="#decisions">Toutes les décisions →</a>

			</div>
		</div>
	{/if}
</section>

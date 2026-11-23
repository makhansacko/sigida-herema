<script>
	import { LIVRABLES, STATUTS } from '$lib/data/livrables.js';
	import { EQUIPE } from '$lib/data/equipe.js';
	import { livStatus } from '$lib/persist.svelte.js';
	import { frLong } from '$lib/dates.js';

	const nom = (id) => EQUIPE.find((m) => m.id === id)?.name ?? id;
	const statut = (id) => livStatus.value[id] ?? 'afaire';
	function avancer(id) {
		livStatus.value = { ...livStatus.value, [id]: STATUTS[statut(id)].next };
	}
</script>

<section id="livrables">
	<h2 class="sh">Les <span>livrables</span></h2>
	<p class="intro">Ce que les TDR et l’offre demandent, avec l’échéance du calendrier de 45 jours ouvrés (hors délais de revue). Cliquez sur le statut pour le faire avancer (gardé dans ce navigateur).</p>
	<ul class="liv">
		{#each LIVRABLES as l}
			<li class="st-{statut(l.id)}">
				<span class="liv-d">{frLong(l.due)}</span>
				<div>
					<b>{l.t}</b>
					<ul>{#each l.contenu as c}<li>{c}</li>{/each}</ul>
					<span class="muted liv-m">{l.src} · porté par {nom(l.owner)}</span>
				</div>
				<button class="liv-s" onclick={() => avancer(l.id)} title="Changer le statut">{STATUTS[statut(l.id)].label}</button>
			</li>
		{/each}
	</ul>
</section>

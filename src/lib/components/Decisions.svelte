<script>
	import { DECISIONS } from '$lib/data/decisions.js';
	import { decDone } from '$lib/persist.svelte.js';
	import { showIndicator } from '$lib/state.svelte.js';
	import { frLong } from '$lib/dates.js';

	const done = (id) => !!decDone.value[id];
	function toggle(id) {
		const v = { ...decDone.value };
		if (v[id]) delete v[id];
		else v[id] = true;
		decDone.value = v;
	}
	const ouvertes = $derived(DECISIONS.filter((d) => !done(d.id)).length);
</script>

<section id="decisions">
	<h2 class="sh">Les décisions <span>à arbitrer</span></h2>
	<p class="intro">Le registre de la note d’arbitrage : ce qu’il faut trancher avec Search, pourquoi, et ce que propose Sahel Analytics. Cochez quand c’est tranché.</p>
	<p class="muted dem-count">{ouvertes} sur {DECISIONS.length} encore ouvertes</p>
	<ul class="dec">
		{#each DECISIONS as d}
			<li class:done={done(d.id)}>
				<label><input type="checkbox" checked={done(d.id)} onchange={() => toggle(d.id)} /> <b>{d.t}</b></label>
				<p>{d.pourquoi}</p>
				<p class="dec-r"><span>Proposition</span> {d.reco}</p>
				<div class="q-tags">
					<span class="qt src">Avant le {frLong(d.ech)}</span>
					{#each d.ind as c}<button class="qt ind" onclick={() => showIndicator(c)}>Ind. {c}</button>{/each}
				</div>
			</li>
		{/each}
	</ul>
</section>

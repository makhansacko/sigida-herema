<script>
	import { RISQUES } from '$lib/data/risques.js';
	const N = { 1: 'faible', 2: 'moyen', 3: 'élevé' };
	const liste = [...RISQUES].sort((a, b) => b.p * b.i - a.p * a.i);
</script>

<section id="risques">
	<h2 class="sh">Les <span>risques</span></h2>
	<p class="intro">Classés par gravité (probabilité × impact), avec la parade prévue.</p>
	<ul class="risk">
		{#each liste as r}
			<li class="g{r.p * r.i >= 6 ? 3 : r.p * r.i >= 4 ? 2 : 1}">
				<b>{r.t}</b>
				<span class="risk-n">Probabilité {N[r.p]} · impact {N[r.i]}</span>
				<p>{r.parade}</p>
			</li>
		{/each}
	</ul>
</section>

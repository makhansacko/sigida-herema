<script>
	import { OUTILS, ZONES, LOCALITES, BASE } from '$lib/data/collecte.js';
	import { showIndicator } from '$lib/state.svelte.js';
</script>

<section id="collecte">
	<h2 class="sh">Le plan <span>de collecte</span></h2>
	<p class="intro">Qui interroger, combien, avec quel outil, dans le prolongement de l’étude de base, dont Search a transmis les outils.</p>
	<div class="raci-w">
		<table class="plan">
			<thead><tr><th>Outil</th><th>Qui</th>{#each ZONES as z}<th class="qty">{z}</th>{/each}<th class="qty">Total</th><th>Indicateurs</th></tr></thead>
			<tbody>
				{#each OUTILS as o}
					<tr>
						<td><b>{o.t}</b><span class="muted plan-s">{o.approche} · {o.niveau}</span></td>
						<td>{o.qui}<span class="muted plan-s">Outil : {o.base}</span></td>
						{#each ZONES as z, k}<td class="qty">{o.n ? o.n[k] : '·'}</td>{/each}
						<td class="qty"><b>{o.n ? o.n.reduce((a, b) => a + b, 0) : (o.total ?? 'à fixer')}</b></td>
						<td>{#each o.ind as c}<button class="qt ind" onclick={() => showIndicator(c)}>{c}</button>{/each}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<div class="pif2">
		<div>
			<h3 class="pif-h">Localités de l’étude de base</h3>
			<ul class="loc">{#each ZONES as z}<li><b>{z}</b> {LOCALITES[z]}</li>{/each}</ul>
		</div>
		<div>
			<h3 class="pif-h">Ce qu’a fait l’étude de base</h3>
			<ul class="loc">{#each BASE as b}<li>{b}</li>{/each}</ul>
		</div>
	</div>
</section>

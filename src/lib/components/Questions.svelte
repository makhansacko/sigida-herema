<script>
	import { CRITERES, SOURCES } from '$lib/data/questions.js';
	import { showIndicator } from '$lib/state.svelte.js';
</script>

<section id="questions">
	<h2 class="sh">Les questions <span>d’évaluation</span></h2>
	<p class="intro">
		Les questions des TDR par critère OCDE, et ce qui permet d’y répondre : un <b>indicateur</b> (cliquez pour l’ouvrir), des
		<b>entretiens</b>, des <b>groupes de discussion</b> ou des <b>documents</b>. Quand les TDR rattachent une question au PIF, la
		dimension est indiquée. Les questions finales seront arrêtées au cadrage avec Search et l’URTEL.
	</p>
	<div class="crit">
		{#each CRITERES as c}
			<div class="crit-col {c.id}">
				<h3>{c.name}</h3>
				<ol>
					{#each c.qs as q}
						<li>
							<p>{q.t}</p>
							<div class="q-tags">
								{#each q.ind as code}<button class="qt ind" onclick={() => showIndicator(code)}>Ind. {code}</button>{/each}
								{#each q.src as s}<span class="qt src">{SOURCES[s]}</span>{/each}
								{#each q.pif ?? [] as d}<span class="qt pif">PIF · {d}</span>{/each}
							</div>
						</li>
					{/each}
				</ol>
			</div>
		{/each}
	</div>
</section>

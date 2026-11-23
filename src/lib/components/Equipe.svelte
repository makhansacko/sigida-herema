<script>
	import { EQUIPE, TERRAIN, RACI } from '$lib/data/equipe.js';
	import { LIVRABLES } from '$lib/data/livrables.js';
	const R = { R: 'Réalise', A: 'Valide', C: 'Contribue' };
	const init = (n) => n.split(' ').map((w) => w[0]).slice(0, 2).join('');
	const nb = (id) => LIVRABLES.filter((l) => RACI[l.id]?.[id] === 'R').length;
</script>

<section id="equipe">
	<h2 class="sh">L’équipe <span>et les rôles</span></h2>
	<p class="intro">{EQUIPE.length} experts de Sahel Analytics, appuyés par des équipes de terrain dans chaque zone.</p>

	<div class="eq">
		{#each EQUIPE as m}
			<article class="eq-c">
				<header>
					<span class="eq-a" aria-hidden="true">{init(m.name)}</span>
					<div><span class="eq-r">{m.role}</span><b>{m.name}</b></div>
				</header>
				<p class="eq-p">{m.profil}</p>
				<p class="eq-h">Dans la mission{#if nb(m.id)} · porte {nb(m.id)} livrable{nb(m.id) > 1 ? 's' : ''}{/if}</p>
				<ul>{#each m.fait as f}<li>{f}</li>{/each}</ul>
			</article>
		{/each}
	</div>
	<p class="eq-t"><b>Sur le terrain :</b> {TERRAIN}</p>

	<h3 class="pif-h">Qui fait quoi, par livrable</h3>
	<div class="raci-w">
		<table class="raci">
			<thead><tr><th>Livrable</th>{#each EQUIPE as m}<th>{m.name.split(' ').at(-1)}</th>{/each}</tr></thead>
			<tbody>
				{#each LIVRABLES as l}
					<tr><td>{l.t}</td>{#each EQUIPE as m}{@const v = RACI[l.id]?.[m.id]}<td class="r-{v ?? 'x'}" title={v ? R[v] : ''}>{v ?? ''}</td>{/each}</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<p class="muted raci-k">R = réalise · A = valide côté Sahel Analytics · C = contribue. Search valide chaque livrable de son côté.</p>
</section>

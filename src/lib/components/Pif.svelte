<script>
	import { NOUVEAUTES, SIGNES, NIVEAUX, APPROCHES_PIF, MESURES, STATUT, RESTITUTION } from '$lib/data/pif.js';
	import { PIF_THEMES } from '$lib/data/systeme.js';
	import { showIndicator } from '$lib/state.svelte.js';
</script>

<section id="pif">
	<h2 class="sh">Le PIF <span>dans l’évaluation</span></h2>
	<p class="intro">
		Le Cadre d’impact sur la paix de Search, dans sa version d’août 2026 : <b>3 niveaux de population</b>, <b>4 signes vitaux</b>
		(ce que l’on mesure) et <b>3 approches</b> (comment on le mesure). Comme le demandent les TDR, il sert de grille de lecture et
		non de critère supplémentaire.
	</p>

	<div class="pif-new">
		<b>Ce qui change avec la version d’août 2026</b>
		<ul>{#each NOUVEAUTES as n}<li>{n}</li>{/each}</ul>
	</div>

	<h3 class="pif-h">Les 4 signes vitaux, dans Sigida Herema</h3>
	<ul class="pif-th">
		{#each SIGNES as s}
			{@const th = PIF_THEMES[s.key]}
			<li style="--pc:{th.color}">
				<b class="pif-name">{th.full}</b>
				<div>
					<p class="pif-ici">{s.ici}</p>
					<p class="muted pif-def">{s.def}</p>
					<div class="q-tags">
						{#each s.ind as code}<button class="qt ind" onclick={() => showIndicator(code)}>Ind. {code}</button>{/each}
					</div>
				</div>
			</li>
		{/each}
	</ul>

	<div class="pif2">
		<div>
			<h3 class="pif-h">Les 3 niveaux de population</h3>
			<ul class="pif-lv">
				{#each NIVEAUX as n, i}
					<li style="--w:{100 - i * 12}%">
						<b>{n.label}</b><span class="muted">{n.def}</span><span>{n.ici}</span><span class="pif-tool">{n.outils}</span>
					</li>
				{/each}
			</ul>
		</div>
		<div>
			<h3 class="pif-h">Les 3 approches, dans notre méthode</h3>
			<ul class="pif-pi">
				{#each APPROCHES_PIF as p}
					<li><b>{p.label}</b><span class="muted">{p.what}</span><span>{p.how}</span></li>
				{/each}
			</ul>
		</div>
	</div>

	<h3 class="pif-h">Les 7 mesures alignées et nos questionnaires</h3>
	<table class="pif-tab">
		<thead><tr><th>Signe vital</th><th>Indicateur du PIF</th><th>Dans notre évaluation</th></tr></thead>
		<tbody>
			{#each MESURES as m}
				<tr>
					<td><span class="qt pif-c" style="background:{PIF_THEMES[m.key].color}">{PIF_THEMES[m.key].label}</span></td>
					<td>{m.t}</td>
					<td class="st {m.statut}">
						{STATUT[m.statut]}
						{#each m.ind as code}<button class="qt ind" onclick={() => showIndicator(code)}>Ind. {code}</button>{/each}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
	<p class="muted pif-note">
		Les trois indicateurs absents des TDR tiennent en trois questions fermées dans l’enquête ménages, pour un coût quasi nul. À
		proposer à Search dans la note d’arbitrage : ils rendraient l’évaluation comparable aux autres programmes qui utilisent le PIF.
	</p>

	<h3 class="pif-h">Restituer chaque constat : quoi, où, pourquoi, coût</h3>
	<ul class="pif-rs">
		{#each RESTITUTION as r}<li><b>{r.label}</b><span>{r.ici}</span></li>{/each}
	</ul>
</section>

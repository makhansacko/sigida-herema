<script>
	import { D, CRIT, ORDER } from '$lib/data/pif.js';
	import Pill from './Pill.svelte';

	let sel = $state({ c: 'imp', d: 'polar' });

	/** 2 = rattachement explicite des TDR, 1 = lecture proposée, 0 = aucun lien */
	const level = (c, d) => {
		const q = c.qs.filter((x) => x.tags.includes(d));
		return q.some((x) => x.x) ? 2 : q.length ? 1 : 0;
	};
	const count = (c, d) => c.qs.filter((q) => q.tags.includes(d)).length;
	const crit = $derived(CRIT.find((x) => x.id === sel.c));
</script>

<section id="matrice">
	<h2 class="sh">Critères OCDE <span>× thèmes du PIF</span></h2>
	<p class="intro">
		Où chaque thème apparaît dans les questions d'évaluation. Les cases pleines sont les rattachements écrits dans les TDR ; les
		cases hachurées sont des lectures que Sahel Analytics peut proposer au cadrage. Cliquez sur une case.
	</p>
	<div class="keyrow">
		<span><i style="background:var(--blue)"></i>Rattachement explicite des TDR</span>
		<span><i style="background:repeating-linear-gradient(135deg,#b7c9e6 0 4px,#fff 4px 8px)"></i>Lecture proposée</span>
		<span><i style="background:#f3f7fc;border:1px solid var(--line)"></i>Aucun lien</span>
	</div>
	<div class="tbl">
		<table>
			<thead>
				<tr>
					<th></th>
					{#each ORDER as d}<th class="d-{d}">{D[d].name}<span class="bar"></span></th>{/each}
				</tr>
			</thead>
			<tbody>
				{#each CRIT as c}
					<tr>
						<th scope="row">{c.name}</th>
						{#each ORDER as d}
							{@const l = level(c, d)}
							{@const n = count(c, d)}
							<td>
								<button class="cell d-{d}" class:sel={sel.c === c.id && sel.d === d} data-l={l} aria-label="{c.name}, {D[d].name}" onclick={() => (sel = { c: c.id, d })}>
									{#if l}{n} question{n > 1 ? 's' : ''}<small>{l === 2 ? 'TDR' : 'proposé'}</small>{:else}–{/if}
								</button>
							</td>
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<div class="qbox">
		<p class="kick">{crit.name} · {D[sel.d].name}</p>
		{#each crit.qs as q}
			{@const hit = q.tags.includes(sel.d)}
			<div class="q d-{sel.d}" class:hit>
				<p style={hit ? '' : 'color:var(--muted)'}>{q.t}</p>
				<div class="chips">
					{#each q.tags as t}<Pill id={t} />{/each}
					<span class="muted">{q.tags.length ? (q.x ? 'rattachement TDR' : 'lecture proposée') : 'aucun thème du PIF'}</span>
				</div>
			</div>
		{/each}
	</div>
</section>

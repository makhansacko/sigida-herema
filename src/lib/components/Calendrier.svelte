<script>
	import { PHASES, CONGES, CONDITIONS } from '$lib/data/calendrier.js';
	import { LIVRABLES } from '$lib/data/livrables.js';
	import { today } from '$lib/persist.svelte.js';
	import { day, iso, fr } from '$lib/dates.js';

	const start = day(PHASES[0].a), end = day(PHASES.at(-1).b) + 1;
	const pct = (s) => ((day(s) - start) / (end - start)) * 100;
	const span = (a, b) => pct(b) - pct(a) + 100 / (end - start);
	const t = $derived(today.d ? iso(today.d) : null);
	const tPct = $derived(t && day(t) >= start && day(t) < end ? pct(t) + 50 / (end - start) : null);
	const jalons = [...new Map(LIVRABLES.map((l) => [l.due, LIVRABLES.filter((x) => x.due === l.due).map((x) => x.t)])).entries()];
</script>

<section id="calendrier">
	<h2 class="sh">Le calendrier <span>et les jalons</span></h2>
	<p class="intro"><b>45 jours ouvrés</b>, du 20 novembre 2026 au <b>26 janvier 2027</b>, hors délais de revue, comme retenu à la réunion de cadrage.</p>
	<ul class="gantt">
		{#each PHASES as p}
			<li>
				<span class="g-t">{p.t}</span>
				<span class="g-track">
					<span class="g-leave" style="left:{pct(CONGES.a)}%;width:{span(CONGES.a, CONGES.b)}%"></span>
					<span class="g-bar {p.k}" style="left:{pct(p.a)}%;width:{span(p.a, p.b)}%"></span>
					{#if tPct !== null}<span class="g-now" style="left:{tPct}%"></span>{/if}
				</span>
				<span class="g-d">{p.a === p.b ? fr(p.a) : `${fr(p.a)} – ${fr(p.b)}`}</span>
			</li>
		{/each}
	</ul>
	<p class="g-key"><i></i>{CONGES.t}{#if tPct !== null}<em class="g-now-k"></em>aujourd’hui{/if}</p>
	<div class="pif2">
		<div>
			<h3 class="pif-h">Jalons</h3>
			<ul class="jal">{#each jalons as [d, ts]}<li class:past={t && d < t}><span>{fr(d)}</span>{ts.join(' · ')}</li>{/each}</ul>
		</div>
		<div>
			<h3 class="pif-h">Points d’attention</h3>
			<ul class="g-cond">{#each CONDITIONS as c}<li>{c}</li>{/each}</ul>
		</div>
	</div>
</section>

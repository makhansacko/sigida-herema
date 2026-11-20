<script>
	import { PHASES, CONDITIONS } from '$lib/data/calendrier.js';
	const day = (s) => new Date(s + 'T00:00:00Z').getTime() / 864e5;
	const start = day(PHASES[0].a), end = day(PHASES.at(-1).b) + 1;
	const pct = (s) => ((day(s) - start) / (end - start)) * 100;
	const fr = (s) => s.slice(8, 10) + '/' + s.slice(5, 7);
</script>

<section id="calendrier">
	<h2 class="sh">Le calendrier <span>actualisé</span></h2>
	<p class="intro">Rapport final au plus tard le <b>31 décembre 2026</b>, en 29 jours ouvrés. La collecte se termine avant les fêtes.</p>
	<ul class="gantt">
		{#each PHASES as p}
			<li>
				<span class="g-t">{p.t}</span>
				<span class="g-track"><span class="g-bar {p.k}" style="left:{pct(p.a)}%;width:{pct(p.b) - pct(p.a) + (100 / (end - start))}%"></span></span>
				<span class="g-d">{p.a === p.b ? fr(p.a) : `${fr(p.a)} – ${fr(p.b)}`}</span>
			</li>
		{/each}
	</ul>
	<h3 class="pif-h">Ce calendrier tient si…</h3>
	<ul class="g-cond">
		{#each CONDITIONS as c}<li>{c}</li>{/each}
	</ul>
</section>

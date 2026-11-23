<script>
	import { PHASES, CONGES, CONDITIONS } from '$lib/data/calendrier.js';
	const day = (s) => new Date(s + 'T00:00:00Z').getTime() / 864e5;
	const start = day(PHASES[0].a), end = day(PHASES.at(-1).b) + 1;
	const pct = (s) => ((day(s) - start) / (end - start)) * 100;
	const span = (a, b) => pct(b) - pct(a) + 100 / (end - start);
	const fr = (s) => s.slice(8, 10) + '/' + s.slice(5, 7);
</script>

<section id="calendrier">
	<h2 class="sh">Le calendrier <span>actualisé</span></h2>
	<p class="intro"><b>45 jours ouvrés</b>, du 20 novembre 2026 au <b>26 janvier 2027</b>, hors délais de revue, comme retenu à la réunion de cadrage.</p>
	<ul class="gantt">
		{#each PHASES as p}
			<li>
				<span class="g-t">{p.t}</span>
				<span class="g-track">
					<span class="g-leave" style="left:{pct(CONGES.a)}%;width:{span(CONGES.a, CONGES.b)}%"></span>
					<span class="g-bar {p.k}" style="left:{pct(p.a)}%;width:{span(p.a, p.b)}%"></span>
				</span>
				<span class="g-d">{p.a === p.b ? fr(p.a) : `${fr(p.a)} – ${fr(p.b)}`}</span>
			</li>
		{/each}
	</ul>
	<p class="g-key"><i></i>{CONGES.t}</p>
	<h3 class="pif-h">Points d’attention</h3>
	<ul class="g-cond">
		{#each CONDITIONS as c}<li>{c}</li>{/each}
	</ul>
</section>

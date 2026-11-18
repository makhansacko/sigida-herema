<script>
	import { DEMANDES } from '$lib/data/demandes.js';
	import { showIndicator } from '$lib/state.svelte.js';

	// Cases cochées, gardées dans ce navigateur seulement
	const KEY = 'sigida-demandes';
	let done = $state([]);
	$effect(() => {
		try {
			done = JSON.parse(localStorage.getItem(KEY) || '[]');
		} catch {
			done = [];
		}
	});
	function toggle(id) {
		done = done.includes(id) ? done.filter((x) => x !== id) : [...done, id];
		try {
			localStorage.setItem(KEY, JSON.stringify(done));
		} catch {}
	}
</script>

<section id="demandes">
	<h2 class="sh">À demander <span>à Search</span></h2>
	<p class="intro">Les documents et données à obtenir avant ou au cadrage, et ce à quoi chacun sert. Cochez au fur et à mesure (gardé dans ce navigateur).</p>
	<p class="muted dem-count">{done.length} sur {DEMANDES.length} reçus</p>
	<ul class="dem">
		{#each DEMANDES as d}
			<li class:done={done.includes(d.id)}>
				<label for="dem-{d.id}">
					<input id="dem-{d.id}" type="checkbox" checked={done.includes(d.id)} onchange={() => toggle(d.id)} />
					<span>
						<b>{d.t}</b>
						<span class="why">{d.why}</span>
					</span>
				</label>
				{#if d.ind.length}
					<div class="q-tags">{#each d.ind as code}<button class="qt ind" onclick={() => showIndicator(code)}>Ind. {code}</button>{/each}</div>
				{/if}
			</li>
		{/each}
	</ul>
</section>

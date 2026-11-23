<script>
	import { RECUS, CONSTATS, A_OBTENIR } from '$lib/data/documents.js';
	import { docDone } from '$lib/persist.svelte.js';

	function toggle(id) {
		const v = docDone.value;
		docDone.value = v.includes(id) ? v.filter((x) => x !== id) : [...v, id];
	}
	const restants = $derived(A_OBTENIR.filter((d) => !docDone.value.includes(d.id)).length);
</script>

<section id="documents">
	<h2 class="sh">Les documents <span>de Search</span></h2>
	<h3 class="pif-h">Ce que les documents reçus le 23 novembre changent</h3>
	<ul class="cst">{#each CONSTATS as c}<li><b>{c.t}</b><span>{c.d}</span></li>{/each}</ul>

	<div class="pif2">
		<div>
			<h3 class="pif-h">Encore à obtenir <small class="muted">· {restants} sur {A_OBTENIR.length}</small></h3>
			<ul class="dem">
				{#each A_OBTENIR as d}
					<li class:done={docDone.value.includes(d.id)}>
						<label for="doc-{d.id}"><input id="doc-{d.id}" type="checkbox" checked={docDone.value.includes(d.id)} onchange={() => toggle(d.id)} /> <b>{d.t}</b></label>
						<p class="muted">{d.pourquoi}</p>
					</li>
				{/each}
			</ul>
		</div>
		<div>
			<h3 class="pif-h">Reçus le 23 novembre</h3>
			<ul class="rcv">{#each RECUS as r}<li><b>{r.t}</b><span class="muted">{r.tire}</span></li>{/each}</ul>
		</div>
	</div>
</section>

<script>
	import { D, IND, ORDER } from '$lib/data/pif.js';
	import Pill from './Pill.svelte';

	let filt = $state('all');
	const list = $derived(IND.filter((i) => filt === 'all' || (filt === 'match' ? !!i.match : i.dims.includes(filt))));
</script>

<section id="indicateurs">
	<h2 class="sh">Thèmes <span>et Indicateurs</span></h2>
	<p class="intro">
		Les indicateurs du cadre logique, du safeguarding et du cadre MEAL global de Search, rattachés au thème du PIF qu'ils
		éclairent le mieux. Ce rattachement est une proposition d'analyse. Le badge orange signale un indicateur identique ou presque
		à l'une des dix mesures alignées du PIF.
	</p>
	<div class="chips" style="margin-top:14px">
		<button class="chip" aria-pressed={filt === 'all'} onclick={() => (filt = 'all')}>Tous ({IND.length})</button>
		{#each ORDER as d}
			<button class="chip" aria-pressed={filt === d} onclick={() => (filt = d)}>{D[d].name} ({IND.filter((i) => i.dims.includes(d)).length})</button>
		{/each}
		<button class="chip" aria-pressed={filt === 'match'} onclick={() => (filt = 'match')}>Alignés PIF</button>
	</div>

	<div style="margin-top:6px">
		{#each list as i}
			<div class="irow">
				<div>
					<div class="code">{i.code}</div>
					<div class="t">{i.t}</div>
					<div class="chips" style="margin-top:6px">
						{#each i.dims as d}<Pill id={d} />{/each}
						{#if i.match}<span class="match">{i.match}</span>{/if}
					</div>
					{#if i.note}<div class="note">{i.note}</div>{/if}
				</div>
				{#if i.c != null}
					<div class="d-{i.dims[0]}">
						<div class="gauge">
							<div class="tr"></div>
							{#if i.b != null}
								<div class="gp" style="left:{i.b}%;width:{i.c - i.b}%"></div>
								<div class="dt b" style="left:{i.b}%"></div>
							{/if}
							<div class="dt c" style="left:{i.c}%"></div>
						</div>
						<div class="gl"><span>0 %</span><span>50 %</span><span>100 %</span></div>
						<div class="gv">
							Base <b>{i.b != null ? i.b + ' %' : 'NA'}</b> · Cible <b>{i.c} %</b>
							{#if i.b != null}· écart <b>+{i.c - i.b} pts</b>{/if} · Finale <b>à mesurer</b>
						</div>
					</div>
				{:else}
					<div class="gv">Base <b>NA</b> · pas de cible chiffrée · valeur finale <b>à mesurer</b></div>
				{/if}
			</div>
		{/each}
	</div>

	<div class="force" style="margin-top:18px">
		<p class="kick">Note sur la désagrégation</p>
		<p>
			Le PIF recommande au minimum une désagrégation par <b>âge, sexe, groupes démographiques de part et d'autre des lignes de
			division</b>, et par types de violence, d'investissement ou de services. Les TDR demandent région, commune, sexe et tranche
			d'âge. L'indicateur MEAL de polarisation compare des groupes : ces groupes doivent être définis dès le rapport de démarrage.
		</p>
	</div>
</section>

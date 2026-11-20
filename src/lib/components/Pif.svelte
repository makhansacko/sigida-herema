<script>
	import { THEMES, PILIERS } from '$lib/data/pif.js';
	import { PIF_THEMES } from '$lib/data/systeme.js';
	import { showIndicator } from '$lib/state.svelte.js';
</script>

<section id="pif">
	<h2 class="sh">Le PIF <span>dans l’évaluation</span></h2>
	<p class="intro">
		Le cadre d’impact pour la paix de Search a deux dimensions : <b>5 thèmes</b> disent ce que l’on mesure, <b>3 piliers</b> disent
		comment. Comme le demandent les TDR, il sert de grille de lecture et non de critère supplémentaire, surtout pour l’impact et la
		durabilité. Les résultats sont désagrégés par sexe, âge et groupe.
	</p>
	<div class="pif2">
		<div>
			<h3 class="pif-h">Les thèmes, dans Sigida Herema</h3>
			<ul class="pif-th">
				{#each THEMES as t}
					<li style="--pc:{PIF_THEMES[t.key].color}">
						<b class="pif-name">{t.label}</b>
						<div>
							<p class="pif-ici">{t.ici}</p>
							<p class="muted pif-def">{t.def}</p>
							<div class="q-tags">
								{#each t.ind as code}<button class="qt ind" onclick={() => showIndicator(code)}>Ind. {code}</button>{/each}
							</div>
						</div>
					</li>
				{/each}
			</ul>
		</div>
		<div>
			<h3 class="pif-h">Les piliers, dans notre méthode</h3>
			<ul class="pif-pi">
				{#each PILIERS as p}
					<li><b>{p.label}</b><span class="muted">{p.what}</span><span>{p.how}</span></li>
				{/each}
			</ul>
		</div>
	</div>
</section>

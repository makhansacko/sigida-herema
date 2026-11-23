<script>
	import '../app.css';
	import { page } from '$app/state';
	import { NAV } from '$lib/nav.js';
	import { loadAll } from '$lib/persist.svelte.js';

	let { children } = $props();
	let open = $state(false);

	$effect(() => {
		loadAll();
	});

	const current = $derived(NAV.flatMap((g) => g.items).find((i) => i.href === page.url.pathname) ?? NAV[0].items[0]);
	const isActive = (href) => page.url.pathname === href;
</script>

<svelte:head><title>{current.title} · Évaluation finale Sigida Herema</title></svelte:head>

<div class="shell">
	<header class="topbar">
		<button class="burger" aria-expanded={open} aria-controls="sidebar" onclick={() => (open = !open)}>
			<span></span><span></span><span></span><b class="sr">Menu</b>
		</button>
		<span class="topbar-t">{current.label}</span>
	</header>

	<aside id="sidebar" class="sidebar" class:open>
		<a class="brand" href="/" onclick={() => (open = false)}>
			<span class="brand-k">Évaluation finale</span>
			<span class="brand-t">Sigida Herema</span>
			<span class="brand-s">Sahel Analytics · Search for Common Ground</span>
		</a>
		<nav aria-label="Sections">
			{#each NAV as g}
				<p class="sb-g">{g.group}</p>
				<ul>
					{#each g.items as it}
						<li><a href={it.href} class:active={isActive(it.href)} aria-current={isActive(it.href) ? 'page' : undefined} onclick={() => (open = false)}>{it.label}</a></li>
					{/each}
				</ul>
			{/each}
		</nav>
		<p class="sb-src">
			Sources : TDR SFCG ML 03-172026, offre technique, réunion de cadrage du 20/11/2026, documents de Search reçus le 23/11/2026. Le
			modèle logique est une reconstruction de Sahel Analytics.
		</p>
	</aside>
	{#if open}<button class="scrim" aria-label="Fermer le menu" onclick={() => (open = false)}></button>{/if}

	<main class="content">
		<div class="wrap">{@render children()}</div>
	</main>
</div>

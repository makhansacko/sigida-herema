<svelte:options namespace="svg" />

<script>
	/** Rend une liste de descripteurs { tag, attrs, text? } produits par lib/iso. */
	let { shapes = [] } = $props();
</script>

{#each shapes as s}
	{#if s.text !== undefined}
		<svelte:element this={s.tag} xmlns="http://www.w3.org/2000/svg" {...s.attrs}>{s.text}</svelte:element>
	{:else}
		<svelte:element this={s.tag} xmlns="http://www.w3.org/2000/svg" {...s.attrs} />
	{/if}
{/each}

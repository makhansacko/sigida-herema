<svelte:options namespace="svg" />

<script>
	/** Pictos au trait des cinq thèmes, dessinés autour de (0, 0). */
	let { id } = $props();
</script>

{#if id === 'agency'}
	<!-- clé -->
	<circle cx="0" cy="14" r="7" />
	<circle cx="0" cy="14" r="3" />
	<line x1="0" y1="7" x2="0" y2="-18" />
	<path d="M0,-12 h6 M0,-6 h5 M0,-17 h4" />
{:else if id === 'polar'}
	<!-- flèches opposées -->
	<path d="M-30,0 L-14,-12 L-14,12 Z M30,0 L14,-12 L14,12 Z M-6,-12 L6,0 L-6,12 M6,-12 L-6,0 L6,12 M-22,0 h44" />
{:else if id === 'legit'}
	<!-- trois personnes portant un visage -->
	{#each [-12, 0, 12] as x}
		<circle cx={x} cy="-2" r="3.4" />
		<path d="M{x - 4},14 L{x - 3},4 Q{x},1 {x + 3},4 L{x + 4},14" />
	{/each}
	<path d="M-16,-8 Q0,-14 16,-8" />
	<circle cx="0" cy="-19" r="6" />
	<path d="M-3,-18 Q0,-15 3,-18" />
{:else if id === 'invest'}
	<!-- sablier -->
	<path d="M-10,-18 h20 M-10,18 h20 M-8,-18 Q-8,-4 0,0 Q8,-4 8,-18 M-8,18 Q-8,4 0,0 Q8,4 8,18" />
	{#each [[0, -10], [-3, -7], [3, -13], [0, 10], [-3, 13], [3, 12]] as [x, y]}
		<circle cx={x} cy={y} r="1.4" fill="#30ad96" />
	{/each}
{:else if id === 'violence'}
	<!-- gribouillis -->
	<path d="M-18,4 C-24,-14 -2,-22 8,-12 C18,-2 -6,6 -10,-6 C-14,-18 22,-16 18,2 C14,18 -14,16 -8,0 C-4,-10 14,-6 10,8 C6,18 -20,12 -18,4 Z M-4,-16 L14,10 M-16,-8 L12,-2" />
{/if}

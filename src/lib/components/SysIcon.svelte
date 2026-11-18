<svelte:options namespace="svg" />

<script>
	/** Pictos au trait des interventions, dessinés autour de (0, 0), environ 34 × 34. */
	let { id } = $props();
</script>

<g class="sys-ico">
	{#if id === 'capa'}
		<!-- tableau de formation -->
		<rect x="-15" y="-13" width="30" height="20" rx="2" />
		<path d="M-10,2 L-4,-4 L1,0 L9,-8" />
		<path d="M-6,7 L-10,16 M6,7 L10,16 M0,7 V12" />
	{:else if id === 'plaid'}
		<!-- porte-voix -->
		<path d="M-10,-5 L6,-13 L6,13 L-10,5 Z" />
		<rect x="-16" y="-5" width="6" height="10" rx="1.5" />
		<path d="M-12,5 L-9,14 L-5,14 L-7,5" />
		<path d="M10,-6 Q15,0 10,6 M13,-10 Q21,0 13,10" />
	{:else if id === 'forum'}
		<!-- table de dialogue -->
		<ellipse cx="0" cy="6" rx="15" ry="5" />
		<path d="M-11,10 V16 M11,10 V16" />
		<circle cx="-11" cy="-10" r="3.5" />
		<circle cx="11" cy="-10" r="3.5" />
		<path d="M-16,1 Q-11,-6 -6,1 M6,1 Q11,-6 16,1" />
	{:else if id === 'camp'}
		<!-- radio -->
		<rect x="-15" y="-6" width="30" height="20" rx="3" />
		<circle cx="-6" cy="4" r="5.5" />
		<path d="M4,0 h7 M4,4 h7 M4,8 h7 M7,-6 L14,-16" />
	{:else if id === 'info'}
		<!-- bouclier vérifié -->
		<path d="M0,-15 L12,-10 V0 C12,8 6,12 0,15 C-6,12 -12,8 -12,0 V-10 Z" />
		<path d="M-5,0 L-1,5 L6,-5" />
	{:else if id === 'dial'}
		<!-- bulles de dialogue -->
		<path d="M-16,-14 h18 a3,3 0 0 1 3,3 v8 a3,3 0 0 1 -3,3 h-11 l-5,5 v-5 h-2 a3,3 0 0 1 -3,-3 v-8 a3,3 0 0 1 3,-3 z" />
		<path d="M-1,-2 h15 a3,3 0 0 1 3,3 v8 a3,3 0 0 1 -3,3 h-1 v5 l-5,-5 h-9 a3,3 0 0 1 -3,-3 v-8 a3,3 0 0 1 3,-3 z" />
	{/if}
</g>

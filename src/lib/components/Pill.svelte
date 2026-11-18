<script>
	import { D } from '$lib/data/pif.js';
	let { id } = $props();
</script>

<span class="pill d-{id}">{D[id].name}</span>

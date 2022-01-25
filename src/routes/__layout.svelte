<script context="module">
	export const load = async ({ fetch }) => {
		const res = await Promise.all([
			fetch('/api/ref/documents.json'),
			fetch('/api/ref/acteurs.json')
		]);
		return {
			props: {
				documents: await res[0].json(),
				acteurs: await res[1].json()
			}
		};
	};
</script>

<script>
	import { ref } from '$lib/stores/ref';
	import Nav from '$lib/components/Nav.svelte';

	export let documents;
	export let acteurs;

	$: $ref = {
		documents,
		acteurs
	};
</script>

<Nav />
<main>
	<slot />
</main>

<style>
	:global(html) {
		--nav-height: 60px;
		--color-main: rgb(255, 62, 0);
	}
	main {
		height: calc(100vh - var(--nav-height));
		box-sizing: border-box;

		overflow-y: auto;

		padding: 1em;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>

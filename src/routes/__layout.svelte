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
		--bg-color: white;
	}
	:global(body) {
		margin: 0;
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

	:global(select) {
		max-width: calc(100vw - 100px);

		outline: none;
		margin: 0;
		border: 1px solid #e3e3e3;
		background-color: #eeeeee;
		height: 24px;
		border-radius: 5px;
		padding: 0 0 0 10px;
		transition: all 0.2s;
		flex-shrink: 0;
	}

	/* scroll stuff */
	:global(*) {
		--dark: #ccc;
		--light: var(--bg-color);
		scrollbar-width: thin;
		scrollbar-color: var(--dark) var(--light);
		scroll-behavior: smooth;
	}
	:global(*::-webkit-scrollbar-track) {
		background: var(--light);
	}
	:global(*::-webkit-scrollbar-thumb) {
		background-color: var(--dark);
	}
	:global(*::-webkit-scrollbar) {
		width: 7px;
	}
</style>

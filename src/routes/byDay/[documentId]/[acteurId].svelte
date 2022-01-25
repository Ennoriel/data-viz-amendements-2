<script context="module" lang="ts">
	export const load = async ({ params, fetch }) => {
		const res = await fetch(`/api/graph/heatmap/${params.documentId}/${params.acteurId}.json`);

		if (res.ok) {
			const data = await res.json();

			return {
				props: {
					data,
					documentId: params.documentId,
					acteurId: params.acteurId
				}
			};
		} else {
			return {
				props: {
					data: {}
				}
			};
		}
	};
</script>

<script lang="ts">
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';
	import Select from '$lib/components/Select.svelte';
	import Heatmap from '$lib/components/Heatmap.svelte';
	import { activeRoute } from '$lib/stores/activeRoute';
	import { routes } from '$lib/routes';

	export let documentId: string;
	export let acteurId: string;
	export let data;

	$activeRoute = routes.find((route) => route.href === '/byDay/all/all');

	$: if (browser) goto(`/byDay/${documentId || 'all'}/${acteurId || 'all'}`);
</script>

<Select bind:documentId bind:acteurId />

<Heatmap {data} {documentId} {acteurId} />

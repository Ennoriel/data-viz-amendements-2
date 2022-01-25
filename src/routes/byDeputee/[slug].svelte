<script context="module" lang="ts">
	export const load = async ({ params, fetch }) => {
		const res = await fetch(`/api/graph/stackedbar/deputee/${params.slug}.json`);

		if (res.ok) {
			const data = await res.json();

			return {
				props: {
					data,
					documentId: params.slug
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
	import Select from '$lib/components/Select.svelte';
	import HistogramStacked from '$lib/components/HistogramStacked.svelte';
	import { goto } from '$app/navigation';
	import { browser } from '$app/env';

	export let documentId: string;
	export let data;

	$: if (browser) goto(`/byDeputee/${documentId || 'all'}`);
</script>

<Select bind:documentId isActeur={false} />

<HistogramStacked {data} getXVal={(v) => v.auteur} />

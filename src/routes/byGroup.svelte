<script>
	import Select from '$lib/components/Select.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import HistogramStacked from '$lib/components/HistogramStacked.svelte';
	import { send } from '$lib/utils/query';
	import { activeRoute } from '$lib/stores/activeRoute';
	import { routes } from '$lib/routes';
	import { browser } from '$app/env';

	export let ref;

	let working = false;
	let documentId;
	let data;

	$activeRoute = routes.find((route) => route.href === '/byGroup');

	$: {
		if (browser) {
			working = true;
			send(fetch, '/api/graph/stackedbar/group.json', { documentId }).then((res) => {
				data = res;
				working = false;
			});
		}
	}
</script>

<Select {ref} bind:documentId isActeur={false} />
{#if working}
	<Spinner />
{:else}
	<HistogramStacked {data} getXVal={(v) => v.groupe} />
{/if}

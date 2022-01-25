<script context="module" lang="ts">
    export const load = async ({params, fetch }) => {
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
            }
        }
    };

</script>

<script>
    import Select from '$lib/components/Select.svelte'
    import Spinner from '$lib/components/Spinner.svelte'
    import HistogramStacked from '$lib/components/HistogramStacked.svelte';
    import {goto} from "$app/navigation";
    import {browser} from "$app/env";

    export let ref

    let working = false
    export let documentId
    export let data

    $: if(documentId && browser) goto(`/byDeputee/${documentId}`)
</script>

<Select {ref} bind:documentId isActeur={false} />
{#if working}
    <Spinner/>
{:else}
    <HistogramStacked {data} getXVal={v => v.auteur}/>
{/if}
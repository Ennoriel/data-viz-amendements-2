<script>
	import { ref } from '$lib/stores/ref';
	export let isDocument = true;
	export let isActeur = true;

	export let documentId;
	export let acteurId;
</script>

{#if isDocument}
	<h3>Filtrer par projet de loi</h3>
	<select bind:value={documentId}>
		<option value={undefined} />
		{#if $ref.documents}
			{#each $ref.documents as refDocument}
				<option value={refDocument.uid}
					>{`${refDocument.count} - ${refDocument.titre.substring(0, 120)}${
						refDocument.titre.length > 120 ? '...' : ''
					}`}</option
				>
			{/each}
		{/if}
	</select>
{/if}

{#if isActeur}
	<h3>Filtrer par député</h3>
	<select bind:value={acteurId}>
		<option value={undefined} />
		{#if $ref.acteurs}
			{#each $ref.acteurs as refActeurs}
				<option value={refActeurs.uid}
					>{`${refActeurs.prenom} ${refActeurs.nom} (${refActeurs.groupe})`}</option
				>
			{/each}
		{/if}
	</select>
{/if}

<div></div>

<style>
	div {
		height: 32px;
		flex-shrink: 0;
	}
</style>
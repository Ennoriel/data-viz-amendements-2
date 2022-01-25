import { writable } from 'svelte/store';
import type { Actor, Document } from '$lib/types/types';

export const ref = writable<{ documents: Array<Document>; acteurs: Array<Actor> }>({
	documents: [],
	acteurs: []
});

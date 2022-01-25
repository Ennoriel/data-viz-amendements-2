import { writable } from 'svelte/store';
import type { Route } from '$lib/types/types';

export const activeRoute = writable<Route>({
	menu: 'Accueil',
	title: 'Accueil',
	href: '/'
});

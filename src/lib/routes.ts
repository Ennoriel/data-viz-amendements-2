import type { Route } from '$lib/types/types';

export const routes: Array<Route> = [
	{
		menu: 'Accueil',
		title: 'Accueil',
		href: '/'
	},
	{
		menu: 'par Jour',
		title: "Nombre d'amendements par jour",
		href: '/byDay/all/all'
	},
	{
		menu: 'par député',
		title: "Nombre d'amendements par député",
		href: '/byDeputee/all'
	},
	{
		menu: 'par député 2',
		title: "Nombre d'amendements par député",
		href: '/byDeputee2'
	},
	{
		menu: 'par groupe',
		title: "Nombre d'amendements par groupe",
		href: '/byGroup'
	},
	{
		menu: 'dans le temps',
		title: "Nombre d'amendements dans le temps",
		href: '/byTime'
	}
];

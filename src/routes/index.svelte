<script lang="ts">
	import { activeRoute } from '$lib/stores/activeRoute';
	import { routes } from '$lib/routes';

	$activeRoute = routes.find((route) => route.href === '/');
</script>

<h2>Graphiques relatifs aux amendements déposés sous la XVème législature</h2>
<p>
	Les données sont issues des
	<a href="https://data.assemblee-nationale.fr" target="_blank">
		Open data de l'Assemblée Nationale
	</a>
	. Le code source est disponible sur ce
	<a href={import.meta.env.VITE_GITHUB_REPO} target="_blank">repository Github</a>.
</p>
<p>
	La base de données est composée de 250 000 amendements et 6500 projets/propositions de loi au 18
	mars 2021.
</p>
<p>
	La récupération des données n'a pas encore été optimisé sur tous les graphiques. Le chargement
	peut prendre plusieurs secondes.
</p>
<p>
	Auteur : <a href="https://github.com/Ennoriel" target="_blank">Maxime Dupont</a>
</p>

import mongoClient from '$lib/utils/db';
import type { SankeyReturn } from '$lib/types/types';
import type { RequestHandler } from '@sveltejs/kit';

type Match = {
	texteLegislatifRef?: { $in: Array<string> };
	auteur?: { $in: Array<string> };
};

export const post: RequestHandler = async ({ request }): Promise<{ body: Array<SankeyReturn> }> => {
	const body = await request.json();

	const query = [];
	const match: Match = {};

	if (body && body.documentIds) match.texteLegislatifRef = { $in: body.documentIds };
	if (body && body.acteurIds) match.auteur = { $in: body.acteurIds };

	query.push(
		...[
			{
				$match: match
			},
			{
				$lookup: {
					from: 'acteurs',
					localField: 'auteur',
					foreignField: 'uid',
					as: 'auteurObj'
				}
			},
			{
				$unwind: {
					path: '$auteurObj'
				}
			},
			{
				$facet: {
					t: [
						{
							$group: {
								_id: {
									texteLegislatifRef: '$texteLegislatifRef',
									auteur: { $concat: ['$auteurObj.nom', ' ', '$auteurObj.prenom'] }
								},
								count: { $sum: 1 }
							}
						}
					],
					u: [
						{
							$group: {
								_id: {
									texteLegislatifRef: '$texteLegislatifRef',
									statut: '$statut'
								},
								count: { $sum: 1 }
							}
						}
					]
				}
			}
		]
	);

	const res = await (await mongoClient).db()?.collection('amendements').aggregate(query).toArray();

	if (res.length) {
		return {
			body: [
				...res[0].t.map((val) => ({
					source: val._id.auteur,
					target: val._id.texteLegislatifRef,
					value: val.count
				})),
				...res[0].u.map((val) => ({
					source: val._id.texteLegislatifRef,
					target: val._id.statut,
					value: val.count
				}))
			]
		};
	} else {
		return {
			body: []
		};
	}
};

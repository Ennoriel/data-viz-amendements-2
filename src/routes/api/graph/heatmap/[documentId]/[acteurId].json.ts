import type { RequestHandler } from '@sveltejs/kit';
import mongoClient from '$lib/utils/db';
import type { HeatmapReturn } from '$lib/types/types';

type Match = {
	texteLegislatifRef?: string;
	auteur?: string;
};

export const get: RequestHandler = async ({ params }): Promise<{ body: Array<HeatmapReturn> }> => {
	const query = [];
	const match: Match = {};

	if (params.documentId !== 'all') match.texteLegislatifRef = params.documentId;
	if (params.acteurId !== 'all') match.auteur = params.acteurId;

	query.push(
		...[
			{
				$match: match
			},
			{
				$group: {
					_id: {
						day: '$depot.day',
						month: '$depot.month',
						year: '$depot.year'
					},
					count: {
						$sum: 1
					}
				}
			},
			{
				$group: {
					_id: '$_id.year',
					data: {
						$push: {
							month: '$_id.month',
							day: '$_id.day',
							count: '$count'
						}
					}
				}
			}
		]
	);

	return {
		body: (await (await mongoClient)
			.db()
			?.collection('amendements')
			.aggregate(query)
			.toArray()) as Array<HeatmapReturn>
	};
};

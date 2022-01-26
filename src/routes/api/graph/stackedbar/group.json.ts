import mongoClient from '$lib/utils/db';
import type { RequestHandler } from '@sveltejs/kit';
import type { HistogramStackedReturn } from '$lib/types/types';

type Match = {
	texteLegislatifRef?: string;
};

export const post: RequestHandler = async ({
	request
}): Promise<{ body: Array<HistogramStackedReturn> }> => {
	const body = await request.json();

	const match: Match = {};

	if (body && body.documentId) match.texteLegislatifRef = body.documentId;

	const query = [
		{
			$match: match
		},
		{
			$group: {
				_id: {
					statut: '$statut',
					groupe: '$groupe'
				},
				count: {
					$sum: '$count'
				}
			}
		},
		{
			$group: {
				_id: '$_id.groupe',
				agg: {
					$push: {
						k: '$_id.statut',
						v: '$count'
					}
				},
				count: {
					$sum: '$count'
				}
			}
		},
		{
			$project: {
				_id: 0,
				groupe: '$_id',
				res: {
					$arrayToObject: '$agg'
				},
				count: 1
			}
		},
		{
			$sort: {
				count: -1
			}
		}
	];

	return {
		body: await (
			await mongoClient
		)
			.db()
			?.collection('amend-group-statut')
			.aggregate(query)
			.toArray()
			.then((res) => res.map(({ groupe, res, count }) => ({ groupe, ...res })))
	};
};

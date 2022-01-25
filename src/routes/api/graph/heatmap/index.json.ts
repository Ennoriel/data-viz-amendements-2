import type { RequestHandler } from '@sveltejs/kit';
import mongoClient from '$lib/utils/db';

export const post: RequestHandler = async ({ request }) => {
	const query = [];
	const match = {} as any;
	const { body } = request as any;

	if (body && body.documentId) match.texteLegislatifRef = body.documentId;
	if (body && body.acteurId) match.auteur = body.acteurId;

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
		body: await (await mongoClient).db()?.collection('amendements').aggregate(query).toArray()
	};
};

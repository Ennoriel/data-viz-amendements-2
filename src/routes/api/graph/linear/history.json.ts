import mongoClient from '$lib/utils/db';
import type { RequestHandler } from '@sveltejs/kit';
import type { LinearHistory } from '$lib/types/types';

export const post: RequestHandler = async ({ request }): Promise<{ body: LinearHistory }> => {
	const body = await request.json();
	return {
		body: (await (await mongoClient)
			.db()
			?.collection('amend-statut-group-date')
			.findOne({ _id: body.statut })) as unknown as LinearHistory
	};
};

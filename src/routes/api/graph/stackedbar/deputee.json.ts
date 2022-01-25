import type {RequestHandler} from "@sveltejs/kit";
import mongoClient from '$lib/utils/db';

export const get: RequestHandler = async ({request}: any) => {
    // const body = await request.json();
    // console.log(body)
    const query = []

    // if (body && body.documentId) {
    //     query.push({
    //         $match: {
    //             texteLegislatifRef: body.documentId
    //         }
    //     })
    // }

    query.push(
        ...[
            {
                $match: {
                    isDepute: true
                }
            },
            {
                '$group': {
                    '_id': {
                        'statut': '$statut',
                        'auteur': '$auteur'
                    },
                    'count': {
                        '$sum': 1
                    }
                }
            }, {
                '$project': {
                    '_id': 0,
                    'statut': '$_id.statut',
                    'auteur': '$_id.auteur',
                    'count': 1
                }
            }, {
                '$group': {
                    '_id': '$auteur',
                    'statuts': {
                        '$push': {
                            'k': '$statut',
                            'v': '$count'
                        }
                    },
                    count: {
                        $sum: "$count"
                    }
                }
            }, {
                '$project': {
                    '_id': 0,
                    'auteur': '$_id',
                    count: 1,
                    'statuts': {
                        '$arrayToObject': '$statuts'
                    }
                }
            },
            {
                $lookup: {
                    from: 'acteurs',
                    localField: 'auteur',
                    foreignField: 'uid',
                    as: 'acteur'
                }
            },
            {
                $unwind: {
                    path: '$acteur'
                }
            },
            {
                $sort: {
                    count: -1
                }
            },
            {
                '$limit': 3000
            }
        ]
    )

    return {
        body: await (await mongoClient).db()?.collection('amendements')
            .aggregate(query)
            .toArray()
            .then(res => res
                .map(({ auteur, acteur, statuts }) => ({ auteur: acteur && `${acteur.prenom} ${acteur.nom}` || auteur, ...statuts }))
            )
    }
}
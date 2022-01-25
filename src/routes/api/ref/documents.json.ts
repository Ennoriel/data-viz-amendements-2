import type {RequestHandler} from "@sveltejs/kit";
import mongoClient from "$lib/utils/db";

export const get: RequestHandler = async () => {
  return {
      body: await (await mongoClient).db()?.collection('amendements').aggregate(
      [
        { '$facet': { 'stats': [{ '$sortByCount': '$texteLegislatifRef' }] } },
        { '$unwind': { 'path': '$stats' } },
        { '$limit': 100 },
        { '$lookup': { 'from': 'documents', 'localField': 'stats._id', 'foreignField': 'uid', 'as': 'doc' } },
        { '$addFields': { 'doc.count': '$stats.count' } },
        { '$unwind': { 'path': '$doc' } },
        { '$replaceRoot': { 'newRoot': '$doc' } }
      ]
    ).toArray()
  }
}
import type {RequestHandler} from "@sveltejs/kit";
import mongoClient from '$lib/utils/db';

export const get: RequestHandler = async () => {
  return {
    body: await (await mongoClient).db()?.collection('acteurs')
      .find({})
      .sort({ prenom: 1, nom: 1 })
      .toArray()
  };
};
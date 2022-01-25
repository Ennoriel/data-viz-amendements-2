// import { Db, MongoClient, MongoClientOptions } from 'mongodb';
//
// class MongoUtil {
// 	db: Db;
// 	client: MongoClient;
//
// 	async init() {
// 		if (!this.db) {
// 			this.client = new MongoClient(
// 				import.meta.env.VITE_MONGO_URI as string,
// 				{ useNewUrlParser: true, useUnifiedTopology: true } as MongoClientOptions
// 			);
// 			await this.client.connect();
// 			this.db = this.client.db(import.meta.env.VITE_MONGO_DB as string);
// 		}
// 	}
// }
//
// export default new MongoUtil();

import { MongoClient, MongoClientOptions } from 'mongodb';

const uri = import.meta.env.VITE_MONGO_URI as string;
const options = {
	useUnifiedTopology: true,
	useNewUrlParser: true
} as MongoClientOptions;

let client;
let clientPromise: Promise<MongoClient>;

if (!uri) {
	throw new Error('Please add your Mongo URI to env variables');
}

if (import.meta.env.NODE_ENV === 'development') {
	// In development mode, use a global variable
	// so that the value is preserved across module reloads
	// caused by HMR (Hot Module Replacement).
	if (!global._mongoClientPromise) {
		client = new MongoClient(uri, options);
		global._mongoClientPromise = client.connect();
	}
	clientPromise = global._mongoClientPromise;
} else {
	// In production mode, it's best to
	// not use a global variable.
	client = new MongoClient(uri, options);
	clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise.
// By doing this in a separate module,
// the client can be shared across functions.
export default clientPromise;
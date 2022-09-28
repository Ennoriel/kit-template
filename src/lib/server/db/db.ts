import { MongoClient } from 'mongodb';

const uri = import.meta.env.VITE_MONGO_URI as string;

const client = new MongoClient(uri);
let clientPromise: Promise<MongoClient>;

if (!uri) {
	throw new Error('Please add your Mongo URI to env variables');
}

declare global {
	// eslint-disable-next-line no-var
	var _mongoClientPromise: Promise<MongoClient>;
}

if (import.meta.env.NODE_ENV === 'development') {
	// In development mode, use a global variable
	// so that the value is preserved across module reloads
	// caused by HMR (Hot Module Replacement).
	if (!global._mongoClientPromise) global._mongoClientPromise = client.connect();
	clientPromise = global._mongoClientPromise;
} else {
	// In production mode, it's best to
	// not use a global variable.
	clientPromise = client.connect();
}

// Export a module-scoped database instance.
// By doing this in a separate module,
// the database instance can be shared across functions.
export default (await clientPromise).db();

// mongodb.ts (lib)
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI!);

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // Use a global variable so the MongoClient is only created once
  const globalWithMongoClient = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongoClient._mongoClientPromise) {
    globalWithMongoClient._mongoClientPromise = client.connect();
  }

  clientPromise = globalWithMongoClient._mongoClientPromise;
} else {
  clientPromise = client.connect();
}

export default clientPromise;

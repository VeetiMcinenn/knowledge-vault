import { MongoClient } from "mongodb";

let client;

export async function getCollection() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is undefined. Check your .env file!");
  }
  if (!client) {
    client = new MongoClient(uri);
  }

  if (!client.topology?.isConnected()) {
    await client.connect();
  }

  const db = client.db(process.env.DB_NAME);
  return db.collection(process.env.COLLECTION_NAME);
}
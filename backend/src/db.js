import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

export async function getCollection() {
  if (!client.topology?.isConnected()) {
    await client.connect();
  }
  const db = client.db(process.env.DB_NAME);
  return db.collection(process.env.COLLECTION_NAME);
}
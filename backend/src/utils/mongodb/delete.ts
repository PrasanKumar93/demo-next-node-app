import { Document, Filter } from "mongodb";
import { getCollection } from "./connect.js";

/**
 * Delete one document
 */
export async function deleteOne<T extends Document>(
  collectionName: string,
  query: Filter<T>
): Promise<boolean> {
  const collection = getCollection<T>(collectionName);
  const result = await collection.deleteOne(query);
  return result.deletedCount === 1;
}

/**
 * Delete many documents
 */
export async function deleteMany<T extends Document>(
  collectionName: string,
  query: Filter<T>
): Promise<number> {
  const collection = getCollection<T>(collectionName);
  const result = await collection.deleteMany(query);
  return result.deletedCount;
}


import { Document, Filter, UpdateFilter, WithId as MongoWithId } from "mongodb";
import { ZodSchema } from "zod";
import { getCollection } from "./connect.js";

/**
 * Update one document with Zod validation
 */
export async function updateOne<T extends Document>(
  collectionName: string,
  query: Filter<T>,
  update: UpdateFilter<T> | Partial<T>,
  schema: ZodSchema<T>
): Promise<MongoWithId<T> | null> {
  const collection = getCollection<T>(collectionName);

  // Determine if it's an update operator or replacement
  const updateDoc = Object.keys(update).some((key) => key.startsWith("$"))
    ? (update as UpdateFilter<T>)
    : { $set: update };

  const result = await collection.findOneAndUpdate(query, updateDoc, {
    returnDocument: "after",
  });

  if (!result) {
    return null;
  }

  // Validate output data
  const validated = schema.parse(result);
  return validated as MongoWithId<T>;
}


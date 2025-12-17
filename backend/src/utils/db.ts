import { MongoClient, Db, Collection, Document, Filter, OptionalUnlessRequiredId, UpdateFilter, WithId as MongoWithId } from "mongodb";
import { z, ZodSchema } from "zod";
import { ENV } from "../config/env.js";

// MongoDB client singleton
let client: MongoClient | null = null;
let db: Db | null = null;

/**
 * Connect to MongoDB
 */
export async function connectDB(): Promise<Db> {
  if (db) {
    return db;
  }

  try {
    client = new MongoClient(ENV.MONGODB_URI);
    await client.connect();
    db = client.db(ENV.MONGODB_DB_NAME);
    console.log(`✅ Connected to MongoDB: ${ENV.MONGODB_DB_NAME}`);
    return db;
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
}

/**
 * Get database instance (must call connectDB first)
 */
export function getDB(): Db {
  if (!db) {
    throw new Error("Database not connected. Call connectDB() first.");
  }
  return db;
}

/**
 * Get a typed collection
 */
export function getCollection<T extends Document>(name: string): Collection<T> {
  return getDB().collection<T>(name);
}

/**
 * Close MongoDB connection
 */
export async function closeDB(): Promise<void> {
  if (client) {
    await client.close();
    client = null;
    db = null;
    console.log("🔌 MongoDB connection closed");
  }
}

/**
 * Check if connected to MongoDB
 */
export function isConnected(): boolean {
  return db !== null;
}

// ===========================================
// CRUD Operations with Zod Validation
// ===========================================

/**
 * Create a document with Zod validation
 */
export async function createOne<T extends Document>(
  collectionName: string,
  data: OptionalUnlessRequiredId<T>,
  schema: ZodSchema<T>
): Promise<MongoWithId<T>> {
  // Validate input data
  const validated = schema.parse(data);
  
  const collection = getCollection<T>(collectionName);
  const result = await collection.insertOne(validated as OptionalUnlessRequiredId<T>);
  
  return { ...validated, _id: result.insertedId } as MongoWithId<T>;
}

/**
 * Find one document with Zod validation
 */
export async function findOne<T extends Document>(
  collectionName: string,
  query: Filter<T>,
  schema: ZodSchema<T>
): Promise<MongoWithId<T> | null> {
  const collection = getCollection<T>(collectionName);
  const doc = await collection.findOne(query);
  
  if (!doc) {
    return null;
  }
  
  // Validate output data
  const validated = schema.parse(doc);
  return validated as MongoWithId<T>;
}

/**
 * Find many documents with Zod validation
 */
export async function findMany<T extends Document>(
  collectionName: string,
  query: Filter<T>,
  schema: ZodSchema<T>,
  options?: { limit?: number; skip?: number; sort?: Record<string, 1 | -1> }
): Promise<MongoWithId<T>[]> {
  const collection = getCollection<T>(collectionName);
  
  let cursor = collection.find(query);
  
  if (options?.sort) {
    cursor = cursor.sort(options.sort);
  }
  if (options?.skip) {
    cursor = cursor.skip(options.skip);
  }
  if (options?.limit) {
    cursor = cursor.limit(options.limit);
  }
  
  const docs = await cursor.toArray();
  
  // Validate each document
  return docs.map((doc) => schema.parse(doc) as MongoWithId<T>);
}

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

/**
 * Count documents
 */
export async function countDocuments<T extends Document>(
  collectionName: string,
  query: Filter<T> = {}
): Promise<number> {
  const collection = getCollection<T>(collectionName);
  return collection.countDocuments(query);
}


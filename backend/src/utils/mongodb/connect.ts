import { MongoClient, Db, Collection, Document } from "mongodb";
import { ENV } from "../../config/env.js";

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

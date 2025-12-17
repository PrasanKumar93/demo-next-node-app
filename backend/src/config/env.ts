import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

export const ENV = {
  // Server
  PORT: parseInt(process.env.PORT || "3000", 10),
  NODE_ENV: process.env.NODE_ENV || "development",

  // MongoDB
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/demo_app",
  MONGODB_DB_NAME: process.env.MONGODB_DB_NAME || "demo_app",

  // Derived
  IS_PRODUCTION: process.env.NODE_ENV === "production",
  IS_DEVELOPMENT: process.env.NODE_ENV === "development",
  IS_TEST: process.env.NODE_ENV === "test",
} as const;

export type Env = typeof ENV;


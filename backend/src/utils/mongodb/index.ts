// Connection utilities
import {
  connectDB,
  getDB,
  getCollection,
  closeDB,
  isConnected,
} from "./connect.js";

// CRUD operations
import { createOne } from "./create.js";
import { findOne, findMany, countDocuments } from "./read.js";
import { updateOne } from "./update.js";
import { deleteOne, deleteMany } from "./delete.js";

export {
  connectDB,
  getDB,
  getCollection,
  closeDB,
  isConnected,
  createOne,
  findOne,
  findMany,
  countDocuments,
  updateOne,
  deleteOne,
  deleteMany,
};

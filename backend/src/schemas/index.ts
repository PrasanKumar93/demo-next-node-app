import { z } from "zod";

// Example: User schema for demonstration
const UserSchema = z.object({
  _id: z.any().optional(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

type User = z.infer<typeof UserSchema>;

// Generic MongoDB document schema
const MongoDocumentSchema = z.object({
  _id: z.any().optional(),
});

type MongoDocument = z.infer<typeof MongoDocumentSchema>;

export { UserSchema, User, MongoDocumentSchema, MongoDocument };

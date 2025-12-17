import { z } from "zod";

// Example: User schema for demonstration
export const UserSchema = z.object({
  _id: z.any().optional(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type User = z.infer<typeof UserSchema>;

// Generic MongoDB document schema
export const MongoDocumentSchema = z.object({
  _id: z.any().optional(),
});

export type MongoDocument = z.infer<typeof MongoDocumentSchema>;

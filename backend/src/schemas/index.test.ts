import { describe, it, expect } from "vitest";
import { UserSchema } from "./index.js";

describe("Zod Schemas", () => {
  describe("UserSchema", () => {
    it("should validate a valid user", () => {
      const validUser = {
        name: "John Doe",
        email: "john@example.com",
      };

      const result = UserSchema.safeParse(validUser);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.name).toBe("John Doe");
        expect(result.data.email).toBe("john@example.com");
      }
    });

    it("should validate user with optional fields", () => {
      const validUser = {
        name: "Jane Doe",
        email: "jane@example.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = UserSchema.safeParse(validUser);

      expect(result.success).toBe(true);
    });

    it("should reject empty name", () => {
      const invalidUser = {
        name: "",
        email: "john@example.com",
      };

      const result = UserSchema.safeParse(invalidUser);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe("Name is required");
      }
    });

    it("should reject invalid email", () => {
      const invalidUser = {
        name: "John Doe",
        email: "not-an-email",
      };

      const result = UserSchema.safeParse(invalidUser);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe("Invalid email format");
      }
    });

    it("should reject missing required fields", () => {
      const invalidUser = {
        name: "John Doe",
      };

      const result = UserSchema.safeParse(invalidUser);

      expect(result.success).toBe(false);
    });
  });
});


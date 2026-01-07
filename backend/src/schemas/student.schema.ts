import { z } from "zod";
import { STUDENT_VALIDATION } from "../constants/student.validation";

// Student registration schema
const StudentSchema = z.object({
  _id: z.any().optional(),
  firstName: z.string().min(1, "First name is required").max(STUDENT_VALIDATION.FIRST_NAME_MAX_LENGTH, `First name must not exceed ${STUDENT_VALIDATION.FIRST_NAME_MAX_LENGTH} characters`),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email format"),
  dateOfBirth: z.coerce.date(),
  studentId: z.string().min(1, "Student ID is required"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.object({
    street: z.string().min(1, "Street is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    zipCode: z.string().min(5, "Zip code is required"),
    country: z.string().default("USA"),
  }),
  enrollmentDate: z.coerce.date(),
  course: z.string().min(1, "Course is required"),
  department: z.string().min(1, "Department is required"),
  year: z.number().int().min(1).max(6),
  guardianName: z.string().optional(),
  guardianPhone: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

type Student = z.infer<typeof StudentSchema>;

export { StudentSchema };
export type { Student };

import { object, string } from "zod";

export const signInSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export const registerSchema = object({
  firstName: string({ required_error: "First name is required" }).min(
    1,
    "First name is required"
  ),
  lastName: string({ required_error: "Last name is required" }).min(
    1,
    "Last name is required"
  ),
  email: string({ required_error: "Email is required" }).email(
    "Invalid email address"
  ),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

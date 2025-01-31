import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .max(20, "Email is too long")
    .email("Email is invalid"),
  password: z
    .string({ required_error: "Password is required" })
    .max(10, "Password is too long"),
});

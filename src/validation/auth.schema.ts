import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(1, "Please enter password")
    .min(6, "Minimum 6 characters")
    .regex(/[A-Z]/, "Must include uppercase")
    .regex(/[0-9]/, "Must include number"),
});

export const signUpSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Please enter name")
    .min(2, "Name is too short"),

  email: z.string().email("Invalid email"),

  password: z
    .string()
    .min(1, "Please enter password")
    .min(6, "Minimum 6 characters")
    .regex(/[A-Z]/, "Must include uppercase")
    .regex(/[0-9]/, "Must include number"),
});

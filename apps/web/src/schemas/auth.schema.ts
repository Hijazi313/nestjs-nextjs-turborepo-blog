import { z } from "zod";

// Sign up schema
export const signupFormSchema = z.object({
  name: z.string().min(2, "Name is required").trim(),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$#%^&+=]).*$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
    )
    .trim(),
});

export type SignupInput = z.infer<typeof signupFormSchema>;

// Sign in schema
export const signinFormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

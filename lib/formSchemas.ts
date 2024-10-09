import { z } from "zod";

export const formSchema = z.object({
  firstName: z
    .string()
    .min(2)
    .max(50, { message: "First name must be between 2 and 50 characters" }),
  lastName: z
    .string()
    .min(2)
    .max(50, { message: "Last name must be between 2 and 50 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  message: z
    .string()
    .min(2, { message: "Message must be at least 2 characters" }),
});

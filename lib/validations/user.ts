import * as z from "zod"

export const userNameSchema = z.object({
  username: z.string().min(3).max(50).min(1),
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  email: z.string().email(),
  phone_number: z
    .string()
    .min(10)
    .max(15)
    .regex(/^\+?\d+$/),
})

import * as z from "zod"

export const userAuthSchema = z.object({
  email: z.string().email().min(1),
  password: z.string().min(6).min(1),
})
export const registerAuthSchema = z.object({
  username: z.string().min(3).max(50).nonempty(),
  first_name: z.string().min(1),
  last_name: z.string().min(1),
  email: z.string().email(),
  phone_number: z
    .string()
    .min(10)
    .max(15)
    .regex(/^\+?\d+$/),
  password: z.string().min(6),
})

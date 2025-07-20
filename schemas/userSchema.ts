import { z } from "zod"

export const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  company: z.string().min(1, "Company is required"),
})

export type UserFormData = z.infer<typeof userSchema>

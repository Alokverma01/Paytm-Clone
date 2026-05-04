import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  mobile: z.string(),
  password: z.string().min(6),
});

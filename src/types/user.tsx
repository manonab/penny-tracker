import { z } from "zod";

export const UserSchema = z.object({
  id: z.string(),
  balance: z.string(),
  password: z.string(),
  username: z.string(),
});

export type UserType = z.infer<typeof UserSchema>;
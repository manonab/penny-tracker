import { z } from "zod";

export const AuthSchema = z.object({
  access_token: z.string(),
  user_id: z.number()
});

export type AuthType = z.infer<typeof AuthSchema>;

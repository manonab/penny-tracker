import { z } from "zod";

export const AuthSchema = z.object({
  access_token: z.string(),
});

export type AuthType = z.infer<typeof AuthSchema>;

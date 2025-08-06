import { z } from "zod";

export const loginCredentials = z.object({
  email: z.string({ message: "Email is required!" }).min(1, {
    message: "Email is required!",
  }),
  password: z.string({ message: "Password is required!" }).min(1, {
    message: "Password is required!",
  }),
});

export type TLoginCredentials = z.infer<typeof loginCredentials>;

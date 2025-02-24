import { z } from "zod";

export const searchSchema = z.object({
  firstname: z.string().min(1, { message: "Firstname is required!" }),
});

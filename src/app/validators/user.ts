import { z } from "zod";

export const registerSchema = z.object({
  firstname: z.string().min(1, { message: "Fistname is required!" }),
  lastname: z.string().min(1, { message: "Lastname is required!" }),
  birthdate: z.date({ required_error: "Birthdate is required!" }),
  province: z.string().min(1, { message: "Province is required!" }),
  city: z.string().min(1, { message: "City is required!" }),
  postal_code: z.string().min(1, { message: "Postal code is required!" }),
  street: z.string().min(1, { message: "Street is required!" }),
});
